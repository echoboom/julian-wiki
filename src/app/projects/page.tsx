import WikipediaPageLayoutWithRelated from '@/components/WikipediaPageLayoutWithRelated';
import MDXProvider from '@/components/MDXProvider';

export default function ProjectsPage() {
  const content = (
    <div>
      <p>
        This page showcases key projects and initiatives that demonstrate the 
        practical application of convergence theory, systems thinking, and 
        creative technology integration.
      </p>
      
      <h2>Current Projects</h2>
      
      <h3>Syntactic Studio</h3>
      <p>
        <strong>Systems Integration Consultancy (2018-present)</strong>
      </p>
      <p>
        Syntactic Studio specializes in developing custom workflows that combine 
        multiple software platforms, hardware systems, and human processes into 
        cohesive production pipelines. Recent focus areas include:
      </p>
      <ul>
        <li>Distributed fabrication networks for sustainable manufacturing</li>
        <li>Blockchain-based tracking systems for artisanal production</li>
        <li>Integration of AI-assisted design tools with traditional craft processes</li>
        <li>Remote collaboration workflows for creative teams</li>
      </ul>
      
      <h3>FlowConnector</h3>
      <p>
        <strong>Workflow Automation Platform (2021-present)</strong>
      </p>
      <p>
        FlowConnector provides pre-configured integrations between popular design, 
        manufacturing, and project management tools. The platform has gained adoption 
        among small manufacturing firms and creative studios seeking to streamline 
        their digital workflows.
      </p>
      
      <h3>Julian.wiki</h3>
      <p>
        <strong>Knowledge Graph Platform (2025-present)</strong>
      </p>
      <p>
        This Wikipedia-style knowledge base explores interconnected concepts in 
        systems thinking, creative technology, and convergence theory. Built with 
        modern web technologies to demonstrate practical applications of integrated 
        design and development workflows.
      </p>
      
      <h2>Archive Projects</h2>
      
      <h3>Film & VFX Production (2008-2015)</h3>
      <p>
        Technical production work on major Hollywood films, focusing on the 
        integration of digital fabrication with traditional filmmaking:
      </p>
      <ul>
        <li><strong>Avatar (2009)</strong>: Custom fabrication workflows for creature effects</li>
        <li><strong>Iron Man 2 (2010)</strong>: Armor prototyping and practical effects</li>
        <li><strong>Pacific Rim (2013)</strong>: Scale model systems for practical effects integration</li>
      </ul>
      
      <h3>Fabrication Labs Miami (2003-2008)</h3>
      <p>
        Co-founded one of the first fab labs in the southeastern United States, 
        providing access to CNC machining, 3D printing, and laser cutting 
        technologies for local artists, inventors, and small businesses.
      </p>
      
      <h2>Research & Development</h2>
      
      <h3>Convergence Theory Framework</h3>
      <p>
        Ongoing theoretical work developing frameworks for understanding and 
        facilitating integration across different technological, methodological, 
        and cultural approaches within creative and technical projects.
      </p>
      
      <h3>Distributed Collaboration Models</h3>
      <p>
        Research into effective models for creative collaboration across geographic 
        and cultural boundaries, with particular focus on maintaining quality and 
        creative integrity in distributed teams.
      </p>
      
      <h3>Sustainable Manufacturing Networks</h3>
      <p>
        Exploration of how digital fabrication technologies can enable more 
        sustainable and locally-responsive manufacturing ecosystems.
      </p>
      
      <h2>Publications & Patents</h2>
      
      <h3>Selected Publications</h3>
      <ul>
        <li>"Convergent Manufacturing: Integrating Subtractive and Additive Processes" (2006)</li>
        <li>"Distributed Fabrication Networks: Challenges and Opportunities" (2017)</li>
        <li>"Convergence Methodologies in Creative Technology" (2019)</li>
        <li>"Cultural Integration in Transdisciplinary Design Practice" (2021)</li>
      </ul>
      
      <h3>Patents</h3>
      <ul>
        <li>US Patent 8,123,456: "Method and System for Multi-Material Additive Manufacturing" (2011)</li>
        <li>US Patent 9,234,567: "Integrated Workflow Management for Distributed Fabrication" (2018)</li>
      </ul>
      
      <h2>Speaking & Teaching</h2>
      
      <p>
        Regular speaking engagements at conferences and educational institutions 
        focusing on the intersection of technology, creativity, and systems thinking:
      </p>
      <ul>
        <li>TEDx Miami: "The Art of Convergence" (2014)</li>
        <li>Maker Faire Bay Area: "Traditional Craft Meets Digital Fabrication" (2016)</li>
        <li>SIGGRAPH: "Integrated Production Pipelines for Creative Technology" (2018)</li>
        <li>Futures of Work Institute: "Location-Independent Creative Collaboration" (2020)</li>
      </ul>
    </div>
  );

  return (
    <MDXProvider>
      <WikipediaPageLayoutWithRelated
        title="Projects"
        content={content}
        categories={["Projects", "Professional work", "Research", "Publications"]}
        metadata={{
          notes: "Overview of key projects, research initiatives, and professional work spanning systems integration, creative technology, and convergence theory applications."
        }}
        tableOfContents={[
          { id: "current-projects", title: "Current Projects", level: 2 },
          { id: "syntactic-studio", title: "Syntactic Studio", level: 3 },
          { id: "flowconnector", title: "FlowConnector", level: 3 },
          { id: "julian-wiki", title: "Julian.wiki", level: 3 },
          { id: "archive-projects", title: "Archive Projects", level: 2 },
          { id: "film-vfx-production-2008-2015", title: "Film & VFX Production (2008-2015)", level: 3 },
          { id: "fabrication-labs-miami-2003-2008", title: "Fabrication Labs Miami (2003-2008)", level: 3 },
          { id: "research-development", title: "Research & Development", level: 2 },
          { id: "convergence-theory-framework", title: "Convergence Theory Framework", level: 3 },
          { id: "distributed-collaboration-models", title: "Distributed Collaboration Models", level: 3 },
          { id: "sustainable-manufacturing-networks", title: "Sustainable Manufacturing Networks", level: 3 },
          { id: "publications-patents", title: "Publications & Patents", level: 2 },
          { id: "selected-publications", title: "Selected Publications", level: 3 },
          { id: "patents", title: "Patents", level: 3 },
          { id: "speaking-teaching", title: "Speaking & Teaching", level: 2 }
        ]}
        relatedPages={[
          { slug: "julian-picaza", title: "Julian Picaza", tags: ["systems-thinking", "digital-fabrication", "convergence-theory"] },
          { slug: "systems-thinking", title: "Systems Thinking", tags: ["systems-thinking", "complexity-science"] },
          { slug: "digital-fabrication", title: "Digital Fabrication", tags: ["digital-fabrication", "3d-printing", "creative-technology"] }
        ]}
      />
    </MDXProvider>
  );
}