import { useState, useEffect } from 'react';

export function useElapsed(startTime: Date) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 1000));
    }, 1000);
    
    // Initial set
    setElapsed(Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 1000));

    return () => clearInterval(interval);
  }, [startTime]);

  return elapsed;
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
