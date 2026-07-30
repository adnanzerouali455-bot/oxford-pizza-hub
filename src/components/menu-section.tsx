import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import p1 from "@/assets/pizza-1.png";
import p2 from "@/assets/pizza-2.png";
import p3 from "@/assets/pizza-3.png";
import p4 from "@/assets/pizza-4.png";
import p5 from "@/assets/pizza-5.png";
import p6 from "@/assets/pizza-6.png";

type Product = { name: string; ingredients: string; price: number; img: string };

const tabs = ["PIZZA", "APPETIZER", "DRINKS", "DESSERTS"] as const;

const catalog: Record<string, Product[][]> = {
  PIZZA: [
    [
      { name: "Margherita", ingredients: "Tomato, mozzarella, fresh basil, olive oil", price: 9.5, img: p1 },
      { name: "Quattro Formaggi", ingredients: "Mozzarella, gorgonzola, taleggio, parmesan", price: 12.9, img: p2 },
      { name: "Prosciutto Funghi", ingredients: "Ham, mushrooms, mozzarella, oregano", price: 11.4, img: p3 },
      { name: "Frutti di Mare", ingredients: "Prawns, mussels, garlic, parsley", price: 14.2, img: p4 },
      { name: "BBQ Chicken", ingredients: "Chicken, BBQ sauce, spring onion, cheddar", price: 12.0, img: p5 },
      { name: "Diavola", ingredients: "Spicy salami, chilli, mozzarella, basil", price: 11.9, img: p6 },
    ],
    [
      { name: "Napoli", ingredients: "Anchovies, capers, olives, tomato", price: 10.8, img: p1 },
      { name: "Truffle Bianca", ingredients: "Truffle cream, mozzarella, thyme", price: 15.5, img: p2 },
      { name: "Capricciosa", ingredients: "Ham, artichokes, mushrooms, olives", price: 12.6, img: p3 },
      { name: "Gamberi Piccanti", ingredients: "Prawns, chilli, lemon zest, rocket", price: 15.0, img: p4 },
      { name: "Smoky Ranch", ingredients: "Chicken, bacon, ranch, red onion", price: 12.9, img: p5 },
      { name: "Pepperoni Classic", ingredients: "Double pepperoni, mozzarella, tomato", price: 11.2, img: p6 },
    ],
  ],
  APPETIZER: [
    [
      { name: "Garlic Bread", ingredients: "Sourdough, garlic butter, parsley", price: 4.5, img: p2 },
      { name: "Bruschetta", ingredients: "Tomato, basil, olive oil, ciabatta", price: 5.2, img: p1 },
      { name: "Mozzarella Sticks", ingredients: "Breaded mozzarella, marinara dip", price: 6.0, img: p3 },
      { name: "Chicken Wings", ingredients: "Six wings, smoky glaze, celery", price: 7.4, img: p5 },
      { name: "Olive Mix", ingredients: "Marinated olives, herbs, lemon", price: 3.9, img: p4 },
      { name: "Caprese Salad", ingredients: "Buffalo mozzarella, tomato, basil", price: 6.8, img: p6 },
    ],
    [
      { name: "Arancini", ingredients: "Risotto balls, mozzarella heart", price: 6.5, img: p2 },
      { name: "Focaccia", ingredients: "Rosemary, sea salt, olive oil", price: 4.8, img: p1 },
      { name: "Calamari", ingredients: "Crispy squid, aioli, lemon", price: 8.2, img: p4 },
      { name: "Nduja Croquettes", ingredients: "Spicy sausage, potato, herbs", price: 7.0, img: p6 },
      { name: "Rocket Parmesan", ingredients: "Rocket, parmesan shavings, balsamic", price: 5.4, img: p3 },
      { name: "Loaded Fries", ingredients: "Fries, cheese sauce, bacon bits", price: 6.2, img: p5 },
    ],
  ],
  DRINKS: [
    [
      { name: "Classic Cola", ingredients: "Chilled 0.5L bottle", price: 2.4, img: p1 },
      { name: "Lemonade", ingredients: "Fresh lemon, mint, sparkling water", price: 3.2, img: p2 },
      { name: "Orange Juice", ingredients: "Freshly squeezed, 0.3L", price: 3.6, img: p4 },
      { name: "Iced Latte", ingredients: "Espresso, milk, ice", price: 3.8, img: p3 },
      { name: "Craft Lager", ingredients: "Local Oxford brewery, 0.33L", price: 4.6, img: p5 },
      { name: "Still Water", ingredients: "Mineral water, 0.5L", price: 1.8, img: p6 },
    ],
    [
      { name: "Berry Smoothie", ingredients: "Strawberry, blueberry, yoghurt", price: 4.9, img: p2 },
      { name: "Espresso", ingredients: "Double shot, Italian roast", price: 2.2, img: p3 },
      { name: "Ginger Ale", ingredients: "Spiced ginger, lime", price: 3.0, img: p1 },
      { name: "House Red", ingredients: "Chianti, glass 175ml", price: 5.5, img: p6 },
      { name: "House White", ingredients: "Pinot Grigio, glass 175ml", price: 5.5, img: p4 },
      { name: "Peach Iced Tea", ingredients: "Black tea, peach, lemon", price: 3.4, img: p5 },
    ],
  ],
  DESSERTS: [
    [
      { name: "Tiramisu", ingredients: "Mascarpone, coffee, cocoa", price: 5.8, img: p2 },
      { name: "Nutella Pizza", ingredients: "Sweet dough, nutella, hazelnuts", price: 7.5, img: p1 },
      { name: "Panna Cotta", ingredients: "Vanilla cream, berry coulis", price: 5.2, img: p4 },
      { name: "Cannoli", ingredients: "Ricotta, candied orange, pistachio", price: 4.9, img: p3 },
      { name: "Lemon Sorbet", ingredients: "Sicilian lemon, mint leaf", price: 4.2, img: p6 },
      { name: "Brownie", ingredients: "Dark chocolate, sea salt, ice cream", price: 5.6, img: p5 },
    ],
    [
      { name: "Affogato", ingredients: "Vanilla gelato, hot espresso", price: 4.7, img: p3 },
      { name: "Ricotta Cake", ingredients: "Ricotta, lemon, almond crumb", price: 5.4, img: p2 },
      { name: "Pistachio Gelato", ingredients: "Sicilian pistachio, two scoops", price: 4.4, img: p1 },
      { name: "Chocolate Calzone", ingredients: "Folded dough, chocolate, banana", price: 7.8, img: p6 },
      { name: "Berry Pavlova", ingredients: "Meringue, cream, seasonal berries", price: 6.1, img: p4 },
      { name: "Honey Pastry", ingredients: "Filo, walnut, honey syrup", price: 4.8, img: p5 },
    ],
  ],
};

export function MenuSection({ onAdd }: { onAdd: () => void }) {
  const [tab, setTab] = useState<string>("PIZZA");
  const [page, setPage] = useState(0);
  const pages = catalog[tab];
  const items = pages[page];

  const switchTab = (t: string) => {
    setTab(t);
    setPage(0);
  };

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <h2 className="font-display text-5xl md:text-6xl">
        OUR <span className="text-primary">MENU</span>
      </h2>

      <div className="mt-8 flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            className={`rounded-full px-6 py-2.5 font-display text-lg tracking-widest transition-all duration-300 ${
              tab === t
                ? "scale-105 bg-primary text-primary-foreground"
                : "bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div key={`${tab}-${page}`} className="mt-10 grid animate-[fade-in_.45s_ease-out] gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.name}
            className="flex items-center gap-5 rounded-3xl bg-surface p-5 transition-colors hover:bg-surface-2"
          >
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              width={700}
              height={700}
              className="h-28 w-28 shrink-0 rounded-full object-cover sm:h-32 sm:w-32"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-2xl">{item.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.ingredients}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="font-display text-2xl text-accent">£{item.price.toFixed(2)}</span>
                <button
                  onClick={onAdd}
                  className="btn-yellow rounded-full px-5 py-2.5 text-sm"
                >
                  GO TO BASKET
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          aria-label="Previous page"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="group grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary disabled:opacity-30"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        </button>
        <span className="font-display text-xl">
          {page + 1} <span className="text-muted-foreground">/ {pages.length}</span>
        </span>
        <button
          aria-label="Next page"
          onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
          disabled={page === pages.length - 1}
          className="group grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary disabled:opacity-30"
        >
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
