---
title: "💁‍♂️for, for…of, .forEach(). What to choose? JavaScript"
image: /assets/images/posts/2025-04-06-for-forof-foreach-js-loops/0_yA0ziSTQn4H3IzX6.jpg
excerpt: "I've already shared with you 🔝Top 10 useful Cypress plugins in 2024! but not all plugins are included in the article that I use. I want to add 5 more plugins that will be relevant in 2025 and that I use myself....
"
date: 2025-04-06 20:00:00 +01:00
last_modified_at: 2025-04-06 20:00:00 +01:00
tags:
  - JavaScript
  - Cypress
  - Plugins
---


We often need to work with different data sets in our daily work. Usually, these sets are stored in an array. JavaScript allows you to go through an array and get your desired values. But it’s important to know the details of the different ways of doing this. Today, we will look at all the options, like for, for…of, and forEach().

![_config.yml]({{ site.url }}/assets/images/posts/2025-04-06-for-forof-foreach-js-loops/0_yA0ziSTQn4H3IzX6.jpg){: .align-center .border .max-width-600px}

## for

```
for (initialization; condition; afterthought)
    statement
```

The **‘for’** loop is the classic, traditional way to go through an array. It gives you total control over the process and lets you change the loop counter.

### Pros:

* You can control the loop very precisely, including changing the loop counter.
- You can use it with arrays and any other iterable object.
- It’s usually faster than other ways to go through an array.

* [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) stops statement execution and goes to the first statement after the loop.

* [continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) stops statement execution and re-evaluates afterthought then condition.

### Cons:

* It’s more complicated and prone to errors, especially off-by-one errors.
It also requires manual management of the loop counter and exit condition.

*Example:*
```
    let numbers = [1, 2, 3, 4, 5];
    for (let i = 0; i < numbers.length; i++) {
     console.log(numbers[i]);
    }
```
## for...of
```
    for (variable of iterable)
      statement
```
The **“for…of”** loop, introduced in ECMAScript 2015, lets you go through the values of objects that can be iterated, like arrays, maps, and sets.

### Pros:

* The syntax is cleaner and less prone to errors compared to the traditional for loop.
- It automatically goes through the values of the object.

* [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) stops statement execution and goes to the first statement after the loop.

* [continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) stops statement execution and goes to the next iteration of the loop.

### Cons:

* You can’t use the index of the current element within the loop.

* It’s usually slower than the traditional for loop.

*Example:*
```
    let numbers = [1, 2, 3, 4, 5];
    for (let number of numbers) {
     console.log(number);
    }
```
## .forEach() Method
```
    forEach(callbackFn)
    forEach(callbackFn, thisArg)
```
The **‘forEach’** method is a special function that works with Arrays. It runs a provided function once for each item in the array.

A function to execute for each element in the array. Its return value is discarded. The function is called with the following arguments:

[element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#element) The current element being processed in the array.

[index](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#index) The index of the current element being processed in the array.

[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#array) The array forEach() was called upon.

### Pros:

- It’s a simple and clear way to go through each item in the array.
- You can access the item, its position in the array, and the array itself within the callback.

### Cons:

- You can’t use ‘break’ or ‘continue’ to leave the loop.
- It’s usually the slowest way if making things run quickly is important.

*Example:*
```
    let numbers = [1, 2, 3, 4, 5];
    numbers.forEach((number, index /*, array */) => {
     console.log(number, index);
    });
```
## for vs while

You may also have heard that “while” is faster than “for”. However, the question is how faster is “while”? Here are some results, but first, let’s take a look at the JavaScript code:
```
    console.time('for');
    for (var i = 0; i < 10000000; i++) {
     i / 2;
    }
    console.timeEnd('for');

    console.time('while');
    var i = 0;
    while (i++ < 10000000) {
     i / 2;
    }
    console.timeEnd('while');
```
**The while loop is slightly faster**. However, we should be aware that these performance gains are significant for a large number of iterations!

## Conclusion
The best option depends on the specific needs of your project. If you want the highest performance and control, a traditional ‘for’ loop is best. If you prefer cleaner code and are working with objects that can be iterated, ‘for…of’ is a good choice. If you need a simple and expressive way to go through the elements of an array and do not need to stop the loop, ‘forEach’ is ideal. Each method has its place, and understanding its characteristics will help you make the best choice for your JavaScript code.

<hr>

***Thanks to everyone who read this article, I hope you found it useful.***