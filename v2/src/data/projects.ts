export type ProjectStatus =
  | 'in-development'
  | 'experiment'
  | 'closed-testing'
  | 'published';

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  domains: Array<'ai' | 'android' | 'web3' | 'pharmacy' | 'music' | 'product' | 'writing'>;
  featured: boolean;
  currentlyBuilding?: boolean;
  links?: { label: string; href: string }[];
  honestyNote?: string;
  /** Optional link into books catalog (Amazon-live series only) */
  seriesId?: string;
};

export const projects: Project[] = [
  {
    id: 'pdf-merger',
    title: 'PDF Merger',
    tagline: 'Android utility for merging PDFs — closed testing',
    description:
      'A practical Android app for merging PDF documents. Currently available in closed testing on Google Play. Legal and privacy pages are published separately.',
    status: 'closed-testing',
    statusLabel: 'Closed testing',
    domains: ['android', 'product'],
    featured: true,
    links: [
      {
        label: 'Join closed testing',
        href: 'https://play.google.com/apps/testing/com.aistudio.pdfmerger.ajxbv',
      },
      {
        label: 'Legal & privacy',
        href: 'https://anujbudhwar455-png.github.io/PDFMerger/',
      },
    ],
  },
  {
    id: 'loreloom',
    title: 'Loreloom',
    tagline: 'AI-assisted writing companion',
    description:
      'An AI writing tool focused on long-form fiction and worldbuilding workflows. In active development — features and release timeline are not finalized.',
    status: 'in-development',
    statusLabel: 'In development',
    domains: ['ai', 'product'],
    featured: true,
    currentlyBuilding: true,
  },
  {
    id: 'gfx-booster',
    title: 'GFX Booster',
    tagline: 'Android gaming utility experiment',
    description:
      'An experimental Android utility exploring graphics and performance helpers for mobile gaming. Early development — not a finished product and not claiming production-ready features.',
    status: 'experiment',
    statusLabel: 'Experiment / development',
    domains: ['android'],
    featured: true,
    currentlyBuilding: true,
    honestyNote: 'Do not claim full feature set or Play Store production release.',
  },
  {
    id: 'pharmacy-study-app',
    title: 'Pharmacy Study App',
    tagline: 'Education-focused Android app for pharmacy learners',
    description:
      'An Android learning companion aimed at pharmacy students — notes, revision flows, and study structure. Currently in development.',
    status: 'in-development',
    statusLabel: 'In development',
    domains: ['android', 'pharmacy'],
    featured: true,
    currentlyBuilding: true,
  },
  {
    id: 'desrein',
    title: 'Desrein',
    tagline: 'Experimental Web3 / simulation concept',
    description:
      'A conceptual experiment at the intersection of simulation thinking and Web3 ideas. This is NOT a real cryptocurrency, token, investment product, or financial offering.',
    status: 'experiment',
    statusLabel: 'Experimental concept',
    domains: ['web3'],
    featured: true,
    honestyNote: 'Not a crypto/investment product. Concept only.',
  },
  {
    id: 'music-anuj',
    title: 'Music by Anuj Budhwar',
    tagline: 'Original singles on Spotify',
    description:
      'Original music released as singles on Spotify — dark pop, emotional, and experimental tracks.',
    status: 'published',
    statusLabel: 'Published on Spotify',
    domains: ['music'],
    featured: true,
    links: [
      {
        label: 'Open Spotify artist',
        href: 'https://open.spotify.com/artist/5glVTiE4VPHrj2q1RlDooQ',
      },
    ],
  },
];

/** Featured writing cards — Amazon-live series from catalog.json only */
export const featuredWritingSeriesIds = [
  'eternal-bloodline',
  'void-sovereign-saga',
  'revenant-knight',
  'archmages-youngest-son',
  'science-of-clear-thinking',
] as const;

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}
