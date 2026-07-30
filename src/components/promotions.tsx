import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";

const promos = [
  {
    img: promo1,
    badge: "-25%",
    title: "TWO FOR THE TABLE",
    text: "Order any two large pizzas before 6pm and save a quarter of the bill.",
  },
  {
    img: promo2,
    badge: "-15%",
    title: "PIZZA + COMBO",
    text: "Add fries and a drink to any pizza and the whole combo drops in price.",
  },
];

export function Promotions() {
  return (
    <section id="shares" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <h2 className="font-display text-5xl md:text-6xl">
        PROMOTIONS <span className="text-primary">OF THE WEEK</span>
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {promos.map((p) => (
          <article key={p.badge} className="group relative overflow-hidden rounded-3xl">
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              width={900}
              height={520}
              className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <span className="pulse-badge absolute top-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground">
              {p.badge}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-3xl">{p.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{p.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
