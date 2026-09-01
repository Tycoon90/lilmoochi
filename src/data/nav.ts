import { services } from './services';

export const primaryNav = [
  {
    label: 'Services',
    href: '/frameless-shower-doors/',
    children: services
      .filter((s) => s.page)
      .map((s) => ({ label: s.navTitle, href: s.page as string })),
  },
  { label: 'Gallery', href: '/gallery/', children: [] },
  { label: 'About', href: '/about/', children: [] },
  { label: 'Contact', href: '/contact/', children: [] },
];
