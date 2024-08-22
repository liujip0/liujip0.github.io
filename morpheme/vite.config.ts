import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      includeAssets: ['./vite.svg'],
      manifest: {
        name: 'Morpheme',
        short_name: 'Morpheme',
        description: 'An app to help conlangers create conlangs',
        theme_color: '#ffffff',
        icons: [
          {
            src: './vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: './vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  base: '/morpheme/',
});
