import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { InteractiveMenu } from "@/components/interactive-menu";
import { Promotions } from "@/components/promotions";
import { Reviews } from "@/components/reviews";
import { VideoSection } from "@/components/video-section";
import { RotatingDishes } from "@/components/rotating-dishes";
import { SiteFooter } from "@/components/site-footer";
import { BasketDrawer } from "@/components/basket-drawer";
import { CartProvider, useCart, type CartItem } from "@/lib/cart";

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
  const [basketOpen, setBasketOpen] = useState(false);

  return (
    <CartProvider>
      <PageContent onOpenBasket={() => setBasketOpen(true)} />
      <BasketDrawer open={basketOpen} onClose={() => setBasketOpen(false)} />
    </CartProvider>
  );
}

function PageContent({ onOpenBasket }: { onOpenBasket: () => void }) {
  const { addItem, count } = useCart();
  const [bump, setBump] = useState(false);

  const handleAdd = (item: Omit<CartItem, "quantity" | "id"> & { id?: string }) => {
    const cartItem: Omit<CartItem, "quantity"> = {
      id: item.id || `${item.name}-${item.sizeLabel}`,
      name: item.name,
      description: item.description,
      img: item.img,
      sizeLabel: item.sizeLabel,
      price: item.price,
    };
    addItem(cartItem);
    setBump(false);
    requestAnimationFrame(() => setBump(true));
    setTimeout(() => setBump(false), 700);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader count={count} bump={bump} onBasketClick={onOpenBasket} />
      <main>
        <Hero />
        <InteractiveMenu onAdd={handleAdd} />
        <RotatingDishes />
        <Promotions />
        <Reviews />
        <VideoSection />
      </main>
      <SiteFooter />
    </div>
  );
}
