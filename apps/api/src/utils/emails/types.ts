export interface WelcomeEmailData {
  first_name: string;
  last_name: string;
  link: string;
  verification_code: string;
}

export interface ForgotPasswordEmailData {
  first_name: string;
  last_name: string;
  link: string;
}

export enum TemplatesTypes {
  WELCOME_EMAIL = "welcome.handlebars",
  FORGOT_PASSWORD_EMAIL = "forgotPassword.handlebars",
}

export interface SendEmailParams<T = any> {
  recipients: string | string[];
  subject: string;
  data: T;
  template: TemplatesTypes;
}
