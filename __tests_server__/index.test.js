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

// describe("Test getting employees of a manager", () => {
//   test("Gets the employees", done => {
//     request(app)
//       .post("/login")
//       .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
//       .then(response => {
//         expect(response.text).toBe("Found. Redirecting to /home");
//         request(app)
//           .get("/managedEmployees")
//           .then(response => {
//               expect(response.text != null);
//         })
//       });
//   });
// });


describe("Test getting employees of a manager", () => {
  test("Gets the employees", done => {
    let agent = request.agent(app);
    agent
      .post("/login")
      .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
      .end(function(err,res){
        agent
          .get("/directManagedEmployees")
          .then(res => {
            expect(res.text).toBe('[{"employeeId":"8","companyId":"2"},{"employeeId":"19","companyId":"2"},{"employeeId":"179","companyId":"2"}]')
            done();
          })
      })
  });
});

describe("Test getting ALL employees below user", () => {
  /*First test times out even if I give it two minutes. Error, or just lots of data for JSON?*/
  //jest.setTimeout(10000);
  // test("Gets the employees below user hierarchically", done => {
  //   let agent = request.agent(app);
  //   agent
  //     .post("/login")
  //     .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
  //     .end(function(err,res){
  //       agent
  //       .get("/allManagedEmployees")
  //         .then(res => {
  //           expect(res.text).toBe('[{"employeeId":"8","companyId":"2"},{"employeeId":"19","companyId":"2"},{"employeeId":"179","companyId":"2"}]')
  //           done();
  //         })
  //     })
  // });
  test("Gets the employees below specific user heirarchically", done => {
    let agent = request.agent(app);
    agent
      .post("/login")
      .send({username:"Dwayne_Estes@atlastechnology.com", password:"estesdw"})
      .end(function(err, res){
        agent
        .get("/allManagedEmployees")
          .then(res => {
            expect(res.text).toBe('[{"employeeId":"83","companyId":"2"},{"employeeId":"177","companyId":"2"},{"employeeId":"200","companyId":"2"},{"employeeId":"247","companyId":"2"},{"employeeId":"266","companyId":"2"},{"employeeId":"302","companyId":"2"},{"employeeId":"323","companyId":"2"},{"employeeId":"428","companyId":"2"},{"employeeId":"119","companyId":"2"},{"employeeId":"122","companyId":"2"},{"employeeId":"128","companyId":"2"},{"employeeId":"193","companyId":"2"},{"employeeId":"329","companyId":"2"},{"employeeId":"351","companyId":"2"}]');
            done();
          })
      })
  })
});

// describe("Test getting ALL employees from company 2", () => {
//   test("Gets the employees from company 2", done => {
//     let agent = request.agent(app);
//     agent
//       .post("/login")
//       .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
//       .end(function(err,res){
//         agent
//         .get("/allFrom2")
//           .then(res => {
//             console.log(res);
//             done();
//           })
//       })
//   });
// });

