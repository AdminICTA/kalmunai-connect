
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    cors: false,
    origin: "http://localhost:8080",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 8080
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    ssrManifest: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers/zod', 'zod'],
          'ui-vendor': ['sonner', 'lucide-react', 'qrcode.react'],
          'dashboard': ['./src/components/dashboard/staff/PublicUserManagement.tsx', './src/pages/PublicDetails.tsx'],
          'auth': ['./src/auth/auth-context.tsx', './src/contexts/user-context.tsx'],
          'settings': ['./src/pages/settings.tsx']
        }
      }
    }
  },
}));
