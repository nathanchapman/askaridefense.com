import Link from "next/link"

const columns = [
  {
    title: "COMPANY",
    links: [
      ["Mission", "/#mission"],
      ["Armory", "/#arsenal"],
      ["Advantage", "/#advantage"],
      ["Press", "/press"],
    ],
  },
  {
    title: "WORK WITH US",
    links: [
      ["Values", "/values"],
      ["Careers", "/join"],
      [
        "Early Career GNC Engineer",
        "https://ats.rippling.com/askaridefense/jobs",
      ],
      ["Senior GNC Engineer", "https://ats.rippling.com/askaridefense/jobs"],
    ],
  },
  {
    title: "SOCIAL",
    links: [
      ["X", "https://x.com/AskariDefense"],
      ["LinkedIn", "https://www.linkedin.com/company/askaridefense/"],
    ],
  },
]

export function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pt-20 pb-10 md:px-12 md:pt-[120px] md:pb-16">
        <img
          src="/images/whiteopen.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-6 bottom-16 h-auto w-[200px] opacity-[0.04] invert md:right-12 md:bottom-20 md:w-[300px]"
        />
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-0">
          <div className="flex flex-col gap-4 md:w-1/3">
            <Link
              href="/"
              className="font-megum text-lg tracking-[0.3em] md:text-xl"
            >
              ASKARI
            </Link>
            <img
              src="/images/us_flag_bw.svg"
              alt="American flag"
              className="h-auto w-7 opacity-70 md:w-8"
            />
          </div>
          <div className="flex flex-wrap gap-12 md:gap-20 lg:gap-28">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h2 className="mb-3 font-mechano text-[9px] tracking-[0.5em] text-foreground/40">
                  {column.title}
                </h2>
                {column.links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("https") ? "_blank" : undefined}
                    rel={
                      href.startsWith("https")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-mechano text-[10px] tracking-[0.15em] text-foreground/60 uppercase hover:text-accent"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-foreground/10 pt-8 md:mt-20 md:flex-row">
          <div className="flex flex-col gap-2">
            <span className="font-mechano text-[8px] tracking-[0.3em] text-foreground/25">
              COPYRIGHT © 2026 ASKARI DEFENSE, INC.
            </span>
            <div className="mt-2 flex flex-col gap-1.5 font-mechano text-[9px] tracking-[0.1em] text-foreground/40 uppercase">
              <Link href="/privacy" className="hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/tou" className="hover:text-accent">
                Terms Of Use
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="font-mechano text-[9px] tracking-[0.5em] text-foreground/40">
              CONTACT
            </span>
            <a
              href="mailto:info@askaridefense.com"
              className="mt-1 font-mechano text-[10px] tracking-[0.15em] text-foreground/60 uppercase hover:text-accent"
            >
              info@askaridefense.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
