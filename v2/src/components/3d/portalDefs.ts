export type PortalDef = {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  color: string;
  position: [number, number, number];
  kind: 'scanner' | 'console' | 'chamber' | 'archive' | 'audio' | 'terminal';
};

export const PORTALS: PortalDef[] = [
  {
    id: 'about',
    label: 'About',
    subtitle: 'Identity · Origin · Path',
    href: '/about/',
    color: '#22d3ee',
    position: [-3.2, 0.55, 1.4],
    kind: 'scanner',
  },
  {
    id: 'work',
    label: 'Work',
    subtitle: 'Products · Experiments · Builds',
    href: '/work/',
    color: '#2dd4bf',
    position: [-1.8, 0.7, 2.6],
    kind: 'console',
  },
  {
    id: 'lab',
    label: 'Lab',
    subtitle: 'Prototypes · Systems · Ideas',
    href: '/lab/',
    color: '#a78bfa',
    position: [0.15, 0.85, 3.1],
    kind: 'chamber',
  },
  {
    id: 'writing',
    label: 'Writing',
    subtitle: 'Amazon-live archive',
    href: '/writing/',
    color: '#e879f9',
    position: [2.0, 0.7, 2.4],
    kind: 'archive',
  },
  {
    id: 'music',
    label: 'Music',
    subtitle: '12 singles · Spotify',
    href: '/music/',
    color: '#f472b6',
    position: [3.3, 0.55, 1.1],
    kind: 'audio',
  },
  {
    id: 'connect',
    label: 'Connect',
    subtitle: 'Channels · Collaboration',
    href: '/connect/',
    color: '#60a5fa',
    position: [-2.8, 0.5, -0.9],
    kind: 'terminal',
  },
];

/** Compressed WebP textures for WebGL only — never the full 117-book archive. */
export const BOOK_COVERS = [
  {
    src: '/textures/book-eternal-bloodline-1.webp',
    position: [2.55, 0.35, 2.85] as [number, number, number],
    rot: 0.25,
  },
  {
    src: '/textures/book-ashen-mage-ascendant-1.webp',
    position: [1.55, 0.32, 3.05] as [number, number, number],
    rot: -0.35,
  },
];

export const VINYL_COVERS = [
  {
    src: '/textures/vinyl-cocaine.webp',
    position: [3.85, 0.08, 1.55] as [number, number, number],
  },
  {
    src: '/textures/vinyl-eternal.webp',
    position: [3.95, 0.08, 0.55] as [number, number, number],
  },
];

export const PORTRAIT_TEXTURE = '/textures/portrait-lab.webp';
