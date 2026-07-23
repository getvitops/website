import type { HTMLTag, Polymorphic } from "astro/types";

// -------------------------------------------------------------------------
// i18n
// -------------------------------------------------------------------------

/** Plain string (defaultLocale) or locale map, e.g. { "en-CA": "Hello", "fr-CA": "Bonjour" } */
export type Localizable = string | Record<string, string>;

// -------------------------------------------------------------------------
// Customisation primitives
// -------------------------------------------------------------------------

/** HTML attributes applied to any element */
export type Attrs = Record<string, string | number | boolean>;

// -------------------------------------------------------------------------
// Icons
// -------------------------------------------------------------------------

export interface IconsConfig {
  /** astro-icon prefix for UI icons: 'fa7-solid' | 'fa7-regular' | 'material-symbols' | 'lucide' */
  ui?: string;
  /** astro-icon prefix for brand icons: 'simple-icons' | 'fa7-brands' */
  brand?: string;
  /** Semantic icon names to include (resolved via ui and brand prefix maps). Omit to include all. */
  semantic?: string[];
  /** Per-set explicit icon name lists, keyed by astro-icon prefix (e.g. 'fa7-solid', 'material-symbols') */
  [prefix: string]: string | string[] | undefined;
}

/** Interactive trigger element for disclosure patterns */
export interface Trigger {
  label: Localizable;
  icon?: string;
  attrs?: Attrs;
}

// -------------------------------------------------------------------------
// Presentation types — discriminated union on `as`
// -------------------------------------------------------------------------

// -- Disclosure (toggleable visibility) --

/** Popover API + CSS Anchor Positioning (positioned relative to trigger) */
export interface DropdownPresentationType {
  as: "dropdown";
  attrs?: Attrs;
  parts?: Record<string, Attrs>;
  type?: "auto" | "manual";
  anchorName?: string;
  positionArea?: string;
}

/** Link + separate popover trigger (label navigates, icon toggles dropdown) */
export interface SplitLinkPresentationType {
  as: "split-link";
  attrs?: Attrs;
  parts?: Record<string, Attrs>;
  type?: "auto" | "manual";
  anchorName?: string;
  positionArea?: string;
}

/** Popover API (viewport/container edge slide-in) */
export interface DrawerPresentationType {
  as: "drawer";
  attrs?: Attrs;
  parts?: Record<string, Attrs>;
  placement?: "left" | "right" | "top" | "bottom";
  breakpoint?: string;
  trigger: Trigger;
  maxWidth?: string;
  maxHeight?: string;
}

/** Popover API / <dialog> (viewport/container centered) */
export interface DialogPresentationType {
  as: "dialog";
  attrs?: Attrs;
  parts?: Record<string, Attrs>;
  modal?: boolean;
  trigger?: Trigger;
}

/** <details> element (standalone or grouped via name) */
export interface AccordionPresentationType {
  as: "accordion";
  attrs?: Attrs;
  parts?: Record<string, Attrs>;
  name?: string;
}

export type DisclosurePresentationType =
  | DropdownPresentationType
  | SplitLinkPresentationType
  | DrawerPresentationType
  | DialogPresentationType
  | AccordionPresentationType;

// -- Layout (always visible) --

/** Horizontal navigation bar */
export interface NavbarPresentationType {
  as: "navbar";
  attrs?: Attrs;
  parts?: Record<string, Attrs>;
  sticky?: boolean;
  background?: string;
}

/** Vertically stacked layout */
export interface StackedPresentationType {
  as: "stacked";
  attrs?: Attrs;
  parts?: Record<string, Attrs>;
}

export type LayoutPresentationType = NavbarPresentationType | StackedPresentationType;

/** Presentation type — determines which HTML structure/pattern a renderer uses */
export type PresentationType = DisclosurePresentationType | LayoutPresentationType;

// -------------------------------------------------------------------------
// Node tree format  — { tag, attrs, children }
// -------------------------------------------------------------------------

export interface ElementNode {
  tag: string;
  attrs?: Attrs;
  /** Shorthand for children: ["string"] on leaf elements. Localizable. */
  text?: Localizable;
  children?: ContentNode[];
}

/** A node is either an element, or a plain string (text node, also Localizable) */
export type ContentNode = ElementNode | string;

// -------------------------------------------------------------------------
// Images
// -------------------------------------------------------------------------

/** Image reference: path string (relative to src/) or object with metadata */
export type ImageRef =
  | string
  | {
      src: string;
      alt: Localizable;
      width?: number;
      height?: number;
    };

// -------------------------------------------------------------------------
// Navigation
// -------------------------------------------------------------------------

export interface LinkBase<T = Link> {
  href: string;
  icon?: string;
  class?: string;
  style?: string;
  attrs?: Attrs;
  itemAttrs?: Attrs;
  children?: T[];
  submenu?: {
    present?: DisclosurePresentationType;
    items: Link<T>[];
  };
}

export interface TextLink<T = Link> extends LinkBase<T> {
  label: Localizable;
}

export interface ImageLink<T = Link> extends LinkBase<T> {
  image: ImageRef;
}

/** Any link — text or image — with links as children all the way down. A type
 * parameter can't default to the type being declared (TS2716), so the
 * self-referential default lives in this separate alias. */
export type AnyLink = TextLink<AnyLink> | ImageLink<AnyLink>;

export type Link<T = AnyLink> = TextLink<T> | ImageLink<T>;

// -------------------------------------------------------------------------
// Tags
// -------------------------------------------------------------------------

export interface TagDef {
  label: Localizable;
  description?: Localizable;
  icon?: string;
  color?: string;
  parent?: string;
}

// -------------------------------------------------------------------------
// Locations
// -------------------------------------------------------------------------

export interface LocationAddress {
  street: string;
  city: string;
  province?: string;
  postalCode?: string;
  country: string;
}

export interface LocationHours {
  weekdays?: string;
  weekend?: string;
}

export interface Location {
  slug: Localizable;
  name?: Localizable;
  email?: string;
  phone?: string;
  address: LocationAddress;
  geo?: { latitude: number; longitude: number };
  hours?: LocationHours;
  type?: string;
  description?: Localizable;
  areaServed?: string[];
  priceRange?: string;
  paymentAccepted?: string[];
  currenciesAccepted?: string;
  knowsLanguage?: string[];
}

// -------------------------------------------------------------------------
// Contact (company-level, separate from physical locations)
// -------------------------------------------------------------------------

/** Resolved company-level contact information */
export interface Contact {
  name?: string;
  email?: string;
  phone?: string;
  address?: LocationAddress;
}

/** Config value: either a location key (string) or an inline Contact object */
export type ContactConfig = string | Contact;

// -------------------------------------------------------------------------
// Services & Offers
// -------------------------------------------------------------------------

export interface Offer {
  name: Localizable;
  description?: Localizable;
  price?: string;
  priceCurrency?: string;
  priceSpecification?: {
    type?: string;
    billingDuration?: string;
  };
}

export interface Service {
  name: Localizable;
  description?: Localizable;
  slug?: Localizable;
  offers?: Offer[];
}

// -------------------------------------------------------------------------
// Galleries
// -------------------------------------------------------------------------

export interface GalleryImage {
  src: string;
  alt: Localizable;
  caption?: Localizable;
}

export interface Gallery {
  title: Localizable;
  tags?: string[];
  images: GalleryImage[];
}

// -------------------------------------------------------------------------
// Testimonials
// -------------------------------------------------------------------------

export interface Testimonial {
  quote: Localizable;
  name: Localizable;
  role?: Localizable;
  image?: ImageRef;
  rating?: number;
  date?: string;
}

export interface TestimonialGroup {
  title?: Localizable;
  tags?: string[];
  items: Testimonial[];
}

// -------------------------------------------------------------------------
// Templates
// -------------------------------------------------------------------------

export interface NavTemplate {
  type: "nav";
  tags?: string[];
  present?: DrawerPresentationType | NavbarPresentationType;
  attrs?: Attrs;
  items: Link[];
}

export interface FormField {
  name: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "number"
    | "url"
    | "date";
  label: Localizable;
  required?: boolean;
  validation?: string;
  attrs?: Attrs;
  options?: string | { label: Localizable; value: string }[];
}

export interface FormTemplate {
  type: "form";
  tags?: string[];
  present?: StackedPresentationType;
  attrs?: Attrs;
  action: string;
  method?: "GET" | "POST";
  fields: FormField[];
  submit?: {
    label: Localizable;
    attrs?: Attrs;
  };
  honeypot?: boolean;
}

export interface NodeTemplate {
  type: "nodes";
  tags?: string[];
  attrs?: Attrs;
  nodes: ContentNode[];
}

export type Template = NavTemplate | FormTemplate | NodeTemplate;

// -------------------------------------------------------------------------
// Tracking
// -------------------------------------------------------------------------

/** Ad platform click IDs and UTM parameters captured from landing page URL */
export interface TrackingData {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  ttclid?: string;
  rdt_cid?: string;
  ScCid?: string;
  msclkid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landingPage?: string;
  referrer?: string;
  ts?: number;
}

/** Tracking configuration from site.config.yaml */
export interface TrackingConfig {
  enabled: boolean;
  notifications: {
    email?: string;
  };
  platforms?: string[];
}

// -------------------------------------------------------------------------
// Environments
// -------------------------------------------------------------------------

export interface EnvironmentConfig {
  url: string;
  api?: string;
  analytics: boolean;
  robots: string;
  variant?: string;
}

// -------------------------------------------------------------------------
// A/B Testing
// -------------------------------------------------------------------------

export interface ABVariant {
  environment: string;
  description?: string;
  overrides?: Record<string, any>;
}

export interface ABTestingConfig {
  enabled: boolean;
  cookieName: string;
  cookieMaxAge: number;
  splitRatio: number;
  variants: Record<string, ABVariant>;
}

// -------------------------------------------------------------------------
// Astro-specific types
// -------------------------------------------------------------------------

export type Props<Tag extends HTMLTag> = Polymorphic<{ as: Tag }>;

/**
 * Custom Element interface
 */
export type Elmnt<T, Tag extends HTMLTag = "div"> = Polymorphic<{
  type: "element";
  as: Tag;
  children: T[];
}>;
