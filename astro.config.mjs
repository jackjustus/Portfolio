// @ts-check
import {defineConfig, fontProviders} from 'astro/config';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
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