// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://auroralocksmith.com', // Replace with the actual live domain
  integrations: [
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // We'll keep Image false since we use native assets right now, avoiding long builds
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