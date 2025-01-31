---
title: "👨‍🏫A beginner’s guide to SOLID principles in JavaScript: Made Simple"
image: /assets/images/posts/2024-07-29-a-beginners-guide-to-solid-principles-in-javascript-made-simple/1_jPROahDWDQ2fWnKixUZhAw.webp
excerpt: "The SOLID Principles are guidelines that help software developers design and maintain clear, robust, and flexible systems. They are essential in object-oriented programming, but they can also be useful in understanding structured coding practices in JavaScript. Here, I’ll break down each principle with simple explanations and examples to make them accessible to everyone.
"
date: 2024-07-29 20:00:00 +01:00
last_modified_at: 2024-07-29 20:00:00 +01:00
tags:
  - SOLID
  - Patterns
  - JavaScript
---

![_config.yml]({{ site.url }}/assets/images/posts/2024-07-29-a-beginners-guide-to-solid-principles-in-javascript-made-simple/1_jPROahDWDQ2fWnKixUZhAw.webp){: .align-center .border .max-width-600px}

The SOLID Principles are guidelines that help software developers design and maintain clear, robust, and flexible systems. They are essential in object-oriented programming, but they can also be useful in understanding structured coding practices in JavaScript. Here, I’ll break down each principle with simple explanations and examples to make them accessible to everyone.

## 1. Single Responsibility Principle (SRP)
> **What it means:* ***
Imagine that your job is to make coffee. That’s all you need to focus on. If you also have to serve snacks, manage inventory, and clean tables, your primary task of making coffee may suffer. In programming, the single responsibility principle suggests that a piece of code, such as a function or class, should focus on only one task or activity.

**Example in JavaScript:**
```
    // Not following SRP
    class RestaurantManager {
      prepareCoffee() {
        console.log("Coffee prepared");
      }
      
      serveFood() {
        console.log("Food served");
      }
    }
    
    // Following SRP
    class CoffeeMaker {
      prepareCoffee() {
        console.log("Coffee prepared");
      }
    }
    
    class FoodServer {
      serveFood() {
        console.log("Food served");
      }
    }
```
## 2. Open/Closed Principle (OCP)
> **What it means: **
Think of a vending machine. Once it’s built and up and running, you don’t want to keep opening it up to add new products. Instead, it should be designed so that you can easily add more items without having to change its inner workings. Similarly, when writing code, it should be open to adding new features, but closed to changes in its existing code.

**Example in JavaScript:**
```
    class VendingMachine {
      constructor(products) {
        this.products = products;
      }
    
      getProducts() {
        return this.products;
      }
    }
    
    // Extend behavior
    class EnhancedVendingMachine extends VendingMachine {
      addProduct(product) {
        this.products.push(product);
      }
    }
```
## 3. Liskov Substitution Principle (LSP)
> **What it means: **
If you have a program that uses a bird, you should be able to replace it with any specific type of bird, such as a parrot or an eagle, without breaking the program. If you suddenly replace the bird with a penguin, which cannot fly, the program should not suddenly break if the required action was flight.

**Example in JavaScript:**
```
    class Bird {
        fly() {
            console.log("Flying high!");
        }
    }
    
    class Duck extends Bird {}
    
    class Penguin extends Bird {
        fly() {
            throw new Error("Cannot fly!"); // This breaks the substitution principle
        }
    }
    
    // Better approach
    class FlightlessBird {
        walk() {
            console.log("Walking!");
        }
    }
    
    class Penguin extends FlightlessBird {}
```
## 4. Interface Segregation Principle (ISP)
> **What it means: **
If you’re asked to sign a lease that includes clauses that have nothing to do with you, like pet rules when you don’t even own a pet, that’s overwhelming. Similarly, ISP in software development dictates that a program should not force interfaces onto classes where they do not make sense.

**Example in JavaScript:**
```
    // Too generic, not all employees drive.
    class Employee {
      let name
      work() {}
      driveCar() {}
    }
    
    // Better approach
    class Employee {
      let name
    }
    
    class Driver extends Employee {
      this.name = 'John'
      driveCar() {
        console.log("Driving a car");
      }
    }
    
    class Programmer extends Employee {
      this.name = 'Sarah'
      work() {
        console.log("Working...");
      }
    }
```
## 5. Dependency Inversion Principle (DIP)
> **What it means: **
Instead of a network of dependencies where high-level modules depend heavily on low-level modules, think of a structure where these dependencies are reversed through a common contract or interface. This is like having a contractor who relies on abstract contracts or blueprints instead of relying directly on electricians or plumbers.

**Example in JavaScript:**
```
    class Book {
      getContent() {
        return "Reading is good";
      }
    }
    
    class Reader {
      read(contentProvider) {
        console.log(contentProvider.getContent());
      }
    }
    
    let myBook = new Book();
    let me = new Reader();
    me.read(myBook); // Abides by DIP
```
By following the SOLID principles in JavaScript, you can create code that is more understandable, easier to maintain, and more flexible to change, making it easier to manage as projects grow and evolve.

***Thanks to everyone who read this article, I hope you found it useful.***