import { defineConfig } from '@umijs/max';

/**
 * Exported multi-environment variable naming convention: always capitalize and use underscore to separate words
 * Note: After adding the variable, you need to add the declaration of the variable in src/typing.d.ts, otherwise the IDE will report an error when using the variable.
 */
export default defineConfig({
  define: {
    REACT_APP_ENV: 'production',
    AUTH_API_URL: 'https://api.hathyo.com/auth/api/v1', // API address
    ADMIN_API_URL: 'https://api.hathyo.com/admin/api/v1', // API address
  },
});
