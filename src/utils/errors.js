'use strict';

class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
}

class CommonValidationError extends Error {
  constructor(errors) {
    super(`Validation error`);
    this.errors = errors;
    this.code = 400;
  }

}

class ValidationError {
  constructor(message, fieldName, errors) {
    this.fieldName = fieldName;
    this.errors = errors;
    this.message = {
      [`error`]: `Validation error`,
      [`fieldName`]: this.fieldName,
      [`errorMessage`]: this.errors
    };

  }

  get info() {
    return this.message;
  }
}

class ServerError extends Error {
  constructor(message, errors = `Server has fallen into unrecoverable problem.`) {
    super(`Internal Error`);
    this.errors = errors;
    this.code = 500;
  }
}

module.exports = {ValidationError, ArgumentError, ServerError, CommonValidationError};
