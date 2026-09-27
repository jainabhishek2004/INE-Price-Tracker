import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  plugins: [react()],
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\// },
            { name: 'query', test: /node_modules\/@tanstack\/(react-query|query-core)\// },
            {
              name: 'mui',
              test: /node_modules\/(?:@mui\/material|@mui\/system|@mui\/styled-engine|@mui\/utils|@mui\/private-theming|@mui\/icons-material|@emotion)\//,
            },
            { name: 'data-grid', test: /node_modules\/(?:@mui\/x-data-grid|@mui\/x-internals|@mui\/x-virtualizer)\// },
          ],
        },
      },
    },
  },
});
