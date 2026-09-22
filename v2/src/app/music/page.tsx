import type { Metadata } from 'next';
import { Music } from '@/components/sections/Music';
import { PageAtmosphere } from '@/components/ui/PageAtmosphere';

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Original Spotify singles by Anuj Budhwar — covers, years, durations, and listen links.',
};

export default function MusicIndexPage() {
  return (
    <>
      <PageAtmosphere variant="music" />
      <Music />
    </>
  );
}
