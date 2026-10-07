import Link from "next/link"
import articles from "@/data/articles.json"
import { Reveal } from "./reveal"

export function Press() {
  return (
    <section
      id="press"
      className="w-full border-t border-border bg-background px-6 py-20 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <h2 className="font-megum text-2xl tracking-[0.15em] md:text-5xl md:tracking-[0.3em]">
              IN THE NEWS
            </h2>
            <Link
              href="/press"
              className="font-mechano text-[8px] tracking-[0.5em] text-accent hover:opacity-70"
            >
              ALL ARTICLES →
            </Link>
          </div>
        </Reveal>
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.1} className="h-full">
              <Link
                href={article.external_url || `/press/${article.slug}`}
                target={article.external_url ? "_blank" : undefined}
                rel={article.external_url ? "noopener noreferrer" : undefined}
                className="group block h-full"
              >
                <article className="flex h-full min-h-[200px] min-w-[280px] snap-start flex-col gap-4 border border-border p-6 transition-colors hover:border-accent/40 md:min-w-0 md:p-8">
                  <span className="font-mechano text-[8px] tracking-[0.5em] text-accent">
                    {article.name}
                  </span>
                  <h3 className="font-mechano text-xs leading-snug tracking-[0.08em] uppercase transition-colors group-hover:text-accent md:text-sm">
                    {article.topic}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-4 font-mechano text-[7px] tracking-[0.4em] text-muted">
                    <span>{article.date}</span>
                    <span className="group-hover:text-foreground">
                      READ {article.external_url ? "↗" : "→"}
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
