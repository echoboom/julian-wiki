'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { Search, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface WikipediaPageLayoutProps {
  title: string;
  subtitle?: string;
  content: ReactNode;
  categories?: string[];
  metadata?: {
    tags?: string[];
    notes?: string;
    externalLinks?: Array<{title: string, url: string}>;
  };
  tableOfContents?: Array<{id: string, title: string, level: number}>;
  relatedPages?: Array<{slug: string, title: string, tags?: string[]}>;
}

type Theme = 'light' | 'dark' | 'auto';
type TextSize = 'small' | 'standard' | 'large';
type Width = 'standard' | 'wide';
type ActiveTab = 'article' | 'related' | 'notes' | 'links';

const WikipediaPageLayoutWithRelated: React.FC<WikipediaPageLayoutProps> = ({
  title,
  subtitle,
  content,
  categories = [],
  metadata = {},
  tableOfContents = [],
  relatedPages = []
}) => {
  // User preferences state
  const [theme, setTheme] = useState<Theme>('dark');
  const [textSize, setTextSize] = useState<TextSize>('standard');
  const [width, setWidth] = useState<Width>('standard');
  const [activeTab, setActiveTab] = useState<ActiveTab>('article');
  const [sidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['contents']));

  // Load preferences from localStorage and apply initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('wiki-theme') as Theme;
    const savedTextSize = localStorage.getItem('wiki-text-size') as TextSize;
    const savedWidth = localStorage.getItem('wiki-width') as Width;
    
    // Set theme (default to dark if none saved)
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    
    // Apply theme immediately to avoid flash
    const root = document.documentElement;
    root.classList.remove('dark');
    if (initialTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else if (initialTheme === 'light') {
      root.style.colorScheme = 'light';
    } else if (initialTheme === 'auto') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.style.colorScheme = 'light';
      }
    }
    
    if (savedTextSize) setTextSize(savedTextSize);
    if (savedWidth) setWidth(savedWidth);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('wiki-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('wiki-text-size', textSize);
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem('wiki-width', width);
  }, [width]);

  // Theme handling
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    console.log('Theme switching to:', theme);
    
    // Always start fresh
    root.classList.remove('dark');
    body.classList.remove('dark');
    
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applyTheme = () => {
        root.classList.remove('dark');
        body.classList.remove('dark');
        if (mediaQuery.matches) {
          root.classList.add('dark');
          body.classList.add('dark');
          root.style.colorScheme = 'dark';
        } else {
          root.style.colorScheme = 'light';
        }
      };
      applyTheme();
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    } else if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
    
    console.log('Applied classes - Root:', root.className, 'Body:', body.className);
  }, [theme]);

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${width === 'wide' ? 'max-w-none' : 'max-w-6xl'} mx-auto ${
      textSize === 'small' ? 'text-sm' : 
      textSize === 'large' ? 'text-lg' : 'text-base'
    }`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Julian.wiki</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4 text-sm">
              <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Contact
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        {!sidebarCollapsed && (
          <aside className={`w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen ${
            textSize === 'small' ? 'text-sm' : 
            textSize === 'large' ? 'text-lg' : 'text-base'
          }`}>
            <div className="p-4 sticky top-20">
              <div className="space-y-4">
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div>
                    <button
                      onClick={() => {
                        const newExpanded = new Set(expandedSections);
                        if (newExpanded.has('contents')) {
                          newExpanded.delete('contents');
                        } else {
                          newExpanded.add('contents');
                        }
                        setExpandedSections(newExpanded);
                      }}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 dark:text-white"
                    >
                      <span>Contents</span>
                      {expandedSections.has('contents') ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </button>
                    
                    {expandedSections.has('contents') && (
                      <div className="mt-2 space-y-1">
                        {tableOfContents.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="block py-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            style={{ marginLeft: `${(item.level - 1) * 16}px` }}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1">
          <div className="p-6">
            {/* Article header */}
            <div className="mb-6">
              <h1 className={`font-serif text-gray-900 dark:text-white mb-2 ${
                textSize === 'small' ? 'text-2xl' : 
                textSize === 'large' ? 'text-4xl' : 'text-3xl'
              }`}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Content tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {['article', 'related', 'notes', 'links'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as ActiveTab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content based on active tab */}
            <div className={`prose dark:prose-invert max-w-none ${
              textSize === 'small' ? 'prose-sm' : 
              textSize === 'large' ? 'prose-lg' : 'prose-base'
            }`}>
              {activeTab === 'article' && content}
              {activeTab === 'related' && (
                <div>
                  <h3>Related Articles</h3>
                  {relatedPages.length > 0 ? (
                    <ul>
                      {relatedPages.map((page) => (
                        <li key={page.slug}>
                          <Link href={`/${page.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {page.title}
                          </Link>
                          {page.tags && page.tags.length > 0 && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Tags: {page.tags.join(', ')}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No related articles found.</p>
                  )}
                </div>
              )}
              {activeTab === 'notes' && (
                <div>
                  <h3>Notes</h3>
                  {metadata.notes ? (
                    <p>{metadata.notes}</p>
                  ) : (
                    <p>No notes available.</p>
                  )}
                </div>
              )}
              {activeTab === 'links' && (
                <div>
                  <h3>External Links</h3>
                  {metadata.externalLinks && metadata.externalLinks.length > 0 ? (
                    <ul>
                      {metadata.externalLinks.map((link, index) => (
                        <li key={index}>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No external links available.</p>
                  )}
                </div>
              )}
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Categories:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar - Wikipedia-style Appearance Controls */}
        <aside className="w-48 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-4 sticky top-20">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Appearance</h3>
                
                {/* Text Size */}
                <div className="mb-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Text</div>
                  <div className="space-y-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="textSize"
                        value="small"
                        checked={textSize === 'small'}
                        onChange={() => setTextSize('small')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Small</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="textSize"
                        value="standard"
                        checked={textSize === 'standard'}
                        onChange={() => setTextSize('standard')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Standard</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="textSize"
                        value="large"
                        checked={textSize === 'large'}
                        onChange={() => setTextSize('large')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Large</span>
                    </label>
                  </div>
                </div>

                {/* Width */}
                <div className="mb-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Width</div>
                  <div className="space-y-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="width"
                        value="standard"
                        checked={width === 'standard'}
                        onChange={() => setWidth('standard')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Standard</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="width"
                        value="wide"
                        checked={width === 'wide'}
                        onChange={() => setWidth('wide')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Wide</span>
                    </label>
                  </div>
                </div>

                {/* Color (beta) */}
                <div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Color (beta)</div>
                  <div className="space-y-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        value="auto"
                        checked={theme === 'auto'}
                        onChange={() => setTheme('auto')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Automatic</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={theme === 'light'}
                        onChange={() => setTheme('light')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Light</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={() => setTheme('dark')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Dark</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default WikipediaPageLayoutWithRelated;