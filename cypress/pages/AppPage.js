// cypress/pages/AppPage.js
class AppPage {
  // 1. LOCATORS - All selectors centralized
  elements = {
    balance: () => cy.contains('.inventory div', 'USD Balance: $1000'),
    coins: () => cy.get('.ticket'),
    coinTicket: (coinName) => cy.contains('.ticket-name', coinName).parents('.ticket'),
    coinTicketPrice: () => cy.get('.ticket-price'),
    coinPurchaseInput: () => cy.get('.purchase-input'),
    coinInventory: (coinName) => cy.contains('.inventory-item', coinName),
    coinPrice: (coinName) => this.elements.coinTicket(coinName).find('.ticket-price'),
    coinInput: (coinName) => this.elements.coinTicket(coinName).find('.purchase-input'),
    actionButton: (coinName, action) => 
      this.elements.coinTicket(coinName).contains('button', action),
    amountOwned: (coinName) => 
      this.elements.coinInventory(coinName).find('.amount-owned')
  };

  // 2. NAVIGATION
  visit() {
    cy.visit('/');
    return this;
  }

  // 3. VERIFICATION METHODS
  verifyInitialBalance(initialBalance) {
    this.elements.balance()
      .should('have.text', `USD Balance: $${initialBalance}`)
      .and('be.visible');
    return this;
  }

  verifyCoinIncrement(coin, expectedIncrement) {
    this.elements.coinTicket(coin).within(() => {
      this.elements.coinTicketPrice().invoke('text').then(initialPriceText => {
        const initialPrice = parseFloat(initialPriceText.replace('$', ''))

        this.elements.coinTicketPrice().invoke('text').should(newPriceText => {
          const newPrice = parseFloat(newPriceText.replace('$', ''))
          expect(newPrice).to.equal(initialPrice + expectedIncrement)
        })
      })
    })
  }

  verifyInventoryUpdates(coin, orderedAmount) {
    // Get initial price before buying
    let currentPrice;
    this.elements.coinTicket(coin).within(() => {
      this.elements.coinTicketPrice().invoke('text').then(priceText => {
        currentPrice = parseFloat(priceText.replace('$', ''));
      });
    });
    
    this.elements.coinInventory(coin).within(() => {
      // 1. Assert coins owned increased by 3
      cy.contains(`Coins owned: ${orderedAmount}`)
        .should('have.text', `Coins owned: ${orderedAmount}`)
        .and('be.visible');

      // 2. Assert market value is correct
      this.elements.amountOwned(coin).invoke('text').should(marketValueText => {
        const displayedValue = parseFloat(marketValueText.split('$')[1]);
        expect(displayedValue).to.equal(currentPrice * orderedAmount);
      });
    });
  }

  verifyCoinOwned(coinName, expectedQuantity) {
    this.elements.coinInventory(coinName)
      .contains(`Coins owned: ${expectedQuantity}`)
      .should('have.text', `Coins owned: ${expectedQuantity}`)
      .and('be.visible');
    return this;
  }

  // 4. ACTION METHODS
  buyCoin(coinName, quantity) {
    this.tradeCoin(coinName, 'Buy', quantity);
    return this;
  }

  sellCoin(coinName, quantity) {
    this.tradeCoin(coinName, 'Sell', quantity);
    return this;
  }

  // 5. PRIVATE METHODS
  getCurrentPrice(coinName) {
    return this.elements.coinPrice(coinName)
      .invoke('text')
      .then(text => parseFloat(text.replace('$', '')));
  }

  tradeCoin(coinName, action, quantity) {
    this.elements.coinInput(coinName).clear().type(quantity);
    this.elements.actionButton(coinName, action).click();
    return this;
  }
}

export default new AppPage();