export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
