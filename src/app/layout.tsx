import type { Metadata } from "next"
import localFont from "next/font/local"
import { SiteShell } from "@/components/site-shell"
import "./globals.css"

const megum = localFont({
  src: "../../public/fonts/Megum.otf",
  variable: "--font-megum-local",
  adjustFontFallback: false,
  display: "swap",
})
const mechano = localFont({
  src: "../../public/fonts/CAMechano_v1010-Wide.otf",
  variable: "--font-mechano-local",
  adjustFontFallback: false,
  display: "swap",
})
const brixela = localFont({
  src: "../../public/fonts/Brixela-Regular.otf",
  variable: "--font-brixela-local",
  adjustFontFallback: false,
  display: "swap",
})
const inter = localFont({
  src: "../../public/fonts/Inter-Regular.ttf",
  variable: "--font-inter-local",
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "Askari", template: "%s | Askari" },
  description: "Enter the world of Askari.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon-white.png" },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${megum.variable} ${mechano.variable} ${brixela.variable} ${inter.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
