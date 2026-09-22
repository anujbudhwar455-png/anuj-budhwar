import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { GitHubSection } from '@/components/sections/GitHub';
import { PageAtmosphere } from '@/components/ui/PageAtmosphere';

export const metadata: Metadata = {
  title: 'Connect',
  description:
    'Contact Anuj Budhwar — email, Instagram @dranujbudhwar, LinkedIn, GitHub, and Spotify.',
};

export default function ConnectPage() {
  return (
    <>
      <PageAtmosphere variant="connect" />
      <Contact />
      <GitHubSection />
    </>
  );
}
