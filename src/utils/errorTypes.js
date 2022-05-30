import { TOASTER_TYPES } from '../constants/toasterTypes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

class NotFoundError extends Error {
  constructor(message = ERROR_MESSAGES.NOT_FOUND) {
    super();
    this.message = message;
  }
}

class BadRequestError extends Error {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST) {
    super();
    this.message = message;
  }
}

class ForbiddenError extends Error {
  constructor(message = ERROR_MESSAGES.FORBIDDEN) {
    super();
    this.message = message;
    this.title = 'User Permissions Issue';
    this.toasterTypes = TOASTER_TYPES.WARNING;
  }
}

class UnauthorizedError extends Error {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super();
    this.message = message;
    this.toasterTypes = TOASTER_TYPES.WARNING;
  }
}

export { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError };
