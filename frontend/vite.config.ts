import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './wailsjs/go/app/App'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@wailsjs': path.resolve(__dirname, './wailsjs'),
      '@models': path.resolve(__dirname, './wailsjs/go/models'),
      '@runtime': path.resolve(__dirname, './wailsjs/runtime'),
      '@trueblocks/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@trueblocks/scaffold': path.resolve(__dirname, '../../packages/scaffold/src'),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
  server: {
    hmr: {
      host: 'localhost',
    },
  },
});
