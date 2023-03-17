import { APIError } from "@utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RestoreSessionAPI } from "types";

const restoreSession = async (
  req: Request,
  res: Response<RestoreSessionAPI.RestoreSessionResponse>,
  next: NextFunction
) => {
  try {
    if (!req.session.user) {
      throw new APIError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    } else
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        meta: req.session.user,
      });
  } catch (err) {
    if (err instanceof APIError) {
      next(err);
    } else next(err);
  }
};

export default restoreSession;
