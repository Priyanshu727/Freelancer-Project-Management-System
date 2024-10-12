

// https://vitejs.dev/config/
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
