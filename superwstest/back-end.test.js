const request = require('supertest');
const WebSocket = require('ws');
const app = require('../server'); // adjust this path to your Express app

describe('REST and WebSocket Integration Test', () => {
  it('should POST /purchase-coin and receive WebSocket message', (done) => {
    const ws = new WebSocket('ws://localhost:3000'); // adjust port if needed

    ws.on('open', () => {
      request(app)
        .post('/purchase-coin')
        .send({ coin: 'Bitcoin', amount: 1 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
        });
    });

    ws.on('message', (message) => {
      const data = JSON.parse(message);
      expect(data.type).toBe('coin-purchase-confirmation');
      expect(data.status).toBe('success');
      ws.close();
      done();
    });

    ws.on('error', (err) => done(err));
  });
});
