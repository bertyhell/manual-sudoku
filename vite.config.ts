import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    build: {
      outDir: './docs',
    },
    base: command === 'serve' ? '/' : '/manual-sudoku',
  };
});
