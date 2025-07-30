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