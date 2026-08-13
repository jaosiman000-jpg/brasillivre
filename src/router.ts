/**
 * Router mínimo com hash URL (#/login, #/) + state.
 * Sem dependências externas. Sync quando o hash muda.
 */
import { useEffect, useState } from "react";

export type Route = "home" | "login";

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (h === "login") return "login";
  return "home";
}

export function useRouter(): {
  route: Route;
  navigate: (r: Route) => void;
} {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== "undefined" ? parseHash() : "home"
  );

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (r: Route) => {
    const target = r === "login" ? "#/login" : "#/";
    if (window.location.hash !== target) {
      window.location.hash = target;
    } else {
      // já no mesmo hash, força update
      setRoute(r);
    }
  };

  return { route, navigate };
}
