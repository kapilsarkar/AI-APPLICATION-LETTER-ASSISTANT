# Navigation Bar: Active State & Scroll Spy Logic

- This document explains how the `NavBar` handles dynamic active links, route tracking, and  scroll-spy functionality across both desktop and mobile views.

---

## The Goal

- **Home (`/`)**: Active when the user is at the top of the homepage or navigates to `/`.
- **How It Works (`#how-it-works`)**: Active when the user clicks or scrolls into the `#how-it-works` section.
- **Features (`#features`)**: Active when the user clicks or scrolls into the `#features` section.
- **Cross-page Support**: Links should adapt if the user navigates away from `/` (e.g., on `/create`).

---

## How It Works

### 1. Unified Route & Anchor Data (`navLinks`)

Each link item stores three properties:

- `label`: Display text.
- `href`: Target URL or hash.
- `id`: The DOM element `id` that corresponds to that link.

```javascript
const navLinks = [
  { label: "Home", href: "/", id: "top" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Features", href: "#features", id: "features" },
];
```

### 2. Homepage Check (useLocation)

- Active states for page sections are only relevant when viewing the homepage

```js
const location = useLocation();
const isHomePage = location.pathname === "/";
```

- If isHomePage === false, none of the home sections are highlighted as active.

- If the user is on /create, anchor links are automatically prepended with / (e.g., /#features) so clicking them navigates back to the homepage.

### 3. Scroll Tracking (IntersectionObserver)

- Instead of attaching an expensive window.onscroll listener, the component uses the native browser IntersectionObserver API.

```js
useEffect(() => {
  if (!isHomePage) return;

  const sections = ["top", "how-it-works", "features"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      // Adjusts the detection window:
      // -20% from the top ignores the sticky header height
      // -65% from the bottom requires the section to enter the upper third of the screen
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    }
  );

  sections.forEach((sec) => observer.observe(sec));
  return () => observer.disconnect();
}, [isHomePage]);
```

- Why rootMargin: "-20% 0px -65% 0px"?

- By default, an observer triggers as soon as 1 pixel enters the viewport. This root margin creates a focused detection band in the upper portion of the viewport so the navbar highlights whichever section the user is actually reading.

### 4. Active Matching & Styling (checkIsActive)

- During rendering, each link compares its id against the current activeSection state:

```js
const checkIsActive = (link) => {
  if (!isHomePage) return false;
  return activeSection === link.id;
};
```

- Desktop Active State: Adds an emerald underline (border-b-2 border-emerald-700) and bold text (text-emerald-700 font-bold).

- Mobile Active State: Adds a light background pill (bg-emerald-50 text-emerald-900 font-bold).
