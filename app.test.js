const app = require('./server')
const request = require('supertest');


beforeAll(() => {
    process.env.NODE_ENV = 'test';
})


test('getData', async () => {
    const res = await request(app).get('/feeling'),
        response = {
            // Date: "7.10.2020",
            // Temp: 65.28,
            // Content: "I feel so happy"
        };
    expect(res.status).toBe(200);
    console.log(res.body.success);
})