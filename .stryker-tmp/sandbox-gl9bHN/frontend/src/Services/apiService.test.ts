// @ts-nocheck
import axios from "axios";
import { fetchEmails, uploadEmails, checkEmailStatus } from "./apiService";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Service", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe("fetchEmails", () => {
		test("successfully fetches emails", async () => {
			const emails = [
				{ id: 1, subject: "Test Email 1", content: "Content 1" },
				{ id: 2, subject: "Test Email 2", content: "Content 2" },
			];

			mockedAxios.get.mockResolvedValueOnce({ data: emails });

			const result = await fetchEmails();

			expect(mockedAxios.get).toHaveBeenCalledWith("/api/emails");
			expect(result).toEqual(emails);
		});

		test("handles error when fetching emails fails", async () => {
			const errorMessage = "Network Error";
			mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

			await expect(fetchEmails()).rejects.toThrow(errorMessage);
			expect(mockedAxios.get).toHaveBeenCalledWith("/api/emails");
		});
	});

	describe("uploadEmails", () => {
		test("successfully uploads emails", async () => {
			const emailsToUpload = ["email1@example.com", "email2@example.com"];
			const response = { success: true, message: "Emails uploaded successfully" };

			mockedAxios.post.mockResolvedValueOnce({ data: response });

			const result = await uploadEmails(emailsToUpload);

			expect(mockedAxios.post).toHaveBeenCalledWith("/api/emails/upload", { emails: emailsToUpload });
			expect(result).toEqual(response);
		});

		test("handles error when upload fails", async () => {
			const emailsToUpload = ["email1@example.com"];
			const errorMessage = "Upload failed";

			mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

			await expect(uploadEmails(emailsToUpload)).rejects.toThrow(errorMessage);
			expect(mockedAxios.post).toHaveBeenCalledWith("/api/emails/upload", { emails: emailsToUpload });
		});
	});

	describe("checkEmailStatus", () => {
		test("successfully checks email status", async () => {
			const emailId = 123;
			const status = { id: emailId, status: "sent", sentAt: "2023-03-15T12:00:00Z" };

			mockedAxios.get.mockResolvedValueOnce({ data: status });

			const result = await checkEmailStatus(emailId);

			expect(mockedAxios.get).toHaveBeenCalledWith(`/api/emails/${emailId}/status`);
			expect(result).toEqual(status);
		});

		test("handles error when checking status fails", async () => {
			const emailId = 456;
			const errorMessage = "Status check failed";

			mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

			await expect(checkEmailStatus(emailId)).rejects.toThrow(errorMessage);
			expect(mockedAxios.get).toHaveBeenCalledWith(`/api/emails/${emailId}/status`);
		});
	});
});
