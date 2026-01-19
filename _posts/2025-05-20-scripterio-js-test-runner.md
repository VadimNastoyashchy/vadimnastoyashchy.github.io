---
title: "ScripterI/O: A Fast and Simple JavaScript ESM Test Runner"
image: /assets/images/posts/2025-05-20-scripterio-js-test-runner/logo.png
excerpt: "ScripterI/O is a lightweight, fast, and easy-to-use JavaScript test runner designed for modern ESM-based projects. It provides a clean and intuitive API for writing and running tests, making it an excellent choice for all who value simplicity and speed in their testing workflows...
"
date: 2025-05-20 20:00:00 +01:00
last_modified_at: 2025-05-20 20:00:00 +01:00
tags:
  - JavaScript
  - Scripterio
---

![_config.yml]({{ site.url }}/assets/images/posts/2025-05-20-scripterio-js-test-runner/logo.png){: .align-center .border .max-width-600px}

## **What?**

[ScripterI/O](https://github.com/VadimNastoyashchy/scripterio) is a JavaScript testing framework designed to run on Node.js. It provides a simple and fast ESM (ECMAScript Module) runner for testing JavaScript code. The framework supports writing test cases using test and describe functions, organizing tests, and performing assertions with the expect function. It includes features like async/await support, test annotations, and context options for timeout configurations. ScripterI/O is focused on making testing easy and enjoyable for all.

## **Why?**

ScripterI/O is specifically designed with modern ECMAScript Modules (ESM) in mind, making it a better fit for ESM-based projects compared to older test runners like Jest or Mocha. Here's why:

1. **Native ESM Support**: Unlike Jest and Mocha, which often require additional configuration or experimental flags to work seamlessly with ESM, ScripterI/O natively supports ESM out of the box. This eliminates the need for workarounds and ensures a smoother development experience.

2. **Simplified Setup**: With ScripterI/O, you can start testing your ESM-based code immediately without worrying about compatibility issues or complex setup processes.

3. **Performance Optimization**: ScripterI/O is lightweight and optimized for speed, making it ideal for modern JavaScript projects that leverage ESM's tree-shaking and modularity features.

4. **Future-Proof**: As the JavaScript ecosystem continues to move towards ESM as the standard, Scripterio's design aligns with the latest trends and best practices, ensuring long-term compatibility and support.

4. **No 3-rd party dependency**: Runner doesn't use any of third-party dependency.

By choosing ScripterI/O for your ESM projects, you can focus on writing tests and building robust applications without being bogged down by legacy compatibility issues.

## **Usage**

ScripterI/O allows you to write test cases using a simple and familiar syntax. Here's how you can get started:

### **Installation**

To use first install it in your project:

```bash
npm install scripterio --save-dev
//or
yarn add scripterio --dev
```

### **Writing Tests**

Create a test file (e.g., `example.test.js`) and use Scripterio's API to define your test cases:

```js
import { describe, test, expect} from 'scripterio'

describe('Title for describe block', () => {
  test('Title for test', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
  })
})
```

### **Running Tests**
Run your tests using the Scripterio CLI:

```bash
npx scripterio --file="test.js"
//or
yarn scripterio --file="test.js"
```

---

## **Features**

1. **Simple API**: Scripterio provides a minimalistic API (`describe`, `test`, `expect`) that is easy to learn and use.
2. **ESM Support**: Built for modern JavaScript projects, fully supports ECMAScript Modules (ESM).
3. **Assertions**: Includes a variety of built-in assertions like `toBeEqual`, `toBeTruthy`, `toBeFalsy`, `toContain`, and more.
4. **Async Support**: Write asynchronous tests with ease using `async/await`.
5. **Customizable Hooks**: Use `beforeEach`, `afterEach`, `beforeAll`, and `afterAll` to set up and tear down test environments.

---

## **Pros**

- **Lightweight**: No third-party dependencies and a small footprint.
- **Fast**: Optimized for speed, making it ideal for large test suites.
- **Modern**: Fully supports ESM, aligning with the latest JavaScript standards.
- **Readable Syntax**: The API is intuitive and easy to understand, even for beginners.

---

## **Cons**

- **Limited Ecosystem**: As a newer tool, lacks the extensive plugin ecosystem of more established test runners like Jest or Mocha.
- **Basic Reporting**: The default test output is minimal, which may not meet the needs of teams requiring detailed reports.
- **No Built-in Mocking**: Unlike some other test runners, does not include built-in mocking or spying utilities.

---

## **Future Improvements**

1. **Enhanced Reporting**: Add support for detailed test reports, including HTML and JSON formats.
2. **Mocking and Spying**: Introduce built-in utilities for mocking and spying on functions.
3. **Parallel Execution**: Enable parallel test execution to further improve performance.
4. **Plugin System**: Develop a plugin architecture to allow for community-driven extensions.
5. **TypeScript Support**: Improve TypeScript integration with more comprehensive type definitions.

---

## **Code Examples**

### **Basic Test**
```javascript
import { describe, test, expect } from 'scripterio'

describe('String operations', () => {
  test('Check if string contains a substring', () => {
    const str = 'Hello, world!'
    expect(str).toContain('world')
  })
})
```

### **Async Test**
```javascript
import { describe, test, expect } from 'scripterio'

describe('Async operations', () => {
  test('Wait for a promise to resolve', async () => {
    const result = await new Promise((resolve) => setTimeout(() => resolve(42), 1000))
    expect(result).toBeEqual(42)
  })
})
```

### **Using Hooks**
```javascript
import { describe, test, beforeEach, afterEach, expect } from 'scripterio'

let counter = 0

describe('Counter tests', () => {
  beforeEach(() => {
    counter = 0
  })

  afterEach(() => {
    counter = null
  })

  test('Increment counter', () => {
    counter++
    expect(counter).toBeEqual(1)
  })
})
```

## **Summary**

ScripterI/O is a promising test runner for JavaScript developers who value simplicity and speed. While it may not yet have all the features of more established tools, its modern design and ease of use make it a great choice for small to medium-sized projects. With planned improvements like enhanced reporting and a plugin system, Scripterio has the potential to become a strong contender in the test automation space.

If you're looking for a lightweight and modern test runner, give ScripterI/O a try!

## P.S.
*ScripterI/O was created by me to use as a native ESM test runner that does not use third-party dependencies at all and to use own runner for all my personal projects. On the other hand, I am interested in developing a production (open source) tool for general purpose.*

---

***Thanks to everyone who read this article, I hope you found it useful.***
