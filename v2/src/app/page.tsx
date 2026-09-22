import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Domains } from '@/components/sections/Domains';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding';
import { Lab } from '@/components/sections/Lab';
import { Pharmacy } from '@/components/sections/Pharmacy';
import { AISoftware } from '@/components/sections/AISoftware';
import { Writing } from '@/components/sections/Writing';
import { Music } from '@/components/sections/Music';
import { Journey } from '@/components/sections/Journey';
import { Skills } from '@/components/sections/Skills';
import { GitHubSection } from '@/components/sections/GitHub';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Domains />
      <FeaturedProjects />
      <CurrentlyBuilding />
      <Lab />
      <Pharmacy />
      <AISoftware />
      <Writing />
      <Music />
      <Journey />
      <Skills />
      <GitHubSection />
      <Contact />
    </>
  );
}
