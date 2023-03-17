import ENV from "@config/envVars";
import prisma from "@database/index";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { sendUserEmail } from "@queues/index";
import {
  SendEmailParams,
  TemplatesTypes,
  WelcomeEmailData,
} from "@utils/emails/types";
import { APIError } from "@utils/errorHandler";
import generateRandomNumber from "@utils/generateRandomNumber";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RegisterAPI } from "types";

const register = async (
  req: Request<{}, {}, RegisterAPI.RegisterRequest>,
  res: Response<RegisterAPI.RegisterResponse>,
  next: NextFunction
) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name)
      throw new APIError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);

    const hashedPass = await bcrypt.hash(password, 10);
    const verificationCode = generateRandomNumber().toString();
    const hashedVerificationCode = await await bcrypt.hash(
      verificationCode,
      10
    );

    const user = await prisma.users.create({
      data: {
        ...req.body,
        password: hashedPass,
        verification_code: hashedVerificationCode,
      },
    });

    if (user)
      sendUserEmail<{
        first_name: string;
        last_name: string;
        link: string;
        verification_code: string;
      }>({
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          link: `${ENV.ALLOWED_ORGIN}/auth/verify/${user.id}`,
          verification_code: verificationCode,
        },
        recipients: user.email,
        subject: "Welcome To Sentrify.",
        template: TemplatesTypes.WELCOME_EMAIL,
      });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Welcome, ${user.first_name}. We sent an email to ${user.email}, please follow the instructions and verify your account.`,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      next(
        new APIError(
          StatusCodes.BAD_REQUEST,
          "A user with this email already exist, please login."
        )
      );
    } else next(err);
  }
};

export default register;
