import { Server } from 'socket.io';
import HttpStatus from 'http-status-codes'; // Zmiana importu na HttpStatus

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class JoiRequestValidationError extends CustomError {
  statusCode = HttpStatus.BAD_REQUEST; // Ustawienie stałej statusu HTTP
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  statusCode = HttpStatus.BAD_REQUEST; // Ustawienie stałej statusu HTTP
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = HttpStatus.NOT_FOUND; // Ustawienie stałej statusu HTTP
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = HttpStatus.UNAUTHORIZED; // Ustawienie stałej statusu HTTP
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = HttpStatus.REQUEST_TOO_LONG; // Ustawienie stałej statusu HTTP
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  statusCode = HttpStatus.SERVICE_UNAVAILABLE; // Ustawienie stałej statusu HTTP
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
