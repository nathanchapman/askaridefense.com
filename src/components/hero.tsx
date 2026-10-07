"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Video } from "./video"

export function Hero() {
  const [loading, setLoading] = useState(true)
  const reduced = useReducedMotion()
  useEffect(() => {
    const timeout = window.setTimeout(
      () => setLoading(false),
      reduced ? 0 : 1900,
    )
    return () => window.clearTimeout(timeout)
  }, [reduced])
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black motion-reduce:hidden"
            aria-hidden="true"
          >
            <div className="splash-glyph" />
          </motion.div>
        )}
      </AnimatePresence>
      <section
        id="home"
        className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-background"
      >
        <Video
          src="/videos/intercepts.mp4"
          poster="/images/first_frame.jpg"
          eager
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!loading || reduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute right-6 bottom-10 left-6 flex flex-col items-start justify-between gap-2 mix-blend-exclusion md:right-12 md:bottom-14 md:left-12 md:flex-row md:items-end md:gap-6"
        >
          <h1 className="font-megum text-[15vw] leading-[0.9] tracking-[0.02em] text-white uppercase select-none md:text-[12vw] md:tracking-[0.15em]">
            ASKARI
          </h1>
          <div className="md:max-w-[520px] md:text-right">
            <p className="font-mechano text-[14px] leading-[1.6] tracking-[0.12em] text-white/70 uppercase md:text-[18px]">
              We build low-cost
              <br />
              intelligent kinetic
              <br />
              defenses for the age
              <br />
              of robotic warfare.
            </p>
            <div className="mt-6 flex w-full items-center justify-start md:justify-end">
              <Link
                href="/press/lore"
                className="font-mechano text-[9px] tracking-[0.3em] text-white/40 uppercase hover:text-accent"
              >
                Read our story →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
