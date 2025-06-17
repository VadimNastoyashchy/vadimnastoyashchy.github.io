---
title: "Performing API Testing Using ScripterI/O as a JavaScript Test Runner"
image: /assets/images/posts/2025-06-17-scripterio-js-test-runner-api-tests/logo.png
excerpt: "API (Application Programming Interface) testing is an integral part of modern software development processes. It involves testing the interactions between different software components through endpoints and validating their behavior against expected outcomes. Unlike UI testing, API testing focuses exclusively on backend functionality...
"
date: 2025-06-17 09:00:00 +01:00
last_modified_at: 2025-06-17 09:00:00 +01:00
tags:
  - JavaScript
  - ScripterI/O
---

![_config.yml]({{ site.url }}/assets/images/posts/2025-06-17-scripterio-js-test-runner-api-tests/logo.png){: .align-center .border .max-width-600px}

*API (Application Programming Interface) testing is an integral part of modern software development processes. It involves testing the interactions between different software components through endpoints and validating their behavior against expected outcomes. Unlike UI testing, API testing focuses exclusively on backend functionality, ensuring data communication and processing are robust, secure, and error-free.*

### API testing commonly evaluates whether:

- Endpoints return expected responses for various request methods (GET, POST, PUT, PATCH, DELETE, etc.).
- Validations, error handling, and HTTP status codes behave as expected.
- HTTP request/response payloads meet integration requirements.

***ScripterI/O, a lightweight JavaScript test runner with built-in HTTP client support, simplifies API testing by offering an intuitive setup and execution process. It enables developers to run test cases programmatically and generate detailed reports for debugging or documentation purposes.***

![_config.yml]({{ site.url }}/assets/images/posts/2025-06-17-scripterio-js-test-runner-api-tests/api.png){: .align-center .border .max-width-600px}

## Setting Up and Configuring ScripterI/O for API Testing

Prerequisites
Before using ScripterI/O for testing, ensure that:

> *Node.js is installed globally on your system*

> *Your project has a valid package.json file (created using npm init)*

### Installation

Install ScripterI/O using either npm or yarn:

```bash
npm install scripterio --save-dev
# or
yarn add scripterio --dev
```

### Writing API Tests

Let's create an API test suite to demonstrate API testing. We'll check CRUD operations against a public REST API (https://api.restful-api.dev/objects) and validate the responses.

Creating the Test File (api-test.js)
Below is an example test file written using ScripterI/O's syntax:

```js
import {
  describe,
  test,
  expect,
  request,
  beforeEach,
  afterAll,
} from "scripterio";

const BASE_ENDPOINT = "https://api.restful-api.dev/objects";
let preparedData;

// Helper function to delete test data
const cleanData = async (id) => {
  return await request.delate(`${BASE_ENDPOINT}/${id}`);
};

// Helper function to create test data
const createData = async () => {
  const product = {
    name: "Apple MacBook Pro 2020",
    data: {
      year: 2020,
      price: 1999.99,
      "CPU model": "M1 pro",
      "Hard disk size": "1 TB",
      color: "space gray",
    },
  };

  const response = await request.post(BASE_ENDPOINT, product);
  return await response.json();
};

describe("API Testing with ScripterI/O", () => {
  // Setup and teardown logic
  beforeEach(async () => {
    if (preparedData) await cleanData(preparedData.id);
    preparedData = await createData();
  });

  afterAll(async () => {
    if (preparedData) await cleanData(preparedData.id);
  });

  // Test GET method to fetch a single object
  test("Check GET method to retrieve a single object", async () => {
    const response = await request.get(`${BASE_ENDPOINT}/${preparedData.id}`);
    expect(response.status).toBeEqual(200);
  });

  // Test GET method to fetch all objects
  test("Check GET method to retrieve all objects", async () => {
    const response = await request.get(BASE_ENDPOINT);
    const data = await response.json();
    expect(response.status).toBeEqual(200);
    expect(data.length).toBeGreaterThan(1); // Ensure at least one object exists
  });

  // Test PUT method to update an object
  test("Check PUT method to update a single object", async () => {
    const product = {
      name: "Apple MacBook Pro 2021",
      data: {
        year: 2021,
        price: 1999.99,
        "CPU model": "M2 pro",
        "Hard disk size": "1 TB",
        color: "silver",
      },
    };
    const response = await request.put(
      `${BASE_ENDPOINT}/${preparedData.id}`,
      product
    );
    const data = await response.json();
    expect(response.status).toBeEqual(200);
    expect(data.updatedAt).toBeDefined();
    expect(data.id).toBeEqual(preparedData.id);
    expect(data.name).toBeEqual(product.name);
  });

  // Test PATCH method to partially update an object
  test("Check PATCH method to partially update a single object", async () => {
    const product = {
      name: "Apple MacBook Air",
    };
    const response = await request.patch(
      `${BASE_ENDPOINT}/${preparedData.id}`,
      product
    );
    const data = await response.json();
    expect(response.status).toBeEqual(200);
    expect(data.updatedAt).toBeDefined();
    expect(data.id).toBeEqual(preparedData.id);
    expect(data.name).toBeEqual(product.name);
  });
});
```

### Running Your Tests

To execute the test suite, use the ScripterI/O runner:

```bash
npx scripterio --file="api-test.js"
# or
yarn scripterio --file="api-test.js"  
```

### Generating Detailed Reports

ScripterI/O offers reporting functionality, including an HTML report. To generate an HTML report, use the **--reporter=html** flag:

```bash
npx scripterio --file=api-test.js --reporter=html
```

The report will be saved in the scripterio-report directory and include details about passed/failed tests, HTTP client interactions, and network request data.

![_config.yml]({{ site.url }}/assets/images/posts/2025-06-17-scripterio-js-test-runner-api-tests/report-demo.gif){: .align-center .border .max-width-600px}


## Conclusion
API testing is a critical component of ensuring application reliability and backend functionality. ScripterI/O provides a streamlined approach to API testing with built-in methods for HTTP requests, flexible assertion capabilities, and reporting features to simplify debugging.

By following this guide, you can set up ScripterI/O for API testing, write robust test cases, and generate insightful reports. Whether it's testing GET, POST, PUT, PATCH, or DELETE operations, ScripterI/O's lightweight and dependency-free runner is an excellent solution for developers aiming to enhance software quality.

## P.S.
*ScripterI/O was created by me to use as a native ESM test runner that does not use third-party dependencies at all and to use own runner for all my personal projects. On the other hand, I am interested in developing a production (open source) tool for general purpose.*

