import { useEffect, RefObject } from 'react'

interface UseIntersectionObserverProps {
  target: RefObject<HTMLElement>
  onIntersect: () => void
  shouldCallHandler?: boolean
}

export const useIntersectionObserver = ({
  target,
  onIntersect,
  shouldCallHandler = true
}: UseIntersectionObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(shouldCallHandler, entry)
        if (entry.isIntersecting && shouldCallHandler) {
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
  }, [target, onIntersect, shouldCallHandler])
}
