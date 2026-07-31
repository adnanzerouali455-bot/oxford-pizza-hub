import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { Promotions } from "@/components/promotions";
import { Reviews } from "@/components/reviews";
import { VideoSection } from "@/components/video-section";
import { RotatingDishes } from "@/components/rotating-dishes";
import { SiteFooter } from "@/components/site-footer";

const title = "Napolitano Berkane — Best Pizza, Delivered in 1 Hour";
const description =
  "Napolitano Berkane: wood-fired pizza delivered in under an hour. Get -30% off your second pizza, weekly promotions and free shipping.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(false);

  const add = () => {
    setCount((c) => c + 1);
    setBump(false);
    requestAnimationFrame(() => setBump(true));
    setTimeout(() => setBump(false), 700);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader count={count} bump={bump} />
      <main>
        <Hero />
        <MenuSection onAdd={add} />
        <Promotions />
        <Reviews />
        <VideoSection />
      </main>
      <SiteFooter />
    </div>
  );
}
