// Timeline unit widths for each view mode
export const TIMELINE_COLUMN_WIDTHS = {
  day: 40,
  week: 80,
  month: 120,
} as const;

// Timeline label formats per view mode
export const TIMELINE_LABEL_FORMATS = {
  day: { weekday: "short", day: "numeric" },        // e.g. Mon 24
  week: { week: true },                             // custom, e.g. Week 43
  month: { month: "short", year: "numeric" },       // e.g. Oct 2024
} as const;

// Timeline left panel width (pixels)
export const TIMELINE_LEFT_PANEL_WIDTH = 200;

// Timeline row heights (pixels)
export const TIMELINE_ROW_HEIGHT = 32;
export const TIMELINE_MILESTONE_HEIGHT = 24;

// Colors (match your Tailwind config)
export const TIMELINE_COLORS = {
  primary: "#0ea5e9",
  secondary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  neutral: "#e5e7eb"
} as const;

// Responsive breakpoints
export const RESPONSIVE_BREAKPOINTS = {
  sm: 640,      // Large mobile
  md: 768,      // Tablet
  lg: 1024,     // Desktop
  xl: 1280,     // Large desktop
} as const;

// Z-indexes for layering grid/items/lines
export const Z_INDEX = {
  grid: 1,
  dependencyLine: 2,
  item: 5,
  sidebar: 10,
  modal: 50
} as const;

// Timeline controls
export const TIMELINE_VIEW_MODES = ["day", "week", "month"] as const;
export type TimelineViewMode = typeof TIMELINE_VIEW_MODES[number];
