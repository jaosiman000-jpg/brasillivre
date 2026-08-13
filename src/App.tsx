import { useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Episodes } from "./components/Episodes";
import { Synopsis } from "./components/Synopsis";
import { Gallery } from "./components/Gallery";
import { CTA } from "./components/CTA";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { TrailerModal } from "./components/TrailerModal";
import { AuthPage } from "./components/AuthPage";
import { SettingsModal } from "./components/SettingsModal";
import "./App.css";

function AppContent() {
  const { isAuthenticated, hasProfile, session, signOut } = useAuth();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Gate: sem sessão, sempre na página de login/signup
  if (!isAuthenticated || !hasProfile) {
    return <AuthPage />;
  }

  // Autenticado e com perfil: mostra a landing page do documentário
  return (
    <div className="relative min-h-screen bg-nfl-black text-nfl-text antialiased">
      <Header
        onSignOut={signOut}
        onSettings={() => setSettingsOpen(true)}
        session={session}
      />
      <main>
        <Hero
          onPlay={() =>
            document
              .getElementById("episodes")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onMoreInfo={() =>
            document
              .getElementById("synopsis")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <Episodes onPlay={() => setTrailerOpen(true)} />
        <Synopsis />
        <Gallery />
        <CTA />
        <FAQ />
      </main>
      <Footer />

      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
