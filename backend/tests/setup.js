process.env.NODE_ENV = "test";
process.env.DB_HOST = "localhost";
process.env.DB_USER = "test_user";
process.env.DB_PASSWORD = "test_password";
process.env.DB_NAME = "test_todoapp";
process.env.PORT = 3001;

global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
