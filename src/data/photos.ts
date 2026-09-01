/**
 * Photo slots.
 *
 * Each entry is a *slot* on the site: a place a photograph appears, the
 * subject that belongs there, and the alt text that describes it. The legacy
 * file that should fill each slot is recorded in `legacy`.
 *
 * IMPORTANT — alt text and verification
 * The legacy photographs could not be retrieved in the build environment (the
 * old host is blocked by egress policy), so nobody has yet compared each
 * legacy file against the slot it is assigned to. The alt text below describes
 * the subject each slot is *meant* to show. Once `npm run migrate:images` has
 * run, someone must open each photograph and confirm two things:
 *   1. the file actually shows the subject named in `alt`; and
 *   2. any detail in the alt text (hardware finish, room, glass type) is true.
 * Where a photo does not match, either move the file to a different slot or
 * correct the alt text. Do not leave alt text that describes something the
 * photograph does not show — that is worse than no alt text at all.
 *
 * `altVerified` is false for every entry until that pass happens.
 */
export type PhotoSlot = {
  /** Filename written into src/assets/photos/. */
  file: string;
  alt: string;
  /** Path on the old WordPress site this should be sourced from. */
  legacy: string;
  altVerified: boolean;
};

export const photoSlots: PhotoSlot[] = [
  {
    file: 'home-hero.jpg',
    alt: 'Frameless glass shower enclosure installed in a West Palm Beach bathroom',
    legacy: '/wp-content/uploads/2022/12/IMG_5147.jpg',
    altVerified: false,
  },
  {
    file: 'frameless-hero.jpg',
    alt: 'Clear frameless glass shower enclosure with a single hinged door in a Palm Beach County home',
    legacy: '/wp-content/uploads/2022/12/IMG_5147-1.jpg',
    altVerified: false,
  },
  {
    file: 'frameless-corner.jpg',
    alt: 'Corner frameless shower enclosure with two fixed glass panels meeting at a polished edge',
    legacy: '/wp-content/uploads/2022/12/IMG_4158-1.jpg',
    altVerified: false,
  },
  {
    file: 'frameless-hardware.jpg',
    alt: 'Close view of shower door hardware holding a heavy tempered glass panel',
    legacy: '/wp-content/uploads/2022/12/IMG_4006.jpg',
    altVerified: false,
  },
  {
    file: 'sliding-doors.jpg',
    alt: 'Double sliding bypass shower doors on a track over a bathtub',
    legacy: '/wp-content/uploads/2022/12/shower.jpg',
    altVerified: false,
  },
  {
    file: 'framed-enclosure.jpg',
    alt: 'Framed glass tub enclosure with a finished metal surround',
    legacy:
      '/wp-content/uploads/2022/12/A350AC76-FA1C-47FF-BD3B-F571F9B550B6.jpg',
    altVerified: false,
  },
  {
    file: 'custom-mirror.jpg',
    alt: 'Custom cut wall mirror installed above a bathroom vanity',
    legacy:
      '/wp-content/uploads/2022/12/BABD1A4D-25AB-4AB3-91F8-DCC9E53485BB-1.jpg',
    altVerified: false,
  },
  {
    file: 'install-detail.jpg',
    alt: 'Glass shower panel being set into place during installation',
    legacy:
      '/wp-content/uploads/2022/12/D8623914-EF37-4DE8-96EF-3E7044B4C423-1.jpg',
    altVerified: false,
  },
  {
    file: 'gallery-01.jpg',
    alt: 'Completed glass shower enclosure in a South Florida bathroom',
    legacy:
      '/wp-content/uploads/2022/12/01201234-800D-48C5-8808-4960DE0A164C.jpg',
    altVerified: false,
  },
  {
    file: 'gallery-02.jpg',
    alt: 'Glass shower door installation finished in a residential bathroom',
    legacy:
      '/wp-content/uploads/2022/12/641D7DE4-48E8-479A-B97D-57D428B8C08F.jpg',
    altVerified: false,
  },
  {
    file: 'about-work.jpg',
    alt: 'Shower door and enclosure work by New Shower Doors Unlimited',
    legacy: '/wp-content/uploads/2022/12/IMG_4713.jpg',
    altVerified: false,
  },
];

/** The logo is a PNG on the old site and goes to public/, not the pipeline. */
export const legacyLogo = '/wp-content/uploads/2022/12/IMG_4713.png';

/** Look up alt text by slot filename, so it is written in exactly one place. */
export const altFor = (file: string): string => {
  const slot = photoSlots.find((p) => p.file === file);
  if (!slot) throw new Error(`No photo slot registered for "${file}"`);
  return slot.alt;
};
