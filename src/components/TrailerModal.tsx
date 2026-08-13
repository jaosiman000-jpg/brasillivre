import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { HERO_BANNER, HERO_TRAILER } from "../data/content";

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
}

export function TrailerModal({ open, onClose }: TrailerModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video rounded-md overflow-hidden bg-nfl-dark shadow-2xl"
          >
            <video
              src={HERO_TRAILER}
              poster={HERO_BANNER}
              autoPlay
              controls
              playsInline
              className="h-full w-full object-contain"
            />

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
            >
              <X size={22} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
