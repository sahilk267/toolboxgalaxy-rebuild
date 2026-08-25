// Orbital Workbench: typed registry for local-first, shared-hosting-safe tools.
export type ToolKind =
  | "calculator"
  | "percentage"
  | "unit"
  | "base64"
  | "json"
  | "password"
  | "textStats"
  | "color"
  | "bmi"
  | "discount"
  | "age"
  | "dateDiff"
  | "url"
  | "html"
  | "textCase"
  | "uuid"
  | "gradient"
  | "qr"
  | "imageResize";

export type ToolDefinition = {
  slug: string;
  name: string;
  category: "Calculate" | "Convert" | "Code & Text" | "Create";
  description: string;
  kind: ToolKind;
  accent: "lime" | "ember" | "sky" | "violet";
  tags: string[];
};

export const tools: ToolDefinition[] = [
  {
    slug: "basic-calculator",
    name: "Basic Calculator",
    category: "Calculate",
    description: "Clear, local arithmetic for everyday decisions.",
    kind: "calculator",
    accent: "lime",
    tags: ["Local", "Verified"],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Calculate",
    description: "Find a percentage, a part of a total, or a percentage change.",
    kind: "percentage",
    accent: "ember",
    tags: ["Local", "Verified"],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    category: "Convert",
    description: "Convert common length units without a server round-trip.",
    kind: "unit",
    accent: "sky",
    tags: ["Local", "Verified"],
  },
  {
    slug: "base64-workbench",
    name: "Base64 Workbench",
    category: "Convert",
    description: "Encode or decode UTF-8 text in your browser.",
    kind: "base64",
    accent: "violet",
    tags: ["Local", "Private"],
  },
  {
    slug: "json-station",
    name: "JSON Station",
    category: "Code & Text",
    description: "Format and validate JSON with readable errors.",
    kind: "json",
    accent: "lime",
    tags: ["Local", "Verified"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Create",
    description: "Create a strong password with browser-grade randomness.",
    kind: "password",
    accent: "ember",
    tags: ["Local", "Private"],
  },
  {
    slug: "text-statistics",
    name: "Text Statistics",
    category: "Code & Text",
    description: "Count words, characters, lines, and reading time at a glance.",
    kind: "textStats",
    accent: "sky",
    tags: ["Local", "Verified"],
  },
  {
    slug: "color-signal",
    name: "Color Signal",
    category: "Create",
    description: "Inspect a HEX color and pull out a practical RGB reference.",
    kind: "color",
    accent: "violet",
    tags: ["Local", "Verified"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "Calculate",
    description: "Calculate body mass index using height and weight inputs.",
    kind: "bmi",
    accent: "lime",
    tags: ["Local", "Verified"],
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "Calculate",
    description: "See the final price and savings before you buy.",
    kind: "discount",
    accent: "ember",
    tags: ["Local", "Verified"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "Calculate",
    description: "Find an age in years, months, and days from a date of birth.",
    kind: "age",
    accent: "sky",
    tags: ["Local", "Private"],
  },
  {
    slug: "date-difference",
    name: "Date Difference",
    category: "Calculate",
    description: "Measure the calendar distance between two dates.",
    kind: "dateDiff",
    accent: "violet",
    tags: ["Local", "Verified"],
  },
  {
    slug: "url-workbench",
    name: "URL Encoder / Decoder",
    category: "Code & Text",
    description: "Encode or decode URL-safe text directly in your browser.",
    kind: "url",
    accent: "lime",
    tags: ["Local", "Private"],
  },
  {
    slug: "html-entity-tool",
    name: "HTML Entity Encoder / Decoder",
    category: "Code & Text",
    description: "Encode or decode HTML entities without a remote service.",
    kind: "html",
    accent: "ember",
    tags: ["Local", "Private"],
  },
  {
    slug: "text-case-tool",
    name: "Text Case Tool",
    category: "Code & Text",
    description: "Shift text between readable and developer-friendly cases.",
    kind: "textCase",
    accent: "sky",
    tags: ["Local", "Verified"],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "Create",
    description: "Generate UUID v4 values using browser cryptography.",
    kind: "uuid",
    accent: "violet",
    tags: ["Local", "Private"],
  },
  {
    slug: "gradient-forge",
    name: "Gradient Forge",
    category: "Create",
    description: "Build a two-stop CSS linear gradient and copy the code.",
    kind: "gradient",
    accent: "lime",
    tags: ["Local", "Verified"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "Create",
    description: "Generate a shareable QR image locally from text or a link.",
    kind: "qr",
    accent: "ember",
    tags: ["Local", "Private"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    category: "Create",
    description: "Resize and compress images locally with controlled export settings.",
    kind: "imageResize",
    accent: "sky",
    tags: ["Local", "Private"],
  },
];

export const categories = ["All", "Calculate", "Convert", "Code & Text", "Create"] as const;

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
