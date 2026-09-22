export const skillGroups = [
  {
    title: 'Pharmacy & Healthcare',
    items: [
      'Clinical pharmacy foundations',
      'Pharmaceutical sciences',
      'Patient-care intern mindset',
      'Medical literacy for product work',
    ],
  },
  {
    title: 'AI & Software',
    items: [
      'AI product thinking',
      'Prompt & workflow design',
      'Android app development',
      'Web / Next.js portfolios',
      'Product prototyping',
    ],
  },
  {
    title: 'Writing & Narrative',
    items: [
      'Long-form fiction series',
      'Worldbuilding',
      'Non-fiction clarity writing',
      'Editorial revision',
    ],
  },
  {
    title: 'Music & Creative',
    items: [
      'Original singles',
      'Release workflow',
      'Creative direction',
      'Cross-media storytelling',
    ],
  },
] as const;

export const domains = [
  {
    id: 'pharmacy',
    title: 'Pharmacy & Healthcare',
    description:
      'Pharm.D training, B.Pharm foundation, and intern experience — building with clinical empathy and scientific rigor.',
    href: '/about/',
  },
  {
    id: 'ai',
    title: 'AI & Software',
    description:
      'AI writing tools, Android utilities, and experimental product systems that turn ideas into shippable prototypes.',
    href: '/work/',
  },
  {
    id: 'writing',
    title: 'Writing & Books',
    description:
      'Multi-series fiction on Amazon and clear-thinking non-fiction — stories that explore fate, power, and rebirth.',
    href: '/writing/',
  },
  {
    id: 'music',
    title: 'Music',
    description:
      'Original singles on Spotify — emotional, dark, and experimental tracks under Anuj Budhwar.',
    href: '/music/',
  },
] as const;
