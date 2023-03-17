import { APIError } from "@utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { LogoutAPI } from "types";

const logout = async (
  req: Request,
  res: Response<LogoutAPI.LogoutResponse>,
  next: NextFunction
) => {
  try {
    const { first_name } = req.session.user;

    req.session.destroy((err) => {
      if (err)
        throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `See you soon ${first_name}.`,
    });
  } catch (err) {
    if (err instanceof APIError) {
      next(err);
    } else next(err);
  }
};

export default logout;
