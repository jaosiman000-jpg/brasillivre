import { motion } from "framer-motion";
import { Play, Info, VolumeX, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { HERO_BANNER, HERO_TRAILER } from "../data/content";

interface HeroProps {
  onPlay: () => void;
  onMoreInfo: () => void;
}

export function Hero({ onPlay, onMoreInfo }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMuted = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      void videoRef.current.play();
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full overflow-hidden"
    >
      {/* Trailer em loop no background, com imagem de fallback enquanto carrega */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          src={HERO_TRAILER}
          poster={HERO_BANNER}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="metadata"
          aria-label="Teaser de COVID-19: A verdade por trás"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Overlay para legibilidade do texto à esquerda
          - gradiente horizontal (esquerda preto -> transparente)
          - gradiente vertical inferior -> preto para emendar com a próxima seção */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* camada esquerda - where text sits */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 22%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.18) 56%, rgba(0,0,0,0) 78%)",
          }}
        />
        {/* sombra inferior para emendar com a próxima section */}
        <div
          className="absolute inset-x-0 bottom-0 h-64"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.6) 60%, #141414 100%)",
          }}
        />
      </div>

      {/* Top banner - eyebrow text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute top-24 md:top-28 left-[6vw] z-20"
      >
        <span
          className="text-white tracking-[6px] font-semibold mb-6 md:mb-8 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
          style={{ fontSize: "var(--text-smallbody)" }}
        >
          NOVO DOCUMENTÁRIO
        </span>
      </motion.div>

      {/* Action block: botões + sinopse curta + meta. Tudo no canto inferior esquerdo. */}
      <div className="absolute inset-0 flex flex-col justify-end pb-[20vh] md:pb-[14vh] z-20">
        <div className="mx-auto w-full max-w-[1600px] px-[6vw]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col gap-4 md:gap-5 max-w-3xl"
          >
            <span
              className="font-bold tracking-[3px] text-nfl-red uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
              style={{ fontSize: "var(--text-body)" }}
            >
              Documentário Original Brasil Livre
            </span>

            {/* Sinopse curta - agora com fundo semi-transparente pra legibilidade máxima */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="text-white max-w-xl mt-2 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
              style={{ fontSize: "var(--text-body)" }}
            >
              6 episódios. O que realmente aconteceu nos bastidores da crise
              sanitária. Quem lucrou, quem silenciou, quem decidiu por você.
              Estreia 27 de março.
            </motion.p>

            {/* Meta tags - legíveis, com sombra forte */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.5 }}
              className="mt-2 flex flex-wrap items-center gap-3"
            >
              <span
                className="text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                style={{ fontSize: "var(--text-smallbody)" }}
              >
                ● 2026
              </span>
              <span
                className="border border-white/40 bg-black/50 px-2 py-[2px] rounded-md text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                style={{ fontSize: "var(--text-smallbody)" }}
              >
                16+
              </span>
              <span
                className="text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                style={{ fontSize: "var(--text-smallbody)" }}
              >
                6 Episódios · HD · 🇧🇷
              </span>
            </motion.div>

            {/* Botões primários */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={onPlay}
                className="flex items-center gap-2 rounded-[5px] bg-white px-7 py-3 md:px-9 md:py-3.5 font-bold text-nfl-black shadow-lg shadow-black/50 transition hover:bg-white/90"
                style={{ fontSize: "var(--text-headline2)" }}
              >
                <Play size={22} className="fill-nfl-black" />
                Assistir
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={onMoreInfo}
                className="flex items-center gap-2 rounded-[5px] bg-black/60 px-7 py-3 md:px-9 md:py-3.5 font-bold text-white border border-white/30 shadow-lg shadow-black/50 backdrop-blur transition hover:bg-black/70"
                style={{ fontSize: "var(--text-headline2)" }}
              >
                <Info size={22} />
                Mais informações
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mudo + classificação - canto direito, isolados dos botões de ação.
          Usando posicionamento autônomo que nunca se sobrepõe aos CTAs. */}
      <div className="absolute right-[3vw] md:right-[4vw] bottom-[8vh] md:bottom-[10vh] z-20 flex items-center gap-3">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={muted ? "Ativar som" : "Mudo"}
          onClick={toggleMuted}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/50 bg-black/60 text-white backdrop-blur transition hover:border-white hover:bg-black/80"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>

        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="rounded-sm border-l-4 border-white bg-black/60 px-3 py-1.5 text-white backdrop-blur font-semibold shadow-lg shadow-black/40"
          style={{ fontSize: "var(--text-smallbody)" }}
        >
          16+
        </motion.span>
      </div>
    </section>
  );
}
