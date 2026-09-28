import { useState, useEffect } from 'react';

export interface UseTypewriterReturn {
  displayed: string;
  done: boolean;
}

export function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600
): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    let currentIndex = 0;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        currentIndex++;
        setDisplayed(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          if (intervalId !== undefined) {
            clearInterval(intervalId);
          }
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
