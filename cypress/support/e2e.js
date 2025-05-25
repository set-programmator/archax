import 'cypress-mochawesome-reporter/register';
import './commands';

afterEach(function () {
  const testName = this.currentTest.fullTitle().replace(/[:\/]/g, '');

  if (this.currentTest.state === 'passed') {
    // Take screenshot for passed tests
    cy.screenshot(`passed/${testName}`);
  } else if (this.currentTest.state === 'failed') {
    // Take screenshot for failed tests (Cypress does this automatically if screenshotOnRunFailure = true)
    // But to be sure, you can also add:
    cy.screenshot(`failed/${testName}`);
  }
});