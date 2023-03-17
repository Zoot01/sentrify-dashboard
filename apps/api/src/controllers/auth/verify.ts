import prisma from "@database/index";
import { APIError } from "@utils/errorHandler";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

interface VerifyRequestBody {
  id: string;
  verification_code: string;
}

const verify = async (
  req: Request<{}, {}, VerifyRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, verification_code } = req.body;
    if (!id || !verification_code)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });

    if (!user)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    if (user.account_verified)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "Account is already verified, please login."
      );

    const codesMatch = await bcrypt.compare(
      verification_code,
      user.verification_code
    );

    if (!codesMatch)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "Please check that you entered the correct verfication code."
      );

    await prisma.users.update({
      where: {
        id,
      },
      data: {
        account_verified: true,
        verification_code: null,
      },
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Account successfully verified, ${user.first_name} please login.`,
    });
  } catch (err) {
    if (err instanceof APIError) {
      next(err);
    } else next(err);
  }
};

export default verify;
