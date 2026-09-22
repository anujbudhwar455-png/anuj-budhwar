import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LoadingIntro } from '@/components/LoadingIntro';
import { EasterEggs } from '@/components/ui/EasterEggs';
import { siteConfig } from '@/data/siteConfig';
import { BASE_PATH } from '@/lib/paths';

const display = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-display',
  weight: '100 900',
  display: 'swap',
});

const body = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-body',
  weight: '100 900',
  display: 'swap',
});

const ogImage = `${siteConfig.url}${siteConfig.profileImage}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · Anuj Budhwar`,
  },
  description: siteConfig.description,
  applicationName: 'Anuj Budhwar Portfolio',
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    'Anuj Budhwar',
    'Pharm.D',
    'NIMS',
    'Baba Mastnath University',
    'Rohtak',
    'AI builder',
    'pharmacy student',
    'writer',
    'Spotify',
    'PDF Merger',
  ],
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: ogImage, width: 800, height: 800, alt: 'Anuj Budhwar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anuj Budhwar',
  url: siteConfig.url,
  email: siteConfig.email,
  image: ogImage,
  jobTitle: 'Pharm.D Student, AI Builder & Creator',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rohtak',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Baba Mastnath University',
    },
  ],
  sameAs: [
    siteConfig.links.linkedin,
    siteConfig.links.github,
    siteConfig.links.spotify,
    siteConfig.links.instagram,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <LoadingIntro />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <EasterEggs />
      </body>
    </html>
  );
}
