import type { Metadata } from 'next';
import { Lab } from '@/components/sections/Lab';
import { PageAtmosphere } from '@/components/ui/PageAtmosphere';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'The Lab — experiments, prototypes, and systems by Anuj Budhwar. Ideas that may become products or stay as learning.',
};

export default function LabPage() {
  return (
    <>
      <PageAtmosphere variant="lab" />
      <Lab />
    </>
  );
}
