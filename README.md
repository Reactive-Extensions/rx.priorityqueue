[![Build Status](https://travis-ci.org/Reactive-Extensions/rx.priorityqueue.svg)](https://travis-ci.org/Reactive-Extensions/rx.priorityqueue)
[![GitHub version](https://img.shields.io/github/tag/reactive-extensions/rx.priorityqueue.svg)](https://github.com/Reactive-Extensions/rx.priorityqueue)
[![NPM version](https://img.shields.io/npm/v/rx.priorityqueue.svg)](https://www.npmjs.com/package/rx.priorityqueue)
[![Downloads](https://img.shields.io/npm/dm/rx.priorityqueue.svg)](https://www.npmjs.com/package/rx.priorityqueue)
# `rx.priorityqueue` - Standalone `PriorityQueue` from the RxJS library

This is a standalone version of the RxJS `PriorityQueue` class.  This class allows you to keep items in priority order based upon standard ordering or a custom ordering function that you provide.  In RxJS, this is used heavily in the schedulers to ensure that all operations are executed in the precise order.

## Installation

The `rx.priorityqueue` library can be installed by the following:

### NPM
```bash
$ npm install rx.priorityqueue
```

## Usage

You can use the `PriorityQueue` to keep items in order such as the following:

```js
const q = new PriorityQueue();

q.enqueue(42);
q.enqueue(41);
q.enqueue(44);
q.enqueue(43);

console.log(`queue length is ${q.length}`);
// => queue length is 4

console.log(`dequeued value is ${q.dequeue()}`);
// => First value is 41

console.log(`dequeued value is ${q.dequeue()}`);
// => dequeued value is 42

console.log(`dequeued value is ${q.dequeue()}`);
// => dequeued value is 43

console.log(`dequeued value is ${q.dequeue()}`);
// => dequeued value is 44
```

You can also use your own custom comparer for complex objects to determine order.  To do that, simply pass in a function which takes two arguments, the left hand side and right hand side.  By default, the comparer function which is used looks like the following where if the left is greater than it should be positive, less than, should be negative and equal should be zero:

```js
function defaultComparer (x, y) {
  if (x > y) {
    return 1;
  } else if (y > x) {
    return -1;
  } else {
    return 0;
  }
}
```

Knowing this, we can now apply this to our custom object:

```js
function createItem(dueTime, action) {
  return {
    dueTime,
    action
  };
}

function comparer (x, y) { return x.dueTime - y.dueTime; }

var q = new PriorityQueue(comparer);

q.enqueue(createItem(new Date(42), () => console.log(42)));
q.enqueue(createItem(new Date(41), () => console.log(41)));
q.enqueue(createItem(new Date(44), () => console.log(44)));
q.enqueue(createItem(new Date(43), () => console.log(43)));

q.dequeue().action();
// => 41

q.dequeue().action();
// => 42

q.dequeue().action();
// => 43

q.dequeue().action();
// => 44
```

## Documentation

## `PriorityQueue` constructor ##
- [`constructor`](#priorityqueuecomparer)

## `PriorityQueue` Instance Methods ##
- [`dequeue`](#priorityqueueprototypedequeue)
- [`enqueue`](#priorityqueueprototypeenqueueitem)
- [`peek`](#priorityqueueprototypepeek)
- [`remove`](#priorityqueueprototyperemoveitem)

## `PriorityQueue` Instance Properties ##
- [`length`](#length)

## _PriorityQueue Constructor_ ##

### <a id="priorityqueuecomparer"></a>`PriorityQueue(comparer)`

Creates a queue organized by priority based upon the comparer to determine order.

#### Arguments
1. `[comparer]`: `Function` - The comparer used to determine order. If not specified this will default to determining order using greater than, less than.

#### Example
```js
function createItem(dueTime, action) {
  return {
    dueTime,
    action
  };
}

function comparer (x, y) { return x.dueTime - y.dueTime; }

var q = new PriorityQueue(comparer);

q.enqueue(createItem(new Date(42), () => console.log(42)));
```

* * *

## _PriorityQueue Instance Methods_ ##

### <a id="priorityqueueprototypedequeue"></a>`PriorityQueue.prototype.dequeue()`

Removes the first item from the queue and returns the value.

#### Returns
`Any` - The first item in the priority queue.

#### Example

```js
const q = new PriorityQueue();

q.enqueue(42);

console.log(q.dequeue());
// => 42

console.log(q.length);
// => 0
```
* * *

### <a id="priorityqueueprototypeenqueueitem"></a>`PriorityQueue.prototype.enqueue(item)`

Adds an item to the priority queue which is then reordered based upon priority.

#### Arguments
1. `item`: `Any` - The item to add to the priority queue.

#### Example

```js
const q = new PriorityQueue();

q.enqueue(42);

console.log(q.length);
// => 1
```
* * *

### <a id="priorityqueueprototypepeek"></a>`PriorityQueue.prototype.peek()`

Returns the first item in the priority queue.

#### Returns
`Any` - The first item in the priority queue.

#### Example

```js
const q = new PriorityQueue();

q.enqueue(42);

console.log(q.peek());
// => 42

console.log(q.length);
// => 1
```
* * *

### <a id="priorityqueueprototyperemoveitem"></a>`PriorityQueue.prototype.remove(item)`

Removes the specified item from the priority queue.

#### Arguments
1. `item`: `Any` - The item to remove from the priority queue.

#### Returns
`Boolean` - `true` if removed; else `false`.

#### Example

```js
const q = new PriorityQueue();

q.enqueue(42);

console.log(`Item was removed is ${q.dequeue()}`);
// => Item was remove is true
```
* * *

## _PriorityQueue Instance Properties_ ##

### <a id="length"></a>`length`

Gets the length of the priority queue

#### Example
```js
const q = new PriorityQueue();

q.enqueue(42);

console.log(`Priority queue length is ${q.length}`);
// => Priority queue length is 1
```

* * *

## Contributing

We appreciate any contributions by the community as long as they abide by the [Code of Conduct](code-of-conduct.md).

Want to get started?  Here are some ways you can get involved.
1. Documentation

    - Examples
    - How Do I?
    - API Documentation

2. Code

    - Additional disposables
    - Unit tests

# LICENSE

The MIT License (MIT)

Copyright (c) 2016 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
