import WikipediaPageLayoutWithRelated from '@/components/WikipediaPageLayoutWithRelated';
import MDXProvider from '@/components/MDXProvider';

export default function ContactPage() {
  const content = (
    <div>
      <p>
        Julian.wiki is a knowledge graph exploring the intersection of systems thinking, 
        creative technology, and convergence theory through the lens of Julian Picaza's 
        multidisciplinary work and related concepts.
      </p>
      
      <h2>Get in Touch</h2>
      
      <h3>Professional Inquiries</h3>
      <ul>
        <li>
          <strong>Syntactic Studio</strong>: Systems integration consultancy<br />
          <a href="http://syntactic.studio" target="_blank" rel="noopener noreferrer">
            syntactic.studio
          </a>
        </li>
        <li>
          <strong>FlowConnector</strong>: Workflow automation platform<br />
          <a href="http://flowconnector.dev" target="_blank" rel="noopener noreferrer">
            flowconnector.dev
          </a>
        </li>
      </ul>
      
      <h3>Academic & Research</h3>
      <p>
        For academic collaborations, research partnerships, or speaking engagements 
        related to convergence theory, systems integration, or creative technology, 
        please reach out through the professional channels above.
      </p>
      
      <h3>Wiki Contributions</h3>
      <p>
        This wiki is designed to grow as a collaborative knowledge base. If you'd 
        like to contribute articles, corrections, or suggestions for new topics 
        related to:
      </p>
      <ul>
        <li>Systems thinking and complexity science</li>
        <li>Digital fabrication and creative technology</li>
        <li>Convergence theory and interdisciplinary methods</li>
        <li>Product management and systems integration</li>
        <li>Distributed collaboration and remote work</li>
      </ul>
      <p>
        Please use the contact information above to initiate the conversation.
      </p>
      
      <h3>Technical Information</h3>
      <p>
        This site is built with Next.js 14, TypeScript, and Tailwind CSS, 
        designed to provide a Wikipedia-like experience for exploring connected 
        knowledge. The codebase implements:
      </p>
      <ul>
        <li>MDX-based content management</li>
        <li>Dynamic routing for knowledge graph expansion</li>
        <li>Tag-based related content discovery</li>
        <li>Table of contents generation</li>
        <li>Dark/light theme support</li>
        <li>Responsive design for all devices</li>
      </ul>
    </div>
  );

  return (
    <MDXProvider>
      <WikipediaPageLayoutWithRelated
        title="Contact"
        content={content}
        categories={["Contact information", "About this site"]}
        metadata={{
          notes: "Contact information and details about contributing to Julian.wiki"
        }}
        tableOfContents={[
          { id: "get-in-touch", title: "Get in Touch", level: 2 },
          { id: "professional-inquiries", title: "Professional Inquiries", level: 3 },
          { id: "academic-research", title: "Academic & Research", level: 3 },
          { id: "wiki-contributions", title: "Wiki Contributions", level: 3 },
          { id: "technical-information", title: "Technical Information", level: 3 }
        ]}
        relatedPages={[]}
      />
    </MDXProvider>
  );
}