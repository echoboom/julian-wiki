import WikipediaPageLayoutWithRelated from '@/components/WikipediaPageLayoutWithRelated';
import MDXProvider from '@/components/MDXProvider';
import { getContentBySlug, generateTableOfContents, getAllContentSlugs, getRelatedContent } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for known content
export async function generateStaticParams() {
  const slugs = getAllContentSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  
  if (!content) {
    notFound();
  }

  const tableOfContents = generateTableOfContents(content.content);
  const relatedContent = getRelatedContent(content.metadata.tags || [], slug);

  return (
    <MDXProvider>
      <WikipediaPageLayoutWithRelated
        title={content.metadata.title}
        content={<MDXRemote source={content.content} />}
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