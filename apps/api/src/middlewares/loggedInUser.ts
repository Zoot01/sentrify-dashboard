import { APIError } from "@utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const loggedInUser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (!req.session.user)
      throw new APIError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    else next();
  } catch (err) {
    if (err instanceof APIError) {
      next(err);
    } else next(err);
  }
};

export default loggedInUser;
