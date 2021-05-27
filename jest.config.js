module.exports = {
  collectCoverageFrom: ['**/src/**/*.ts?(x)', '!**/*.d.ts'],
  coverageReporters: ['cobertura', 'json', 'lcov', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],
  testTimeout: 300000,
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
}
