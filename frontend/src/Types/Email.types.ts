export interface SingleEmail {
  id: number;
  batch_id: number;
  email: string;
  status: string;
  accept_all: number;
  role: number;
  free_email: number;
  disposable: number;
  spamtrap: number;
  result: string;
  message: string;
  batch_created_at: string;
}

export interface ServerBulkResponse {
    success: boolean;
    emails: SingleEmail[];
    message?: string;
    error?: string;
}

export interface EmailData {
  id: number;
  batch_id: number;
  email: string;
  status: string;
  accept_all: boolean ;
  role: boolean ;
  free_email: boolean;
  disposable: boolean ;
  spamtrap: boolean ;
  result: string;
  message: string;
  batch_created_at: string;
}

export interface FetchEmailsResponse {
  success: boolean;
  emails: EmailData[];
  message: string;
}