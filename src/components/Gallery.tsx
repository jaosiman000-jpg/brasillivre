import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Shot {
  caption: string;
  src: string;
}

const SHOTS: Shot[] = [
  { caption: "Wuhan Institute of Virology, 2019", src: "/gallery/wuhan.jpg" },
  { caption: "Hospital de campanha, Manaus", src: "/gallery/manaos.webp" },
  { caption: "Fila do SUS", src: "/gallery/sus.jpg" },
  { caption: "Vacinação em massa, São Paulo", src: "/gallery/vacinacao-em-massa.webp" },
  { caption: "Covas rasas, Manaus", src: "/gallery/covas-rasas.jpeg" },
  { caption: "Comércio destruído, Rio de Janeiro", src: "/gallery/comercio-destruido.jpg" },
  { caption: "Laboratório de pesquisa viral", src: "/gallery/laboratorio.jpg" },
  { caption: "Horário reservado à propaganda eleitoral", src: "/gallery/propaganda-eleitoral.png" },
  { caption: "Médico censurado", src: "/gallery/medico-censurado.webp" },
];

export function Gallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, amount: 0.3 });

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.85 * dir, behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      className="relative py-16 md:py-24 bg-nfl-black"
    >
      <div ref={titleRef} className="mx-auto w-full max-w-[1600px] px-[6vw]">
        <div className="mb-5 flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
            className="font-bold text-nfl-text"
          >
            Imagens do documentário
          </motion.h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:border-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Próximo"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:border-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-3 md:gap-5 overflow-x-auto pb-6"
          style={{ scrollbarWidth: "none" }}
        >
          {SHOTS.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="thumb-hover relative shrink-0 aspect-video w-[280px] md:w-[420px] lg:w-[500px] overflow-hidden rounded-md bg-nfl-grey-dark/40"
            >
              <img
                src={s.src}
                alt={s.caption}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <figcaption
                className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-nfl-text font-semibold tracking-wide"
                style={{ fontSize: "var(--text-smallbody)" }}
              >
                {s.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
