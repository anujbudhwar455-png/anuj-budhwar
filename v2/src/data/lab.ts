export type LabItem = {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
};

export const labItems: LabItem[] = [
  {
    id: 'ai-writing-pipelines',
    title: 'AI writing pipelines',
    description:
      'Exploring structured prompts, lore databases, and revision loops for long-form fiction tools like Loreloom.',
    status: 'Active experiment',
    tags: ['AI', 'Writing', 'Product'],
  },
  {
    id: 'pharmacy-learning-ux',
    title: 'Pharmacy learning UX',
    description:
      'Prototyping study flows for pharmacy education — spaced revision, concept maps, and clinical reasoning drills.',
    status: 'In development',
    tags: ['Pharmacy', 'Android', 'Education'],
  },
  {
    id: 'android-utilities',
    title: 'Android utilities sandbox',
    description:
      'Small Android experiments including PDF tooling and gaming GFX helpers. Closed testing for PDF Merger; others remain early.',
    status: 'Mixed maturity',
    tags: ['Android', 'Product'],
  },
  {
    id: 'desrein-sim',
    title: 'Desrein simulation sketches',
    description:
      'Concept sketches for simulation / Web3 narrative systems. Explicitly not a live chain product or investment vehicle.',
    status: 'Concept only',
    tags: ['Web3', 'Simulation'],
  },
  {
    id: 'music-production',
    title: 'Music production experiments',
    description:
      'Singles production, vocal processing, and release workflow for the Spotify catalog.',
    status: 'Ongoing',
    tags: ['Music', 'Creative'],
  },
  {
    id: 'portfolio-systems',
    title: 'Portfolio & publishing systems',
    description:
      'This site itself — static Next.js export, catalog-driven books/music, and maintainable public content architecture.',
    status: 'Shipped / iterating',
    tags: ['Web', 'Design'],
  },
];
