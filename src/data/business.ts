/**
 * Single source of truth for business data.
 *
 * Nothing in this file may be hardcoded into a template. Import from here for
 * page copy, schema.org JSON-LD, link targets and meta tags alike, so that a
 * change to the phone number or address propagates everywhere at once.
 *
 * NAME: "New Shower Doors Unlimited" is used verbatim, with zero variation.
 * The business currently appears across the web in five different forms, and
 * that inconsistency suppresses local search rankings. Do not add "Inc." or
 * "Corp.", do not abbreviate, do not re-pluralize.
 */
export const business = {
  name: 'New Shower Doors Unlimited',
  owner: 'Alberto Alvarez',
  street: '3133 Egremont Dr',
  city: 'West Palm Beach',
  state: 'FL',
  zip: '33406',
  country: 'US',
  phone: '(561) 547-0702',
  phoneRaw: '+15615470702',
  email: 'Albertoc8604@gmail.com',
  hours: 'Monday–Friday, 8:00am–5:00pm',
  yearsExperience: 15,
  instagram: 'https://www.instagram.com/newshowerdoorsunlimitedcorp/',
  facebook: 'https://www.facebook.com/showerdoorsunlimited/',
  serviceAreas: ['Palm Beach County', 'Broward County', 'Miami-Dade County'],
} as const;

/** Canonical origin. Domain spelling deliberately differs from the name. */
export const SITE = 'https://showersdoorunlimited.com';

/**
 * The brand tagline, set beneath the wordmark in the company logo.
 * Rendered as real text wherever it appears — text inside the logo image is
 * not readable by search engines or screen readers.
 */
export const brandTagline = 'Premium glass. Elevated living.';

/** Operational tagline carried over from the previous site — client's words. */
export const tagline = 'Installed by Highly Trained and Skilled Technicians';

/**
 * Machine-readable opening hours for schema.org.
 * TODO: confirm with client — Yelp shows Friday closed, the previous site said
 * Monday through Friday. `business.hours` and this array must be changed
 * together if the answer is Monday–Thursday.
 */
export const openingHours = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
];

/**
 * Approximate coordinates for the West Palm Beach service base.
 * TODO: confirm with client — geo should match the address that is finally
 * published, and should be removed alongside the address if the client
 * chooses service-area-only visibility.
 */
export const geo = { latitude: 26.6612, longitude: -80.0967 };

export const formattedAddress =
  `${business.street}, ${business.city}, ${business.state} ${business.zip}`;

/** Service-area string used in body copy, e.g. "Palm Beach, Broward and Miami-Dade counties". */
export const serviceAreaSentence =
  'Palm Beach, Broward and Miami-Dade counties';
