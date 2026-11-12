export interface PortfolioImage {
  /** Master file path relative to art-src, e.g. "cihangelerli/gallery/city-01.webp" */
  src: string;
  alt: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  thumbnail: PortfolioImage;
  gallery: PortfolioImage[];
  subtitle?: string;
  link?: {
    label: string;
    url: string;
  };
  description?: string;
}

export interface PortfolioCategory {
  id: string;
  label: string;
  description: string;
  projects: PortfolioProject[];
}

export interface PortfolioSocialLink {
  platform: string;
  label: string;
  description: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    nameLines: string[];
    roles: string[];
    roleSeparator: string;
    introduction: string;
  };
  about: {
    heading: string;
    facts: { label: string; value: string }[];
    skillsLabel: string;
    skills: string[];
    cvPrefix: string;
    cvLinkText: string;
    cvUrl: string;
  };
  onlinePresence: {
    heading: string;
    links: PortfolioSocialLink[];
  };
  categories: PortfolioCategory[];
  ui: {
    navigation: {
      portfolio: string;
      getInTouch: string;
      getInTouchUrl: string;
    };
    gallery: {
      rangeLabel: string;
      imagePosition: string;
      regionLabel: string;
      thumbnailRailLabel: string;
      thumbnailLabel: string;
    };
    footerCopyright: string;
  };
  seo: {
    canonicalPath: string;
    title: string;
    description: string;
    openGraphImage: string;
  };
}
