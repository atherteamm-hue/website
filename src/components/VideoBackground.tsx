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
  const rafRef = useRef<number | null>(null);
  const [duration, setDuration] = useState<number>(4.0);
  // Set when the video can't be used (unsupported codec, autoplay blocked,
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
  // Muted + playsInline + autoplay is the only combination every browser
  // (Chrome, Safari, iOS/Android) allows to start without a user gesture.
  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Some engines only honour the muted flag when set on the property.
    video.muted = true;
    video.defaultMuted = true;

    const promise = video.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch((err: unknown) => {
        // NotAllowedError = autoplay policy blocked it (iOS Low Power Mode,
        // etc.). Fall back to the poster. Other errors are transient.
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
    attemptPlay();
    video.addEventListener('canplay', attemptPlay, { once: true });

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
      video.removeEventListener('canplay', attemptPlay);
      motionQuery.removeEventListener('change', applyMotionPreference);
    };
  }, [attemptPlay]);

  // ── Seeking (scrubbing) ─────────────────────────────────────────────────
  const seekToTarget = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !Number.isFinite(video.duration)) return;

    const dur = video.duration;
    const target = Math.max(0, Math.min(dur, targetTimeRef.current));

    // Already aimed at this position. A playing video drifts past the target
    // on its own, so re-seeking here would loop forever and stall playback.
    if (Math.abs(appliedTargetRef.current - target) <= 0.01) {
      isSeekingRef.current = false;
      return;
    }

    // Already there (or close enough) — clear the in-flight flag and stop.
    if (Math.abs(video.currentTime - target) <= 0.02) {
      isSeekingRef.current = false;
      appliedTargetRef.current = target;
      return;
    }
    if (isSeekingRef.current) return;

    try {
      const fastSeek = (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek;
      if (typeof fastSeek === 'function') {
        fastSeek.call(video, target);
      } else {
        video.currentTime = target;
      }
      isSeekingRef.current = true;
      appliedTargetRef.current = target;
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

    // Nudge off the very first frame while the video is still paused.
    if (video.paused) {
      try {
        video.currentTime = targetTimeRef.current;
      } catch (e) {
        // Ignore invalid seek targets.
      }
    }
    attemptPlay();
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    // The target may have moved on while the seek was in flight.
    scheduleSeek();
  };

  const handleError = () => {
    // No playable source (unsupported codec / failed request) — show the poster.
    setPosterOnly(true);
  };

  return (
    <>
      {/* Poster layer: sits behind the video and becomes the visible background
          whenever the video can't be played. Guarantees the hero is never a
          black box on browsers without a matching decoder. */}
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
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={handleLoadedMetadata}
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
