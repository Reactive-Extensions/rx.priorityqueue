var PriorityQueue = require(__dirname);

module.exports = {
  require: {
    'rx.priorityqueue': PriorityQueue
  },

  globals: {
    PriorityQueue: PriorityQueue
  }
};
