import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),vanillaExtractPlugin()],
})
