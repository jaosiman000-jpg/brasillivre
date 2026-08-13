import { SOCIAL } from "./social-icons";

const LINKS = [
  {
    title: "Brasil Livre",
    items: ["Sobre nós", "Manifesto", "Imprensa", "Carreiras"],
  },
  {
    title: "Documentários",
    items: ["Em cartaz", "Próximos lançamentos", "Acervo", "Indie"],
  },
  {
    title: "Suporte",
    items: ["Central de ajuda", "Conta", "Acessibilidade", "Contato"],
  },
  {
    title: "Legal",
    items: ["Termos de uso", "Privacidade", "Cookies", "Preferências"],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-nfl-black pt-14 pb-10">
      <div className="mx-auto w-full max-w-[1600px] px-[6vw]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <span
              className="text-[22px] font-black tracking-tight text-nfl-red"
              style={{ letterSpacing: "-1.5px" }}
            >
              BRASIL<span className="font-light text-nfl-text">LIVRE</span>
            </span>
            <p
              className="mt-3 max-w-[220px] text-nfl-grey leading-relaxed"
              style={{ fontSize: "var(--text-smallbody)" }}
            >
              Jornalismo independente, documentais originais e a história
              como ela é.
            </p>
            <div className="mt-5 flex gap-4">
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-nfl-grey-light transition-colors hover:text-nfl-red"
                >
                  <Icon width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          {LINKS.map((col) => (
            <div key={col.title}>
              <h3
                className="mb-3 font-semibold text-nfl-text uppercase tracking-wider"
                style={{ fontSize: "var(--text-smallbody)" }}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <a
                      href="#"
                      className="text-nfl-grey-light transition-colors hover:text-nfl-text"
                      style={{ fontSize: "var(--text-smallbody)" }}
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p
            className="text-nfl-grey"
            style={{ fontSize: "var(--text-caption1)" }}
          >
            © 2026 Brasil Livre. Documentário original. Todos os direitos
            reservados.
          </p>
          <p
            className="text-nfl-grey"
            style={{ fontSize: "var(--text-caption1)" }}
          >
            Feito no Brasil. Projeto experimental GA de Hermes + GLM 5.2.
          </p>
        </div>
      </div>
    </footer>
  );
}
