# Development Notes - Julian.wiki

## Architecture Overview

Julian.wiki is built with Next.js 14 using the App Router, MDX for content, and a Wikipedia-style design system with comprehensive dark mode support.

### Core Technologies
- **Next.js 14** with App Router
- **MDX** with next-mdx-remote for content
- **Tailwind CSS** with typography plugin
- **TypeScript** for type safety
- **Vercel** for deployment

## Content Management Strategy

### When to Use MDX vs React Components

**Use MDX for:**
- ✅ **Content-heavy pages** (biographies, articles, project listings)
- ✅ **Wikipedia-style pages** with collapsible sections
- ✅ **Static content** that benefits from markdown formatting
- ✅ **Pages that need table of contents** auto-generation
- ✅ **SEO-optimized content** pages

**Use React Components for:**
- ✅ **Interactive features** requiring state management
- ✅ **Complex layouts** that don't fit Wikipedia pattern
- ✅ **Dynamic data fetching** or API integration
- ✅ **Custom functionality** like search or filters

### MDX Content System

**File Structure:**
```
/content/
  ├── julian-picaza.mdx    # Homepage content
  ├── projects.mdx         # Projects page content
  ├── systems-thinking.mdx # Article content
  └── digital-fabrication.mdx
```

**Page Integration:**
```typescript
// Pattern for MDX-powered pages
export default function Page() {
  const content = getContentBySlug('slug-name');
  const tableOfContents = generateTableOfContents(content.content);
  const relatedContent = getRelatedContent(content.metadata.tags || [], 'slug-name');

  return (
    <MDXProvider>
      <WikipediaPageLayoutWithRelated
        title={content.metadata.title}
        content={<MDXRemote source={content.content} components={mdxComponents} />}
        categories={content.metadata.categories}
        metadata={{
          tags: content.metadata.tags,
          notes: content.metadata.notes,
          externalLinks: content.metadata.externalLinks,
        }}
        tableOfContents={tableOfContents}
        relatedPages={relatedContent.map(item => ({
          slug: item.slug,
          title: item.metadata.title,
          tags: item.metadata.tags,
        }))}
      />
    </MDXProvider>
  );
}
```

## Component Architecture

### WikipediaPageLayoutWithRelated Component

**Expected Props Structure:**
```typescript
interface WikipediaPageLayoutProps {
  title: string;                    // From frontmatter.title
  subtitle?: string;               // Optional subtitle
  content: ReactNode;              // MDXRemote rendered content
  categories?: string[];           // From frontmatter.categories
  metadata?: {
    tags?: string[];              // From frontmatter.tags
    notes?: string;               // From frontmatter.notes
    externalLinks?: Array<{       // From frontmatter.externalLinks
      title: string, 
      url: string
    }>;
  };
  tableOfContents?: Array<{        // Auto-generated from headers
    id: string, 
    title: string, 
    level: number
  }>;
  relatedPages?: Array<{           // Auto-generated from tags
    slug: string, 
    title: string, 
    tags?: string[]
  }>;
}
```

### Theme Integration

**Theme System Requirements:**
- All components must support theme switching
- Use conditional classes instead of Tailwind dark mode classes
- Components used in MDX must be theme-aware
- CSS custom properties override Tailwind classes (avoid conflicts)

**Theme-Aware Component Pattern:**
```tsx
const Component = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('dark');
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : theme === 'light' ? 'bg-white' : 'bg-white dark:bg-gray-900'}`}>
      Content
    </div>
  );
};
```

## Troubleshooting Guide

### Common MDX Build Failures

**1. "Expected component X to be defined"**
```
Error: Expected component `ThemeInfobox` to be defined
```
**Solution:**
- Add component to `/src/components/MDXProvider.tsx`
- Import component in page file using MDXRemote
- Ensure component is exported properly

**2. "Unterminated string literal"**
```
Error: Unterminated regexp literal
```
**Solution:**
- Check for missing closing backticks in template literals
- Verify complex className expressions are properly closed
- Look for unescaped quotes in JSX attributes

**3. "Acorn parsing error"**
```
Error: [next-mdx-remote] error compiling MDX
```
**Solution:**
- Remove event handlers (onClick, onSubmit, etc.)
- Remove inline style objects (style={{}})
- Remove complex JavaScript expressions
- Use only static JSX patterns

**4. Theme switching not working**
```
Symptom: Text changes but backgrounds don't
```
**Solution:**
- Check for CSS custom properties overriding Tailwind
- Use theme-based conditional classes instead of dark: prefixes
- Ensure body.dark class is being applied correctly

### Development Workflow

**Before Making Content Changes:**
1. ✅ Read existing working content as reference
2. ✅ Check `/docs/mdx-style-guide.md` for patterns
3. ✅ Identify required frontmatter structure
4. ✅ Plan component integration needs

**During Development:**
1. ✅ Make incremental changes
2. ✅ Test `npm run dev` after each change
3. ✅ Verify table of contents generation
4. ✅ Test theme switching on new content

**Before Committing:**
1. ✅ Run `npm run build` to verify static generation
2. ✅ Check all pages load without errors
3. ✅ Test responsive design
4. ✅ Verify external links work

### Content Library Integration

**Adding New MDX Files:**
1. Create `.mdx` file in `/content/` directory
2. Use slug-name.mdx format for URL routing
3. Include proper frontmatter structure
4. Ensure content follows Wikipedia styling patterns
5. Test via `/[slug]` dynamic route

**Content Processing Chain:**
```
MDX File → getContentBySlug() → generateTableOfContents() → 
MDXRemote → WikipediaPageLayoutWithRelated → Rendered Page
```

### Deployment Considerations

**Static Site Generation:**
- All MDX files generate static HTML at build time
- Dynamic routes use generateStaticParams for pre-rendering
- Build failures prevent deployment

**Vercel Integration:**
- Automatic deployments from main branch
- Build logs available in Vercel dashboard
- Environment variables configured in Vercel settings

**Performance Monitoring:**
- Lighthouse scores tracked for core web vitals
- Bundle size optimization via Next.js analysis
- Image optimization handled by Next.js Image component

## Future Development Guidelines

### Content Expansion
- Always use existing MDX files as templates
- Maintain consistent Wikipedia styling
- Ensure all content is theme-compatible
- Add comprehensive frontmatter metadata

### Component Development
- All new components must support theme switching
- Follow established TypeScript patterns
- Add to MDXProvider when used in content
- Document component props and usage

### Architecture Evolution
- Maintain backward compatibility with existing content
- Document breaking changes in this file
- Update style guide when patterns change
- Keep emergency recovery steps current

This documentation captures our institutional knowledge and prevents future formatting disasters.