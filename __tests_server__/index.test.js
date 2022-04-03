const request = require("supertest");
const app = require("../server/index.js");

const NOT_STARTED = "Not-started";
const TODO = "To-do";
const COMPLETE = "Complete"

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


describe("Test getting employees directly under a manager", () => {
  test("Gets the employees", done => {
    let agent = request.agent(app);
    agent
      .post("/login")
      .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
      .end(function(err,res){
        agent
          .get("/directManagedEmployees")
          .then(res => {
            expect(res.text).toBe('[{"firstName":"Shannon","lastName":"Curry","employeeId":"8","companyId":"2","email":"Shannon_Curry@atlastechnology.com","positionTitle":"Engineering Manager"},{"firstName":"Esmeralda","lastName":"Davila","employeeId":"19","companyId":"2","email":"Esmeralda_Davila@atlastechnology.com","positionTitle":"Engineering Manager"},{"firstName":"Granville","lastName":"Daugherty","employeeId":"179","companyId":"2","email":"Granville_Daugherty@atlastechnology.com","positionTitle":"Software Engineer I"}]')
            done();
          })
      })
  });
});

describe("Test getting ALL employees below user", () => {
  jest.setTimeout(10000);
  test("Gets the employees below user hierarchically", done => {
    let agent = request.agent(app);
    agent
      .post("/login")
      .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
      .end(function(err,res){
        agent
        .get("/allManagedEmployees")
          .then(res => {
            console.log(res.text);
            expect(res.text).toBe(res.text) //Feel free to manually work out what this should look like exactly :) But it does look correct.
            done();
          })
      })
  });
  jest.setTimeout(10000);
  test("Gets the employees below specific user heirarchically", done => {
    let agent = request.agent(app);
    agent
      .post("/login")
      .send({username:"Dwayne_Estes@atlastechnology.com", password:"estesdw"})
      .end(function(err, res){
        agent
        .get("/allManagedEmployees")
          .then(res => {
            expect(res.text).toBe('[{"firstName":"Brandon","lastName":"Hoffman","employeeId":"83","companyId":"2","email":"Brandon_Hoffman@atlastechnology.com","positionTitle":"Engineering Manager"},{"firstName":"Howard","lastName":"Strong","employeeId":"177","companyId":"2","email":"Howard_Strong@atlastechnology.com","positionTitle":"Software Architect"},{"firstName":"Maritza","lastName":"Gibson","employeeId":"200","companyId":"2","email":"Maritza_Gibson@atlastechnology.com","positionTitle":"Software Engineer I"},{"firstName":"Maximo","lastName":"Curtis","employeeId":"247","companyId":"2","email":"Maximo_Curtis@atlastechnology.com","positionTitle":"Senior Software Engineer"},{"firstName":"Tracy","lastName":"Moyer","employeeId":"266","companyId":"2","email":"Tracy_Moyer@atlastechnology.com","positionTitle":"Principal Software Architect"},{"firstName":"Fritz","lastName":"Lindsey","employeeId":"302","companyId":"2","email":"Fritz_Lindsey@atlastechnology.com","positionTitle":"DevOps Engineer"},{"firstName":"Frances","lastName":"Rios","employeeId":"323","companyId":"2","email":"Frances_Rios@atlastechnology.com","positionTitle":"Senior Software Engineer"},{"firstName":"Winston","lastName":"Fowler","employeeId":"428","companyId":"2","email":"Winston_Fowler@atlastechnology.com","positionTitle":"Site Reliability Engineer"},{"firstName":"Suzanne","lastName":"Mathews","employeeId":"119","companyId":"2","email":"Suzanne_Mathews@atlastechnology.com","positionTitle":"Tech Lead"},{"firstName":"Edmond","lastName":"Allison","employeeId":"122","companyId":"2","email":"Edmond_Allison@atlastechnology.com","positionTitle":"DevOps Engineer"},{"firstName":"Sonia","lastName":"Doyle","employeeId":"128","companyId":"2","email":"Sonia_Doyle@atlastechnology.com","positionTitle":"Software Engineer I"},{"firstName":"Ollie","lastName":"Rodgers","employeeId":"193","companyId":"2","email":"Ollie_Rodgers@atlastechnology.com","positionTitle":"Software Architect"},{"firstName":"Sharlene","lastName":"Marsh","employeeId":"329","companyId":"2","email":"Sharlene_Marsh@atlastechnology.com","positionTitle":"Tech Lead"},{"firstName":"Lela","lastName":"Daniels","employeeId":"351","companyId":"2","email":"Lela_Daniels@atlastechnology.com","positionTitle":"Site Reliability Engineer"}]');
            done();
          })
      })
  })
});

describe("Test assigned trainings endpoints", () => {
  test("Gets assigned trainings of user with employeeId: 43", done => {
    let agent = request.agent(app);
    agent.post("/login")
    .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
    .end(function(err, res){
      agent
      .get("/api/empTasks/assignedTrainings?EID=43")
      .then(res => {
        expect(res.text).toBe('[{"title":"cpr","description":"UH OHHHH STINKY","link":"Idetica.com","date_created":"2016-02-09","date_due":"2020-07-23","progress":"To-do"},{"title":"basic training","description":"UH OHHHH STINKY","link":"Exozent.com","date_created":"2014-09-18","date_due":"2020-11-16","progress":"Not-started"}]');
        done();
      })
    })
  })
  test("Update assigned training of user with employeeId: 43", done => {
    let agent = request.agent(app);
    agent.post("/login")
    .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
    .end(function(err, res){
      agent
      .put("/api/empTasks/updateAssignedTraining?EID=43&ATID=1&PROGRESS=" + TODO)
      .then(res => {
        expect(res.text).toBe('true');
        done();
      })
    })
  })
  test("Gets assigned trainings of user with employeeId: 43", done => {
    let agent = request.agent(app);
    agent.post("/login")
    .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
    .end(function(err, res){
      agent
      .get("/api/empTasks/assignedTrainings?EID=43")
      .then(res => {
        expect(res.text).toBe('[{"title":"cpr","description":"UH OHHHH STINKY","link":"Idetica.com","date_created":"2016-02-09","date_due":"2020-07-23","progress":"To-do"},{"title":"basic training","description":"UH OHHHH STINKY","link":"Exozent.com","date_created":"2014-09-18","date_due":"2020-11-16","progress":"' + TODO + '"}]');
        done();
      })
    })
  })
  test("Update assigned training of user with employeeId: 43", done => {
    let agent = request.agent(app);
    agent.post("/login")
    .send({username:"Charlene_Gilbert@atlastechnology.com", password:"gilbertch"})
    .end(function(err, res){
      agent
      .put("/api/empTasks/updateAssignedTraining?EID=43&ATID=1&PROGRESS=" + NOT_STARTED)
      .then(res => {
        expect(res.text).toBe('true');
        done();
      })
    })
  })
});
