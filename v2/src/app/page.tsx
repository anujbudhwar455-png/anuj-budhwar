import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Domains } from '@/components/sections/Domains';
import { Journey } from '@/components/sections/Journey';
import { Skills } from '@/components/sections/Skills';
import { Explore } from '@/components/sections/Explore';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Domains />
      <Journey />
      <Skills />
      <Explore />
    </>
  );
}
