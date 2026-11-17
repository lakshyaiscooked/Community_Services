// Central place for site-wide settings. Later these will be editable from the admin dashboard.
export const site = {
  name: "Shree Jee Enterprises",
  /** Shows a thin "design template" strip at the top. Set to false at launch. */
  showTemplateBanner: true,
  /** Contact details: leave null until the owner supplies verified details. */
  contact: {
    phone: null as string | null,
    email: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Packaging & Boxes", href: "/packaging" },
    { label: "Printing & Branding", href: "/printing" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
