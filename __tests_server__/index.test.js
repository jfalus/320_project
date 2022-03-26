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

describe("Test correct email and password for login", () => {
  test("Login should be a success", done => {
    request(app)
      .post("/login")
      .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
      .then(response => {
        expect(response.text).toBe("Found. Redirecting to /home");
        done();
      });
  });
});

describe("Test correct email and wrong password for login", () => {
  test("Login should fail", done => {
    request(app)
      .post("/login")
      .send({username:"Charlene_Gilbert@atlastechnology.com", password:"password2"})
      .then(response => {
        expect(response.text).toBe("Found. Redirecting to /");
        done();
      });
  });
});

describe("Test wrong email and wrong password for login", () => {
  test("Login should fail", done => {
    request(app)
      .post("/login")
      .send({username:"email123", password:"4password"})
      .then(response => {
        expect(response.text).toBe("Found. Redirecting to /");
        done();
      });
  });
});