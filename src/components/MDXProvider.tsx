'use client';

import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';
import ThemeInfobox from './ThemeInfobox';

interface MDXProviderProps {
  children: ReactNode;
}

// Custom components for MDX rendering
const components = {
  // Headings with auto-generated IDs
  h1: (props: any) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/\s+/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/^-|-$/g, '');
    return <h1 id={id} {...props} />;
  },
  h2: (props: any) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/\s+/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/^-|-$/g, '');
    return <h2 id={id} {...props} />;
  },
  h3: (props: any) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/\s+/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/^-|-$/g, '');
    return <h3 id={id} {...props} />;
  },
  h4: (props: any) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/\s+/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/^-|-$/g, '');
    return <h4 id={id} {...props} />;
  },
  h5: (props: any) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/\s+/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/^-|-$/g, '');
    return <h5 id={id} {...props} />;
  },
  h6: (props: any) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/\s+/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/^-|-$/g, '');
    return <h6 id={id} {...props} />;
  },
  
  // Enhanced links
  a: (props: any) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        {...props}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`text-blue-600 dark:text-blue-400 hover:underline ${props.className || ''}`}
      />
    );
  },
  
  // Enhanced code blocks
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto" {...props} />
  ),
  
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
  ),
  
  // Enhanced blockquotes
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600 dark:text-gray-400" {...props} />
  ),
  
  // Details and summary elements
  details: (props: any) => (
    <details className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg" {...props} />
  ),
  
  summary: (props: any) => (
    <summary className="p-3 bg-gray-50 dark:bg-gray-800 font-bold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg" {...props} />
  ),
  
  // Tables
  table: (props: any) => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700" {...props} />
    </div>
  ),
  
  th: (props: any) => (
    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 font-medium text-left" {...props} />
  ),
  
  td: (props: any) => (
    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2" {...props} />
  ),
  
  // Theme-aware components
  ThemeInfobox: ThemeInfobox,
};

export default function MDXProvider({ children }: MDXProviderProps) {
  return (
    <BaseMDXProvider components={components}>
      {children}
    </BaseMDXProvider>
  );
}