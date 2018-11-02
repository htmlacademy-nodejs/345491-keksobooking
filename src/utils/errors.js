'use strict';

class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
}

class ValidationError extends Error {
  constructor(message, fieldName, errors) {
    super(`Validation error`);
    this.errors = errors;
    this.code = 400;

    console.log(this.message);
  }
}

class ServerError extends Error {
  constructor(message, errors = `Server has fallen into unrecoverable problem.`) {
    super(`Internal Error`);
    this.errors = errors;
    this.code = 500;
  }
}

module.exports = {ValidationError, ArgumentError, ServerError};
