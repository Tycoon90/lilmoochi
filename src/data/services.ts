/**
 * Every service the business actually sells, sourced from the previous site,
 * the Facebook page, the Instagram bio and the Alignable profile. The old site
 * published only two of these.
 *
 * `page` is null for services that live as a section on the commercial page
 * rather than as a page of their own.
 */
export type ServiceEntry = {
  slug: string;
  title: string;
  navTitle: string;
  /** One line, used on cards and in meta descriptions. */
  blurb: string;
  page: string | null;
};

export const services: ServiceEntry[] = [
  {
    slug: 'frameless-shower-doors',
    title: 'Frameless shower doors',
    navTitle: 'Frameless shower doors',
    blurb:
      'Heavy tempered glass with no surrounding metal frame — the cleanest way to open up a bathroom.',
    page: '/frameless-shower-doors/',
  },
  {
    slug: 'sliding-shower-doors',
    title: 'Sliding & bypass shower doors',
    navTitle: 'Sliding doors',
    blurb:
      'Single and double bypass panels that slide on a track, so nothing swings into a small bathroom.',
    page: '/sliding-shower-doors/',
  },
  {
    slug: 'framed-shower-doors-tub-enclosures',
    title: 'Framed shower doors & tub enclosures',
    navTitle: 'Framed doors & tub enclosures',
    blurb:
      'Framed glass in a finished metal surround — the most economical way to enclose a tub or shower.',
    page: '/framed-shower-doors-tub-enclosures/',
  },
  {
    slug: 'custom-mirrors',
    title: 'Custom mirrors',
    navTitle: 'Custom mirrors',
    blurb:
      'Mirrors cut and installed to your wall, including removal and disposal of the old glass.',
    page: '/custom-mirrors/',
  },
  {
    slug: 'shower-door-repair',
    title: 'Shower door repair & maintenance',
    navTitle: 'Repair & maintenance',
    blurb:
      'Rollers, hinges, handles, seals and re-alignment — repairs that avoid replacing the whole enclosure.',
    page: '/shower-door-repair/',
  },
  {
    slug: 'commercial-new-construction',
    title: 'Commercial & new construction glass',
    navTitle: 'Commercial & new construction',
    blurb:
      'Interior glass entry doors, privacy glass, splash panels, wine cellar glass and builder work.',
    page: '/commercial-new-construction/',
  },
];

/** Sub-services that appear as sections on the commercial page. */
export const commercialSections = [
  {
    id: 'interior-glass-entry-doors',
    title: 'Interior glass entry doors',
    source: 'Facebook',
  },
  {
    id: 'privacy-glass',
    title: 'Privacy glass for toilet enclosures',
    source: 'Facebook',
  },
  { id: 'splash-panels', title: 'Splash panels', source: 'Facebook' },
  { id: 'wine-cellar-glass', title: 'Wine cellar glass', source: 'Instagram' },
  {
    id: 'new-construction',
    title: 'New construction & builder work',
    source: 'Alignable',
  },
];
