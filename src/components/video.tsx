"use client"

import { useEffect, useRef } from "react"

export function Video({
  src,
  poster,
  className = "",
  eager = false,
}: {
  src: string
  poster?: string
  className?: string
  eager?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = false
    const play = () => {
      if (visible && !document.hidden && !reduced.matches)
        void video.play().catch(() => {})
      else video.pause()
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !video.getAttribute("src")) video.src = src
        play()
      },
      { rootMargin: "100px" },
    )
    observer.observe(video)
    document.addEventListener("visibilitychange", play)
    reduced.addEventListener("change", play)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", play)
      reduced.removeEventListener("change", play)
      video.pause()
    }
  }, [src])
  return (
    <video
      ref={ref}
      src={eager ? src : undefined}
      poster={poster}
      className={className}
      autoPlay={eager}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
    />
  )
}
