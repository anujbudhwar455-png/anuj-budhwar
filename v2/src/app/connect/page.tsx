import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { GitHubSection } from '@/components/sections/GitHub';

export const metadata: Metadata = {
  title: 'Connect',
  description:
    'Contact Anuj Budhwar — email, Instagram @dranujbudhwar, LinkedIn, GitHub, and Spotify.',
};

export default function ConnectPage() {
  return (
    <div className="pt-16">
      <Contact />
      <GitHubSection />
    </div>
  );
}
