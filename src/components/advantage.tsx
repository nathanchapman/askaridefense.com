"use client"

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Reveal } from "./reveal"

function Bar({
  label,
  value,
  width,
  accent = false,
}: {
  label: string
  value: string
  width: string
  accent?: boolean
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <span className="min-w-0 truncate font-mechano text-[8px] tracking-[0.3em] text-muted md:text-[9px] md:tracking-[0.4em]">
          {label}
        </span>
        <span className="font-megum text-base tracking-[0.1em] whitespace-nowrap md:text-xl">
          {value}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-foreground/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true }}
          transition={{
            duration: accent ? 0.6 : 2.2,
            delay: accent ? 0.8 : 0.3,
          }}
          className={`h-full ${accent ? "bg-accent" : "bg-muted"}`}
        />
      </div>
    </div>
  )
}

function CostChart() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 576, height: 288 })
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const left = size.width < 400 ? 16 : 40
  const right = size.width - 8
  const bottom = size.height - 30
  const points = Array.from({ length: 20 }, (_, i) => ({
    x: left + ((right - left) * i) / 19,
    attack: bottom - ((10 * Math.exp(i * 0.15)) / 180) * (bottom - 8),
    denial: bottom - ((51.5 - i * 1.8 + Math.sin(i * 2)) / 180) * (bottom - 8),
  }))
  const path = (key: "attack" | "denial") =>
    points
      .map((point, i) => `${i ? "L" : "M"}${point.x},${point[key]}`)
      .join(" ")
  return (
    <div>
      <div ref={ref} className="relative aspect-[4/3] md:aspect-[2/1]">
        <span className="absolute top-0 left-0 font-megum text-sm text-muted md:text-lg">
          $
        </span>
        <svg
          role="img"
          aria-label="The cost of attack rises while the cost of denial falls"
          viewBox={`0 0 ${size.width} ${size.height}`}
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="cost-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="var(--color-accent)" stopOpacity="0.35" />
              <stop
                offset="1"
                stopColor="var(--color-accent)"
                stopOpacity="0.02"
              />
            </linearGradient>
          </defs>
          <path
            d={`${path("attack")} L${right},${bottom} L${left},${bottom} Z`}
            fill="url(#cost-fill)"
          />
          <motion.path
            d={path("attack")}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <path
            d={path("denial")}
            fill="none"
            stroke="#f1f1f1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1={left}
            x2={right}
            y1={bottom}
            y2={bottom}
            stroke="var(--color-border)"
          />
          <g
            className="font-mechano"
            fontSize="9"
            letterSpacing="0.15em"
            fill="var(--color-muted)"
          >
            <text x={left} y={bottom + 15} textAnchor="middle">
              PAST
            </text>
            <text x={right} y={bottom + 15} textAnchor="end">
              FUTURE
            </text>
          </g>
        </svg>
      </div>
      <div className="mt-4 flex gap-6 font-mechano text-[8px] tracking-[0.4em] text-muted">
        <span className="flex items-center gap-2">
          <i className="h-0.5 w-4 shrink-0 bg-accent" />
          COST OF ATTACK
        </span>
        <span className="flex items-center gap-2">
          <i className="h-0.5 w-4 shrink-0 bg-foreground" />
          COST OF DENIAL
        </span>
      </div>
    </div>
  )
}

export function Advantage() {
  return (
    <section
      id="advantage"
      className="w-full border-t border-border bg-background px-6 py-20 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="max-w-5xl font-megum text-2xl leading-[1.2] tracking-[0.1em] uppercase md:text-[3.2vw] md:tracking-[0.2em] lg:text-5xl lg:leading-none">
            Askari is not just an interceptor company.{" "}
            <span className="text-accent">
              We are the kinetic infrastructure company.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-3xl font-brixela text-xs leading-relaxed tracking-[0.15em] text-muted uppercase md:text-sm md:leading-5">
            Large portions of our autonomy stack is auto-generated from
            thousands of hours of real-world flight data, enabling rapid
            deployment of hardware and software for any kinetic system.
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-px bg-border md:mt-24 md:grid-cols-2">
          <Reveal delay={0.2} className="h-full">
            <div className="h-full bg-background p-8 md:p-12">
              <span className="mb-6 block font-mechano text-[9px] tracking-[0.7em] text-accent">
                01 – SPEED
              </span>
              <h3 className="font-megum text-3xl leading-none tracking-[0.1em] md:text-5xl">
                WEEKS,
                <br />
                NOT YEARS
              </h3>
              <div className="mt-8">
                <Bar
                  label="TRADITIONAL DEFENSE"
                  value="3–5 YEARS"
                  width="95%"
                />
                <Bar label="ASKARI" value="2–4 WEEKS" width="12%" accent />
              </div>
              <p className="mt-6 font-brixela text-xs leading-relaxed tracking-[0.15em] text-muted uppercase">
                Threats evolve in days. If you can&apos;t field a response in
                weeks, you&apos;ve already lost.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="h-full">
            <div className="h-full bg-background p-8 md:p-12">
              <span className="mb-6 block font-mechano text-[9px] tracking-[0.7em] text-accent">
                02 – COST
              </span>
              <h3 className="mb-8 font-megum text-3xl leading-none tracking-[0.1em] md:text-5xl">
                BREAK THE
                <br />
                COST CURVE
              </h3>
              <CostChart />
              <p className="mt-6 font-brixela text-xs leading-relaxed tracking-[0.15em] text-muted uppercase">
                When the denial costs less than the attack, proliferation loses
                its power.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.4}>
          <div className="mt-16 border border-accent p-6 md:mt-24 md:p-8">
            <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-0">
              <span className="shrink-0 font-mechano text-[9px] tracking-[0.7em] text-accent">
                AUTONOMY STACK IS:
              </span>
              <span className="shrink-0 font-megum text-4xl tracking-[0.1em] md:text-6xl">
                80–90%
              </span>
              <span className="max-w-[220px] font-mechano text-[9px] tracking-[0.5em] text-muted md:text-right">
                AUTO-GENERATED FROM REAL-WORLD FLIGHT DATA
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden bg-foreground/5">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.3 }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
