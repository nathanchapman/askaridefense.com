import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import articles from "@/data/articles.json"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return {
    title:
      articles.find((article) => article.slug === slug)?.topic || "Article",
  }
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = articles.findIndex((article) => article.slug === slug)
  if (index < 0) notFound()
  const article = articles[index]
  if (article.external_url && !article.body.length)
    redirect(article.external_url)
  const next = articles[(index + 1) % articles.length]
  return (
    <>
      <main
        id="main-content"
        className="relative z-10 px-6 pt-[120px] pb-20 md:px-12 md:pt-40 md:pb-[120px]"
      >
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-8 flex items-center gap-4 font-mechano text-[8px] tracking-[0.5em]">
              <span className="text-accent">{article.name}</span>
              <span className="text-muted">{article.date}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-12 font-megum text-3xl leading-[1.1] tracking-[0.1em] uppercase md:mb-20 md:text-5xl md:tracking-[0.2em]">
              {article.topic}
            </h1>
          </Reveal>
          <div className="mb-12 h-0.5 w-16 bg-accent md:mb-16" />
          <div className="space-y-8 md:space-y-10">
            {article.body.map((paragraph, index) => (
              <Reveal key={index}>
                <p className="font-mechano text-[10px] leading-[2] tracking-[0.04em] text-muted uppercase md:text-xs md:leading-[2.4]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 md:mt-24">
              {[
                ["Robbie van Zyl", "robbie-vanzyl"],
                ["Marc van Zyl", "marc-van-zyl"],
                ["Ben Airdo", "benjaminairdo"],
              ].map(([name, profile]) => (
                <a
                  key={name}
                  href={`https://www.linkedin.com/in/${profile}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mechano text-[11px] tracking-[0.15em] text-accent uppercase hover:opacity-70 md:text-[13px]"
                >
                  {name}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-20 border-t border-border pt-10 md:mt-32">
              <span className="mb-4 block font-mechano text-[8px] tracking-[0.5em] text-muted">
                NEXT ARTICLE
              </span>
              <Link
                href={next.external_url || `/press/${next.slug}`}
                className="group block"
              >
                <h2 className="font-mechano text-sm leading-tight tracking-[0.08em] uppercase group-hover:text-accent md:text-lg">
                  {next.topic}
                </h2>
                <p className="mt-3 font-mechano text-[8px] tracking-[0.5em] text-accent">
                  {next.name} <span className="ml-4 text-muted">READ ↗</span>
                </p>
              </Link>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  )
}
