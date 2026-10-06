import { BuildProvider } from './build';
import Toast from './components/Toast';
import { SecretsProvider } from './secrets';
import About from './sections/About';
import Contact from './sections/Contact';
import Contributions from './sections/Contributions';
import Footer from './sections/Footer';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Log from './sections/Log';
import Projects from './sections/Projects';
import Skills from './sections/Skills';

export default function App() {
  return (
    <SecretsProvider>
      <BuildProvider>
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main className="overflow-x-clip">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contributions />
          <Log />
          <Contact />
        </main>
        <Footer />
        <Toast />
      </BuildProvider>
    </SecretsProvider>
  );
}
