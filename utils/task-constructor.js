'use strict';

class TaskConstructor {
  constructor(name, info, message) {
    this.name = name;
    this.description = info;
    this.message = message;
  }

  execute() {
    console.log(this.message);
  }
}

module.exports = TaskConstructor;
