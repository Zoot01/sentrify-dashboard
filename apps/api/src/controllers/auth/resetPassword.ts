import prisma from "@database/index";
import { APIError } from "@utils/errorHandler";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResetPasswordAPI } from "types";

export interface DecodedJWTPayload extends JwtPayload {
  id: string;
}

const resetPassword = async (
  req: Request<{}, {}, ResetPasswordAPI.ResetPasswordRequest>,
  res: Response<ResetPasswordAPI.ResetPasswordResponse>,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { password, link } = req.body;
    if (!link || !password)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    jwt.verify(link, process.env.JWT_SECRET, (err) => {
      if (err) {
        throw new APIError(
          StatusCodes.BAD_REQUEST,
          "Password reset link is no longer valid or expired."
        );
      }
    });

    const linkData = jwt.decode(link) as DecodedJWTPayload;

    const user = await prisma.users.findFirst({
      where: {
        id: linkData.id,
      },
    });

    if (!user)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    if (!user.account_verified)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "Account is not verfied, please check your email and complete your account setup."
      );

    if (!user.reset_link)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    const hashedPass = await bcrypt.hash(password, 10);

    await prisma.users.update({
      where: {
        id: linkData.id,
      },
      data: {
        password: hashedPass,
        reset_link: null,
      },
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "Password was reset, please login with your new password.",
    });
  } catch (err) {
    if (err instanceof APIError) {
      next(err);
    } else next(err);
  }
};

export default resetPassword;
