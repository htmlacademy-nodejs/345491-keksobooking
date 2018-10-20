'use strict';

class ArgumentError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class ValidationError extends Error {
  constructor(message, errors, code) {
    super(message);
    this.code = code;
    this.errors = errors;
  }
}

module.exports = {ValidationError, ArgumentError};
