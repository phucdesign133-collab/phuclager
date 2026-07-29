import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Phúc Lager App',
        short_name: 'Phúc Lager',
        description: 'Ứng dụng cá nhân Phúc Lager',
        theme_color: '#b71c1c',
        background_color: '#ffffff',
        display: 'standalone', // Giúp ẩn thanh địa chỉ trình duyệt, chạy độc lập như app
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})