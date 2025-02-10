import React, { useRef, useState } from 'react';
import axios from 'axios';
import { BulkResponse } from '../../Types/BulkUpload.types';
import "./BulkEmailUploader.css";

const BulkEmailUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await axios.post<BulkResponse>(
        `https://app.snapvalid.com/api/upload-bulk-emails?api_key=${API_KEY}`,
        formData,
        {
          headers: {
            'accept': 'application/json',
            // 'Content-Type': 'multipart/form-data' // Remove this line
          },
        }
      );
  
      if (response.status === 200) {
        setUploadStatus(`File uploaded successfully. ID: ${response.data.file_uploads_id}`);
      } else {
        setUploadStatus(`Upload failed: ${response.data.msg}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred during file upload.');
    }
  };

  return (
<div className="upload-container">
      <h1>Bulk Email Uploader</h1>
      <input
        type="file"
        accept=".csv, .txt"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        className="select-button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        Select File
      </button>
      {selectedFile && <p className="file-name">Selected File: {selectedFile.name}</p>}
      <button className="upload-button" onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};


export default BulkEmailUploader;