import Link from "next/link"

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <h1 className="font-megum text-6xl tracking-[0.2em]">404</h1>
      <p className="font-mechano text-xs tracking-[0.3em] text-muted">
        PAGE NOT FOUND
      </p>
      <Link
        href="/"
        className="font-mechano text-[10px] tracking-[0.4em] text-accent"
      >
        RETURN HOME →
      </Link>
    </main>
  )
}
