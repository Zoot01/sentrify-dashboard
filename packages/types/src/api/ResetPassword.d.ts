import { ReasonPhrases, StatusCodes } from "http-status-codes";

export namespace ResetPasswordAPI {
  export interface ResetPasswordRequest {
    link: string;
    password: string;
  }

  export interface ResetPasswordResponse {
    status: StatusCodes;
    message: ReasonPhrases | string;
  }
}
