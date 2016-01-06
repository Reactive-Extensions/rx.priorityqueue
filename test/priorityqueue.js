'use strict';

var test = require('tape');
var PriorityQueue = require('..');

test('PriorityQueue enquques in correct order', function (t) {
  var q = new PriorityQueue();

  q.enqueue(42);
  q.enqueue(41);
  q.enqueue(44);
  q.enqueue(43);

  t.equal(q.length, 4, 'queue length should be four');

  t.equal(q.dequeue(), 41, 'first should be 41');
  t.equal(q.dequeue(), 42, 'second should be 42');
  t.equal(q.dequeue(), 43, 'third should be 43');
  t.equal(q.dequeue(), 44, 'fourth should be 44');

  t.end();
});

test('PriorityQueue with custom comparer enquques in correct order', function (t) {
  function cmp(x, y) { return x.dueTime - y.dueTime; }

  var q = new PriorityQueue(cmp);

  q.enqueue({dueTime: 42});
  q.enqueue({dueTime: 41});
  q.enqueue({dueTime: 44});
  q.enqueue({dueTime: 43});

  t.equal(q.length, 4, 'queue length should be four');

  t.equal(q.dequeue().dueTime, 41, 'first should be 41');
  t.equal(q.dequeue().dueTime, 42, 'second should be 42');
  t.equal(q.dequeue().dueTime, 43, 'third should be 43');
  t.equal(q.dequeue().dueTime, 44, 'fourth should be 44');

  t.end();
});

test('PriorityQueue does not remove item not in collection', function (t) {
  var q = new PriorityQueue();

  q.enqueue(42);

  t.equal(q.length, 1, 'queue should have a length of 1');

  t.equal(q.remove(84), false, 'queue.remove should return false if not found');

  t.equal(q.length, 1, 'queue should still have a length of 1');

  t.end();
});

test('PriorityQueue dequeue more times than enqueue', function (t) {
  var q = new PriorityQueue();

  q.enqueue(42);

  t.equal(q.length, 1, 'queue should have a length of 1');

  t.equal(q.dequeue(), 42, 'q.dequeue() should be 42');

  t.equal(q.length, 0, 'queue length should be 0');

  t.equal(q.dequeue(), undefined, 'calling dequeue on empty should be undefined');

  t.equal(q.length, 0, 'queue length should still be 0');

  t.end();
});
