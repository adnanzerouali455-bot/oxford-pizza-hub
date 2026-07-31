import { useEffect, useState } from "react";
import { Flame, Beef, Leaf, Pizza } from "lucide-react";
import heroBg from "@/assets/hero-bg.mp4.asset.json";
import heroBgMobile from "@/assets/hero-bg-mobile.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import heroPizza from "@/assets/hero-pizza.png";
import { useReveal } from "@/hooks/use-reveal";

const features = [
  {
    icon: Flame,
    title: "Wood-Fired Cooking",
    description: "Authentic wood-fired cooking for a rich smoky flavor and perfect crust.",
  },
  {
    icon: Beef,
    title: "Tender & Juicy Products",
    description: "Our charcoal cooking locks in moisture, keeping every bite tender and juicy.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Prepared daily using fresh, carefully selected ingredients.",
  },
  {
    icon: Pizza,
    title: "Perfectly Cooked",
    description: "Crispy outside, soft inside, cooked to perfection in a traditional charcoal oven.",
  },
];

export function Hero() {
  const { ref: imageRef, visible: imageVisible } = useReveal<HTMLDivElement>(0.2);
  const { ref: featuresRef, visible: featuresVisible } = useReveal<HTMLDivElement>(0.15);
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
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
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

      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/55 via-background/45 to-background/85" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 md:px-8">
        {/* Main hero content: headline + pizza image */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-5xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl">
              Authentic Italian Taste{" "}
              <span className="text-gold" aria-label="Italy">
                🇮🇹
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-xl text-white/80 lg:mx-0">
              Wood-Fired Pizza • Pasta • Burgers.
            </p>
            <a
              href="#menu"
              className="btn-yellow mt-9 inline-flex items-center rounded-full px-9 py-4 text-lg"
            >
              GO TO THE MENU
            </a>
          </div>

          <div
            ref={imageRef}
            data-visible={imageVisible}
            className="reveal relative mx-auto aspect-square w-full max-w-lg"
          >
            <img
              src={heroPizza}
              alt="Premium wood-fired pizza"
              className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
            />
            {/* Warm glow behind the pizza */}
            <div
              aria-hidden="true"
              className="absolute inset-[10%] z-0 rounded-full bg-gold/15 blur-[80px]"
            />
          </div>
        </div>

        {/* Premium feature cards */}
        <div
          ref={featuresRef}
          className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {features.map((feature, i) => (
            <div
              key={feature.title}
              data-visible={featuresVisible}
              className="reveal group flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.08] hover:shadow-gold/10 sm:items-start sm:text-left"
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-gold transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/15 group-hover:shadow-[0_0_24px_-4px_rgba(255,193,7,0.35)]">
                <feature.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg tracking-wide text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
