import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentMetadata {
  title: string;
  tags?: string[];
  categories?: string[];
  notes?: string;
  externalLinks?: Array<{ title: string; url: string }>;
}

export interface ContentItem {
  slug: string;
  metadata: ContentMetadata;
  content: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllContentSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(contentDirectory);
  return filenames
    .filter(name => name.endsWith('.mdx'))
    .map(name => name.replace(/\.mdx$/, ''));
}

export function getContentBySlug(slug: string): ContentItem | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      metadata: data as ContentMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading content for slug ${slug}:`, error);
    return null;
  }
}

export function getAllContent(): ContentItem[] {
  const slugs = getAllContentSlugs();
  return slugs
    .map(slug => getContentBySlug(slug))
    .filter((item): item is ContentItem => item !== null);
}

export function getRelatedContent(tags: string[] = [], currentSlug: string): ContentItem[] {
  if (tags.length === 0) return [];
  
  const allContent = getAllContent();
  
  return allContent
    .filter(item => item.slug !== currentSlug)
    .filter(item => {
      const itemTags = item.metadata.tags || [];
      return tags.some(tag => itemTags.includes(tag));
    })
    .sort((a, b) => {
      const aMatches = (a.metadata.tags || []).filter(tag => tags.includes(tag)).length;
      const bMatches = (b.metadata.tags || []).filter(tag => tags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, 10); // Limit to 10 related items
}

export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    toc.push({
      id,
      title,
      level,
    });
  }
  
  return toc;
}