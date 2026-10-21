import React, { useEffect, useRef, useState, useCallback } from 'react';

interface VideoBackgroundProps {
  dimmed?: boolean;
}

/** Minimum milliseconds between two video seeks while scrubbing. */
const SEEK_INTERVAL_MS = 50;

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ dimmed = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const appliedTargetRef = useRef<number>(-1);
  const seekTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  // Kept in a ref, not state: writing it would re-render the <video>, and
  // re-rendering a <video> whose children are <source> elements makes the
  // browser restart source selection — it fires a spurious `error` event
  // with no MediaError, which used to tear the video out of the DOM.
  const durationRef = useRef<number>(4.0);
  // Set once the video has been primed (played briefly and paused on a
  // decoded frame).
  const primedRef = useRef<boolean>(false);
  // Set when the video can't be used (unsupported codec, failed request,
  // reduced motion). The poster layer then becomes the visible background.
  const [posterOnly, setPosterOnly] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  // H.264/MP4 first (universal support + hardware decode), VP9/WebM as a
  // fallback for builds that ship without an H.264 decoder.
  const videoSrc = `${cleanBase}mainframe-aria.mp4`;
  const videoSrcWebm = `${cleanBase}mainframe-aria.webm`;
  // Much smaller encode for phones — a 4G phone has no business pulling the
  // 1080p file when it is only ever shown at ~390 CSS pixels wide.
  const videoSrcMobile = `${cleanBase}mainframe-aria-mobile.mp4`;
  const posterSrc = `${cleanBase}mainframe-aria-poster.jpg`;

  // ── Playback ────────────────────────────────────────────────────────────
  // The clip is a scrubbable element: the frame follows the pointer/finger
  // instead of playing on its own. It is still played once (muted) so that
  // every engine has actually decoded a frame — iOS/Safari otherwise keep
  // their own poster overlay on top and the scrub would look frozen.
  const primePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const promise = video.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch((err: unknown) => {
        // Autoplay blocked (iOS Low Power Mode, etc.) — the paused first
        // frame is still shown, so there is nothing to recover from.
        if (err instanceof Error && err.name === 'NotAllowedError') {
          setPosterOnly(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari/iOS often reject the first play() before the media is ready,
    // so retry once the data is actually available.
    primePlayback();
    video.addEventListener('canplay', primePlayback, { once: true });

    // Safety net: if the media data never gets far enough for 'canplay' (a
    // very slow connection), stop the video anyway so it never plays on its
    // own in the background.
    const stopTimer = window.setTimeout(() => {
      const current = videoRef.current;
      if (current && !current.paused) {
        primedRef.current = true;
        current.pause();
      }
    }, 2500);

    // Respect the OS "reduce motion" setting: show the still frame instead.
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      if (motionQuery.matches) {
        video.pause();
        setPosterOnly(true);
      }
    };
    applyMotionPreference();
    motionQuery.addEventListener('change', applyMotionPreference);

    return () => {
      window.clearTimeout(stopTimer);
      video.removeEventListener('canplay', primePlayback);
      motionQuery.removeEventListener('change', applyMotionPreference);
    };
  }, [primePlayback]);

  // ── Seeking (scrubbing) ─────────────────────────────────────────────────
  const seekToTarget = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !Number.isFinite(video.duration)) return;

    const dur = video.duration;
    const target = Math.max(0, Math.min(dur, targetTimeRef.current));

    // Already aimed at this position — nothing to do.
    if (Math.abs(appliedTargetRef.current - target) <= 0.005) return;
    if (isSeekingRef.current) return;

    try {
      // An exact seek (rather than fastSeek) guarantees a 'seeked' event, so
      // the in-flight flag can never get stuck and disable scrubbing.
      video.currentTime = target;
      appliedTargetRef.current = target;
      isSeekingRef.current = true;

      // Safety net: if the engine never reports 'seeked', unlock anyway.
      if (seekTimerRef.current !== null) window.clearTimeout(seekTimerRef.current);
      seekTimerRef.current = window.setTimeout(() => {
        isSeekingRef.current = false;
      }, 400);
    } catch (err) {
      isSeekingRef.current = false;
    }
  }, []);

  // Coalesce pointer moves into at most one seek per animation frame, and
  // rate-limit the seeks themselves. A video seek re-decodes a frame and
  // repaints a full-viewport video, so doing that on every frame the mouse
  // moves is expensive; ~20/second is indistinguishable to the eye.
  const lastSeekAtRef = useRef<number>(0);
  const pendingSeekRef = useRef<boolean>(false);
  const trailingTimerRef = useRef<number | null>(null);

  const applySeekNow = useCallback(() => {
    lastSeekAtRef.current = performance.now();
    pendingSeekRef.current = false;
    seekToTarget();
  }, [seekToTarget]);

  const scheduleSeek = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const elapsed = performance.now() - lastSeekAtRef.current;
      if (elapsed >= SEEK_INTERVAL_MS) {
        applySeekNow();
        return;
      }
      // Too soon after the last seek — remember it so the final position of
      // the gesture is still applied, just a moment later.
      pendingSeekRef.current = true;
      if (trailingTimerRef.current === null) {
        trailingTimerRef.current = window.setTimeout(() => {
          trailingTimerRef.current = null;
          if (pendingSeekRef.current) applySeekNow();
        }, SEEK_INTERVAL_MS - elapsed);
      }
    });
  }, [applySeekNow]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (seekTimerRef.current !== null) window.clearTimeout(seekTimerRef.current);
      if (trailingTimerRef.current !== null) window.clearTimeout(trailingTimerRef.current);
    };
  }, []);

  const updateTargetFromPointer = useCallback(
    (clientX: number) => {
      const video = videoRef.current;
      if (!video) return;
      const dur = video.duration || durationRef.current || 4.0;

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const SENSITIVITY = 0.8;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * dur;
      targetTimeRef.current = Math.max(0, Math.min(dur, targetTimeRef.current + timeOffset));

      scheduleSeek();
    },
    [scheduleSeek]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => updateTargetFromPointer(e.clientX),
    [updateTargetFromPointer]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      updateTargetFromPointer(e.touches[0].clientX);
    },
    [updateTargetFromPointer]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      prevXRef.current = e.touches[0].clientX;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchStart, handleTouchMove]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    const dur = video.duration || 4.0;
    durationRef.current = dur;
    targetTimeRef.current = Math.min(0.05, dur / 2);

    primePlayback();
  };

  // The video is a scrubbable element, not a looping background: it is
  // played once (muted) so the engine really decodes a frame, then paused
  // so the frame stays put and only follows the pointer.
  //
  // The pause has to wait for the media *data* though. A paused video that
  // only has metadata (readyState 1) silently ignores currentTime writes,
  // so seeking it at that point does nothing and every later scrub is
  // dropped as well. 'canplay' means readyState >= 3, i.e. there is real
  // data to seek into.
  const handleCanPlay = () => {
    if (primedRef.current) return;
    const video = videoRef.current;
    if (!video || video.readyState < 3) return;

    primedRef.current = true;
    video.pause();
    appliedTargetRef.current = -1;
    seekToTarget();
  };

  const handlePlaying = () => {
    const video = videoRef.current;
    if (!video) return;
    // Keep playing until the data is buffered — see handleCanPlay.
    if (!primedRef.current) return;
    video.pause();
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    if (seekTimerRef.current !== null) {
      window.clearTimeout(seekTimerRef.current);
      seekTimerRef.current = null;
    }
  };

  const handleError = () => {
    const video = videoRef.current;
    // Only give up when the media genuinely failed to load. The element also
    // fires `error` with no MediaError when the browser restarts source
    // selection, and tearing the video out of the DOM in that case would
    // break the scrub interaction.
    if (!video || !video.error) return;
    // No playable source (unsupported codec / failed request) — show the poster.
    setPosterOnly(true);
  };

  return (
    <>
      {/* Poster layer: sits behind the video and becomes the visible background
          whenever the video can't be played. Guarantees the hero is never a
          black box on browsers without a matching decoder. It is a background
          image rather than the `poster` attribute on purpose — iOS keeps the
          poster attribute painted over the video until playback starts, which
          would hide the scrubbing. */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `url(${posterSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: '70% center',
          opacity: dimmed ? 0.25 : 1,
        }}
        aria-hidden="true"
      />

      {!posterOnly && (
        <video
          ref={videoRef}
          className="fixed inset-0 z-0 object-cover w-full h-full pointer-events-none transition-opacity duration-700"
          style={{
            objectPosition: '70% center',
            opacity: dimmed ? 0.25 : 1,
          }}
          muted
          playsInline
          preload={dimmed ? 'metadata' : 'auto'}
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          onPlaying={handlePlaying}
          onSeeked={handleSeeked}
          onError={handleError}
          aria-hidden="true"
        >
          <source src={videoSrcMobile} type="video/mp4" media="(max-width: 768px)" />
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrcWebm} type="video/webm" />
        </video>
      )}

      {dimmed && (
        <div
          className="fixed inset-0 z-0 bg-white/75 pointer-events-none transition-all duration-700"
          aria-hidden="true"
        />
      )}
    </>
  );
};
