module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['whatwg-fetch'],
};
