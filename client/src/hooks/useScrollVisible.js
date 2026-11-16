import { useRef, useState, useEffect } from 'react';

export function useScrollVisible(threshold = 0.85) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, {
      rootMargin: `0px 0px -${Math.round(window.innerHeight * (1 - threshold))}px 0px`,
      threshold: 0,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
