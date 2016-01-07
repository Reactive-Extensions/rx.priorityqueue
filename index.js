'use strict';

function defaultComparer(x, y) {
  if (x.compareTo) { return x.compareTo(y); }
  if (x > y) { return 1; }
  if (y > x) { return -1; }
  return 0;
}

function IndexedItem(id, value, cmp) {
  this.id = id;
  this.value = value;
  this._cmp = cmp;
}

IndexedItem.prototype.compareTo = function (other) {
  var c = this._cmp(this.value, other.value);
  c === 0 && (c = this.id - other.id);
  return c;
};

/**
 * Represents a queue organized by priority based upon the comparer to determine order.
 * @param {Function} [comparer] The comparer used to determine order. If not specified
 * this will default to determining order using greater than, less than.
 */
function PriorityQueue (comparer) {
  comparer || (comparer = defaultComparer);
  this._items = [];
  this._comparer = comparer;
  this.length = 0;
}

PriorityQueue.prototype._isHigherPriority = function (left, right) {
  return this._items[left].compareTo(this._items[right]) < 0;
};

PriorityQueue.prototype._percolate = function (index) {
  if (index >= this.length || index < 0) { return; }
  var parent = index - 1 >> 1;
  if (parent < 0 || parent === index) { return; }
  if (this._isHigherPriority(index, parent)) {
    var temp = this._items[index];
    this._items[index] = this._items[parent];
    this._items[parent] = temp;
    this._percolate(parent);
  }
};

PriorityQueue.prototype._heapify = function (index) {
  +index || (index = 0);
  if (index >= this.length || index < 0) { return; }
  var left = 2 * index + 1,
      right = 2 * index + 2,
      first = index;
  if (left < this.length && this._isHigherPriority(left, first)) {
    first = left;
  }
  if (right < this.length && this._isHigherPriority(right, first)) {
    first = right;
  }
  if (first !== index) {
    var temp = this._items[index];
    this._items[index] = this._items[first];
    this._items[first] = temp;
    this._heapify(first);
  }
};

/**
 * Peeks at the first item in the priority queue
 * @returns {Any} the first item in the priority queue.
 */
PriorityQueue.prototype.peek = function () { return this._items[0].value; };

PriorityQueue.prototype._removeAt = function (index) {
  this._items[index] = this._items[--this.length];
  this._items[this.length] = undefined;
  this._heapify();
};

/**
 * Removes the first item from the queue and returns the value.
 * @returns {Any} the first item in the priority queue.
 */
PriorityQueue.prototype.dequeue = function () {
  if (this.length === 0) { return undefined; }
  var result = this.peek();
  this._removeAt(0);
  return result;
};

/**
 * Adds an item to the priority queue which is then reordered based upon priority.
 * @param {Any} item The item to add to the priority queue.
 */
PriorityQueue.prototype.enqueue = function (item) {
  var index = this.length++;
  this._items[index] = new IndexedItem(PriorityQueue.count++, item, this._comparer);
  this._percolate(index);
};

/**
 * Removes the specified item from the priority queue.
 * @param {Any} item The item to remove from the priority queue
 * @returns {Boolean} true if remove; else false
 */
PriorityQueue.prototype.remove = function (item) {
  for (var i = 0; i < this.length; i++) {
    if (this._items[i].value === item) {
      this._removeAt(i);
      return true;
    }
  }
  return false;
};

PriorityQueue.count = 0;

module.exports = PriorityQueue;
