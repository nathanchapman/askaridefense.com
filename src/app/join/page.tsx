import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = { title: "Careers" }

export default function Join() {
  return (
    <>
      <main id="main-content">
        <section className="w-full px-6 pt-[140px] pb-[60px] md:px-12 md:pt-[200px] md:pb-20">
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <span className="mb-6 block font-mechano text-[9px] tracking-[0.7em] text-accent">
                CAREERS
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="max-w-4xl font-megum text-3xl leading-[1.2] tracking-[0.1em] md:text-6xl md:leading-none md:tracking-[0.2em]">
                JOIN THE MISSION
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl font-brixela text-xs leading-relaxed tracking-[0.15em] text-muted uppercase md:text-sm md:leading-5">
                We&apos;re building the kinetic infrastructure that will define
                the next era of defense. We need exceptional people who move
                fast and solve hard problems.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/values"
                className="mt-6 inline-block border-b border-accent/30 pb-1 font-mechano text-[9px] tracking-[0.5em] text-accent hover:text-foreground"
              >
                VALUES →
              </Link>
            </Reveal>
          </div>
        </section>
        <section className="w-full px-6 pb-20 md:px-12 md:pb-[120px]">
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <h2 className="mb-6 font-mechano text-[9px] tracking-[0.7em] text-accent">
                OPEN ROLES
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-8 max-w-xl font-brixela text-xs leading-relaxed tracking-[0.15em] text-muted uppercase md:text-sm md:leading-5">
                All applications are managed through our Rippling job board.
                Click below to view current openings and apply.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="https://ats.rippling.com/askaridefense/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-accent px-8 py-4 font-mechano text-[10px] tracking-[0.5em] text-accent hover:bg-accent/10"
              >
                VIEW OPEN ROLES →
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
