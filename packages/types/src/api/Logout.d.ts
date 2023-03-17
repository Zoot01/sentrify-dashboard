import { ReasonPhrases, StatusCodes } from "http-status-codes";

export namespace LogoutAPI {
  export interface LogoutResponse {
    status: StatusCodes;
    message: ReasonPhrases | string;
  }
}
