import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class APIError extends Error {
  status: StatusCodes;

  constructor(status: StatusCodes, message: ReasonPhrases | string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.status = status;
    Error.captureStackTrace(this);
  }
}

export const errorResponder = (
  error: APIError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  const status = error.status || 400;
  response.status(status).send(error.message);
};
