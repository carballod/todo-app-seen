const mockQuery = jest.fn();
const mockConnect = jest.fn();

const mockConnection = {
  query: mockQuery,
  connect: mockConnect,
};

mockConnect.mockImplementation((callback) => {
  if (callback) callback(null);
});

module.exports = mockConnection;
module.exports.mockQuery = mockQuery;
module.exports.mockConnect = mockConnect;
