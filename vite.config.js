import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/dictionary',
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // make service worker work in dev mode
      },
      manifest: {
        name: 'Dictionary',
        short_name: 'Dict',
        description: 'My Awesome Dict',
        theme_color: 'purple',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    allowedHosts: ['ebde-2409-8900-6cfa-860e-95c-2fe-e1e5-500.ngrok-free.app']
  }
  
})
