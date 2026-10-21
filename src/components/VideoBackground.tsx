import React, { useEffect, useRef, useState, useCallback } from 'react';

interface VideoBackgroundProps {
  dimmed?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ dimmed = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const appliedTargetRef = useRef<number>(-1);
  const seekTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [duration, setDuration] = useState<number>(4.0);
  // Set when the video can't be used (unsupported codec, failed request,
  // reduced motion). The poster layer then becomes the visible background.
  const [posterOnly, setPosterOnly] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  // H.264/MP4 first (universal support + hardware decode), VP9/WebM as a
  // fallback for builds that ship without an H.264 decoder.
  const videoSrc = `${cleanBase}mainframe-aria.mp4`;
  const videoSrcWebm = `${cleanBase}mainframe-aria.webm`;
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

  // Coalesce pointer moves into at most one seek per animation frame.
  const scheduleSeek = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      seekToTarget();
    });
  }, [seekToTarget]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (seekTimerRef.current !== null) window.clearTimeout(seekTimerRef.current);
    };
  }, []);

  const updateTargetFromPointer = useCallback(
    (clientX: number) => {
      const video = videoRef.current;
      if (!video) return;
      const dur = video.duration || duration || 4.0;

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
    [duration, scheduleSeek]
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
    setDuration(dur);
    targetTimeRef.current = Math.min(0.05, dur / 2);

    primePlayback();
  };

  // The video is a scrubbable element, not a looping background: as soon as
  // the priming play() starts, pause it again so the frame stays put and
  // only follows the pointer.
  const handlePlaying = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    appliedTargetRef.current = -1;
    seekToTarget();
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    if (seekTimerRef.current !== null) {
      window.clearTimeout(seekTimerRef.current);
      seekTimerRef.current = null;
    }
  };

  const handleError = () => {
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
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={handleLoadedMetadata}
          onPlaying={handlePlaying}
          onSeeked={handleSeeked}
          onError={handleError}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrcWebm} type="video/webm" />
        </video>
      )}

      {dimmed && (
        <div
          className="fixed inset-0 z-0 bg-white/70 backdrop-blur-md pointer-events-none transition-all duration-700"
          aria-hidden="true"
        />
      )}
    </>
  );
};
