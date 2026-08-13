import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-16 md:py-28 bg-gradient-to-b from-nfl-black via-nfl-dark to-nfl-black">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1100px] px-[6vw] text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-black text-nfl-text leading-[1.1] mb-5"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(32px, 5vw, 60px)",
            letterSpacing: "-1.5px",
          }}
        >
          A verdade não pede permissão.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mb-8 max-w-xl text-nfl-grey-light leading-relaxed"
          style={{ fontSize: "var(--text-body)" }}
        >
          Receba o trailer, a data de estreia e acesso antecipado aos 6
          episódios. Brasil Livre é gratuito e jamais dependerá de
          patrocinador oficial. Avisamos assim que o material estiver no ar.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-md bg-nfl-red px-5 py-3.5 font-bold text-white"
          >
            <Play size={18} className="fill-white" />
            Confirmado! Você receberá o acesso em breve.
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.55 }}
            onSubmit={onSubmit}
            className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="flex-1 rounded-md border border-white/15 bg-nfl-grey-dark/40 px-5 py-3.5 text-white placeholder-nfl-grey outline-none transition focus:border-white/60"
              style={{ fontSize: "var(--text-body)" }}
              aria-label="Email"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 rounded-md bg-nfl-red px-6 py-3.5 font-bold text-white transition hover:bg-nft-red-hover"
              style={{ fontSize: "var(--text-body)" }}
            >
              Quero assistir
              <ArrowRight size={18} />
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
