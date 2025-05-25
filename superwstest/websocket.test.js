import WebSocket from 'ws';
import request from 'superwstest';

const baseURL = 'http://localhost:3100';

describe('WebSocket Server', () => {
  let ws;
  const messages = [];

  beforeAll((done) => {
    ws = new WebSocket('ws://localhost:3100');
    ws.on('message', (data) => {
      const parsed = JSON.parse(data);
      messages.push(parsed);
    });
    ws.on('open', () => done());
  });

  afterAll((done) => {
    ws.close();
    done();
  });

  it('should receive messages with the correct payload shape', (done) => {
    setTimeout(() => {
      const msg = messages[0];
      expect(msg).toHaveProperty('coins');
      expect(msg).toHaveProperty('inventory');
      expect(msg).toHaveProperty('time');

      expect(Array.isArray(msg.coins)).toBe(true);
      expect(Array.isArray(msg.inventory)).toBe(true);
      expect(typeof msg.time).toBe('number');
      done();
    }, 1500); // Wait for initial message
  });

  it('should increment CoinB price by 1 on each message', (done) => {
    setTimeout(() => {
      const coinBPrices = messages
        .map((msg) => msg.coins.find((coin) => coin.id === 3)?.price)
        .filter((price) => typeof price === 'number');

      // We need at least 3 messages to verify increments
      expect(coinBPrices.length).toBeGreaterThanOrEqual(3);

      for (let i = 1; i < coinBPrices.length; i++) {
        expect(coinBPrices[i]).toBe(coinBPrices[i - 1] + 1);
      }
      done();
    }, 3500); // Wait enough for a few price updates (1s interval)
  });

  it('should reflect inventory updates after a /purchase-coin call', async () => {
    // Make a purchase
    const purchaseRes = await request(baseURL)
      .post('/purchase-coin')
      .send({ coinId: 2, amount: 2 }) // Buy 2 CoinA
      .expect(200);

    const updatedInventory = purchaseRes.body.inventory;
    const bought = updatedInventory.find((c) => c.coinId === 2);
    expect(bought.amountOwned).toBeGreaterThanOrEqual(2);

    // Wait for WebSocket to send updated inventory
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lastMessage = messages[messages.length - 1];
    const wsCoinA = lastMessage.inventory.find((c) => c.coinId === 2);
    expect(wsCoinA).toBeDefined();
    expect(wsCoinA.amountOwned).toBeGreaterThanOrEqual(2);
  });
});
