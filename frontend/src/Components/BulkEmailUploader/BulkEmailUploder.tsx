import React, { useRef, useState } from "react";
import axios from "axios";
import { BulkResponse } from "../../Types/BulkUpload.types";
import "./BulkEmailUploader.css";
import BulkStatus from "../BulkStatus/BulkStatus";
import { CircularProgress, Alert, Typography } from "@mui/material";

// Define the ref type for better type safety
interface BulkStatusRefType {
	checkStatus: () => void;
	triggerUpload: () => void;
}

const BulkEmailUploader: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<string>("");
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Create a ref to access BulkStatus methods with proper typing
	const bulkStatusRef = useRef<BulkStatusRefType>(null);

	const API_KEY = import.meta.env.VITE_API_KEY;

	const validateFile = (file: File): boolean => {
		// Check file type
		const validTypes = [".csv", ".txt", "text/csv", "text/plain"];
		const fileType = file.type || file.name.substring(file.name.lastIndexOf("."));

		if (!validTypes.some((type) => fileType.includes(type))) {
			setError("Invalid file type. Please select a CSV or TXT file.");
			return false;
		}

		// Check file size (max 5MB)
		const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
		if (file.size > MAX_SIZE) {
			setError("File too large. Maximum size is 5MB.");
			return false;
		}

		setError(null);
		return true;
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			if (validateFile(file)) {
				setSelectedFile(file);
				setUploadStatus("");
			} else {
				setSelectedFile(null);
				if (event.target.value) event.target.value = "";
			}
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			setUploadStatus("Please select a file first.");
			return;
		}

		setIsUploading(true);
		setError(null);
		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			// Use the proxy configured in vite.config.ts
			const response = await axios.post<BulkResponse>(`/api/upload-bulk-emails?api_key=${API_KEY}`, formData, {
				headers: {
					accept: "application/json",
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
					setUploadStatus(`Uploading: ${percentCompleted}%`);
				},
			});

			if (response.status === 200 && response.data) {
				setUploadStatus(`File uploaded successfully. ID: ${response.data.file_uploads_id}`);

				// Reset the file input
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
				setSelectedFile(null);

				// Trigger checkStatus() in the BulkStatus component after a successful upload
				if (bulkStatusRef.current) {
					bulkStatusRef.current.checkStatus();
				}
			} else {
				setUploadStatus(`Upload failed: ${response.data?.msg || "Unknown error"}`);
			}
		} catch (error) {
			console.error("Error uploading file:", error);
			setError(
				axios.isAxiosError(error) && error.response
					? `Upload failed: ${error.response.data?.msg || error.message}`
					: "An error occurred during file upload."
			);
			setUploadStatus("");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="upload-container">
			<Typography variant="h4" component="h1" gutterBottom>
				Bulk Email Uploader
			</Typography>

			<input
				type="file"
				accept=".csv, .txt"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
				aria-label="Select a file to upload"
			/>

			<button
				className="select-button"
				onClick={() => fileInputRef.current && fileInputRef.current.click()}
				disabled={isUploading}
				aria-busy={isUploading}
			>
				Select File
			</button>

			{selectedFile && (
				<Typography className="file-name" variant="body1">
					Selected File: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
				</Typography>
			)}

			<button
				className="upload-button"
				onClick={handleUpload}
				disabled={!selectedFile || isUploading}
				aria-busy={isUploading}
			>
				{isUploading ? (
					<>
						<CircularProgress size={16} color="inherit" style={{ marginRight: "8px" }} />
						Uploading...
					</>
				) : (
					"Upload"
				)}
			</button>

			{uploadStatus && <p className="upload-status">{uploadStatus}</p>}
			{error && <Alert severity="error">{error}</Alert>}

			<BulkStatus ref={bulkStatusRef} />
		</div>
	);
};

export default BulkEmailUploader;
