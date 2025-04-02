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
