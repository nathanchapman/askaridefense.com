"use client"

import { motion } from "motion/react"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function ContactDialog({
  product,
  returnFocus,
  onClose,
}: {
  product?: string
  returnFocus: HTMLElement | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState(
    product ? `I'm interested in ${product}. ` : "",
  )

  useEffect(() => {
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    ref.current
      ?.querySelector<HTMLInputElement>("input")
      ?.focus({ preventScroll: true })
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key !== "Tab") return
      const elements = ref.current?.querySelectorAll<HTMLElement>(
        "button, input, textarea, a[href]",
      )
      if (!elements?.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", handleKey)
      returnFocus?.focus({ preventScroll: true })
    }
  }, [onClose, returnFocus])

  const fieldClass =
    "border-b border-white/10 bg-transparent py-3 font-mechano text-[11px] tracking-[0.1em] text-white uppercase outline-none placeholder:text-white/20 focus:border-accent"

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-end justify-center md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div
        className="modal-backdrop absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="relative z-[151] w-full md:max-w-[440px]"
        initial={{ y: 24, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 24, scale: 0.97 }}
      >
        {[
          "-top-3 -left-3 border-t border-l",
          "-top-3 -right-3 border-t border-r",
          "-bottom-3 -left-3 border-b border-l",
          "-bottom-3 -right-3 border-b border-r",
        ].map((position) => (
          <i
            key={position}
            aria-hidden="true"
            className={`absolute hidden size-6 border-white/20 md:block ${position}`}
          />
        ))}
        <div className="contact-dialog md:p-10">
          <div className="flex justify-center pt-3 pb-1 md:hidden">
            <div className="h-1 w-10 rounded-full bg-muted/30" />
          </div>
          <div className="flex items-center justify-between px-8 pt-6 pb-6 md:mb-10 md:p-0">
            <h2
              id="contact-title"
              className="font-mechano text-[9px] tracking-[0.5em] text-white/40"
            >
              {product ? `LAUNCH ${product}` : "CONTACT"}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close contact"
              className="text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
            className="flex flex-col gap-6 px-8 pb-8 md:p-0"
          >
            <label className="flex flex-col gap-2">
              <span className="font-mechano text-[8px] tracking-[0.4em] text-white/40">
                NAME
              </span>
              <input
                name="name"
                autoComplete="name"
                required
                className={fieldClass}
                placeholder="YOUR NAME"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mechano text-[8px] tracking-[0.4em] text-white/40">
                EMAIL
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClass}
                placeholder="YOUR@EMAIL.COM"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mechano text-[8px] tracking-[0.4em] text-white/40">
                MESSAGE
              </span>
              <textarea
                name="message"
                required
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`${fieldClass} resize-none`}
                placeholder="HOW CAN WE HELP?"
              />
            </label>
            <button type="submit" className="accent-button mt-4 w-full">
              <span>{product ? "REQUEST LAUNCH" : "SEND MESSAGE"}</span>
            </button>
            {sent && (
              <p
                role="status"
                className="font-mechano text-[10px] leading-6 tracking-wider text-accent"
              >
                This is a local demo. Your message has not been sent.
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
