import { Phone, ShoppingBasket } from "lucide-react";
import logo from "@/assets/napolitano-logo.jpg.asset.json";

const links = ["MENU", "SHARES", "REVIEWS", "CONTACTS"];

export function SiteHeader({ count, bump }: { count: number; bump: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 md:px-8">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={logo.url}
            alt="Napolitano Berkane logo"
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="font-display text-2xl leading-none">
            NAPOLITANO <span className="text-primary">BERKANE</span>
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-semibold tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Phone className="h-4 w-4 text-primary" />
          <div className="leading-tight">
            <a href="tel:+441865000000" className="block font-display text-lg">
              +44 1865 000 000
            </a>
            <button className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary">
              order a call back
            </button>
          </div>
        </div>

        <button className="ml-auto flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:border-primary md:ml-6">
          <ShoppingBasket className={`h-5 w-5 text-accent ${bump ? "bounce-cart" : ""}`} />
          <span className="font-display text-sm tracking-wider">
            BASKET {count === 0 ? "(empty)" : `(${count})`}
          </span>
        </button>
      </div>
    </header>
  );
}
