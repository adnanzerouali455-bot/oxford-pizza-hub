import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import p1 from "@/assets/pizza-1.png";
import p2 from "@/assets/pizza-2.png";
import p3 from "@/assets/pizza-3.png";
import p4 from "@/assets/pizza-4.png";
import p5 from "@/assets/pizza-5.png";
import p6 from "@/assets/pizza-6.png";
import burgerImg from "@/assets/burger-1.png";
import tacosImg from "@/assets/tacos-1.png";
import heroPizza from "@/assets/hero-pizza.png";

type Item = {
  name: string;
  desc?: string;
  img: string;
  prices: { label: string; price: number }[];
};

type Category = { id: string; label: string; icon: string; items: Item[] };

const pizzaImgs = [p1, p2, p3, p4, p5, p6];
const pz = (i: number) => pizzaImgs[i % pizzaImgs.length];

const categories: Category[] = [
  {
    id: "hamburger",
    label: "HAMBURGER",
    icon: "🍔",
    items: [
      { name: "Cheeseburger", img: burgerImg, prices: [{ label: "Standard", price: 37 }, { label: "Menu", price: 47 }] },
      { name: "Double Cheeseburger", img: burgerImg, prices: [{ label: "Standard", price: 47 }, { label: "Menu", price: 67 }] },
      {
        name: "Pepper Burger",
        desc: "Viande hachée, sauce poivre, cheddar, oignon cuit",
        img: burgerImg,
        prices: [{ label: "Standard", price: 47 }, { label: "Menu", price: 67 }],
      },
      {
        name: "Chicken Burger",
        desc: "Poulet frit, cheddar, sauce Biggy",
        img: burgerImg,
        prices: [{ label: "Standard", price: 37 }, { label: "Menu", price: 47 }],
      },
      {
        name: "Bacon Burger",
        desc: "Viande hachée, jambon fumé, oignon caramélisé, barbecue, cheddar",
        img: burgerImg,
        prices: [{ label: "Standard", price: 45 }, { label: "Menu", price: 67 }],
      },
      {
        name: "Burger Presto",
        desc: "Steak kefta, œuf, kefta, mozzarella, poivron, oignon caramélisé, barbecue, cheddar",
        img: burgerImg,
        prices: [{ label: "Standard", price: 50 }, { label: "Menu", price: 67 }],
      },
    ],
  },
  {
    id: "pizza",
    label: "PIZZA",
    icon: "🍕",
    items: [
      { name: "Margherita", img: pz(0), prices: [{ label: "M", price: 25 }, { label: "L", price: 35 }] },
      { name: "Kefta", img: pz(1), prices: [{ label: "M", price: 35 }, { label: "L", price: 67 }] },
      { name: "Poulet", img: pz(2), prices: [{ label: "M", price: 35 }, { label: "L", price: 67 }] },
      { name: "Poulet Curry", img: pz(3), prices: [{ label: "M", price: 37 }, { label: "L", price: 67 }] },
      { name: "Végétarienne", img: pz(4), prices: [{ label: "M", price: 37 }, { label: "L", price: 67 }] },
      { name: "Mixtes", img: pz(5), prices: [{ label: "M", price: 37 }, { label: "L", price: 67 }] },
      {
        name: "4 Fromages",
        desc: "Roquefort, chèvre, parmesan, mozzarella",
        img: pz(1),
        prices: [{ label: "M", price: 47 }, { label: "L", price: 67 }],
      },
      {
        name: "Fruit de mer",
        desc: "Crevettes, calmars, mozzarella, pesto",
        img: pz(3),
        prices: [{ label: "M", price: 47 }, { label: "L", price: 70 }],
      },
      { name: "Thon", desc: "Thon, mozzarella", img: pz(4), prices: [{ label: "M", price: 45 }, { label: "L", price: 67 }] },
      {
        name: "4 Saisons",
        desc: "Jambon, champignons, olives, thon, oignon",
        img: pz(2),
        prices: [{ label: "M", price: 47 }, { label: "L", price: 67 }],
      },
      {
        name: "Chèvre miel",
        desc: "Chèvre, miel, mozzarella, noix",
        img: pz(5),
        prices: [{ label: "M", price: 47 }, { label: "L", price: 67 }],
      },
      {
        name: "Savoyarde",
        desc: "Poulet, pomme de terre, oignons caramélisés, mozza, jambon dinde",
        img: pz(0),
        prices: [{ label: "M", price: 47 }, { label: "L", price: 67 }],
      },
    ],
  },
  {
    id: "tacos",
    label: "BURRITO & TACOS",
    icon: "🌮",
    items: [
      { name: "Kefta", img: tacosImg, prices: [{ label: "100g", price: 35 }, { label: "150g (M)", price: 45 }, { label: "200g (L)", price: 65 }] },
      { name: "Poulet", img: tacosImg, prices: [{ label: "100g", price: 35 }, { label: "150g (M)", price: 45 }, { label: "200g (L)", price: 65 }] },
      { name: "Poulet Curry", img: tacosImg, prices: [{ label: "100g", price: 40 }, { label: "150g (M)", price: 45 }, { label: "200g (L)", price: 65 }] },
      { name: "Mixte", img: tacosImg, prices: [{ label: "100g", price: 35 }, { label: "150g (M)", price: 45 }, { label: "200g (L)", price: 70 }] },
      { name: "Fruit de mer", img: tacosImg, prices: [{ label: "100g", price: 45 }, { label: "150g (M)", price: 55 }, { label: "200g (L)", price: 75 }] },
      { name: "Savoyarde", img: tacosImg, prices: [{ label: "100g", price: 45 }, { label: "150g (M)", price: 55 }, { label: "200g (L)", price: 70 }] },
    ],
  },
  {
    id: "supplements",
    label: "SUPPLÉMENTS",
    icon: "➕",
    items: [
      { name: "Fromage extra fondant", img: pz(1), prices: [{ label: "Extra", price: 5 }] },
      { name: "Viande ou poulet", img: burgerImg, prices: [{ label: "Extra", price: 10 }] },
      { name: "Bacon grillé", img: burgerImg, prices: [{ label: "Extra", price: 9 }] },
      { name: "Double portion frites", img: pz(5), prices: [{ label: "Extra", price: 10 }] },
      { name: "Gratiné fromage", img: pz(2), prices: [{ label: "Extra", price: 10 }] },
      { name: "Sauce", img: pz(3), prices: [{ label: "Extra", price: 3 }] },
      { name: "Œuf", img: pz(4), prices: [{ label: "Extra", price: 5 }] },
      {
        name: "Tacos Gratiné",
        desc: "Dinde & fromage par dessus",
        img: tacosImg,
        prices: [{ label: "Petit", price: 10 }, { label: "Grand", price: 15 }],
      },
    ],
  },
];

const popular = [
  { name: "Burger Presto", price: 50, img: burgerImg },
  { name: "Pizza 4 Fromages", price: 47, img: heroPizza },
  { name: "Tacos Savoyarde", price: 45, img: tacosImg },
  { name: "Pizza Fruit de mer", price: 47, img: pz(3) },
  { name: "Chicken Burger", price: 37, img: burgerImg },
  { name: "Tacos Kefta", price: 35, img: tacosImg },
];

function ItemCard({
  item,
  isSupplement,
  onAdd,
}: {
  item: Item;
  isSupplement: boolean;
  onAdd: () => void;
}) {
  const [size, setSize] = useState(0);
  const price = item.prices[size].price;

  return (
    <article className="w-[80vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl bg-surface p-5 transition-transform duration-300 hover:-translate-y-1 sm:w-full sm:max-w-none">
      <div className="flex items-start gap-4">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          width={512}
          height={512}
          className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-gold/30"
        />
        <div className="min-w-0">
          <h3 className="truncate font-display text-2xl">{item.name}</h3>
          {item.desc && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.desc}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.prices.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setSize(i)}
            aria-pressed={size === i}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
              size === i
                ? "bg-gold text-background shadow-[0_8px_24px_-10px_var(--gold)]"
                : "bg-surface-2 text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span key={price} className="animate-[scale-in_.25s_ease-out] font-display text-3xl text-accent">
          {isSupplement ? "+" : ""}
          {price} <span className="text-lg text-muted-foreground">DH</span>
        </span>
        <button onClick={onAdd} className="btn-yellow flex items-center gap-1 rounded-full px-4 py-2 text-sm">
          <Plus className="h-4 w-4" /> AJOUTER
        </button>
      </div>
    </article>
  );
}

export function InteractiveMenu({ onAdd }: { onAdd: () => void }) {
  const [cat, setCat] = useState(categories[0].id);
  const scroller = useRef<HTMLDivElement>(null);
  const active = useMemo(() => categories.find((c) => c.id === cat)!, [cat]);

  const nudge = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="menu" className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-5xl md:text-6xl">
          NOTRE <span className="text-primary">MENU</span>
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Choisissez une catégorie, votre taille, et le prix s'affiche en Dirhams.
        </p>
      </div>

      {/* Ruban défilant des plats populaires */}
      <div className="marquee mt-10 py-2">
        <div className="marquee-track gap-4">
          {[...popular, ...popular].map((d, i) => (
            <div
              key={`${d.name}-${i}`}
              className="flex shrink-0 items-center gap-3 rounded-full border border-gold/25 bg-surface/70 py-2 pl-2 pr-5 backdrop-blur-md"
            >
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                width={256}
                height={256}
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="font-display text-lg tracking-wide">{d.name}</span>
              <span className="font-display text-lg text-gold">{d.price} DH</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8">
        {/* Catégories */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 snap-start rounded-full px-5 py-2.5 font-display text-lg tracking-widest transition-all duration-300 ${
                cat === c.id
                  ? "scale-105 bg-primary text-primary-foreground"
                  : "bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              <span className="mr-2">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Cartes : scroll horizontal sur mobile, grille sur desktop */}
        <div
          key={cat}
          ref={scroller}
          className="-mx-4 mt-8 flex animate-[fade-in_.4s_ease-out] snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        >
          {active.items.map((item) => (
            <ItemCard
              key={`${cat}-${item.name}`}
              item={item}
              isSupplement={cat === "supplements"}
              onAdd={onAdd}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-4 sm:hidden">
          <button
            aria-label="Précédent"
            onClick={() => nudge(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Suivant"
            onClick={() => nudge(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
