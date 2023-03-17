import { ReasonPhrases, StatusCodes } from "http-status-codes";

export namespace ForgotPasswordAPI {
  export interface ForgotPasswordRequest {
    email: string;
  }

  export interface ForgotPasswordResponse {
    status: StatusCodes;
    message: ReasonPhrases | string;
  }
}
