import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type PostApiUploadBulkEmailsBodyParam = FromSchema<typeof schemas.PostApiUploadBulkEmails.body>;
export type PostApiUploadBulkEmailsMetadataParam = FromSchema<typeof schemas.PostApiUploadBulkEmails.metadata>;
export type PostApiUploadBulkEmailsResponse200 = FromSchema<typeof schemas.PostApiUploadBulkEmails.response['200']>;
