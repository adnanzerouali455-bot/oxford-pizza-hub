import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import r1 from "@/assets/review-1.jpg";
import r2 from "@/assets/review-2.jpg";
import r3 from "@/assets/review-3.jpg";

const reviews = [
  {
    img: r1,
    name: "Amelia Hart",
    text: "Ordered at 7pm on a Friday and it still arrived in 35 minutes, box warm and the crust perfectly blistered. The Diavola is now a weekly ritual in our flat.",
  },
  {
    img: r2,
    name: "Daniel Okafor",
    text: "I've eaten pizza across Naples and this holds its own. Proper dough, honest toppings, and the delivery team is always polite even in the rain.",
  },
  {
    img: r3,
    name: "Tom Whitfield",
    text: "The second-pizza discount means our student house orders here every match night. Great value and the drinks-as-a-gift thing is a lovely touch.",
  },
];

export function Reviews() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="mx-auto max-w-5xl px-4 py-20 md:px-8">
      <h2 className="font-display text-5xl md:text-6xl">
        RE<span className="text-primary">VIEWS</span>
      </h2>

      <div className="mt-10 overflow-hidden rounded-3xl bg-surface">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex w-full shrink-0 flex-col items-center gap-6 p-8 text-center md:flex-row md:p-12 md:text-left"
            >
              <img
                src={r.img}
                alt={r.name}
                loading="lazy"
                width={512}
                height={512}
                className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-primary/40"
              />
              <div>
                <figcaption className="font-display text-2xl text-primary">{r.name}</figcaption>
                <blockquote className="mt-3 text-muted-foreground">{r.text}</blockquote>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          aria-label="Previous review"
          onClick={() => go(-1)}
          className="group grid h-12 w-12 place-items-center rounded-full bg-surface transition-colors hover:bg-primary"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </button>
        <div className="flex gap-2">
          {reviews.map((r, idx) => (
            <span
              key={r.name}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-7 bg-primary" : "w-2 bg-surface-2"}`}
            />
          ))}
        </div>
        <button
          aria-label="Next review"
          onClick={() => go(1)}
          className="group grid h-12 w-12 place-items-center rounded-full bg-surface transition-colors hover:bg-primary"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
