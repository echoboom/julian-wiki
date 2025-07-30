# Content Creation Workflow - Julian.wiki

## Overview

This document provides a step-by-step process for creating, updating, and maintaining MDX content on Julian.wiki. Following this workflow prevents build failures and ensures consistent Wikipedia-style presentation.

## Before You Start

### Required Reading Checklist
- [ ] Read `/docs/mdx-style-guide.md` completely
- [ ] Review `/docs/DEVELOPMENT_NOTES.md` for architecture understanding
- [ ] Examine `/content/julian-picaza.mdx` as working template
- [ ] Check `CLAUDE.md` for critical formatting rules

### Development Environment Setup
- [ ] Ensure Node.js and npm are installed
- [ ] Run `npm install` to install dependencies
- [ ] Verify `npm run dev` starts development server
- [ ] Test `npm run build` completes successfully

## Step-by-Step Content Creation Process

### 1. Planning Phase

**Before writing any content:**
- [ ] Determine if content should be MDX or React component
- [ ] Plan required frontmatter metadata (tags, categories, external links)
- [ ] Identify any custom components needed
- [ ] Map out section structure for table of contents

**Decision Matrix: MDX vs React Component**
```
Use MDX if:
✅ Content-heavy page (biography, article, project listing)
✅ Needs Wikipedia-style formatting
✅ Benefits from collapsible sections
✅ Requires table of contents generation
✅ Static content with minimal interactivity

Use React Component if:
✅ Complex state management required
✅ Dynamic data fetching needed
✅ Interactive features (forms, filters, search)
✅ Custom layouts outside Wikipedia pattern
```

### 2. Content Creation Phase

**Step 2.1: Create MDX File**
```bash
# Create new MDX file in content directory
touch content/new-page-name.mdx
```

**Step 2.2: Add Frontmatter**
```yaml
---
title: "Page Title"
tags: ["tag1", "tag2", "relevant-tag"]
categories: ["Category 1", "Category 2"]
notes: "Brief description of page content and purpose"
externalLinks: [
  { title: "External Link Title", url: "https://example.com" },
  { title: "Another Link", url: "https://another.com" }
]
---
```

**Step 2.3: Create Required Page Structure**
```jsx
<p className="italic text-gray-600 dark:text-gray-400 mb-6">
  Disambiguation or intro paragraph with <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">external link</a>.
</p>

<div className="flex flex-col gap-6 mb-6">
  <div className="flex-1">
    <p>
      Main introduction paragraph with proper <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia-style links</a>.
    </p>
  </div>
</div>

## First Section

<details open>
  <summary className="font-bold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 mb-4">
    Section description
  </summary>
  <div className="mt-4">
    <p>Section content here</p>
  </div>
</details>

## External links

<div className="space-y-2">
  <p>• <a href="https://example.com" className="text-blue-600 dark:text-blue-400 hover:underline">Link Title</a> - Description</p>
</div>

---

<div className="text-xs text-gray-500 dark:text-gray-400 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
  <p>This page was last edited on [Date], at [Time] (UTC).</p>
  <p>Text is available under the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Creative Commons Attribution-ShareAlike License</a>; additional terms may apply.</p>
</div>
```

### 3. Component Integration Phase

**Step 3.1: Identify Custom Components**
- [ ] List any custom components used in content
- [ ] Verify components exist in `/src/components/`
- [ ] Check if components support theme switching

**Step 3.2: Update MDXProvider (if needed)**
```typescript
// Add to /src/components/MDXProvider.tsx
import NewComponent from './NewComponent';

const components = {
  // existing components...
  NewComponent: NewComponent,
};
```

**Step 3.3: Update Page File (if creating new route)**
```typescript
// Example: /src/app/new-page/page.tsx
import { getContentBySlug, generateTableOfContents, getRelatedContent } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ThemeInfobox from '@/components/ThemeInfobox';

export default function NewPage() {
  const content = getContentBySlug('new-page-name');
  
  if (!content) {
    notFound();
  }

  const tableOfContents = generateTableOfContents(content.content);
  const relatedContent = getRelatedContent(content.metadata.tags || [], 'new-page-name');

  const mdxComponents = {
    ThemeInfobox: ThemeInfobox,
    // Add other components as needed
  };

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

### 4. Testing Phase

**Step 4.1: Development Testing**
```bash
# Start development server
npm run dev

# Verify page loads at http://localhost:3000/your-page-slug
# Check for console errors
# Test theme switching
# Verify responsive design
```

**Step 4.2: Build Testing**
```bash
# Test static site generation
npm run build

# Check for build errors
# Verify all pages generate successfully
# Check bundle size impact
```

**Step 4.3: Content Validation Checklist**
- [ ] Page loads without errors
- [ ] Table of contents generates correctly
- [ ] All links work properly
- [ ] Theme switching works on all elements
- [ ] Responsive layout functions correctly
- [ ] External links open in new tabs
- [ ] Collapsible sections work properly
- [ ] Related pages populate correctly

### 5. Quality Assurance Phase

**Step 5.1: Content Review**
- [ ] Spelling and grammar check
- [ ] Verify factual accuracy
- [ ] Check Wikipedia-style formatting consistency
- [ ] Ensure proper link attribution

**Step 5.2: Performance Check**
- [ ] Optimize any images used
- [ ] Verify reasonable bundle size impact
- [ ] Check page load performance
- [ ] Test on mobile devices

**Step 5.3: SEO Optimization**
- [ ] Verify proper heading hierarchy
- [ ] Check meta description in frontmatter notes
- [ ] Ensure meaningful page title
- [ ] Validate structured content

### 6. Deployment Phase

**Step 6.1: Pre-deployment Checklist**
- [ ] All tests pass locally
- [ ] Build completes successfully
- [ ] Content follows style guide
- [ ] No console errors or warnings
- [ ] Git working directory is clean

**Step 6.2: Commit and Deploy**
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add [page-name] page with [brief description]

- Include specific changes made
- Note any new components added
- Mention testing completed

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to trigger deployment
git push
```

**Step 6.3: Post-deployment Verification**
- [ ] Visit deployed site and test new content
- [ ] Verify theme switching works in production
- [ ] Check mobile responsiveness
- [ ] Test all links and functionality

## Content Update Workflow

### For Existing Content Updates

**Step 1: Backup Current Version**
```bash
git log content/filename.mdx  # Note current commit hash
```

**Step 2: Make Incremental Changes**
- [ ] Make small, focused changes
- [ ] Test after each significant modification
- [ ] Keep backups of working versions

**Step 3: Test Thoroughly**
- [ ] Verify build still succeeds
- [ ] Check that existing functionality still works
- [ ] Test theme switching on modified content

## Emergency Recovery Procedures

### If Build Breaks After Content Changes

**Immediate Recovery:**
```bash
# Find last working version
git log content/[filename].mdx

# Revert to last working version
git checkout [commit-hash] -- content/[filename].mdx

# Test build
npm run build
```

**Systematic Debugging:**
1. Identify which content change caused the break
2. Review error message for specific formatting issues
3. Check against style guide for correct patterns
4. Make minimal changes to fix specific issue
5. Test each change individually

### Common Issues and Solutions

**"Expected component X to be defined"**
- Add component to MDXProvider components object
- Import component in page file using MDXRemote

**"Unterminated string literal"**
- Check for missing closing backticks in template literals
- Verify complex className expressions are properly closed

**"Invalid frontmatter"**
- Ensure double quotes around all strings
- Verify array and object syntax is correct
- Check for trailing commas or missing commas

## Maintenance Guidelines

### Regular Maintenance Tasks
- [ ] Review and update external links quarterly
- [ ] Verify all images still load correctly
- [ ] Test theme switching on all pages
- [ ] Update timestamps in footers when content changes
- [ ] Monitor build performance and bundle size

### Documentation Updates
- [ ] Update this workflow when processes change
- [ ] Add new patterns to style guide as discovered
- [ ] Document any new components or integrations
- [ ] Keep emergency recovery steps current

Following this workflow ensures consistent, high-quality content that maintains the Wikipedia-style presentation and prevents build failures.