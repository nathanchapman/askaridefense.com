import { Footer } from "./footer"
import { Reveal } from "./reveal"

type LegalContent = {
  intro: string | null
  sections: { title: string; paragraphs: string[]; bullets: string[] }[]
}

export function LegalPage({
  title,
  data,
  numbered = false,
}: {
  title: string
  data: LegalContent
  numbered?: boolean
}) {
  return (
    <>
      <main id="main-content">
        <section className="px-6 pt-[140px] pb-[60px] md:px-12 md:pt-[200px] md:pb-20">
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <span className="mb-6 block font-mechano text-[9px] tracking-[0.5em] text-accent/80">
                LEGAL
              </span>
              <h1 className="mb-4 font-megum text-3xl tracking-[0.3em] uppercase md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-6 font-mechano text-[10px] tracking-[0.2em] text-foreground/40">
                ASKARI DEFENSE, INC. – LAST UPDATED: APRIL 2026
              </p>
            </Reveal>
          </div>
        </section>
        {data.intro && (
          <section className="px-6 pb-[60px] md:px-12 md:pb-20">
            <Reveal className="mx-auto max-w-[800px]">
              <p className="text-sm leading-[1.9] text-foreground/60 md:text-base">
                {data.intro}
              </p>
            </Reveal>
          </section>
        )}
        <section className="px-6 pb-20 md:px-12 md:pb-[120px]">
          <div className="mx-auto flex max-w-[800px] flex-col gap-16 md:gap-20">
            {data.sections.map((section, index) => (
              <Reveal key={section.title}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-4">
                    {numbered && (
                      <span className="font-mechano text-[10px] tracking-[0.3em] text-accent/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <h2 className="font-megum text-lg tracking-[0.15em] uppercase md:text-xl">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-sm leading-[1.9] whitespace-pre-line text-foreground/60 md:text-base">
                    {section.paragraphs[0]}
                  </p>
                  {section.bullets.length > 0 && (
                    <ul className="mt-1 flex flex-col gap-2 pl-4">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-[1.9] text-foreground/60 md:text-base"
                        >
                          <i className="mt-[10px] size-1 shrink-0 rounded-full bg-accent/50" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.paragraphs.slice(1).map((paragraph, i) => (
                    <p
                      key={i}
                      className="mt-2 text-sm leading-[1.9] whitespace-pre-line text-foreground/60 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
