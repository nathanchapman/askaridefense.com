import type { Metadata } from "next"
import Link from "next/link"
import articles from "@/data/articles.json"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = { title: "Press" }

export default function PressPage() {
  return (
    <>
      <main
        id="main-content"
        className="px-6 pt-[120px] pb-20 md:px-12 md:pt-40 md:pb-40"
      >
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <h1 className="mb-4 font-megum text-4xl tracking-[0.15em] md:text-7xl md:tracking-[0.3em]">
              IN THE PRESS
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-16 font-mechano text-[9px] tracking-[0.3em] text-muted md:mb-24 md:text-[11px] md:tracking-[0.5em]">
              COVERAGE &amp; FEATURES
            </p>
          </Reveal>
          <div className="border-t border-border">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.08}>
                <Link
                  href={article.external_url || `/press/${article.slug}`}
                  target={article.external_url ? "_blank" : undefined}
                  rel={article.external_url ? "noopener noreferrer" : undefined}
                  className="group block border-b border-border py-8 hover:bg-muted/5 md:py-10"
                >
                  <div className="mb-3 flex items-center gap-4 font-mechano text-[8px] tracking-[0.5em]">
                    <span className="text-muted">{article.date}</span>
                    <span className="text-muted/40">–</span>
                    <span className="text-accent">{article.name}</span>
                  </div>
                  <h2 className="font-mechano text-sm leading-tight tracking-[0.08em] uppercase group-hover:text-accent md:text-lg md:tracking-[0.12em]">
                    {article.topic}
                  </h2>
                  <p className="mt-3 max-w-2xl font-mechano text-[9px] leading-[1.8] tracking-[0.05em] text-muted uppercase md:text-[10px]">
                    {article.excerpt}
                  </p>
                  <p className="mt-4 font-mechano text-[8px] tracking-[0.5em] text-muted group-hover:text-foreground">
                    READ MORE {article.external_url ? "↗" : "→"}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
