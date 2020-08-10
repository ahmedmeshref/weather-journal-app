const app = require('./server')
const request = require('supertest');


beforeAll(() => {
    process.env.NODE_ENV = 'test';
})


test('getData', async () => {
    const res = await request(app).get('/feeling');
    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
})

test('sendData', async () => {
    const data = {
        date: "7.10.2020",
        temp: 63.1,
        content: "Happy"
    }
    let postRes = await request(app)
            .post('/feeling')
            .send(data)
    expect(postRes.status).toBe(200);
    expect(postRes.body.success).toBeTruthy();

    const getRes = await request(app).get('/feeling');
    expect(getRes.status).toBe(200);
    expect(getRes.body.success).toBeTruthy();
    expect(getRes.body.data).toEqual(data);
})