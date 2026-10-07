"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Pause, Play, X } from "lucide-react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { ContactDialog } from "./contact-dialog"

const ContactContext = createContext<(product?: string) => void>(() => {})
export const useContact = () => useContext(ContactContext)
const navigation = [
  ["HOME", "home"],
  ["MISSION", "mission"],
  ["ARMORY", "arsenal"],
  ["ADVANTAGE", "advantage"],
  ["CAREERS", "careers"],
  ["PRESS", "press"],
]
const sectionLabels: Record<string, string> = {
  home: "OVERVIEW",
  mission: "MISSION",
  arsenal: "ARMORY",
  winter: "ARMORY",
  advantage: "ADVANTAGE",
  careers: "CAREERS",
  press: "PRESS",
  footer: "FOOTER",
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [contact, setContact] = useState<{
    product?: string
    returnFocus: HTMLElement | null
  } | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState("home")
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const openContact = useCallback(
    (
      product?: string,
      returnFocus = document.activeElement as HTMLElement | null,
    ) =>
      setContact({
        product,
        returnFocus,
      }),
    [],
  )
  const closeContact = useCallback(() => setContact(null), [])
  const home = pathname === "/"
  const showHud = (!home || scrolled) && !hidden

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7)
      const height = document.documentElement.scrollHeight - innerHeight
      setProgress(height > 0 ? window.scrollY / height : 0)
      let current = "home"
      for (const id of Object.keys(sectionLabels)) {
        const section = document.getElementById(id)
        if (
          section &&
          section.getBoundingClientRect().top <= innerHeight * 0.35
        )
          current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [pathname])

  useEffect(() => {
    if (!menu) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false)
    }
    window.addEventListener("keydown", close)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", close)
    }
  }, [menu])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.5
    if (audio.paused) await audio.play().catch(() => {})
    else audio.pause()
  }
  const label = home
    ? sectionLabels[active]
    : pathname.startsWith("/press/")
      ? "ARTICLE"
      : pathname === "/join"
        ? "CAREERS"
        : pathname.slice(1).toUpperCase()

  return (
    <ContactContext.Provider value={openContact}>
      <a
        href="#main-content"
        tabIndex={menu || contact ? -1 : undefined}
        className="sr-only focus:not-sr-only focus:fixed focus:top-12 focus:left-12 focus:z-[300] focus:bg-background focus:p-4"
      >
        Skip to content
      </a>
      <div className="overflow-x-clip" inert={menu || Boolean(contact)}>
        {children}
      </div>
      <audio
        ref={audioRef}
        src="/audio/theme.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {(home || pathname === "/join" || pathname === "/values") && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-1/2 left-1 z-50 flex h-[50vh] -translate-y-1/2 gap-0.5 mix-blend-exclusion md:left-4 lg:left-8"
        >
          <div className="flex h-full flex-col justify-between font-mechano text-[4px] leading-none text-white/25 md:text-[7px]">
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i}>{i === 0 ? " 0" : `-${i}`}</span>
            ))}
          </div>
          <div className="relative flex h-full flex-col justify-between border-l border-white/15">
            {Array.from({ length: 11 }, (_, i) => (
              <i key={i} className="h-px w-1 bg-white/20 md:w-1.5" />
            ))}
            <i
              className="absolute -left-0.5 size-1 rounded-full bg-white/70 md:size-[5px]"
              style={{ top: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
      <div
        className={`pointer-events-none fixed inset-0 z-[100] mix-blend-exclusion transition-opacity duration-500 ${showHud ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!showHud}
        inert={!showHud || menu || Boolean(contact)}
      >
        <div className="hud-scanlines absolute inset-0" />
        <div className="absolute inset-[14px] border border-white/20 md:inset-6">
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((position) => (
            <i
              key={position}
              className={`absolute size-[18px] border-white/30 ${position}`}
            />
          ))}
        </div>
        <div className="absolute top-6 right-7 left-7 flex items-center justify-between md:top-[34px] md:right-[38px] md:left-[38px]">
          <div className="h-5 w-5 md:h-6 md:w-6" />
          <nav
            aria-label="Main navigation"
            className="pointer-events-auto hidden items-center gap-7 md:flex"
          >
            {navigation.map(([name, id]) => (
              <Link
                key={id}
                href={id === "home" ? "/" : `/#${id}`}
                className={`font-mechano text-[9px] tracking-[0.5em] ${home && active === id && id !== "home" ? "text-accent" : "text-white/60 hover:text-white"}`}
              >
                {name}
              </Link>
            ))}
          </nav>
          <button
            ref={menuButtonRef}
            className="pointer-events-auto text-white/70 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Menu size={16} />
          </button>
        </div>
        <div className="absolute right-7 bottom-6 left-7 flex items-center justify-between md:right-[38px] md:bottom-[34px] md:left-[38px]">
          <span className="font-mechano text-[9px] tracking-[0.4em] text-white/50">
            SEC: {label}
          </span>
          <div className="pointer-events-auto flex items-center gap-5">
            <button
              onClick={toggleMusic}
              aria-label={playing ? "Pause music" : "Play music"}
              className="text-white/50 hover:text-white/80"
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
            </button>
            <span className="flex items-center gap-1.5 font-mechano text-[9px] tracking-[0.3em] text-white/40">
              <i className="rec-dot size-1.5 rounded-full bg-red-500" />
              REC
            </span>
            <button
              onClick={() => openContact()}
              className="font-mechano text-[9px] tracking-[0.5em] text-white/60 hover:text-accent"
            >
              CONTACT
            </button>
          </div>
        </div>
      </div>
      {(!home || scrolled) && (
        <button
          onClick={() => setHidden(!hidden)}
          inert={menu || Boolean(contact)}
          aria-label={hidden ? "Show navigation" : "Hide navigation"}
          className="group fixed top-6 left-7 z-[102] md:top-[34px] md:left-[38px]"
        >
          <img
            src="/images/glyph_nav_white.png"
            alt="Askari"
            className="h-5 w-auto transition-opacity group-hover:opacity-0 md:h-6"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-accent opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              mask: 'url("/images/glyph_nav_white.png") center / contain no-repeat',
            }}
          />
        </button>
      )}
      <AnimatePresence
        onExitComplete={() => {
          if (!contact) menuButtonRef.current?.focus({ preventScroll: true })
        }}
      >
        {menu && (
          <motion.div
            role="dialog"
            onKeyDown={(event) => {
              if (event.key !== "Tab") return
              const elements =
                event.currentTarget.querySelectorAll<HTMLElement>(
                  "button, a[href]",
                )
              const first = elements[0]
              const last = elements[elements.length - 1]
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
              }
            }}
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-8 bg-background/95"
          >
            <button
              autoFocus
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              className="absolute top-5 right-5 text-white/70"
            >
              <X size={20} />
            </button>
            {navigation.map(([name, id]) => (
              <Link
                key={id}
                href={id === "home" ? "/" : `/#${id}`}
                onClick={() => setMenu(false)}
                className="font-mechano text-[10px] tracking-[0.5em] text-white hover:text-accent"
              >
                {name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenu(false)
                openContact(undefined, menuButtonRef.current)
              }}
              className="font-mechano text-[10px] tracking-[0.5em] text-white hover:text-accent"
            >
              CONTACT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grain-overlay" aria-hidden="true" />
      <AnimatePresence>
        {contact && (
          <ContactDialog
            product={contact.product}
            returnFocus={contact.returnFocus}
            onClose={closeContact}
          />
        )}
      </AnimatePresence>
    </ContactContext.Provider>
  )
}
