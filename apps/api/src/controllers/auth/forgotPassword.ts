import ENV from "@config/envVars";
import envVars from "@config/envVars";
import prisma from "@database/index";
import { sendUserEmail } from "@queues/index";
import { TemplatesTypes } from "@utils/emails/types";
import { APIError } from "@utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ForgotPasswordAPI } from "types";

const forgotPassword = async (
  req: Request<{}, {}, ForgotPasswordAPI.ForgotPasswordRequest>,
  res: Response<ForgotPasswordAPI.ForgotPasswordResponse>,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "Please double check the email you entered."
      );

    if (!user.account_verified)
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        "Account is not verfied, please check your email and complete your account setup."
      );

    const link = jwt.sign({ id: user.id }, envVars.JWT_SECRET, {
      expiresIn: "10m",
    });

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        reset_link: link,
      },
    });

    sendUserEmail<{ first_name: string; last_name: string; link: string }>({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        link: `${ENV.ALLOWED_ORGIN}/auth/resetpassword?link=${link}`,
      },
      recipients: user.email,
      subject: "Sentrify Password Reset Requested.",
      template: TemplatesTypes.FORGOT_PASSWORD_EMAIL,
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Email was sent to ${user.email}, please view your email for next steps.`,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof APIError) {
      next(err);
    } else next(err);
  }
};

export default forgotPassword;
