// @ts-nocheck
export interface ValidationResult {
  email: string;
  user: string;
  domain: string;
  accept_all: number;
  role: number;
  free_email: number;
  disposable: number;
  spamtrap: number;
  success: boolean;
  result: string;
  message: string;
}