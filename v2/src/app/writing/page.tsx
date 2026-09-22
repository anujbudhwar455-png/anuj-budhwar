import type { Metadata } from 'next';
import { Writing } from '@/components/sections/Writing';
import { PageAtmosphere } from '@/components/ui/PageAtmosphere';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Amazon-live book series by Anuj Budhwar — fiction and non-fiction. Covers, blurbs, and volume links.',
};

export default function WritingPage() {
  return (
    <>
      <PageAtmosphere variant="writing" />
      <Writing />
    </>
  );
}
