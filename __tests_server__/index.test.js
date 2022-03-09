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

describe("Test correct login", () => {
  test("Login should be a success", done => {
    request(app)
      .post("/login")
      .send({username:"email1", password:"password1"})
      .then(response => {
        expect(response.text).toBe("Found. Redirecting to /home");
        done();
      });
  });
});

describe("Test incorrent login", () => {
  test("Login should fail", done => {
    request(app)
      .post("/login")
      .send({username:"email1", password:"password2"})
      .then(response => {
        expect(response.text).toBe("Found. Redirecting to /");
        done();
      });
  });
});