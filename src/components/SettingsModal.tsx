import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { session } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação: qualquer sena entra
    setSaved(true);
    setCurrent("");
    setNext("");
    setConfirm("");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-nfl-dark p-7 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-nfl-grey-light transition hover:text-white"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <h2
              className="font-black text-nfl-text mb-1"
              style={{ fontSize: "clamp(24px, 3.5vw, 30px)", letterSpacing: "-1px" }}
            >
              Configurações
            </h2>
            <p className="text-nfl-grey-light mb-6" style={{ fontSize: "var(--text-smallbody)" }}>
              {session?.name} · {session?.email}
            </p>

            <form onSubmit={handleSave} noValidate>
              <h3
                className="mb-3 font-semibold text-nfl-text"
                style={{ fontSize: "var(--text-body)" }}
              >
                Alterar senha
              </h3>

              <div className="mb-3.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-nfl-grey-light mb-1.5">
                  Senha atual
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nfl-grey pointer-events-none" />
                  <input
                    type="password"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="Sua senha atual"
                    required
                    className="w-full rounded-md border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-white placeholder-nfl-grey/60 outline-none transition focus:border-nfl-red/80"
                    style={{ fontSize: "var(--text-body)" }}
                  />
                </div>
              </div>

              <div className="mb-3.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-nfl-grey-light mb-1.5">
                  Nova senha
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nfl-grey pointer-events-none" />
                  <input
                    type="password"
                    value={next}
                    onChange={(e) => setNext(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    className="w-full rounded-md border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-white placeholder-nfl-grey/60 outline-none transition focus:border-nfl-red/80"
                    style={{ fontSize: "var(--text-body)" }}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-nfl-grey-light mb-1.5">
                  Confirmar nova senha
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nfl-grey pointer-events-none" />
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repita a nova senha"
                    required
                    className="w-full rounded-md border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-white placeholder-nfl-grey/60 outline-none transition focus:border-nfl-red/80"
                    style={{ fontSize: "var(--text-body)" }}
                  />
                </div>
              </div>

              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2.5 text-green-400"
                  style={{ fontSize: "var(--text-smallbody)" }}
                >
                  <Check size={16} />
                  Senha alterada com sucesso!
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-md bg-nfl-red px-6 py-3.5 font-bold text-white transition hover:bg-nfl-red-dark"
                style={{ fontSize: "var(--text-body)" }}
              >
                Salvar alterações
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
