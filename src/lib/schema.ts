/**
 * JSON-LD builders. Every node is generated from src/data/business.ts so the
 * markup can never drift from the copy on the page.
 */
import { business, SITE, openingHours, geo } from '~/data/business';

const abs = (path: string) =>
  new URL(path, SITE).href;

/** Stable node id so other schema can reference the same business entity. */
export const BUSINESS_ID = `${SITE}/#business`;

/**
 * HomeAndConstructionBusiness — a subtype of LocalBusiness. Emitted on every
 * page. Deliberately carries no aggregateRating or review: see reviews.ts.
 */
export function localBusiness() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: business.name,
    url: SITE + '/',
    telephone: business.phoneRaw,
    email: business.email,
    founder: { '@type': 'Person', name: business.owner },
    image: abs('/images/og-default.jpg'),
    logo: abs('/images/brand/logo-full.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: business.country,
    },
    geo: { '@type': 'GeoCoordinates', ...geo },
    openingHoursSpecification: openingHours,
    // priceRange is a coarse band, not a quoted figure.
    priceRange: '$$-$$$',
    areaServed: business.serviceAreas.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    sameAs: [business.facebook, business.instagram],
  };
}

export function service(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: abs(opts.url),
    provider: { '@id': BUSINESS_ID },
    areaServed: business.serviceAreas.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  };
}

export type Faq = { q: string; a: string };

export function faqPage(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export type Crumb = { name: string; url: string };

export function breadcrumbs(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  };
}

export function imageObject(opts: {
  url: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return {
    '@type': 'ImageObject',
    contentUrl: abs(opts.url),
    caption: opts.caption,
    ...(opts.width ? { width: opts.width } : {}),
    ...(opts.height ? { height: opts.height } : {}),
    creator: { '@id': BUSINESS_ID },
  };
}

/** Wraps nodes into one @graph document. */
export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
