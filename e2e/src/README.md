# Software Development and Testing Blog

## About the Project

This blog is dedicated to sharing exciting ideas and practical tips in software development and automated testing, with a particular focus on JavaScript. We publish articles covering various aspects of programming and testing, including practical examples of test framework usage.

## Getting Started

> Before you follow the steps below, make sure you have [Node.js](https://nodejs.org/en/download/) installed _globally_ on your system.

Install all necessary dependencies using npm:

```
npm install
```

### Run the Tests

You can run the automated tests to verify the blog functionalities either using npm or directly via npx:

```
npm run regression
```
or

```
npx playwright test
```

### Generate the Test Report

Generate a detailed report about the results of the latest tests run:

```
npm run report
```
or

```
npx playwright show-report
```

### Additional Commands

- **Code Linting:**

```
npx eslint "src/**"
```
Checks the code for styling errors and syntax issues according to coding standards.

- **Format Code:**

```
prettier --write "src/**/*.{js,ts}"
```
Automatically formats JavaScript and TypeScript files according to defined style rules.

- **Debug Tests:**

```
npx playwright test --headed --timeout=0 --debug
```
Runs tests in a visibly interactive mode, enabling detailed step-through debugging.

