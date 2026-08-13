import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { FAQ_ITEMS } from "../data/content";

function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="mx-auto max-w-3xl">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <li
            key={i}
            className="mb-2 overflow-hidden rounded-md bg-nfl-grey-dark/40"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 md:px-7 md:py-6 text-left transition-colors hover:bg-nfl-grey-dark/60"
              aria-expanded={isOpen}
            >
              <span
                className="text-nfl-text font-medium"
                style={{ fontSize: "var(--text-headline1)" }}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-nfl-text shrink-0"
              >
                <Plus size={22} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-5 pb-6 md:px-7 text-nfl-grey-light leading-relaxed"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 bg-nfl-dark"
    >
      <div ref={ref} className="mx-auto w-full max-w-[1100px] px-[6vw]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center text-nfl-text font-bold"
          style={{ fontSize: "clamp(28px, 4vw, 50px)" }}
        >
          Perguntas frequentes
        </motion.h2>
        <Accordion />
      </div>
    </section>
  );
}
