import { Facebook, Instagram, Twitter, Youtube, Pizza } from "lucide-react";

const socials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer id="contacts" className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 md:flex-row md:justify-between md:px-8">
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary">
            <Pizza className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl">
            OXFORD<span className="text-primary">PIZZA</span>
          </span>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          14 Cowley Road, Oxford · open daily 11:00 – 23:00 ·{" "}
          <a href="tel:+441865000000" className="hover:text-primary">
            +44 1865 000 000
          </a>
        </div>

        <div className="flex gap-3">
          {socials.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full bg-surface text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
