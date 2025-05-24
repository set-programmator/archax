import AppPage from "../pages/AppPage"

// cypress/e2e/trading-app.spec.cy.js
describe('Crypto Trading App Tests', () => {
  let testData;
  beforeEach(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
      AppPage.visit();
      AppPage.verifyInitialBalance(testData.initialValue);
    });
  })

  it('should verify initial state on load', () => {
    // 1. Assert $1000 USD balance (PASSED)
    AppPage.elements.balance()
      .should('have.text', `USD Balance: $${testData.initialValue}`)
      .and('be.visible')

    // 2. Assert four coin options available (PASSED)
    AppPage.elements.coins()
      .should('have.length', testData.numberOfCoins)

    // 3. Assert CoinB increments by $1 over time (FAILED - Please see bugReport.md file for more details)
    AppPage.verifyCoinIncrement(
      testData.selectedCoin, 
      testData.coinBIncrementingValue
    )
  })

  it('should verify buying flow for CoinB', () => {
    // Buy 3 coins of CoinB
    AppPage.buyCoin(
      testData.selectedCoin, 
      testData.numberOfCoinsBought
    )

    // Verify inventory updates
    AppPage.verifyInventoryUpdates(
      testData.selectedCoin, 
      testData.numberOfCoinsBought
    )
  });

  it('should verify selling flow for CoinB', () => {
    // Precondition: Buy 3 coins first
    AppPage.buyCoin(
      testData.selectedCoin, 
      testData.numberOfCoinsBought
    )

    // Sell 1 coin
    AppPage.sellCoin(
      testData.selectedCoin, 
      testData.numberOfCoinsSold
    )

    // Assert coins owned decreased to 2
    AppPage.verifyCoinOwned(
      testData.selectedCoin, 
      testData.ownedCoin
    )
  })
})