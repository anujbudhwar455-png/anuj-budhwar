import type { Metadata } from 'next';
import { Lab } from '@/components/sections/Lab';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'The Lab — experiments, prototypes, and systems by Anuj Budhwar. Ideas that may become products or stay as learning.',
};

export default function LabPage() {
  return (
    <div className="pt-16">
      <Lab />
    </div>
  );
}
