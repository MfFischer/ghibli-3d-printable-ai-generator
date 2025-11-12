import { useState, useEffect, useRef } from 'react';
import { preloadImage } from '../utils/performance';

interface UseOptimizedImageOptions {
  lazy?: boolean;
  preload?: boolean;
  placeholder?: string;
}

interface UseOptimizedImageReturn {
  src: string | undefined;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook for optimized image loading
 * Supports lazy loading, preloading, and error handling
 */
export function useOptimizedImage(
  imageSrc: string | undefined,
  options: UseOptimizedImageOptions = {}
): UseOptimizedImageReturn {
  const { lazy = false, preload = false, placeholder } = options;
  const [src, setSrc] = useState<string | undefined>(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageSrc) {
      setIsLoading(false);
      return;
    }

    // Preload image if requested
    if (preload && !lazy) {
      setIsLoading(true);
      preloadImage(imageSrc)
        .then(() => {
          setSrc(imageSrc);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
      return;
    }

    // Lazy load with Intersection Observer
    if (lazy && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsLoading(true);
              preloadImage(imageSrc)
                .then(() => {
                  setSrc(imageSrc);
                  setIsLoading(false);
                })
                .catch((err) => {
                  setError(err);
                  setIsLoading(false);
                });

              if (observerRef.current && imgRef.current) {
                observerRef.current.unobserve(imgRef.current);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }

    // Default: load immediately
    setSrc(imageSrc);
    setIsLoading(false);
  }, [imageSrc, lazy, preload, placeholder]);

  return { src, isLoading, error };
}

/**
 * Hook to observe element visibility
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

