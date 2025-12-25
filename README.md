# Hyperloopin Website

A modern, accessible, SEO-friendly, production-ready website for the Hyperloopin university engineering club built with Next.js, TypeScript, Tailwind CSS, and react-three-fiber.

![Hyperloopin](./public/images/og-image.jpg)

## ⚡ Quick Start

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev

# Open http://localhost:3000
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **3D Graphics**: react-three-fiber + @react-three/drei + Three.js
- **Animations**: Framer Motion + GSAP ScrollTrigger
- **Content**: MDX for blog/news posts
- **SEO**: next-seo

## 📁 Project Structure

```
├── components/          # React components
│   ├── Navbar.tsx      # Fixed navigation with mobile menu
│   ├── Hero.tsx        # Hero section with 3D canvas
│   ├── PodCanvas.tsx   # Interactive 3D scene
│   ├── About.tsx       # Mission and vision
│   ├── Team.tsx        # Team member grid
│   ├── Timeline.tsx    # Scrollytelling achievements
│   ├── Gallery.tsx     # Image gallery with filters
│   ├── Lightbox.tsx    # Modal lightbox
│   ├── Mentors.tsx     # Mentor cards
│   ├── Sponsors.tsx    # Tiered sponsor logos
│   ├── NewsList.tsx    # News post list
│   ├── ContactForm.tsx # Contact section
│   ├── Footer.tsx      # Site footer
│   └── ScrollToTopButton.tsx
├── content/
│   └── news/           # MDX blog posts
├── data/               # Mock data files
│   ├── team.ts
│   ├── achievements.ts
│   ├── sponsors.ts
│   ├── mentors.ts
│   ├── gallery.ts
│   └── navigation.ts
├── lib/
│   ├── constants.ts    # Site configuration
│   └── mdx.ts          # MDX utilities
├── pages/
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # Custom document
│   ├── index.tsx       # Homepage
│   ├── 404.tsx         # Custom 404
│   └── news/
│       └── [slug].tsx  # Dynamic news pages
├── public/
│   ├── images/         # Image assets
│   └── models/         # 3D model assets
├── styles/
│   └── globals.css     # Global styles
└── README.md
```

## 🖼️ Replacing Assets

### Images
Replace placeholder images in `/public/images/`:
- `hero-placeholder.jpg` - Hero background
- `about-illustration.jpg` - About section image
- `team/member-*.jpg` - Team member photos (recommended: 400x500px)
- `mentors/mentor-*.jpg` - Mentor photos (recommended: 200x200px)
- `sponsors/sponsor-*.svg` - Sponsor logos (recommended: SVG)
- `gallery/gallery-*.jpg` - Gallery images (recommended: 1200x800px)
- `news/*.jpg` - News post featured images
- `og-image.jpg` - Open Graph image (1200x630px)

### 3D Model
Replace the placeholder 3D scene in `/components/PodCanvas.tsx`:

1. Place your `.glb` or `.gltf` model in `/public/models/`
2. Update `PodCanvas.tsx`:

```typescript
import { useGLTF } from '@react-three/drei';

function PodModel() {
  const { scene } = useGLTF('/models/your-pod-model.glb');
  return <primitive object={scene} scale={1} />;
}

// Preload the model
useGLTF.preload('/models/your-pod-model.glb');
```

### Content
- Edit data files in `/data/` to update team, sponsors, mentors, achievements
- Add/edit MDX news posts in `/content/news/`
- Update site config in `/lib/constants.ts`

## 🎨 Design System

The Tailwind config includes a custom design system:

### Spacing
8px base scale (4, 8, 12, 16, 24, 32, 48, 64...)

### Colors
- `primary` - Indigo (#6366f1)
- `accent` - Cyan (#06b6d4)
- `neutral` - Gray scale
- Dark mode ready

### Typography
- Display: Outfit
- Body: Inter
- Mono: JetBrains Mono

### Breakpoints
- `xs`: 480px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `2xl`: 1440px (desktop)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Netlify
```bash
# Build for production
npm run build

# Files are in .next/ directory
```

Add `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## ✅ Accessibility Checklist

- [x] Semantic HTML structure
- [x] ARIA labels on interactive elements
- [x] Keyboard navigation for menus and lightbox
- [x] Focus indicators
- [x] Skip-to-content support
- [x] Color contrast considerations
- [x] Reduced motion preference support
- [x] Alt text on images
- [x] Form labels and descriptions

## 🔍 SEO Checklist

- [x] Meta title and description on all pages
- [x] Open Graph tags
- [x] Twitter Card meta
- [x] Structured data (ArticleJsonLd)
- [x] Sitemap-ready structure
- [x] Semantic heading hierarchy (single H1, proper H2-H6)
- [x] Image alt attributes
- [x] Canonical URLs

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Static export (optional)
npm run export
```

## 🎯 Performance Tips

1. **Images**: Use WebP format, proper sizes via `next/image`
2. **3D**: Model is code-split via dynamic import
3. **Fonts**: Google Fonts with `display: swap`
4. **Animations**: CSS transforms, will-change hints
5. **Lighthouse**: Target 90+ scores

## 📝 Adding News Posts

Create a new `.mdx` file in `/content/news/`:

```mdx
---
title: "Your Post Title"
excerpt: "Brief description for listing page"
date: "2024-12-25"
author: "Author Name"
image: "/images/news/your-image.jpg"
category: "Announcement"
---

# Your Post Content

Write your content in Markdown with MDX support.
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run lint and build
5. Submit a pull request

## 📄 License

MIT License - feel free to use for your university club!

---

Built with ❤️ by Hyperloopin
"# hyperloopin_web" 
