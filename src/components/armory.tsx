"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { useContact } from "./site-shell"
import { Reveal } from "./reveal"
import { Video } from "./video"

const ClassifiedModel = dynamic(() => import("./classified-model"), {
  ssr: false,
})
const products = [
  {
    name: "RIFT ALPHA",
    subtitle: "FULLY 3D-PRINTED DRONE INTERCEPTOR",
    descriptors:
      "Man-portable · Fully autonomous interception · 3D-printed airframe",
    media: "/videos/rift-alpha-placeholder.mp4",
    model: "/videos/fin_alpha.mp4",
    specs: ["HAND + GROUND + BOX", "2 KM", "GROUP 1 & 2"],
  },
  {
    name: "RIFT BRAVO",
    subtitle: "FOLDABLE MAN-PACKABLE INTERCEPTOR",
    descriptors:
      "Hand-launched · Ultra-compact · Fully autonomous interception",
    media: "/images/rift-bravo-placeholder.png",
    model: "/videos/bravo_1.mp4",
    specs: ["HAND + TUBE", "1 KM", "GROUP 1"],
  },
  {
    name: "[CLASSIFIED]",
    subtitle: "NEXT-GENERATION INTERCEPT SYSTEM",
    descriptors: "████████ · ████████ · ████████",
    media: "",
    model: "",
    specs: ["██████", "██████", "██████"],
  },
]

function Product({
  product,
  index,
}: {
  product: (typeof products)[number]
  index: number
}) {
  const [model, setModel] = useState(false)
  const openContact = useContact()
  const classified = !product.media
  const image = product.media.endsWith(".png")
  return (
    <Reveal delay={index * 0.08}>
      <article
        aria-label={product.name}
        className={`w-full border-t border-[#0b0a01]/10 ${classified ? "border-b" : ""}`}
      >
        <div className="mx-auto flex min-h-[40vh] max-w-[1600px] flex-col items-stretch md:min-h-[50vh] md:flex-row">
          <div className="relative h-[35vh] w-full overflow-hidden md:h-auto md:w-1/2">
            {classified ? (
              <>
                <ClassifiedModel />
                <span className="pointer-events-none absolute inset-0 flex -rotate-15 items-center justify-center font-mechano text-[40px] tracking-[0.5em] whitespace-nowrap text-[#0b0a01]/4 select-none md:text-[70px]">
                  CLASSIFIED
                </span>
              </>
            ) : (
              <>
                <div
                  className={`absolute inset-0 transition-opacity duration-[1200ms] ${model ? "opacity-0" : "opacity-100"}`}
                >
                  {image ? (
                    <img
                      src={product.media}
                      alt="Soldier carrying the Rift Bravo interceptor"
                      className="h-full w-full object-cover object-right"
                    />
                  ) : (
                    <Video
                      src={product.media}
                      poster="/images/rift-alpha-poster.jpg"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                {model && (
                  <div className="absolute inset-0 bg-[#f2f2f0]">
                    <Video
                      src={product.model}
                      poster={
                        index === 0
                          ? "/images/alpha-model-poster.jpg"
                          : "/images/bravo-model-poster.jpg"
                      }
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="relative flex w-full flex-col justify-center px-6 py-8 md:w-1/2 md:px-12 md:py-12 lg:px-16">
            <span className="mb-4 block font-mechano text-[9px] tracking-[0.7em] text-accent">
              {String(index + 1).padStart(2, "0")} – SYSTEM
            </span>
            <h3 className="font-megum text-3xl leading-none tracking-[0.1em] text-[#0b0a01] md:text-5xl md:tracking-[0.2em] lg:text-6xl">
              {product.name}
            </h3>
            <p className="mt-3 font-brixela text-[10px] tracking-[0.15em] text-[#0b0a01]/50 uppercase md:text-xs md:tracking-[0.2em]">
              {product.subtitle}
            </p>
            <p className="mt-1 font-brixela text-[9px] tracking-[0.1em] text-[#0b0a01]/30 uppercase md:text-[10px]">
              {product.descriptors}
            </p>
            {!classified && (
              <>
                <div
                  className="mt-3 flex self-start"
                  role="group"
                  aria-label={`${product.name} view`}
                >
                  {[false, true].map((value) => (
                    <button
                      key={String(value)}
                      aria-pressed={model === value}
                      onClick={() => setModel(value)}
                      className={`border px-3 py-1.5 font-mechano text-[8px] tracking-[0.3em] ${value ? "-ml-px" : ""} ${model === value ? "relative z-10 border-accent bg-accent/10 text-[#0b0a01]" : "border-[#0b0a01]/15 text-[#0b0a01]/30 hover:text-[#0b0a01]/60"}`}
                    >
                      {value ? "MODEL" : image ? "IMAGE" : "VIDEO"}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => openContact(product.name)}
                  className="mt-3 self-start border border-[#0b0a01]/15 bg-[#0b0a01] px-4 py-2 font-mechano text-[8px] tracking-[0.3em] text-[#f2f2f0] hover:opacity-80"
                >
                  LAUNCH {product.name}
                </button>
                {index === 1 && (
                  <div aria-hidden="true" className="mt-4 h-[30px]" />
                )}
              </>
            )}
            <dl className="mt-6 space-y-3 md:mt-8">
              {product.specs.map((value, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between border-b border-[#0b0a01]/10 pb-2"
                >
                  <dt className="font-mechano text-[7px] tracking-[0.5em] text-[#0b0a01]/30 md:text-[8px]">
                    {["LAUNCH", "RANGE", "TARGET"][i]}
                  </dt>
                  <dd
                    className={`font-mechano text-[10px] tracking-[0.2em] md:text-xs ${classified ? "bg-[#0b0a01]/5 px-2 text-[#0b0a01]/10" : "text-[#0b0a01]"}`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            {classified && (
              <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-15 font-mechano text-[60px] tracking-[0.5em] whitespace-nowrap text-[#0b0a01]/2 select-none md:text-[100px]">
                CLASSIFIED
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Armory() {
  return (
    <section id="arsenal" className="relative w-full bg-[#f2f2f0]">
      <div className="mx-auto max-w-[1600px] px-6 pt-16 pb-4 md:px-12 md:pt-24 md:pb-8">
        <Reveal>
          <h2 className="font-megum text-[15vw] leading-[0.85] tracking-[0.02em] text-[#0b0a01] md:text-[12vw]">
            THE ARMORY
          </h2>
        </Reveal>
      </div>
      {products.map((product, index) => (
        <Product key={product.name} product={product} index={index} />
      ))}
    </section>
  )
}
