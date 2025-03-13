/// <reference types="vite/client" />
import React, { useState, useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import { useValidation } from "../../Contexts/ValidationContext";

const BulkStatus = forwardRef((props, ref) => {
	const API_KEY = import.meta.env.VITE_API_KEY;
	const { bulkStatus, setBulkStatus } = useValidation();
	const [fileUploadsId, setFileUploadsId] = useState<number | null>(null);
	const [isComplete, setIsComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [uploadResponse, setUploadResponse] = useState<any>(null);
	const initialLoadDone = useRef(false);

	// Create a debug logger to help diagnose issues
	const logDebug = (message: string, data?: any) => {
		console.log(`BulkStatus: ${message}`, data || "");
	};

	// Function to upload test file - alternative approach using blob
	const performUpload = () => {
		try {
			// Create plain text content
			const emailContent =
				"usha.kumarid@fff.com\nNeha.bharti@dfg.com\nermegilius@gmail.com\ntestuser1@example.com\ntestuser2@example.com\ntestuser3@example.com\ntestuser4@example.com\ntestuser5@example.com";

			// Create a file directly from text content
			const file = new File([emailContent], "emails.txt", {
				type: "text/plain",
				lastModified: new Date().getTime(),
			});

			logDebug("Created file object:", file);

			const form = new FormData();
			form.append("file", file);

			// Log form data content
			for (const pair of form.entries()) {
				logDebug(`Form entry: ${pair[0]} = ${pair[1]}`);
			}

			// Call the upload function
			uploadFile(form)
				.then((response) => {
					logDebug("Upload complete, response received", response);
					setUploadResponse(response);
				})
				.catch((err) => {
					console.error("Upload error:", err);
					setUploadResponse({ error: "Upload failed with error", details: String(err) });
				});
		} catch (error) {
			console.error("Error in performUpload:", error);
			setUploadResponse({ error: "Failed to create or upload file", details: String(error) });
		}
	};

	// Auto-trigger the upload when component mounts
	useEffect(() => {
		if (!initialLoadDone.current) {
			logDebug("Component mounted, auto-triggering upload");
			// Try both methods to see which one works
			performUpload();
			// Uncomment the line below to try direct API call approach
			// performApiDirectCall();
			initialLoadDone.current = true;
		}
	}, []);

	// Rest of your component (checkStatus, downloadResults, uploadFile, etc.) remains unchanged
	const checkStatus = async () => {
		setIsLoading(true);
		setError(null);
		const options = { method: "GET", headers: { accept: "application/json" } };
		try {
			const res = await fetch(`/api/check-queue-progress/?api_key=${API_KEY}`, options);
			if (!res.ok) {
				throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
			}
			const data = await res.json();
			logDebug("Check status API response:", data);
			setBulkStatus(data);
			if (data.status === "completed" && data.id) {
				setIsComplete(true);
				setFileUploadsId(data.id);
			} else {
				setIsComplete(false);
			}
		} catch (err) {
			console.error("Error checking status:", err);
			setError("There was an error checking the bulk status. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const downloadResults = async (format: string) => {
		if (!fileUploadsId) return;
		try {
			const options = { method: "GET", headers: { accept: "application/json" } };
			const downloadUrl = `/api/downloadCsv/?api_key=${API_KEY}&file_uploads_id=${fileUploadsId}&typeDownload=${format}`;
			const response = await fetch(downloadUrl, options);
			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}
			const contentDisposition = response.headers.get("Content-Disposition");
			let filename = `validation-results${format}`;
			if (contentDisposition && contentDisposition.includes("filename=")) {
				const filenameMatch = contentDisposition.match(/filename=["']?([^"']+)["']?/);
				if (filenameMatch && filenameMatch[1]) {
					filename = filenameMatch[1];
				}
			}
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Download error:", error);
			setError("Download failed. Please try again later.");
		}
	};

	// Improved uploadFile function with better logging
	const uploadFile = async (fileData: FormData) => {
		setIsLoading(true);
		setError(null);

		try {
			logDebug("Starting file upload");

			// Match exactly the format from the example but without setting Content-Type
			// Let the browser set the proper multipart/form-data boundary
			const options = {
				method: "POST",
				headers: { accept: "application/json" },
				body: fileData,
			};

			// Using the proxy configured in vite.config.ts
			logDebug("Sending upload request");
			const res = await fetch(`/api/upload-bulk-emails?api_key=${API_KEY}`, options);

			// Get response as text first for debugging
			const responseText = await res.text();
			logDebug("Raw API response:", responseText);

			// Parse the JSON response
			let data;
			try {
				data = JSON.parse(responseText);
				logDebug("Parsed upload API response:", data);
			} catch (e) {
				console.error("Failed to parse JSON response:", e);
				data = { error: "Invalid JSON response", raw: responseText };
			}

			// Important: Ensure data is properly set in state
			logDebug("Setting upload response in state:", data);
			setUploadResponse(data);

			// If response contains file_uploads_id, store it
			if (data && data.file_uploads_id) {
				setFileUploadsId(data.file_uploads_id);
			}

			return data;
		} catch (err) {
			console.error("Error uploading file:", err);
			const errorData = { error: "Upload failed. See console for details." };
			setError("File upload failed. Please try again.");
			setUploadResponse(errorData);
			return errorData;
		} finally {
			setIsLoading(false);
		}
	};

	// Expose functions to parent via ref.
	useImperativeHandle(ref, () => ({
		triggerUpload: () => {
			performUpload();
		},
		checkStatus,
	}));

	// Debug renderer helper to ensure the uploadResponse is properly displayed
	const renderResponse = () => {
		if (!uploadResponse) {
			return "No upload response yet.";
		}

		try {
			const formatted = JSON.stringify(uploadResponse, null, 2);
			logDebug("Formatted response for display:", formatted);
			return formatted;
		} catch (err) {
			console.error("Error stringifying response:", err);
			return "Error formatting response";
		}
	};

	return (
		<div className="bulk-status-container">
			<h1 className="bulk-status-title">Bulk validation status</h1>
			{isLoading && <p className="loading-indicator">Loading status...</p>}
			{error && <p className="error-message">{error}</p>}
			{bulkStatus && !isLoading && <p className="queue-size">Current queue size: {bulkStatus.queue_size}</p>}

			<button className="status-button" onClick={checkStatus} disabled={isLoading}>
				Refresh Status
			</button>

			{isComplete && (
				<div className="download-options">
					<h3>Download Results</h3>
					<button className="download-button" onClick={() => downloadResults(".csv")}>
						Download as CSV
					</button>
					<button className="download-button" onClick={() => downloadResults(".txt")}>
						Download as TXT
					</button>
				</div>
			)}

			<div className="upload-response-container">
				<h3>Upload Response</h3>
				<pre className="response-display">{renderResponse()}</pre>
			</div>

			<div className="status-response-container">
				<h3>Status Response</h3>
				<pre className="response-display">
					{bulkStatus ? JSON.stringify(bulkStatus, null, 2) : "No status data yet."}
				</pre>
			</div>
		</div>
	);
});

export default BulkStatus;
