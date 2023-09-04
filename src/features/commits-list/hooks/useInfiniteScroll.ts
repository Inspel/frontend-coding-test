import { useEffect, RefObject } from 'react'

interface UseInfiniteScrollProps {
  target: RefObject<HTMLElement>
  onIntersect: () => void
  hasNextPage?: boolean
  isFetching: boolean
}

export const useInfiniteScroll = ({
  target,
  onIntersect,
  hasNextPage,
  isFetching
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          onIntersect()
        }
      },
      { threshold: 0 }
    )

    const observedTarget = target.current

    if (observedTarget) {
      observer.observe(observedTarget)
    }

    return () => {
      if (observedTarget) {
        observer.unobserve(observedTarget)
      }
    }
  }, [target, onIntersect, hasNextPage, isFetching])
}
