/**
 * Auth context simples baseado em localStorage.
 * Persiste entre refreshes, simulando uma sessão.
 * Qualquer email/senha é aceito (pagina fictícia).
 *
 * Fluxo:
 *  1. Usuário cria conta (signup) ou entra (signin)
 *  2. Após auth, escolhe um avatar na tela de profile-select
 *  3. Só então vê a landing page do documentário
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "bl_session_v2";

export interface Session {
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  createdAt: number;
}

interface AuthContextValue {
  session: Session | null;
  isAuthenticated: boolean;
  hasProfile: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  setAvatar: (avatar: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (s: Session | null) => {
    setSession(s);
    try {
      if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const signIn = useCallback(
    (email: string, password: string) => {
      persist({
        name: email.split("@")[0] || "Usuário",
        email,
        password,
        avatar: null,
        createdAt: Date.now(),
      });
    },
    []
  );

  const signUp = useCallback(
    (name: string, email: string, password: string) => {
      persist({ name, email, password, avatar: null, createdAt: Date.now() });
    },
    []
  );

  const setAvatar = useCallback(
    (avatar: string) => {
      setSession((prev) => {
        if (!prev) return prev;
        const next = { ...prev, avatar };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  const signOut = useCallback(() => {
    persist(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      hasProfile: Boolean(session?.avatar),
      signIn,
      signUp,
      setAvatar,
      signOut,
    }),
    [session, signIn, signUp, setAvatar, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
