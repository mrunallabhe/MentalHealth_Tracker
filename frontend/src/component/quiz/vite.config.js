import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx', // Enable JSX loader for .js files
    },
    include: /src\/.*\.js$/, // Apply this loader only to your source files
  },
});
