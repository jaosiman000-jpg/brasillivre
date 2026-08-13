import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Bell, LogOut } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import type { Session } from "../auth/AuthContext";

const NAV_ITEMS = [
  { label: "Início", href: "#hero" },
  { label: "Episódios", href: "#episodes" },
  { label: "Sinopse", href: "#synopsis" },
  { label: "Galeria", href: "#gallery" },
  { label: "Perguntas Frequentes", href: "#faq" },
];

function NavLink({ label, href, index }: { label: string; href: string; index: number }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
      className="group relative text-nfl-grey-light px-1 py-1 transition-colors duration-150 hover:text-white"
    >
      {label}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-nfl-red transition-transform duration-200 ease-out group-hover:scale-x-100"
        style={{ transformOrigin: "left center" }}
      />
    </motion.a>
  );
}

interface HeaderProps {
  onSignOut: () => void;
  onSettings: () => void;
  session: Session | null;
}

export function Header({ onSignOut, onSettings, session }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled
          ? "linear-gradient(180deg, rgba(20,20,20,0.96), rgba(20,20,20,0.72))"
          : "linear-gradient(180deg, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0) 100%)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-4 md:h-20 md:px-10">
        <div className="flex items-center gap-6">
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="select-none"
            aria-label="Brasil Livre, início"
          >
            <span
              className="text-[26px] font-black tracking-tight text-nfl-red md:text-[32px]"
              style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-1.5px" }}
            >
              BRASIL<span className="font-light text-nfl-text">LIVRE</span>
            </span>
          </motion.a>

          <button
            className="md:hidden text-nfl-text p-1.5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <ul
            className="hidden md:flex items-center gap-5"
            style={{ fontSize: "var(--text-headline2)" }}
          >
            {NAV_ITEMS.map((it, i) => (
              <li key={it.href}>
                <NavLink label={it.label} href={it.href} index={i} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            aria-label="Buscar"
            className="text-nfl-text p-1.5 transition-opacity duration-150 hover:opacity-80"
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Notificações"
            className="text-nfl-text p-1.5 transition-opacity duration-150 hover:opacity-80 hidden sm:block"
          >
            <Bell size={20} />
          </button>

          {/* Perfil do usuário com dropdown */}
          {session && (
            <div className="hidden sm:block">
              <ProfileDropdown
                session={session}
                onSignOut={onSignOut}
                onSettings={onSettings}
              />
            </div>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-nfl-black/95 backdrop-blur"
          >
            {NAV_ITEMS.map((it) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-5 py-3 text-nfl-grey-light transition-colors hover:bg-white/5 hover:text-white"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {it.label}
                </a>
              </li>
            ))}
            {/* Perfil mobile */}
            {session && (
              <>
                <li className="border-t border-white/10 px-5 py-3">
                  <p className="font-semibold text-nfl-text" style={{ fontSize: "var(--text-body)" }}>
                    {session.name}
                  </p>
                  <p className="text-nfl-grey truncate" style={{ fontSize: "var(--text-caption1)" }}>
                    {session.email}
                  </p>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onSettings();
                    }}
                    className="block w-full px-5 py-3 text-left text-nfl-grey-light hover:bg-white/5 hover:text-white"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    Configurações
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onSignOut();
                    }}
                    className="flex w-full items-center gap-2 px-5 py-3 text-left text-nfl-grey-light hover:bg-white/5 hover:text-white"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    <LogOut size={18} />
                    Sair da conta
                  </button>
                </li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
