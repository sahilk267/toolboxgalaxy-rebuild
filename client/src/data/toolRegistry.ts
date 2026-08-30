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
  | "imageResize"
  | "favicon"
  | "hash"
  | "passwordAudit"
  | "markdown"
  | "contrast"
  | "businessDays"
  | "timeZone"
  | "timestamp"
  | "textDiff"
  | "findReplace"
  | "splitBill"
  | "loanEmi"
  | "workShift"
  | "jsonCsv"
  | "csvViewer"
  | "imageTransform"
  | "lineSorter"
  | "imageMetadata";

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
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    category: "Create",
    description: "Turn an image into a locally generated square PNG icon.",
    kind: "favicon",
    accent: "lime",
    tags: ["Local", "Private"],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "Code & Text",
    description: "Create SHA-256, SHA-384, or SHA-512 digests locally.",
    kind: "hash",
    accent: "ember",
    tags: ["Local", "Private"],
  },
  {
    slug: "password-strength-auditor",
    name: "Password Strength Auditor",
    category: "Code & Text",
    description: "Check a password against clear local strength signals.",
    kind: "passwordAudit",
    accent: "sky",
    tags: ["Local", "Private"],
  },
  {
    slug: "markdown-workspace",
    name: "Markdown Workspace",
    category: "Code & Text",
    description: "Write Markdown, inspect a safe local preview, and export sanitized HTML.",
    kind: "markdown",
    accent: "violet",
    tags: ["Local", "Private"],
  },
  {
    slug: "color-contrast-checker",
    name: "Color Contrast Checker",
    category: "Create",
    description: "Check text and background colors against accessible contrast thresholds.",
    kind: "contrast",
    accent: "lime",
    tags: ["Local", "Verified"],
  },
  {
    slug: "business-days-calculator",
    name: "Business Days Calculator",
    category: "Calculate",
    description: "Count Monday–Friday dates in a selected range without a holiday feed.",
    kind: "businessDays",
    accent: "lime",
    tags: ["Local", "Verified"],
  },
  {
    slug: "time-zone-meeting-planner",
    name: "Time Zone Meeting Planner",
    category: "Convert",
    description: "Translate one local meeting time between common browser-supported zones.",
    kind: "timeZone",
    accent: "sky",
    tags: ["Local", "Private"],
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    category: "Convert",
    description: "Read a Unix timestamp as ISO, UTC, and your browser’s local time.",
    kind: "timestamp",
    accent: "violet",
    tags: ["Local", "Verified"],
  },
  {
    slug: "text-diff-checker",
    name: "Text Diff Checker",
    category: "Code & Text",
    description: "Compare two text blocks line by line, directly in your browser.",
    kind: "textDiff",
    accent: "ember",
    tags: ["Local", "Private"],
  },
  {
    slug: "find-replace-workspace",
    name: "Find / Replace Workspace",
    category: "Code & Text",
    description: "Replace literal text or simple regex matches without uploading a draft.",
    kind: "findReplace",
    accent: "sky",
    tags: ["Local", "Private"],
  },
  {
    slug: "split-bill-tip-calculator",
    name: "Split Bill & Tip",
    category: "Calculate",
    description: "Divide a bill and a chosen tip across a group in one local readout.",
    kind: "splitBill",
    accent: "ember",
    tags: ["Local", "Private"],
  },
  {
    slug: "loan-emi-estimate",
    name: "Loan / EMI Estimate",
    category: "Calculate",
    description: "Estimate a fixed-rate monthly payment from the amount, annual rate, and term.",
    kind: "loanEmi",
    accent: "lime",
    tags: ["Local", "Verified"],
  },
  {
    slug: "work-shift-duration",
    name: "Work Shift Duration",
    category: "Calculate",
    description: "Calculate paid time after an unpaid break, including an overnight shift.",
    kind: "workShift",
    accent: "sky",
    tags: ["Local", "Private"],
  },
  {
    slug: "json-csv-converter",
    name: "JSON ↔ CSV Converter",
    category: "Convert",
    description: "Convert a pasted flat JSON table or CSV table without uploading the data.",
    kind: "jsonCsv",
    accent: "violet",
    tags: ["Local", "Private"],
  },
  {
    slug: "csv-viewer-cleaner",
    name: "CSV Viewer & Cleaner",
    category: "Code & Text",
    description: "Inspect a pasted CSV table, trim cells, remove blank rows, and export a clean copy.",
    kind: "csvViewer",
    accent: "sky",
    tags: ["Local", "Private"],
  },
  {
    slug: "image-crop-rotate-convert",
    name: "Image Crop / Rotate / Convert",
    category: "Create",
    description: "Crop an explicitly chosen image, turn it by 90°, and export a local PNG, JPG, or WebP copy.",
    kind: "imageTransform",
    accent: "ember",
    tags: ["Local", "Private"],
  },
  {
    slug: "line-sorter-deduplicator",
    name: "Line Sorter & De-duplicator",
    category: "Code & Text",
    description: "Sort pasted lines, remove repeats, and retain only the cleanup choices you make in this tab.",
    kind: "lineSorter",
    accent: "sky",
    tags: ["Local", "Private"],
  },
  {
    slug: "image-metadata-remover",
    name: "Image Metadata Remover",
    category: "Create",
    description: "Create a clean local re-export without carrying the chosen image file’s metadata into the new output.",
    kind: "imageMetadata",
    accent: "violet",
    tags: ["Local", "Private"],
  },
];

export const categories = ["All", "Calculate", "Convert", "Code & Text", "Create"] as const;

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
