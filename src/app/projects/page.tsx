import WikipediaPageLayoutWithRelated from '@/components/WikipediaPageLayoutWithRelated';
import MDXProvider from '@/components/MDXProvider';
import ThemeInfobox from '@/components/ThemeInfobox';
import { getContentBySlug, generateTableOfContents, getRelatedContent } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export default function ProjectsPage() {
  const content = getContentBySlug('projects');
  
  if (!content) {
    notFound();
  }

  const tableOfContents = generateTableOfContents(content.content);
  const relatedContent = getRelatedContent(content.metadata.tags || [], 'projects');

  // MDX components for MDXRemote
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