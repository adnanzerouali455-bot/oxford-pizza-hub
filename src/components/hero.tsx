import { useEffect, useState } from "react";
import heroPizza from "@/assets/hero-pizza.png";
import heroBg from "@/assets/hero-bg.mp4.asset.json";
import heroBgMobile from "@/assets/hero-bg-mobile.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import { useReveal } from "@/hooks/use-reveal";


const perks = [
  { label: "ONLY FRESH PRODUCTS", top: "2%", left: "0%" },
  { label: "DRINKS AS A GIFT", top: "30%", left: "76%" },
  { label: "FREE SHIPPING", top: "66%", left: "0%" },
  { label: "EXCLUSIVE RECIPES", top: "94%", left: "56%" },
];

export function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Respect data-saver and reduced-motion: stay on the poster image only.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (reduced || saveData) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(mobile ? heroBgMobile.url : heroBg.url);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroPoster.url})` }}
      />
      {videoSrc && (
        <video
          key={videoSrc}
          src={videoSrc}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-75"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/55 via-background/45 to-background/80" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            Authentic Italian Taste{" "}
            <span className="text-primary" aria-label="Italy">
              🇮🇹
            </span>
          </h1>
          <p className="mt-6 max-w-md text-xl text-muted-foreground">
            Wood-Fired Pizza • Pasta • Burgers.
          </p>
          <a
            href="#menu"
            className="btn-yellow mt-9 inline-flex items-center rounded-full px-9 py-4 text-lg"
          >
            GO TO THE MENU
          </a>
        </div>

        <div ref={ref} className="relative mx-auto w-full max-w-xl px-4 py-10 sm:px-16 sm:py-14">
          <img
            src={heroPizza}
            alt="Freshly baked pepperoni pizza from Oxford Pizza"
            width={1024}
            height={1024}
            className="relative z-0 w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
          />
          <svg
            viewBox="0 0 400 400"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M20 40 C 160 10, 330 90, 340 150 C 350 220, 60 230, 30 290 C 5 340, 210 360, 320 350"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              className="dashed-path"
              opacity={visible ? 0.7 : 0}
              style={{ transition: "opacity .8s ease" }}
            />
          </svg>

          {perks.map((p, i) => (
            <div
              key={p.label}
              data-visible={visible}
              className="reveal absolute z-30 flex items-center gap-2"
              style={{ top: p.top, left: p.left, transitionDelay: `${300 + i * 220}ms` }}
            >
              <span className="h-3 w-3 shrink-0 rounded-full bg-accent ring-4 ring-accent/25" />
              <span className="rounded-full bg-surface/90 px-3 py-1 font-display text-xs tracking-widest whitespace-nowrap sm:text-sm">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
