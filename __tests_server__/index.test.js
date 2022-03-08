const request = require("supertest");
const app = require("../server/index.js");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test /hello", () => {
    test("It should response the GET method", done => {
      request(app)
        .get("/hello")
        .then(response => {
          expect(response.text).toBe("hello world!");
          done();
        });
    });
  });