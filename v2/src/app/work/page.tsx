import type { Metadata } from 'next';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding';
import { AISoftware } from '@/components/sections/AISoftware';
import { PageAtmosphere } from '@/components/ui/PageAtmosphere';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Apps and products by Anuj Budhwar — PDF Merger, Loreloom, GFX Booster, Pharmacy Study App, Desrein, and more. Honest status labels.',
};

export default function WorkPage() {
  return (
    <>
      <PageAtmosphere variant="work" />
      <FeaturedProjects />
      <CurrentlyBuilding />
      <AISoftware />
    </>
  );
}
