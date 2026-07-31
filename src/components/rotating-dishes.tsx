import pizzaLoop from "@/assets/rotating-pizza.mp4.asset.json";
import burgerLoop from "@/assets/rotating-burger.mp4.asset.json";
import tacosLoop from "@/assets/rotating-tacos.mp4.asset.json";

const dishes = [
  { src: pizzaLoop.url, name: "PIZZA NAPOLITANA", note: "Melted cheese • pepperoni • basil" },
  { src: burgerLoop.url, name: "SIGNATURE BURGER", note: "Toasted bun • dripping cheese • grilled patty" },
  { src: tacosLoop.url, name: "SIGNATURE TACOS", note: "Grilled meat • cheese • salsa • sour cream" },
];

export function RotatingDishes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <h2 className="text-center font-display text-4xl md:text-5xl">
        OUR <span className="text-primary">SIGNATURE</span> DISHES
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
        Fresh out of the wood-fired oven — take a full look around.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((d) => (
          <figure
            key={d.name}
            className="group overflow-hidden rounded-3xl bg-surface p-4 transition-transform duration-300 hover:scale-[1.02]"
          >
            <video
              src={d.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              aria-label={`${d.name} rotating 360 degrees`}
              className="aspect-square w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-4 text-center">
              <h3 className="font-display text-2xl tracking-wide">{d.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
