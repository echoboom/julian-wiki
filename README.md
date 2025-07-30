# Julian.wiki

A Next.js 14 Wikipedia-style knowledge graph exploring systems thinking, creative technology, and convergence theory.

## Features

- **Wikipedia-style Layout**: Authentic Wikipedia user experience with modern web technologies
- **MDX Content System**: Write articles using MDX with frontmatter for metadata
- **Dynamic Routing**: Automatic page generation for all content files
- **Tag-based Relations**: Related articles discovered through shared tags
- **Table of Contents**: Auto-generated from markdown headers
- **Dark/Light Themes**: System preference detection with manual override
- **Responsive Design**: Optimized for all device sizes
- **Fast Performance**: Built with Next.js 14 App Router for optimal speed

## Architecture

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Typography plugin
- **Content**: MDX with gray-matter frontmatter parsing
- **Deployment**: Optimized for Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Structure

### Frontmatter Schema

```yaml
---
title: "Article Title"
tags: ["tag1", "tag2", "tag3"]
categories: ["Category 1", "Category 2"]
notes: "Brief description of the article"
externalLinks: [
  { title: "Link Title", url: "https://example.com" }
]
---
```

### Adding New Articles

1. Create new `.mdx` file in `/content/` directory
2. Add required frontmatter metadata
3. Write content using standard markdown + JSX
4. Articles automatically appear in navigation and related suggestions

## Project Structure

```
src/
├── app/
│   ├── [slug]/page.tsx      # Dynamic routes for articles
│   ├── contact/page.tsx     # Static contact page
│   ├── projects/page.tsx    # Static projects page
│   └── page.tsx             # Homepage (Julian Picaza article)
├── components/
│   ├── WikipediaPageLayoutWithRelated.tsx  # Main layout component
│   └── MDXProvider.tsx      # MDX component configuration
└── lib/
    └── content.ts           # Content management utilities

content/
├── julian-picaza.mdx        # Homepage content
├── systems-thinking.mdx     # Example related article
└── digital-fabrication.mdx # Example related article
```

## Wikipedia Component Features

The core `WikipediaPageLayoutWithRelated` component provides:

- **Header Navigation**: Logo, search, theme controls, text sizing
- **Sidebar**: Collapsible table of contents
- **Tab System**: Article, Related, Notes, Links views  
- **Theme System**: Light/dark/auto with localStorage persistence
- **Typography Controls**: Small/standard/large text sizing
- **Width Controls**: Standard/wide layout options

## Related Articles System

Articles are automatically related through shared tags:
- Related tab shows articles with matching tags
- Results sorted by number of matching tags
- Related pages displayed with their tag information
- Circular references prevented (articles don't relate to themselves)

## Deployment

The project is configured for zero-config deployment on Vercel:

```bash
npm run build  # Test production build
vercel         # Deploy to Vercel
```

## Technical Implementation

The site demonstrates practical applications of:
- **Convergence Theory**: Integrating multiple technologies seamlessly
- **Systems Thinking**: Holistic approach to content relationships
- **Modern Web Development**: Next.js 14, TypeScript, Tailwind CSS
- **Content Strategy**: Scalable knowledge graph architecture

Built as both a functional knowledge base and a demonstration of integrated design and development workflows.
