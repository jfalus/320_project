const app = require('../server/server.js');
const supertest = require("supertest");
const request = supertest(app);

describe("GET Endpoint", function() {
    test("Testing test", function() {
        expect(true).toBe(true);
    });
});
