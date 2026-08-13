import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CONTRIBUTOR } from "../data/content";

export function Synopsis() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="synopsis" className="relative py-16 md:py-28 bg-nfl-dark">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1100px] px-[6vw]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16"
        >
          <div className="md:col-span-7">
            <span
              className="text-nfl-red tracking-[6px] font-bold uppercase mb-5 block"
              style={{ fontSize: "var(--text-smallbody)" }}
            >
              BRASIL LIVRE ORIGINALS
            </span>
            <h2
              className="font-black text-nfl-text leading-[1.05] mb-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                letterSpacing: "-2px",
              }}
            >
              Um documentário que ninguém teve coragem de fazer.
            </h2>
            <p
              className="text-nfl-grey-light leading-[1.7] mb-5"
              style={{ fontSize: "var(--text-body)" }}
            >
              Cinco anos após o primeiro lockdown, ainda não tínhamos um
              retrato honesto do que aconteceu. <em>A Verdade por Trás</em>{" "}
              reúne depoimentos de médicos censurados, cientistas afastados,
              pais punidos por não acatar o protocolo e empreendedores
              falidos. As vozes que a grande mídia se recusou a ouvir.
            </p>
            <p
              className="text-nfl-grey mb-6 leading-[1.7]"
              style={{ fontSize: "var(--text-body)" }}
            >
              Quem lucrou? Quem silenciou? Quem decidiu por você? Em 6
              episódios, com mais de 200 horas de entrevistas inéditas em 14
              estados, mergulhamos onde a imprensa oficial não quis chegar.
            </p>

            <div className="flex flex-wrap gap-5 mt-8">
              {[
                { label: "Episódios", value: "6" },
                { label: "Entrevistas", value: "+180" },
                { label: "Estados", value: "14" },
                { label: "Horas de gravação", value: "+200" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="border-l-2 border-nfl-red pl-4"
                >
                  <div
                    className="font-black text-nfl-text"
                    style={{
                      fontSize: "clamp(24px, 3vw, 36px)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-nfl-grey uppercase tracking-wider mt-1"
                    style={{ fontSize: "var(--text-caption1)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="rounded-lg border border-white/10 bg-nfl-grey-dark/30 p-5 md:p-7"
            >
              <h3
                className="font-bold text-nfl-text mb-5 tracking-wide"
                style={{ fontSize: "var(--text-headline1)" }}
              >
                Sobre a produção
              </h3>
              <ul className="space-y-4">
                {CONTRIBUTOR.map((c, i) => (
                  <motion.li
                    key={c.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                    className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-3"
                  >
                    <span
                      className="text-nfl-text font-semibold"
                      style={{ fontSize: "var(--text-body)" }}
                    >
                      {c.name}
                    </span>
                    <span
                      className="text-nfl-grey-light text-right"
                      style={{ fontSize: "var(--text-smallbody)" }}
                    >
                      {c.role}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-white/5">
                <p
                  className="text-nfl-grey-light italic leading-relaxed"
                  style={{ fontSize: "var(--text-smallbody)" }}
                >
                  "Fizemos este documentário porque alguém precisava fazer. O
                  silêncio é o que sustenta a impunidade, e o medo é o que
                  sustenta o silêncio. Quebrar esse ciclo é a nossa missão."
                </p>
                <p
                  className="text-nfl-grey mt-2"
                  style={{ fontSize: "var(--text-caption1)" }}
                >
                  <span className="text-nfl-grey-light">Caio Mendoza</span>, diretor
                </p>
              </div>
            </motion.div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
