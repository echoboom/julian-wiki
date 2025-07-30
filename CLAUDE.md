# Julian Wiki - Claude Code Project

## Project Overview
This is a Next.js 14 Wikipedia-style knowledge graph site that integrates with the WikipediaPageLayout component from the `echoboom/react-wiki-craft` GitHub repository. The site uses MDX for content management and features dynamic routing for expandable knowledge graphs.

## Key Features
- Next.js 14 with App Router and TypeScript
- MDX content system with frontmatter metadata
- Wikipedia-style UI with dark mode and text sizing controls
- Dynamic routing for content pages ([slug])
- Tag-based related content discovery
- Collapsible sections using HTML `<details>` elements
- Deployed on Vercel

## File Structure
- `/content/` - MDX content files (julian-picaza.mdx, etc.)
- `/src/components/` - React components including WikipediaPageLayoutWithRelated
- `/src/lib/content.ts` - Content parsing utilities
- `/public/lovable-uploads/` - User uploaded images
- `vercel.json` - Vercel deployment configuration

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment
- Production: https://julian-wiki.vercel.app
- Deployed via Vercel CLI with token authentication

## Recent Changes
- Fixed text sizing to affect all content (not just title)
- Improved dark mode toggle functionality
- Replaced hamburger menu with maximize/minimize icons
- Updated photo caption with Catherine Just hyperlink
- Ensured collapsible sections work properly

## User Preferences
- User explicitly stated: "hallucinated content is NEVER ok"
- Prefers factual information with "[To be developed]" placeholders
- Values UI clarity and intuitive controls

## Technical Notes
- Uses `@mdx-js/react` and `next-mdx-remote` for MDX processing
- Tailwind CSS with typography plugin for styling
- Gray-matter for frontmatter parsing
- Lucide React for icons

## CRITICAL: MDX Content Guidelines

**ALWAYS check existing MDX formatting before creating new content**

### Required Reading Before Any Content Work:
1. **Read `/docs/mdx-style-guide.md`** - Complete formatting requirements
2. **Review existing working content** - Use `/content/julian-picaza.mdx` as template
3. **Check `/docs/DEVELOPMENT_NOTES.md`** - MDX vs React component guidance

### MDX Formatting Rules (Breaking These Breaks Builds):

**Frontmatter Requirements:**
```yaml
---
title: "Page Title"  # MUST use double quotes
tags: ["tag1", "tag2"]  # MUST be array format
categories: ["Category 1", "Category 2"]  # MUST be array
notes: "Description text"  # MUST use double quotes
externalLinks: [  # MUST be object array format
  { title: "Link Title", url: "https://example.com" }
]
---
```

**Component Integration:**
- Custom components (like ThemeInfobox) MUST be added to MDXProvider
- Components MUST be imported in page files using MDXRemote
- All components MUST support theme switching

**Table of Contents:**
- Use markdown headers (`##`, `###`) NOT JSX headers
- Headers auto-generate table of contents
- JSX headers (`<h2>`) break TOC generation

**Wikipedia Styling Requirements:**
- Disambiguation paragraph with italic styling
- Collapsible sections with `<details open>` structure
- External links section before footer
- Wikipedia-style footer with timestamp

**Theme Integration:**
- Use theme-based conditional classes: `${theme === 'dark' ? 'class1' : 'class2'}`
- NEVER use Tailwind dark mode classes (`dark:`) in MDX content
- All text and backgrounds must respond to theme switching

**Testing Requirements:**
- Run `npm run build` before every commit
- Verify table of contents generates correctly
- Test theme switching on all content
- Check responsive layout

### Emergency Recovery:
If MDX changes break the build:
1. `git log content/[filename].mdx` to see working versions
2. `git checkout [commit-hash] -- content/[filename].mdx`
3. Start from last working version
4. Reference `/docs/mdx-style-guide.md` for correct patterns

### Content Creation Workflow:
1. ✅ Review existing MDX files for patterns
2. ✅ Reference style guide documentation
3. ✅ Create content following exact formatting rules
4. ✅ Test build locally before committing
5. ✅ Verify theme switching works on all elements

**Remember: The MDX system is sensitive to formatting. Following these guidelines prevents build failures and maintains consistent Wikipedia-style presentation.**