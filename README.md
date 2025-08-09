# End-to-End Test Automation Framework using Playwright for ParaBank Application and CI/CD integration using Jenkins

## Test assignment
#### Application URL: https://parabank.parasoft.com/ <br />

#### Overview: 
&nbsp;&nbsp;&nbsp;&nbsp; • Para bank is a realistic online banking application which enables users to manage fund transactions.<br />
&nbsp;&nbsp;&nbsp;&nbsp; • Develop a E2E test automation framework using Playwright for Para bank application covering both UI and API test
scenarios mentioned below.<br />

#### UI Test scenarios:
&nbsp;&nbsp;&nbsp;&nbsp; 1. Navigate to Para bank application.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 2. Create a new user from user registration page (Ensure username is generated randomly and it is unique in every test execution).<br />
&nbsp;&nbsp;&nbsp;&nbsp; 3. Login to the application with the user created in step 2.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 4. Verify if the Global navigation menu in home page is working as expected.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 5. Create a Savings account from “Open New Account Page” and capture the account number.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 6. Validate if Accounts overview page is displaying the balance details as expected.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 7. Transfer funds from account created in step 5 to another account.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 8. Pay the bill with account created in step 5.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 9. Add necessary assertions at each test step whenever it is needed.<br />

#### API Test scenarios:
&nbsp;&nbsp;&nbsp;&nbsp; 1. Search the transactions using “Find transactions” API call by amount for the payment transactions made in Step 8.<br />
&nbsp;&nbsp;&nbsp;&nbsp; 2. Validate the details displayed in Json response.<br />
<br />

## Directory Structure:

/tests <br />
&nbsp;&nbsp;&nbsp;&nbsp; /data: the API and shared data file <br />
&nbsp;&nbsp;&nbsp;&nbsp; /e2e: UI and API test scripts <br />
&nbsp;&nbsp;&nbsp;&nbsp; /fixtures: fixtures for UI tests <br />
&nbsp;&nbsp;&nbsp;&nbsp; /pages: application pages - POM  <br />
&nbsp;&nbsp;&nbsp;&nbsp; /services: api test services   <br />
&nbsp;&nbsp;&nbsp;&nbsp; /utils: utility files for storing shared data   <br />
&nbsp;&nbsp;&nbsp;&nbsp; /playwright.config.ts: Playwright config file <br />
&nbsp;&nbsp;&nbsp;&nbsp; /tsconfig.json: TyprScript config file <br />
&nbsp;&nbsp;&nbsp;&nbsp; /package.json: dependencies <br />
&nbsp;&nbsp;&nbsp;&nbsp; /JenkinsFile : Groovy script that defines the CI/CD pipeline in Jenkins <br />

## Getting Started:

You need to have the following installed in your machine:

1. install node and npm - https://nodejs.org/en/download/
2. verify the installation using below command:  <br />
&nbsp;&nbsp; `node -v` <br />
&nbsp;&nbsp; `npm -v`
3. command to install the necessary browser binaries and their system dependencies required for `Playwright` and `Typesciprt` to function: <br />
&nbsp;&nbsp; `npm install -D @playwright/test typescript`  <br />
&nbsp;&nbsp; `npx playwright install`
4. to run the test, run the command: `npm test`
5. To open last HTML report run:  <br />
&nbsp;&nbsp; `npx playwright show-report playwright-report`
