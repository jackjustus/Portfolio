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
      cssVariable: "--work-sans",
      // Ending on a generic family lets Astro generate a size-adjusted fallback
      // face, so text doesn't reflow when Work Sans swaps in.
      fallbacks: ["sans-serif"],
      // Variable range: real bold for headings, and every weight in between so
      // the homepage heading can animate its weight once the font loads.
      weights: ["100 900"],
    },
    {
      provider: fontProviders.google(),
      name: "Libre Baskerville",
      cssVariable: "--libre-baskerville",
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.local(),
      name: "IBM VGA",
      cssVariable: "--font-vga",
      fallbacks: ["monospace"],
      options: {
        variants: [{
          src: ["./src/assets/fonts/PxPlus_IBM_VGA_9x16.woff2"],
          weight: "normal",
          style: "normal",
        }],
      },
    }
  ]
});