import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Plus, Check } from "lucide-react";
import { EPISODES, type Episode } from "../data/content";

interface CardProps {
  ep: Episode;
  index: number;
  onPlay: () => void;
}

function EpisodeCard({ ep, index, onPlay }: CardProps) {
  const [added, setAdded] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="thumb-hover relative shrink-0 w-[260px] md:w-[320px] lg:w-[360px] overflow-hidden rounded-md bg-nfl-grey-dark/40 outline outline-1 outline-white/5 group cursor-pointer"
      onClick={onPlay}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={ep.thumbnail}
          alt={`Episódio ${ep.id}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-3 text-xs font-bold tracking-widest text-nfl-red">
          EP {String(ep.id).padStart(2, "0")}
        </div>
        <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white backdrop-blur">
          {ep.duration}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.92 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-nfl-black"
            aria-label={`Tocar ${ep.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
          >
            <Play size={22} className="fill-nfl-black" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              setAdded((v) => !v);
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-black/50 text-white"
            aria-label={added ? "Remover" : "Adicionar à lista"}
          >
            {added ? <Check size={22} /> : <Plus size={22} />}
          </motion.button>
        </div>
      </div>

      <div className="p-3.5 md:p-4">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <h3
            className="font-bold text-nfl-text"
            style={{ fontSize: "var(--text-body)" }}
          >
            {ep.title}
          </h3>
          <span
            className="shrink-0 text-nfl-grey-light"
            style={{ fontSize: "var(--text-caption1)" }}
          >
            #{String(ep.id).padStart(2, "0")}
          </span>
        </div>
        <p
          className="text-nfl-grey-light leading-relaxed line-clamp-3"
          style={{ fontSize: "var(--text-smallbody)" }}
        >
          {ep.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Episodes({ onPlay }: { onPlay: () => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, amount: 0.3 });

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      id="episodes"
      className="relative z-10 -mt-32 md:-mt-20 pt-0 pb-12 md:pb-20"
    >
      <div ref={titleRef} className="mx-auto w-full max-w-[1600px] px-[6vw] py-8">
        <div className="mb-5 flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[1.5rem] md:text-[2rem] font-bold text-nfl-text"
            style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
          >
            Episódios
            <span className="ml-3 text-nfl-grey font-normal text-base md:text-xl">
              · 6 episódios
            </span>
          </motion.h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-nfl-text hover:border-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Próximo"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-nfl-text hover:border-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {EPISODES.map((ep, i) => (
            <div
              key={ep.id}
              className="snap-start"
              style={{ scrollbarWidth: "none" }}
            >
              <EpisodeCard ep={ep} index={i} onPlay={onPlay} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
