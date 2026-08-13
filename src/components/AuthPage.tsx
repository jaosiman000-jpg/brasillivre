import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, ArrowLeft, Upload } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useRouter } from "../router";
import { AVATARS } from "../data/avatars";

type Mode = "signin" | "signup";

interface FieldProps {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (v: string) => void;
  icon: "mail" | "lock" | "user";
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id, label, type, value, onChange, icon, placeholder, autoComplete,
}: FieldProps) {
  const [show, setShow] = useState(false);
  const actualType = type === "password" && show ? "text" : type;
  const Icon = icon === "mail" ? Mail : icon === "lock" ? Lock : User;

  return (
    <div className="mb-3.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wider text-nfl-grey-light mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-nfl-grey pointer-events-none" />
        <input
          id={id}
          type={actualType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full rounded-md border border-white/10 bg-white/[0.04] py-3 pl-11 pr-11 text-white placeholder-nfl-grey/60 outline-none transition focus:border-nfl-red/80 focus:bg-white/[0.06]"
          style={{ fontSize: "var(--text-body)" }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-nfl-grey-light transition hover:text-white"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export function AuthPage() {
  const { signIn, signUp, session, setAvatar } = useAuth();
  const { navigate } = useRouter();
  const [mode, setMode] = useState<Mode>("signin");

  // signin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  // signup
  const [name, setName] = useState("");
  const [email2, setEmail2] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showProfileSelect, setShowProfileSelect] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (mode === "signin") {
        signIn(email, password);
      } else {
        signUp(name, email2, password2);
      }
      setLoading(false);
      setShowProfileSelect(true);
    }, 500);
  };

  const handlePickAvatar = (avatarSrc: string) => {
    setAvatar(avatarSrc);
    navigate("home");
  };

  // ====== Tela de escolha de foto de perfil ======
  if (showProfileSelect || (session && !session.avatar)) {
    return (
      <ProfileAvatarSelect
        name={session?.name || "Usuário"}
        onPick={handlePickAvatar}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-nfl-black">
      {/* ===== Background decorativo rico =====
          Imagens como complemento, textos em destaque.
          Banner COVID full-width no fundo + bandeira + capa + vincos de luz. */}
      <div className="absolute inset-0 z-0">
        {/* Banner COVID full-screen, visible mas escurecido */}
        <img
          src="/covid-banner.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-40"
        />
        {/* Bandeira do Brasil na metade direita, semi-transparente */}
        <div className="absolute right-[-5%] top-[10%] w-[60%] opacity-[0.08] pointer-events-none">
          <img src="/bandeira-brasil.svg" alt="" aria-hidden className="w-full" />
        </div>
        {/* Capa do documentário no canto inferior direito, decorativa */}
        <div className="absolute right-8 bottom-8 hidden lg:block opacity-30">
          <img src="/covid-capa.png" alt="" className="w-40 rounded-xl shadow-2xl ring-1 ring-white/10" />
        </div>
        {/* Vinco esquerdo de luz vermelha */}
        <div className="absolute left-0 top-0 h-full w-[45%] bg-gradient-to-r from-nfl-red/15 via-transparent to-transparent" />
        {/* Gradiente escurecedor da esquerda pra garantir texto legível */}
        <div className="absolute inset-0 bg-gradient-to-r from-nfl-black via-nfl-black/88 to-nfl-black/30" />
        {/* Vinco superior de profundidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-nfl-black/50 via-transparent to-nfl-black/70" />
        {/* Pattern sutil de grão (via CSS) */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23ffffff' fill-opacity='0.15'/%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ===== Top bar ===== */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 flex h-16 md:h-20 items-center justify-between px-5 md:px-10"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[26px] font-black tracking-tight text-nfl-red md:text-[32px]"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-1.5px" }}
          >
            BRASIL<span className="font-light text-nfl-text">LIVRE</span>
          </span>
        </div>
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-1.5 text-nfl-grey-light transition hover:text-white"
          style={{ fontSize: "var(--text-smallbody)" }}
        >
          <ArrowLeft size={16} />
          Voltar ao site
        </button>
      </motion.header>

      {/* ===== Card central ===== */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-nfl-dark/85 p-7 md:p-9 shadow-2xl backdrop-blur-md"
        >
          <AnimatePresence mode="wait">
            {mode === "signin" ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
              >
                <h1
                  className="font-black text-nfl-text mb-1"
                  style={{ fontSize: "clamp(28px, 4vw, 36px)", letterSpacing: "-1px" }}
                >
                  Entrar
                </h1>
                <p
                  className="text-nfl-grey-light mb-6"
                  style={{ fontSize: "var(--text-smallbody)" }}
                >
                  Bem-vindo de volta. Acesse seus documentários.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <Field
                    id="email" label="Email" type="email" value={email}
                    onChange={setEmail} icon="mail"
                    placeholder="voce@email.com" autoComplete="email"
                  />
                  <Field
                    id="password" label="Senha" type="password" value={password}
                    onChange={setPassword} icon="lock"
                    placeholder="Sua senha" autoComplete="current-password"
                  />

                  <div className="mb-5 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox" checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/10 accent-nfl-red"
                      />
                      <span className="text-nfl-grey-light" style={{ fontSize: "var(--text-smallbody)" }}>
                        Manter conectado
                      </span>
                    </label>
                    <a href="#" className="text-nfl-grey-light transition hover:text-white" style={{ fontSize: "var(--text-smallbody)" }}>
                      Esqueci a senha
                    </a>
                  </div>

                  <motion.button
                    type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={loading || !email || !password}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-nfl-red px-6 py-3.5 font-bold text-white transition hover:bg-nfl-red-dark disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    ) : (
                      <>Entrar <ArrowRight size={18} /></>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-nfl-grey-light" style={{ fontSize: "var(--text-smallbody)" }}>
                    Não tem conta?{" "}
                    <button onClick={() => setMode("signup")} className="font-semibold text-nfl-text underline-offset-4 transition hover:text-white hover:underline">
                      Criar agora
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <h1
                  className="font-black text-nfl-text mb-1"
                  style={{ fontSize: "clamp(28px, 4vw, 36px)", letterSpacing: "-1px" }}
                >
                  Criar conta
                </h1>
                <p className="text-nfl-grey-light mb-5" style={{ fontSize: "var(--text-smallbody)" }}>
                  Brasil Livre é gratuito. Leva 30 segundos.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <Field
                    id="name" label="Nome" type="text" value={name}
                    onChange={setName} icon="user"
                    placeholder="Seu nome completo" autoComplete="name"
                  />
                  <Field
                    id="email2" label="Email" type="email" value={email2}
                    onChange={setEmail2} icon="mail"
                    placeholder="voce@email.com" autoComplete="email"
                  />
                  <Field
                    id="emailConfirm" label="Confirmar email" type="email" value={emailConfirm}
                    onChange={setEmailConfirm} icon="mail"
                    placeholder="Repita o email" autoComplete="email"
                  />
                  <Field
                    id="password2" label="Senha" type="password" value={password2}
                    onChange={setPassword2} icon="lock"
                    placeholder="Mínimo 6 caracteres" autoComplete="new-password"
                  />
                  <Field
                    id="passwordConfirm" label="Confirmar senha" type="password" value={passwordConfirm}
                    onChange={setPasswordConfirm} icon="lock"
                    placeholder="Repita a senha" autoComplete="new-password"
                  />

                  <label className="mb-5 mt-3 flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox" checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-nfl-red"
                    />
                    <span className="text-nfl-grey-light leading-relaxed" style={{ fontSize: "var(--text-smallbody)" }}>
                      Li e aceito os{" "}
                      <a href="#" className="font-semibold text-nfl-text underline-offset-2 hover:underline">Termos de Uso</a>
                      {" "}e a{" "}
                      <a href="#" className="font-semibold text-nfl-text underline-offset-2 hover:underline">Política de Privacidade</a>
                      {" "}da Brasil Livre.
                    </span>
                  </label>

                  <motion.button
                    type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={loading || !terms || !name || !email2 || !emailConfirm || !password2 || !passwordConfirm}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-nfl-red px-6 py-3.5 font-bold text-white transition hover:bg-nfl-red-dark disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    ) : (
                      <><Check size={18} /> Criar conta</>
                    )}
                  </motion.button>

                  <p className="mt-4 text-center text-nfl-grey" style={{ fontSize: "var(--text-caption1)" }}>
                    {terms
                      ? "Você poderá assistir imediatamente após criar a conta."
                      : "Marque a aceitação dos termos para continuar."}
                  </p>
                </form>

                <div className="mt-5 text-center">
                  <p className="text-nfl-grey-light" style={{ fontSize: "var(--text-smallbody)" }}>
                    Já tem conta?{" "}
                    <button onClick={() => setMode("signin")} className="font-semibold text-nfl-text underline-offset-4 transition hover:text-white hover:underline">
                      Entrar
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="relative z-10 px-5 pb-5 md:px-10 md:pb-7">
        <p className="text-center text-nfl-grey" style={{ fontSize: "var(--text-caption1)" }}>
          © 2026 Brasil Livre. Documentário original em produção.
        </p>
      </footer>
    </div>
  );
}

// ====== Tela de escolha de foto de perfil ======
// Um único perfil (o do usuário). Seleciona a FOTO, não cria múltiplos perfis.
function ProfileAvatarSelect({ name, onPick }: { name: string; onPick: (avatar: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selected) onPick(selected);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-nfl-black flex flex-col items-center justify-center px-5">
      {/* Background decorativo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/covid-banner.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-15"
        />
        <div className="absolute right-[-10%] top-[5%] w-[50%] opacity-[0.06] pointer-events-none">
          <img src="/bandeira-brasil.svg" alt="" aria-hidden className="w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-nfl-black via-nfl-black/80 to-nfl-black" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <h1
          className="font-black text-nfl-text mb-2"
          style={{ fontSize: "clamp(28px, 4.5vw, 44px)", letterSpacing: "-1.5px" }}
        >
          Escolha sua foto de perfil
        </h1>
        <p className="text-nfl-grey-light mb-8" style={{ fontSize: "var(--text-body)" }}>
          {name}, selecione uma imagem para o seu perfil.
        </p>

        {/* Preview do perfil único: avatar + nome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mx-auto mb-8 flex flex-col items-center gap-3"
        >
          <div
            className="relative overflow-hidden rounded-xl ring-2 transition-all duration-300"
            style={{
              width: "clamp(96px, 16vw, 140px)",
              height: "clamp(96px, 16vw, 140px)",
              boxShadow: selected
                ? "0 0 30px rgba(229,9,14,0.4)"
                : "0 0 0 transparent",
            }}
          >
            {selected ? (
              <img src={selected} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/[0.03] border-2 border-dashed border-white/15 rounded-xl">
                <Upload size={32} className="text-nfl-grey" />
              </div>
            )}
          </div>
          <p className="font-semibold text-nfl-text" style={{ fontSize: "var(--text-body)" }}>
            {selected ? name : "Selecione uma imagem"}
          </p>
        </motion.div>

        {/* Grid de imagens para escolher */}
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:gap-4">
          {AVATARS.map((av, i) => (
            <motion.button
              key={av.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.25 }}
              onClick={() => setSelected(av.src)}
              onMouseEnter={() => setHovered(av.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative"
            >
              <div
                className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  selected === av.src
                    ? "border-nfl-red scale-105 shadow-lg shadow-nfl-red/30"
                    : hovered === av.id
                    ? "border-white/60 scale-105"
                    : "border-white/10 hover:border-white/30"
                }`}
                style={{ width: "clamp(56px, 9vw, 84px)", height: "clamp(56px, 9vw, 84px)" }}
              >
                <img src={av.src} alt={av.label} className="h-full w-full object-cover" />
                {selected === av.src && (
                  <div className="absolute inset-0 flex items-center justify-center bg-nfl-red/40">
                    <Check size={24} className="text-white drop-shadow-lg" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Botão de confirmar */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={selected ? { scale: 1.03 } : {}}
          whileTap={selected ? { scale: 0.97 } : {}}
          onClick={handleConfirm}
          disabled={!selected}
          className="mt-8 flex items-center justify-center gap-2 rounded-md bg-nfl-red px-8 py-3.5 font-bold text-white transition hover:bg-nfl-red-dark disabled:cursor-not-allowed disabled:opacity-40"
          style={{ fontSize: "var(--text-body)" }}
        >
          <Check size={18} />
          Confirmar e entrar
        </motion.button>
      </motion.div>
    </div>
  );
}
