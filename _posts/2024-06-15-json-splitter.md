---
title: "How do I split one or more large JSON files into a bunch of smaller JSON files?"
image: /assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp
excerpt: "Working with JSON (JavaScript Object Notation) is common in web development. JSON has become a popular data exchange format because of its lightweight nature and easy-to-understand syntax. However, we sometimes encounter large JSON files that can be bulky and difficult for other tools to manage, read, or process.
In such scenarios, it is beneficial to break or “slice” the mammoth JSON file into smaller, more manageable chunks. This divide-and-conquer approach allows for efficient processing, easy sanity checking, and better readability. 
This article will introduce you to the JSONSplitter UI application and guide you through the process of splitting large JSON files into smaller ones.
"
date: 2024-06-15 20:00:00 +01:00
last_modified_at: 2024-06-15 20:00:00 +01:00
tags:
  - JavaScript
  - JSON
  - Split
---

Working with JSON (JavaScript Object Notation) is common in web development. JSON has become a popular data exchange format because of its lightweight nature and easy-to-understand syntax. However, we sometimes encounter large JSON files that can be bulky and difficult for other tools to manage, read, or process.
In such scenarios, it is beneficial to break or “slice” the mammoth JSON file into smaller, more manageable chunks. This divide-and-conquer approach allows for efficient processing, easy sanity checking, and better readability. 
This article will introduce you to the JSONSplitter UI application and guide you through the process of splitting large JSON files into smaller ones.

## What is a JSON Splitter app?

A JSON splitter is a UI tool that takes a JSON file/s as input and breaks it down into several smaller JSON files.

## Getting Started

### 1. Clone the [repo](https://github.com/VadimNastoyashchy/JSONSplitter) / or download latest [Source code (zip)](https://github.com/VadimNastoyashchy/JSONSplitter/releases)
> *Before you follow the steps below, make sure you have the*

[Node.js](https://nodejs.org/en/download/) installed *globally* only your system

### 2. Installing (Open the JSONSplitter root directory)

    npm install

### 3. Running

    npm run start

After opening the application, upload the file or files that we will split into smaller parts

As an input, json will use the large-file.json file from [https://github.com/json-iterator/test-data/blob/master/large-file.json](https://github.com/json-iterator/test-data/blob/master/large-file.json).

![[large-file.json](https://github.com/json-iterator/test-data/blob/master/large-file.json)](https://cdn-images-1.medium.com/max/2916/1*FvPvDW4h5tZnoOGv-4PjrQ.png)*[large-file.json](https://github.com/json-iterator/test-data/blob/master/large-file.json)*

![file contains 11350 objects](https://cdn-images-1.medium.com/max/4664/1*FQKVCym1GxTPBJwp5j-CcA.png)*file contains 11350 objects*

Drag and drop the desired file into the appropriate zone. The result will be the output of the file name we placed, and the **“Run Splitting”** and **“Clear”** buttons are now active.

![**“Run Splitting”** and **“Clear”** buttons are now active](https://cdn-images-1.medium.com/max/3188/1*huI1aCW079_zYrmFxPCOZQ.png)***“Run Splitting”** and **“Clear”** buttons are now active*

Now all we need to do is specify how many objects per file we want to have after splitting and click **“Run splitting”**.

I set a limit of 5000 objects per file. After starting, application will open the output folder where our files will be located after splitting.

![application will open the output folder where our files will be located after splitting](https://cdn-images-1.medium.com/max/4528/1*7762rOfCWq-X4Dtc56HjUg.png)*application will open the output folder where our files will be located after splitting*

## Conclusion

Splitting a large JSON file into smaller pieces helps you manage and process data more efficiently. Whether you choose to use a dedicated tool or develop your own solution like I did with Node.js, splitting large JSON files is a viable strategy for working with large amounts of data, and it’s especially nice to have an easy-to-use interface for doing so.

***Thanks to everyone who read this article, I hope you found it useful.***

I would also like to thank [Valentine Zorin](https://github.com/Thulrig) for conceiving and implementing the core logic.

Sources used in the article:

[https://github.com/VadimNastoyashchy/JSONSplitter](https://github.com/VadimNastoyashchy/JSONSplitter)
[https://www.npmjs.com/package/ui-json-splitter](https://www.npmjs.com/package/ui-json-splitter)
