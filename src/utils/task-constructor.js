'use strict';

class BaseTask {
  constructor(name, info, message) {
    this.name = name;
    this.description = info;
    this.message = message;
  }

  execute() {
    console.log(this.message);
  }
}

module.exports = BaseTask;
