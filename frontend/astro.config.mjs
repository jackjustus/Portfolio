// @ts-check
import {defineConfig, fontProviders} from 'astro/config';

import vue from '@astrojs/vue';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx()],
  vite: {
    build: {
      cssMinify: 'esbuild'
    }
  },
  server: {
    port: 8000,
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Work Sans",
      cssVariable: "--work-sans"
    },
    {
      provider: fontProviders.google(),
      name: "Libre Baskerville",
      cssVariable: "--libre-baskerville"
    }
  ]
});