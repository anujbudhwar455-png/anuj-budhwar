import type { Metadata } from 'next';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding';
import { AISoftware } from '@/components/sections/AISoftware';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Apps and products by Anuj Budhwar — PDF Merger, Loreloom, GFX Booster, Pharmacy Study App, Desrein, and more. Honest status labels.',
};

export default function WorkPage() {
  return (
    <div className="pt-16">
      <FeaturedProjects />
      <CurrentlyBuilding />
      <AISoftware />
    </div>
  );
}
