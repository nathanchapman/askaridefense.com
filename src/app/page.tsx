import Link from "next/link"
import { Hero } from "@/components/hero"
import { Reveal } from "@/components/reveal"
import { Armory } from "@/components/armory"
import { Advantage } from "@/components/advantage"
import { Video } from "@/components/video"
import { Press } from "@/components/press"
import { Footer } from "@/components/footer"

const partners = [
  "DEPARTMENT OF HOMELAND SECURITY",
  "SOCOM",
  "U.S. ARMY",
  "U.S. NAVY",
  "CUSTOMS & BORDER PROTECTION",
]

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <section
          id="mission"
          className="relative z-10 w-full bg-[#0b0a01] px-6 py-20 text-[#f1f1f1] md:px-12 md:py-40"
        >
          <div className="mx-auto flex max-w-[1600px] flex-col items-center text-center">
            <Reveal>
              <img
                src="/images/glyph_v2_bone_white.png"
                alt="Askari glyph"
                className="mb-12 w-12 md:mb-16 md:w-[60px]"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="max-w-[1200px] font-megum text-[6vw] leading-[1.2] tracking-[0.02em] md:text-[3.5vw]">
                ONE MISSION.{" "}
                <span className="text-accent">DENY EVERY ROBOT.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-[800px] font-mechano text-[10px] leading-[2] tracking-[0.1em] text-white/50 md:mt-16 md:text-[13px]">
                We build low-cost intelligent kinetic systems that make robotic
                attack unaffordable. When the denial costs less than the attack,
                proliferation loses its power.
              </p>
            </Reveal>
          </div>
        </section>
        <Armory />
        <section
          id="winter"
          className="relative flex min-h-screen w-full items-start justify-start overflow-hidden"
        >
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/images/iphone_winter.jpg"
            />
            <img
              src="/images/desktop_winter.jpg"
              alt="Soldier in snow with an interceptor overhead"
              className="absolute -top-[20%] h-[120%] w-full object-cover object-bottom md:inset-0 md:h-full md:object-[center_80%]"
            />
          </picture>
          <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-start gap-4 px-6 pt-16 mix-blend-exclusion md:gap-6 md:px-12 md:pt-24 xl:pt-32">
            {["INTELLIGENT", "PRECISE", "LETHAL"].map((word) => (
              <Reveal key={word}>
                <h2 className="font-megum text-[9vw] leading-none tracking-[0.15em] whitespace-nowrap text-white md:text-[8vw] md:tracking-[0.2em] lg:text-[7vw] xl:text-[6.5vw] xl:tracking-[0.25em] 2xl:text-[100px]">
                  {word}
                </h2>
              </Reveal>
            ))}
          </div>
        </section>
        <Advantage />
        <section
          aria-label="Partners"
          className="partners w-full border-t border-white/10 bg-black py-12 md:py-16"
        >
          <p className="mb-6 h-6 text-center font-mechano text-[9px] tracking-[0.5em] text-accent md:mb-8">
            PARTNERS
          </p>
          <div className="relative mx-auto max-w-[1600px] overflow-hidden py-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-accent/40 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent/40">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-black to-transparent" />
            <div className="partner-track">
              {[0, 1].map((copy) => (
                <div className="flex" key={copy} aria-hidden={copy === 1}>
                  {partners.map((partner) => (
                    <div
                      key={partner}
                      className="flex shrink-0 items-center justify-center border-x border-accent/20 px-8 py-3 md:px-12"
                    >
                      <span className="font-mechano text-[7px] tracking-[0.5em] whitespace-nowrap text-white md:text-[9px]">
                        {partner}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="careers"
          className="w-full border-t border-border bg-background"
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden md:aspect-video">
            <Video
              src="/videos/join_askari-4.mp4"
              poster="/images/mission.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute right-0 bottom-0 left-0 z-[2] h-[65%] backdrop-blur-sm"
              style={{
                maskImage: "linear-gradient(to top, black 30%, transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[3]"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, transparent 75%)",
              }}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-10 md:pb-16">
              <p className="mb-6 text-center font-megum text-xl leading-[1.3] tracking-[0.1em] text-white uppercase md:text-3xl md:leading-9 md:tracking-[0.2em]">
                Come build the future of defense with us.
              </p>
              <Link href="/join" className="accent-button">
                <span>JOIN THE MISSION</span>
              </Link>
            </div>
          </div>
        </section>
        <Press />
      </main>
      <Footer />
    </>
  )
}
