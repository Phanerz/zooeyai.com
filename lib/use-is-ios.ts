'use client';

import { useEffect, useState } from 'react';

export function useIsIOS(): boolean {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(
      /iPad|iPhone|iPod/.test(ua) ||
        (/Macintosh|Mac OS X/.test(ua) && /Mobile\//.test(ua)),
    );
  }, []);
  return isIOS;
}
