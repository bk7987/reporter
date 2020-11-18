export interface ErrorDetail {
  object: 'error-detail';
  title: string;
  detail: string;
}

abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract errors: ErrorDetail[];

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(public errors: ErrorDetail[]) {
    super('Request validation error.');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
