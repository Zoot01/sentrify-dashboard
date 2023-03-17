import prisma from "@database/index";
import { createSession, logNewSession } from "@utils/createSession";
import { APIError } from "@utils/errorHandler";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { LoginAPI } from "types";

const login = async (
  req: Request<{}, {}, LoginAPI.LoginRequest>,
  res: Response<LoginAPI.LoginResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "Please check you email and password."
      );

    if (!user.account_verified)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "You have to verify your account before you can login."
      );

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "Please check you email and password."
      );

    createSession(req, user, logNewSession);

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Welcome back ${user.first_name}.`,
      meta: req.session.user,
    });
  } catch (err) {
    if (err instanceof APIError) {
      next(err);
    } else next(err);
  }
};

export default login;
