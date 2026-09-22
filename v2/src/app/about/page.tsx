import type { Metadata } from 'next';
import { About } from '@/components/sections/About';
import { Pharmacy } from '@/components/sections/Pharmacy';
import { PageAtmosphere } from '@/components/ui/PageAtmosphere';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Anuj Budhwar — Pharm.D student at NIMS, B.Pharm from Baba Mastnath University (Rohtak), pharmacy & healthcare foundation, and builder story.',
};

export default function AboutPage() {
  return (
    <>
      <PageAtmosphere variant="about" />
      <About />
      <Pharmacy />
    </>
  );
}
