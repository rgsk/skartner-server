import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
};
export default config;
