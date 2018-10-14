'use strict';

module.exports = class ArgumentError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
