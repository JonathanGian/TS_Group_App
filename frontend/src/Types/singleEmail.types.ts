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
