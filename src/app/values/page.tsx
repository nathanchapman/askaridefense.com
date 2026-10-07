import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { Video } from "@/components/video"
import origin from "@/data/values.json"

export const metadata: Metadata = { title: "Our Values" }
const values = [
  [
    "MISSION FIRST",
    "Every decision is measured against its impact on the warfighter.",
  ],
  ["MOVE FAST", "Speed is a feature. We ship in weeks, not quarters."],
  [
    "OWN THE OUTCOME",
    "No hand-offs. You build it, you ship it, you stand behind it.",
  ],
  [
    "HARD PROBLEMS",
    "We run toward complexity. Easy problems don't change the world.",
  ],
]

export default function Values() {
  return (
    <>
      <main id="main-content">
        <section className="relative flex h-[80vh] w-full items-end overflow-hidden">
          <Video
            src="/videos/nothing_background.mp4"
            poster="/images/values_first_frame.jpg"
            eager
            className="absolute inset-0 h-full w-full object-cover"
          />
          <h1 className="absolute bottom-10 left-6 font-megum text-[15vw] leading-[0.85] tracking-[0.02em] text-white mix-blend-exclusion md:bottom-14 md:left-12 md:text-[12vw]">
            OUR VALUES
          </h1>
        </section>
        <section className="border-t border-border px-6 py-[60px] md:px-12 md:py-[100px]">
          <div className="mx-auto max-w-[800px]">
            <Reveal>
              <span className="mb-8 block font-mechano text-[9px] tracking-[0.7em] text-accent">
                ORIGIN
              </span>
              <h2 className="mb-8 font-megum text-xl leading-[1.2] tracking-[0.15em] uppercase md:text-3xl">
                Founded by Builders
              </h2>
            </Reveal>
            <div className="flex flex-col gap-6">
              {origin.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <p className="font-mechano text-[10px] leading-[1.9] tracking-[0.15em] text-foreground/60 uppercase md:text-xs">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-border px-6 py-[60px] md:px-12 md:py-[100px]">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-16 pl-8 md:mb-20 md:pl-10">
              <span className="mb-8 block font-mechano text-[9px] tracking-[0.7em] text-accent">
                OUR VALUES
              </span>
            </Reveal>
            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
              {values.map(([title, body], index) => (
                <Reveal key={title} delay={index * 0.08} className="h-full">
                  <div className="flex h-full flex-col bg-background p-8 md:p-10">
                    <span className="mb-4 font-mechano text-[10px] tracking-[0.3em] text-accent/70">
                      0{index + 1}
                    </span>
                    <h3 className="mb-4 font-megum text-lg tracking-[0.2em] md:text-2xl">
                      {title}
                    </h3>
                    <p className="font-mechano text-[10px] leading-[1.9] tracking-[0.15em] text-foreground/50 uppercase md:text-xs">
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
