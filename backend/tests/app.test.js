const request = require("supertest");

jest.mock("../db/connection", () => require("./__mocks__/db-connection"));

describe("App Configuration", () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    delete require.cache[require.resolve("../app.js")];
    app = require("../app.js");
  });

  it("should handle CORS", async () => {
    const response = await request(app).options("/api/tasks").expect(204);

    expect(response.headers["access-control-allow-origin"]).toBe("*");
  });

  it("should parse JSON requests", async () => {
    const { mockQuery } = require("./__mocks__/db-connection");
    mockQuery.mockImplementation((query, params, callback) => {
      callback(null, { insertId: 1 });
    });

    await request(app)
      .post("/api/tasks")
      .send({ text: "Test task" })
      .expect(201);
  });

  it("should have tasks routes mounted", async () => {
    const { mockQuery } = require("./__mocks__/db-connection");
    mockQuery.mockImplementation((query, callback) => {
      callback(null, []);
    });

    await request(app).get("/api/tasks").expect(200);
  });
});
