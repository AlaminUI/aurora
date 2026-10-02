// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://template-aurora.netlify.app', // Replace with the actual live domain
  integrations: [
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    })
  ],
  prefetch: {
    prefetchAll: true, // Automatically prefetch all links visible on the page
    defaultStrategy: 'viewport',
  },
  build: {
    format: 'directory'
  }
});