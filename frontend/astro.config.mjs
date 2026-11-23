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
      // Headings are bold; with only 400 downloaded the browser fakes it.
      weights: ["400", "700"],
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