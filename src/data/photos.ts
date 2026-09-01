/**
 * Photo slots.
 *
 * Each entry is a *slot* on the site: a place a photograph appears, the
 * subject that belongs there, and the alt text that describes it.
 *
 * `altVerified: true` means someone has actually looked at the photograph and
 * confirmed the alt text describes what is in it. Four slots are filled and
 * verified — the client supplied those photographs directly, and the alt text
 * below was written from the images themselves, naming the hardware finish,
 * the configuration and the tile that are genuinely visible in each.
 *
 * The remaining slots are still empty. Their alt text describes the subject
 * the slot is *meant* to hold and stays `altVerified: false` until a real
 * photograph is in place and has been checked. Alt text describing something a
 * photograph does not show is worse than no alt text.
 *
 * NOTE ON SUBJECT MATCHING: every supplied photograph shows a *frameless*
 * enclosure. None of them are placed on the sliding, framed or custom mirror
 * pages, because using a frameless photo to sell a framed door misrepresents
 * the product a customer is reading about.
 *
 * `legacy` is the path on the old WordPress site that should fill a slot;
 * `npm run migrate:images` reads it. It is null where the slot is already
 * filled.
 */
export type PhotoSlot = {
  /** Filename written into src/assets/photos/. */
  file: string;
  alt: string;
  /** Path on the old WordPress site, or null if the slot is already filled. */
  legacy: string | null;
  altVerified: boolean;
};

export const photoSlots: PhotoSlot[] = [
  {
    file: 'home-hero.jpg',
    alt: 'Frameless glass shower enclosure with polished chrome hardware, a built-in corner bench and a herringbone marble mosaic floor',
    legacy: null,
    altVerified: true,
  },
  {
    file: 'frameless-hero.jpg',
    alt: 'Neo-angle frameless glass shower enclosure with matte black clamps and support bar, white subway tile and a grey hexagon mosaic floor',
    legacy: null,
    altVerified: true,
  },
  {
    file: 'frameless-corner.jpg',
    alt: 'Frameless glass shower enclosure with a glass ceiling panel and matte black clamps, fitted under a sloped ceiling',
    legacy: null,
    altVerified: true,
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
    alt: 'Hinged glass shower enclosure with chrome hardware, beside a wood-grain floating vanity and a wall-width mirror',
    legacy: null,
    altVerified: true,
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
