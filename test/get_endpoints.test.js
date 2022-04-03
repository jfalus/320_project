const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('testAPI Test', function() {
    test('testAPI returns the correct string', async function() {
        const res = await request.get('/api/testAPI');
        
        expect(res.body.string).toBe('hello!');
        expect(res.status).toBe(200);
    });
});

describe('GET Endpoint Testing', function() {
    test('Something', async function() {
        const res = await request.get('/api/empTasks/assignedTrainings');

        console.log(res.body);
        
        expect(res.status).toBe(200);
    });
});
