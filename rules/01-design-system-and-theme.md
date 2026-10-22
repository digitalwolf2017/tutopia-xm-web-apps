# Rule 01: Tutopia Design System & Brand Theme

## 1. Brand Color Palette & CSS Variables
All UI components built for Tutopia Exam must strictly adhere to the following color palette extracted from the mobile reference screens:

| Name | Hex Code | Tailwind Token | CSS Variable (HSL) | Purpose / UI Placement |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Primary (Tutopia Blue)** | `#0284C7` | `sky-600` / `blue-600` | `hsl(204, 100%, 39%)` | Primary CTA buttons ("Buy now", "Edit Profile", "Chapter wise MCQ"), active navigation tab, primary icon accents. |
| **Brand Accent (Tutopia Gold/Yellow)** | `#F59E0B` | `amber-500` / `yellow-500` | `hsl(43, 96%, 50%)` | Secondary CTA ("Subscriptions", "Explore" border), promo banner accents, secondary card bottom borders. |
| **Soft Blue Tint (Light)** | `#E0F2FE` | `sky-100` | `hsl(204, 94%, 94%)` | "Competitive Exam" banner background, badge backgrounds, search bar active outlines. |
| **Page Background** | `#F8FAFC` | `slate-50` | `hsl(210, 40%, 98%)` | Main screen and body background (soft neutral grey). |
| **Card / Surface** | `#FFFFFF` | `white` | `hsl(0, 0%, 100%)` | Elevated content cards, search input surface, dialogs. |
| **Text Primary** | `#0F172A` | `slate-900` | `hsl(222, 47%, 11%)` | Headings, user name ("Abhilash Bera"), exam titles, subject labels. |
| **Text Muted** | `#64748B` | `slate-500` | `hsl(215, 16%, 47%)` | Subtitles ("0 chapter", "Last attempted: 27-09-2030", "Duration 03:00 Hrs"). |
| **Card Borders / Dividers** | `#E2E8F0` | `slate-200` | `hsl(214, 32%, 91%)` | Card borders, dashed lines, menu dividers. |

---

## 2. Signature Visual Motifs
1. **Clean Neutral Card Borders (No Bottom Colored Stripes)**:
   - Cards use clean, modern neutral borders: `border border-slate-200/80 rounded-md` with subtle elevation on hover (`hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`).
   - Category differentiation is achieved via compact badge pills and subtle tinted icon containers rather than colored bottom stripes.
2. **Promotional Banners**:
   - Banners support bilingual copy (Bengali and English) with high-contrast text and a prominent price callout (e.g. `মাত্র ₹১৯৯৯ টাকায়`).
   - Compact pagination dots: Active dot is Tutopia Blue pill (`w-6 h-1.5 rounded-full bg-sky-600`), inactive dots are small circles (`w-1.5 h-1.5 rounded-full bg-slate-300`).
3. **Pill & Card Action Buttons**:
   - Quick action buttons are compact `rounded-md` cards with clean borders, leading icon container, bold title, and trailing chevron (`>`).

---

## 3. Typography & Regional Language Guidelines
1. **Primary Font**: `Inter` or `Plus Jakarta Sans` for English UI labels and numbers.
2. **Bengali Font Support**: Include `Noto Sans Bengali` or `Hind Siliguri` for Bengali exam titles, banner text, and question papers.
3. **Font Sizing & Hierarchy**:
   - Screen Title: `text-lg` or `text-xl font-bold text-slate-900`
   - Section Header: `text-base font-semibold text-slate-800`
   - Card Title: `text-xs sm:text-sm font-bold text-slate-800`
   - Subtitle / Meta: `text-[11px] text-slate-500 font-medium`

---

## 4. Button & Interaction Rules
1. **Primary Action**: `bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-2xs transition-all active:scale-[0.98]`
2. **Accent Action**: `bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-md shadow-2xs transition-all active:scale-[0.98]`
3. **Outlined Action**: `border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold rounded-md`
4. **Custom SVG Loader**: Branded Tutopia dual-ring animated SVG loader (`<TutopiaLoader />`) for suspense transitions.
