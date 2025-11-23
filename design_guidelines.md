# Design Guidelines: AI-Powered Employee Portal

## Design Approach
**System:** Fluent Design (Microsoft) - Perfect alignment with Microsoft 365 ecosystem integration
**Supporting References:** Linear (clean task management), Notion (knowledge organization), Asana (dashboard clarity)

## Core Design Principles
- **Efficiency First:** Clear information hierarchy enabling rapid task completion
- **Consistent Patterns:** Familiar Microsoft-aligned interface reduces learning curve
- **Data Clarity:** Information-dense layouts without visual clutter
- **Enterprise Polish:** Professional aesthetic building trust and credibility

## Typography System
- **Primary Font:** Inter via Google Fonts (clean, highly legible for data)
- **Headings:** Font weights 600-700, sizes from text-2xl (dashboards) to text-4xl (page titles)
- **Body Text:** Font weight 400, text-base for content, text-sm for metadata/labels
- **Data/Numbers:** Font weight 500-600, tabular numbers for metrics and analytics

## Layout & Spacing
**Spacing Scale:** Tailwind units of 3, 4, 6, 8, 12, 16 (e.g., p-4, gap-6, my-8)
- Consistent padding: p-6 for cards, p-8 for main content areas
- Component spacing: gap-4 for tight groups, gap-6 for section separation
- Page margins: px-6 mobile, px-8 desktop with max-w-7xl containers

## Core Components

### Navigation
- **Top Navigation Bar:** Full-width with company logo, search bar, notifications, user profile
- **Sidebar Navigation:** Fixed left panel (280px) with collapsible sections: Dashboard, Knowledge Hub, Tasks, Analytics, Integrations
- **Breadcrumbs:** Below top nav for deep navigation clarity

### Dashboard Cards
- **Metric Cards:** Compact stat displays (icon + number + label + trend indicator)
- **Task Cards:** White background, subtle border, left accent line for priority
- **Document Cards:** Thumbnail + title + metadata + quick actions
- **Grid Layout:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-6

### Data Tables
- **Structure:** Sticky headers, alternating subtle row backgrounds, right-aligned actions
- **Columns:** Icon indicators, status badges, timestamp formatting
- **Pagination:** Bottom-aligned with items-per-page selector

### Forms & Inputs
- **Input Fields:** Full-width with floating labels, helper text below, clear validation states
- **Upload Areas:** Drag-and-drop zones with file preview thumbnails
- **Action Buttons:** Primary (solid), secondary (outlined), tertiary (ghost)
- **Search Bars:** Prominent placement with autocomplete dropdown

### Task Management
- **Task Lists:** Checkbox + title + assignee avatar + due date badge + priority indicator
- **Kanban Boards:** Column-based with drag-and-drop cards
- **Status Badges:** Pill-shaped with icon, using semantic status indicators

### Analytics Dashboards
- **Charts:** Clean bar/line charts using libraries like Chart.js or Recharts
- **Metrics Grid:** 3-4 column layout with large numbers and comparison indicators
- **Filters:** Top bar with date range picker, department selector, employee filter

### Modal Overlays
- **Dialog Boxes:** Centered, max-w-2xl, backdrop blur, slide-in animation
- **Side Panels:** Right-sliding for details/editing (w-96 to w-1/3)
- **Notifications:** Top-right toast stack, auto-dismiss with action buttons

### Mobile Optimization
- **Responsive Navigation:** Hamburger menu collapses sidebar
- **Touch Targets:** Minimum 44px height for all interactive elements
- **Stack Layout:** Single column on mobile, prioritize critical actions

## Images
No hero images needed. Include:
- **Employee Avatars:** Circular, 32px-40px in lists, 64px+ in profiles
- **Document Thumbnails:** Square, 80px-120px in grid views
- **Empty States:** Simple illustrations for empty dashboards/lists
- **Company Logo:** Top nav, maintain brand sizing guidelines

## Accessibility
- WCAG AA contrast ratios minimum
- Keyboard navigation throughout (focus states visible)
- Screen reader labels for icons and actions
- Form validation with clear error messaging

## Animation Philosophy
Minimal, purposeful motion:
- Subtle hover states (opacity/border changes)
- Smooth page transitions (150-200ms)
- Loading skeletons for data fetching
- No autoplay animations or distracting effects