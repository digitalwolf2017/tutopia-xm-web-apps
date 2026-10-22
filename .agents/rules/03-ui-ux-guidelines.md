# Rule 03: UI / UX Guidelines & Screen Translation

## 1. Dual Responsive Strategy
The web application must deliver a premium experience across both mobile phones and desktop displays:

1. **Desktop / Tablet Viewport (`md` and `lg` breakpoints: ≥ 768px / 1024px)**:
   - Fixed Top Header with Tutopia logo, active exam track switcher (`SSC, RAIL, WBCS` selector), global `Cmd + K` search bar, notification bell dropdown, and user avatar.
   - Collapsible Left Sidebar with navigation icons & labels (*Home*, *Mock Tests*, *Video Classes*, *Live Batches*, *MCQ Practice*, *Profile*).
   - Content area utilizes responsive grid layouts (`grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).

2. **Mobile Viewport (`< 768px`)**:
   - Recreate the exact mobile app UX from `refrence/1.png`:
     - Clean top header showing user avatar, name ("Abhilash Bera"), bell icon, and search button.
     - Single-column fluid scroll.
     - Sticky bottom navigation bar with 3 tabs: **Home** (Screen 1 & 3), **Live Classes** (Screen 5), and **More** (Screen 6).

---

## 2. Screen-Specific UX Requirements

### 1. Login & Registration Flow
- **Phone Number Format**: 10 digits with fixed `+91` Indian prefix.
- **OTP Input**: Auto-advancing inputs with 30-second countdown resend timer.
- **Registration Form**: Collect Name, Phone, WhatsApp number, Exam Category choice, City & Pincode matching `refrence/7.png`.

### 2. Mock Test Hub & Test Runner (`refrence/2.png`)
- **Card Metadata**: Exam title, total marks (e.g. 100 Marks), test duration (e.g. 03:00 Hrs), last attempted date.
- **History Action**: Secondary action linking directly to previous attempt analytics.
- **Computer-Based Test (CBT) Runner Mode**:
  - Full-screen distraction-free layout.
  - Sticky top countdown timer with visual alerts when time is low.
  - Right question palette indicating question status: *Answered (Green)*, *Unanswered (Red/Grey)*, *Marked for Review (Purple/Blue)*.
  - Confirmation modal on test submission.

### 3. Subject & Chapter Explorer (`refrence/3.png` & `4.png`)
- **Category Filter Dropdown**: Allows toggling between sub-categories (e.g. `SSC` within `SSC, RAIL, WBCS`).
- **Live Search**: Instant client-side topic filtering as user types in "Search subject".
- **Topic Cards**: Topic name with chapter count badge (e.g., `12 chapters`).

### 4. Live Classes (`refrence/5.png`)
- **Batch Cards**: Show course banner thumbnail, schedule dates (`Starts on ... - Ends on ...`), pricing model badge (`Yearly Subscription Model`).
- **Action Buttons**: Dual action buttons: "Explore" (Amber outline) and "Buy now" (Solid blue).
- **Classroom Player**: Split view with video player and live interactive Q&A chat.

### 5. Profile & Settings (`refrence/6.png` & `7.png`)
- **Profile Layout**: High-contrast display of personal contact details (Mobile, WhatsApp, City, Pincode).
- **CTA**: Prominent full-width amber "Subscriptions" button, accompanied by "Edit Profile" and "Change Password".
- **More Screen**: Quick links to Profile, Report an Issue modal, and Terms & Conditions.
