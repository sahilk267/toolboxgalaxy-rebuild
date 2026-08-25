// Orbital Workbench: typed registry for local-first, shared-hosting-safe tools.
export type ToolKind =
  | "calculator"
  | "percentage"
  | "unit"
  | "base64"
  | "json"
  | "password"
  | "textStats"
  | "color";

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
];

export const categories = ["All", "Calculate", "Convert", "Code & Text", "Create"] as const;

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
