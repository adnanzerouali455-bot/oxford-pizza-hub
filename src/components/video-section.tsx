import { useRef, useState } from "react";
import { Play } from "lucide-react";
import video from "@/assets/pizza-oven.mp4.asset.json";

export function VideoSection() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    ref.current?.play();
    setPlaying(true);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <h2 className="text-center font-display text-4xl md:text-5xl">
        WATCH A VIDEO ON HOW WE <span className="text-primary">COOK PIZZA</span>
      </h2>

      <div className="relative mt-10 overflow-hidden rounded-3xl bg-surface">
        <video
          ref={ref}
          src={video.url}
          className="h-full w-full object-cover"
          playsInline
          loop
          muted
          controls={playing}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <button
            onClick={play}
            aria-label="Play video"
            className="absolute inset-0 grid place-items-center bg-background/40 transition-colors hover:bg-background/25"
          >
            <span className="play-ring grid h-20 w-20 place-items-center rounded-full bg-accent">
              <Play className="ml-1 h-8 w-8 fill-accent-foreground text-accent-foreground" />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
