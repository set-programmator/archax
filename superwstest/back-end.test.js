import request from 'superwstest';

describe('purchase-coin endpoint', () => {
  const baseURL = 'http://localhost:3100';

  it('should return a successful response payload after buying a coin', async () => {
    await request(baseURL)
      .post('/purchase-coin')
      .send({ coinId: 2, amount: 1 }) // Buy 1 CoinA
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(Array.isArray(res.body.inventory)).toBe(true);
        const coin = res.body.inventory.find((item) => item.coinId === 2);
        expect(coin).toBeDefined();
        expect(coin.amountOwned).toBeGreaterThan(0);
      });
  });
});
