## SDET Exercise

## Guidelines
What I Did.
1. Used Cypress for frontend automation, integrating Page Object Models (POMs), and leveraged fixtures for test data and organized end-to-end tests.
2. Integrated mochawesome as the Cypress reporter to generate detailed HTML test reports.
3. Created backend API and WebSocket tests under the superwstest folder using SuperWsTest.
4. Integrated jest-html-reporter to generate HTML reports for backend tests.
5. Cypress test reports are stored in the cypress/report folder.
6. Backend API test reports are stored in the report folder at the root.
7. Refer to package.json for the full list of dependencies used.
8. Created babel.config.js to support running native and modern JavaScript features in Jest tests.
(This configuration allows Jest to transpile modern JS syntax, ensuring compatibility with Node.js.)

## How to Get Started — Step by Step
1. Clone the repository
    git clone https://github.com/set-programmator/archax.git
    cd archax
2. Install dependencies
    yarn install
3. Run Cypress front-end tests
    yarn test:headless
    yarn test:headed
    yarn test:report
4. Run backend API and WebSocket tests (SuperWsTest)
    yarn test:superwstest
5. View Reports
    cypress/report/
    report
    
