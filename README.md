# NOIRÉ --- A Table Worth Remembering

A cinematic, Awwwards-inspired fine-dining restaurant website built with
**Next.js, React, TypeScript, GSAP, and custom CSS**.

NOIRÉ is designed as a premium contemporary fine-dining experience based
in **Kathmandu, Nepal**, with a dark editorial visual language,
oversized typography, cinematic imagery, and scroll-driven interactions.

------------------------------------------------------------------------

## ✦ Experience

The website is intentionally designed to feel more like a digital
editorial experience than a conventional restaurant website.

### Main experience

-   Cinematic hero section
-   Oversized editorial typography
-   GSAP scroll animations
-   Image reveal and parallax effects
-   Magnetic links/buttons
-   Custom cursor interaction
-   Animated restaurant-information marquee
-   Moving kitchen/gallery section
-   Fine-dining visual hierarchy
-   Dark luxury color palette
-   Responsive layouts

### Inner experiences

-   Tasting menu
-   Private dining
-   Restaurant story
-   Reservation experience

Each page follows the same NOIRÉ visual system while having its own
content and layout.

------------------------------------------------------------------------

## 🗺 Routes

  Route               Purpose
  ------------------- ------------------------------------
  `/`                 Main cinematic restaurant homepage
  `/menu`             Seven-course tasting menu
  `/private-dining`   Private dining experience
  `/story`            NOIRÉ story and philosophy
  `/reservation`      Table reservation interface

------------------------------------------------------------------------

## 🛠 Tech Stack

-   **Next.js 16**
-   **React 19**
-   **TypeScript**
-   **GSAP 3**
-   **CSS**
-   **Next.js App Router**

### Main dependencies

``` json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "gsap": "^3.13.0"
}
```

------------------------------------------------------------------------

## 📁 Project Structure

``` text
noire-gsap-restaurant/
│
├── app/
│   ├── components/
│   │   └── NoirePageShell.tsx
│   │
│   ├── menu/
│   │   └── page.tsx
│   │
│   ├── private-dining/
│   │   └── page.tsx
│   │
│   ├── reservation/
│   │   └── page.tsx
│   │
│   ├── story/
│   │   └── page.tsx
│   │
│   ├── NoireSite.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│   └── images/
│       └── [restaurant images]
│
├── next-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

------------------------------------------------------------------------

## 🖼 Images

The website is designed to use **local images only**.

Place all restaurant photography inside:

``` text
public/images/
```

The application references images using paths such as:

``` tsx
/images/hero.jpg
/images/room.jpg
/images/chef.jpg
```

### Recommended image set

``` text
public/images/
├── hero.jpg
├── room.jpg
├── chef.jpg
├── trout.jpg
├── morel.jpg
├── celeriac.jpg
├── dessert.jpg
├── tasting.jpg
├── candle.jpg
├── private-room.jpg
├── chef-course.jpg
├── dessert-course.jpg
└── formal-table.jpg
```

Use premium fine-dining photography throughout the site. Avoid generic
restaurant stock photography where possible.

------------------------------------------------------------------------

## 🎞 GSAP Animation System

GSAP is used throughout the experience for:

-   Page entrance animations
-   Scroll-triggered reveals
-   Image movement
-   Parallax
-   Typography movement
-   Magnetic interactions
-   Gallery transitions
-   Hero animation
-   Section choreography

The animation code lives primarily in:

``` text
app/NoireSite.tsx
```

Shared page behaviour is handled through:

``` text
app/components/NoirePageShell.tsx
```

------------------------------------------------------------------------

## ⚠️ GSAP Notes

The project previously encountered issues caused by:

``` text
ScrollTrigger.getVelocity()
```

being used as a static method.

That implementation has been removed.

The project also previously had a context initialization issue
involving:

``` text
ctx.add(...)
```

before the GSAP context was initialized.

That has also been removed/fixed.

GSAP targets are guarded before animation calls so missing optional
elements do not generate repeated:

``` text
GSAP target not found
```

warnings.

------------------------------------------------------------------------

## 🎨 Design Direction

NOIRÉ uses a restrained luxury aesthetic.

### Visual language

-   Near-black background
-   Warm ivory typography
-   Subtle copper/orange accents
-   Editorial serif headlines
-   Small uppercase metadata
-   Large whitespace
-   Fine borders
-   Cinematic image crops
-   Slow, intentional motion

The design should feel:

> **quiet, expensive, cinematic, tactile, and slightly mysterious.**

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Install dependencies

``` bash
npm install
```

### 2. Start development server

``` bash
npm run dev
```

Open:

``` text
http://localhost:3000
```

### 3. Production build

``` bash
npm run build
```

### 4. Start production server

``` bash
npm run start
```

------------------------------------------------------------------------

## 🔗 Navigation

The main navigation connects the primary experiences:

``` text
NOIRÉ
├── MENU
├── OUR STORY
├── PRIVATE DINING
└── RESERVE A TABLE
```

The inner pages use the shared NOIRÉ shell instead of being rendered as
disconnected standalone pages.

------------------------------------------------------------------------

## 🧭 Page Architecture

### Homepage

`app/NoireSite.tsx`

Contains the primary cinematic experience, including:

-   Hero
-   Kitchen/gallery sequence
-   Restaurant philosophy
-   Story teaser
-   Private dining teaser
-   Reservation CTA
-   Footer/contact areas

### Menu

`app/menu/page.tsx`

Contains the tasting-menu experience and seasonal storytelling.

### Private Dining

`app/private-dining/page.tsx`

Focuses on intimate dining, private tables, cellar selections, and
after-hours experiences.

### Story

`app/story/page.tsx`

Presents the restaurant's philosophy, origins, kitchen, ingredients, and
relationship with Kathmandu/Himalayan produce.

### Reservation

`app/reservation/page.tsx`

Provides the reservation interface for:

-   Guest count
-   Date
-   Time
-   Reservation CTA
-   Restaurant information

------------------------------------------------------------------------

## 🧩 Shared Components

`app/components/NoirePageShell.tsx`

Provides shared visual behaviour for the inner pages, including the
common NOIRÉ environment and navigation structure.

This helps prevent the inner pages from looking like separate websites.

------------------------------------------------------------------------

## 🖋 Typography

The typography is intentionally editorial.

Large serif typography is used for major statements while compact
uppercase text is used for:

-   Section labels
-   Navigation
-   Metadata
-   Course numbers
-   Restaurant information

When changing fonts, preserve the contrast between the display serif and
supporting sans-serif typography.

------------------------------------------------------------------------

## 🖤 Favicon

The NOIRÉ favicon should use the custom **N emblem** rather than the
default browser/Next.js icon.

Recommended files:

``` text
app/icon.png
```

or:

``` text
public/favicon.ico
```

For the strongest branding, use the simplified NOIRÉ N mark at small
sizes rather than the full restaurant wordmark.

------------------------------------------------------------------------

## 📱 Responsive Design

The site should be tested across:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

Pay particular attention to:

-   Oversized typography
-   Horizontal gallery sections
-   Navigation
-   Image aspect ratios
-   Reservation controls
-   Touch interactions
-   Scroll-triggered animations

On mobile, animations should remain smooth without forcing excessive
scroll distance.

------------------------------------------------------------------------

## 🧪 Development Checklist

Before deployment:

``` text
[ ] npm run build passes
[ ] Homepage loads correctly
[ ] /menu loads correctly
[ ] /story loads correctly
[ ] /private-dining loads correctly
[ ] /reservation loads correctly
[ ] All local images load
[ ] No Unsplash URLs remain
[ ] No GSAP target warnings
[ ] No ScrollTrigger errors
[ ] No console errors
[ ] Navigation links work
[ ] Mobile layout checked
[ ] Desktop layout checked
[ ] Favicon configured
```

------------------------------------------------------------------------

## 🌐 Deployment

The project can be deployed to platforms supporting Next.js, including
Vercel.

Typical deployment flow:

``` bash
npm install
npm run build
npm run start
```

For Vercel, connect the repository and use the default Next.js build
configuration.

------------------------------------------------------------------------

## ✦ Brand

**NOIRÉ**

Contemporary Fine Dining\
Kathmandu, Nepal

> A table worth remembering.

------------------------------------------------------------------------

## License

This project is a custom website concept for NOIRÉ.

Restaurant photography, logos, fonts, and other third-party assets
should only be used when you have the appropriate rights or licenses.

### License File

See the [`LICENSE`](./LICENSE) file for the complete MIT License.

### Assets & Third-Party Content

The MIT License applies to the original source code and project files created for NOIRÉ.

Third-party assets such as photographs, fonts, icons, videos, music, libraries, and other externally sourced content may be subject to their own licenses or usage restrictions. You are responsible for checking and complying with the applicable license or terms for those assets before redistributing them.

