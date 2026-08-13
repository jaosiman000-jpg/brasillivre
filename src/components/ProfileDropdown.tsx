import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import type { Session } from "../auth/AuthContext";

interface ProfileDropdownProps {
  session: Session;
  onSignOut: () => void;
  onSettings: () => void;
}

export function ProfileDropdown({ session, onSignOut, onSettings }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* Botão do perfil: avatar + seta */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md transition hover:opacity-80"
        aria-label="Abrir menu do perfil"
      >
        <img
          src={session.avatar || ""}
          alt=""
          className="h-8 w-8 rounded md:h-9 md:w-9 object-cover ring-1 ring-white/10"
        />
        <ChevronDown
          size={14}
          className={`text-nfl-grey-light transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-lg border border-white/10 bg-nfl-dark/95 shadow-2xl backdrop-blur-md"
          >
            {/* Header do perfil: avatar + nome + email */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <img
                src={session.avatar || ""}
                alt=""
                className="h-11 w-11 rounded object-cover ring-1 ring-white/10"
              />
              <div className="min-w-0 flex-1">
                <p
                  className="truncate font-semibold text-nfl-text"
                  style={{ fontSize: "var(--text-smallbody)" }}
                >
                  {session.name}
                </p>
                <p
                  className="truncate text-nfl-grey"
                  style={{ fontSize: "var(--text-caption1)" }}
                >
                  {session.email}
                </p>
              </div>
            </div>

            {/* Menu */}
            <div className="py-1.5">
              <button
                onClick={() => {
                  setOpen(false);
                  onSettings();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-nfl-grey-light transition hover:bg-white/5 hover:text-white"
                style={{ fontSize: "var(--text-smallbody)" }}
              >
                <Settings size={16} />
                Configurações
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onSignOut();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-nfl-grey-light transition hover:bg-white/5 hover:text-white"
                style={{ fontSize: "var(--text-smallbody)" }}
              >
                <LogOut size={16} />
                Sair da conta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
