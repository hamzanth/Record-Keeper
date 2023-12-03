import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     define: {
//       'process.env.PAYSTACK_PUBLIC_KEY': JSON.stringify(env.PAYSTACK_PUBLIC_KEY)
//     },
//     plugins: [react()],
//   }
// })