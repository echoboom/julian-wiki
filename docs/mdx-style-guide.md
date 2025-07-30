# MDX Style Guide for Julian.wiki

This guide documents the exact patterns that work in our Next.js 14 + MDX setup. Follow these patterns precisely to avoid build failures.

## Frontmatter Structure

**✅ DO - Use this exact frontmatter format:**

```yaml
---
title: "Article Title"
tags: ["systems-thinking", "digital-fabrication", "film-production"]
categories: ["Category 1", "Category 2", "Category 3"]
notes: "Brief description of the article content and purpose."
externalLinks: [
  { title: "Link Title", url: "https://example.com" },
  { title: "Another Link", url: "https://another.com" }
]
---
```

**❌ DON'T - Use single quotes or missing quotes:**
```yaml
---
title: Article Title  # Missing quotes
tags: ['tag1', 'tag2']  # Single quotes
---
```

## JSX Styling

**✅ DO - Use JSX className with Tailwind CSS:**

```jsx
<p className="italic text-gray-600 dark:text-gray-400 mb-6">
  Intro text with proper styling
</p>

<div className="flex flex-col lg:flex-row gap-6 mb-6">
  <div className="flex-1">
    <p>Content here</p>
  </div>
</div>
```

**❌ DON'T - Use inline styles or HTML style attributes:**
```jsx
<p style="font-style: italic; color: gray;">  <!-- Will fail -->
<p style={{fontStyle: 'italic', color: 'gray'}}>  <!-- Will fail -->
<div style="display: flex;">  <!-- Will fail -->
```

## Links

**✅ DO - Use JSX anchor tags with className:**

```jsx
<a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Link Text</a>
```

**❌ DON'T - Use markdown links for styled links:**
```markdown
[Link Text](#)  <!-- Plain markdown links won't have Wikipedia styling -->
```

## Images

**✅ DO - Use JSX img tags with Tailwind classes:**

```jsx
<img 
  src="/path/to/image.png" 
  alt="Description"
  className="w-full h-48 object-cover rounded border mb-2"
  style={{ objectFit: 'cover', objectPosition: 'center' }}
/>
```

**Note:** The `style` attribute is acceptable for CSS properties that don't have Tailwind equivalents.

## Infobox Pattern

**✅ DO - Use this exact infobox structure:**

```jsx
<div className="w-full lg:w-80">
  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
    <div className="text-center mb-4">
      <img 
        src="/path/to/image.png" 
        alt="Subject Name"
        className="w-full h-48 object-cover rounded border mb-2"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <p className="text-sm text-gray-600 dark:text-gray-400">Caption text</p>
    </div>
    
    <table className="w-full text-sm">
      <tbody>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          <td className="py-1 pr-2 font-medium">Label</td>
          <td className="py-1">Value</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Table of Contents

**✅ DO - Use this exact collapsible TOC structure:**

```jsx
<div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
  <details open>
    <summary className="font-bold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
      Article Sections
    </summary>
    <ol className="list-decimal list-inside space-y-1 text-sm mt-2 ml-4">
      <li><a href="#section-id" className="text-blue-600 dark:text-blue-400 hover:underline">Section Title</a></li>
    </ol>
  </details>
</div>
```

## Collapsible Sections

**✅ DO - Use this exact collapsible section pattern:**

```jsx
<details>
  <summary className="font-bold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 mb-4">
    Section Title
  </summary>
  <div className="mt-4">
    <p>Section content here</p>
  </div>
</details>
```

**❌ DON'T - Use event handlers or complex JavaScript:**
```jsx
<summary onClick={handleClick}>  <!-- Will cause acorn parsing errors -->
```

## Lists

**✅ DO - Use JSX list structure with Tailwind classes:**

```jsx
<ul className="list-disc list-inside ml-4 space-y-2">
  <li><strong>Bold item</strong> - Description text</li>
  <li>Regular list item</li>
</ul>
```

## Text Formatting

**✅ DO - Use JSX strong and em tags:**

```jsx
<p>
  <strong>Bold text</strong> and <em>italic text</em> in paragraph.
</p>
```

**✅ DO - Use markdown headers:**

```markdown
## Section Title
### Subsection Title
```

## External Links Section

**✅ DO - Use this exact external links pattern:**

```jsx
<div className="space-y-2">
  <p>• <a href="https://example.com" className="text-blue-600 dark:text-blue-400 hover:underline">Link Title</a> - Description</p>
</div>
```

## Footer

**✅ DO - Use this exact footer pattern:**

```jsx
<div className="text-xs text-gray-500 dark:text-gray-400 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
  <p>This page was last edited on [Date], at [Time] (UTC).</p>
  <p>Text is available under the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Creative Commons Attribution-ShareAlike License</a>; additional terms may apply.</p>
</div>
```

## Safe Content Updates

### Before Making Changes

1. **Always use the working /content/julian-picaza.mdx as your template**
2. **Test locally before committing** - Run `npm run dev` to verify MDX parsing
3. **Keep backups** - Save working versions before major changes

### Common Patterns That Work

- JSX elements with `className` using Tailwind CSS classes
- Standard HTML elements: `<p>`, `<div>`, `<img>`, `<table>`, `<details>`, `<summary>`
- Markdown headers (`##`, `###`) mixed with JSX
- External links with `target="_blank" rel="noopener noreferrer"`

### Patterns That Will Break

- Event handlers (`onClick`, `onSubmit`, etc.)
- Inline style objects (`style={{}}`)
- HTML style strings (`style="..."`)
- Complex JavaScript expressions in JSX
- Mixed quote types in frontmatter
- Missing className quotes

### Testing Your Changes

1. Save your changes
2. Run `npm run dev`
3. Check browser for MDX parsing errors
4. Look for "[next-mdx-remote] error compiling MDX" messages
5. If errors occur, revert to last working version and try again

### Emergency Recovery

If you break the build:

1. Revert to the last working commit
2. Use `git log content/julian-picaza.mdx` to find stable versions
3. The original working version is in commit `43da7bf`

## Component Integration

The WikipediaPageLayoutWithRelated component expects:

- `title` from frontmatter
- `tags` and `categories` arrays for related articles
- `notes` and `externalLinks` for metadata tabs
- Properly structured content with Wikipedia-style elements

Following these patterns ensures your MDX content will build successfully and display correctly in the Wikipedia-style layout.