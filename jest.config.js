// jest.config.js
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleNameMapper: {
      '^@/(.*)$': './src/$1',
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
  