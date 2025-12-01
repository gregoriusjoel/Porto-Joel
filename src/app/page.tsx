import Hero from '@/page/hero';
import About from '@/page/about';
import Skills from '@/page/skills';
import Projects from '@/page/projects';
import Contact from '@/page/contact';
import Footer from '@/page/footer';

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
