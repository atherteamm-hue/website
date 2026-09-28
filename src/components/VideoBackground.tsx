import React, { useEffect, useRef, useState, useCallback } from 'react';

interface VideoBackgroundProps {
  dimmed?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ dimmed = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [duration, setDuration] = useState<number>(4.0);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const dur = video.duration || 4.0;
      setDuration(dur);
      try {
        video.currentTime = 0.05;
        targetTimeRef.current = 0.05;
      } catch (e) {
        // Silently handle initial seek errors
      }
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || duration || 4.0;

    if (prevXRef.current === null) {
      prevXRef.current = e.clientX;
      return;
    }

    const delta = e.clientX - prevXRef.current;
    prevXRef.current = e.clientX;

    const SENSITIVITY = 0.8;
    const timeOffset = (delta / window.innerWidth) * SENSITIVITY * dur;
    targetTimeRef.current = Math.max(0, Math.min(dur, targetTimeRef.current + timeOffset));

    if (!isSeekingRef.current) {
      try {
        video.currentTime = targetTimeRef.current;
        isSeekingRef.current = true;
      } catch (err) {
        // Handle seek collision
      }
    }
  }, [duration]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 0) return;
    const clientX = e.touches[0].clientX;
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

    if (!isSeekingRef.current) {
      try {
        video.currentTime = targetTimeRef.current;
        isSeekingRef.current = true;
      } catch (err) {
        // Handle seek collision
      }
    }
  }, [duration]);

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

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (video) {
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        try {
          video.currentTime = targetTimeRef.current;
          isSeekingRef.current = true;
        } catch (err) {
          // Handle seek collision
        }
      }
    }
  };

  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const videoSrc = `${cleanBase}mainframe-aria.mp4`;

  return (
    <>
      <video
        ref={videoRef}
        src={videoSrc}
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
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
      />

      {dimmed && (
        <div 
          className="fixed inset-0 z-0 bg-white/70 backdrop-blur-md pointer-events-none transition-all duration-700"
          aria-hidden="true"
        />
      )}
    </>
  );
};
