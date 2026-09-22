import type { Metadata } from 'next';
import { Music } from '@/components/sections/Music';

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Original Spotify singles by Anuj Budhwar — covers, years, durations, and listen links.',
};

export default function MusicIndexPage() {
  return (
    <div className="pt-16">
      <Music />
    </div>
  );
}
