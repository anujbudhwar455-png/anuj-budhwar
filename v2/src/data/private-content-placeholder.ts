/**
 * PRIVATE vs PUBLIC content model.
 * Only PUBLIC fields ship on the site. Never put secrets, phone, address,
 * API keys, patient data, or financial info here or anywhere in the repo.
 */
export const privateContentModel = {
  REQUIRED: {
    name: 'Anuj Budhwar',
    emailPublic: 'anujbudhwar455@gmail.com',
    locationPublic: 'Rohtak, Haryana, India',
    education: [
      'Pharm.D (PB) — NIMS',
      'B.Pharm — Baba Mastnath University, Rohtak',
    ],
  },
  OPTIONAL: {
    phone: 'NOT PROVIDED — do not invent',
    physicalAddress: 'NOT PROVIDED — do not invent',
    resumePdf: 'NOT PROVIDED',
    testimonials: 'NOT PROVIDED',
    clientLogos: 'NOT PROVIDED',
    pressQuotes: 'NOT PROVIDED',
  },
  NOT_PROVIDED: [
    'Phone number',
    'Home / postal address',
    'API keys / tokens / secrets',
    'Patient or clinical data',
    'Financial / banking information',
    'Private DMs or unpublished drafts',
  ],
} as const;
