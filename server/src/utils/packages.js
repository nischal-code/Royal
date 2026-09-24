// Mirrors src/data/plannerData.js on the frontend (id -> display name only —
// this backend doesn't need the descriptions/PDFs, just a label for emails).
export const PACKAGE_NAMES = {
  wedding: 'Wedding Package',
  reception: 'Reception Package',
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
  diamond: 'Diamond',
};

export const pkgLabel = (id) => PACKAGE_NAMES[id] || id || '—';
