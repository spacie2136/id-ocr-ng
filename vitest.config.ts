import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    testTimeout: 90000,
    hookTimeout: 60000,
    pool: 'forks',
  },
});
