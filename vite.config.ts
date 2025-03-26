
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ['ac54273c-f2b4-4471-ab40-e34e98541d95.lovableproject.com'], // Add this line to allow the host
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
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
