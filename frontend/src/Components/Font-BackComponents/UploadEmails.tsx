import React, { useState } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import "./UploadEmails.css"

const UploadEmails: React.FC = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (email.trim()) {
      formData.append("email", email.trim());
    }

    try {
      const token = localStorage.getItem("token"); // Adjust token retrieval as needed
      const response = await axios.post(
        "http://localhost:5005/api/emails/upload-emails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error: any) {
      console.error("Error uploading emails:", error);
      setMessage("Error uploading emails");
    }
  };

  return (
    <>
    <Navigation />
    <div>
   <h1>Upload Emails</h1>
      <form onSubmit={handleSubmit}>
        
        <input onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address" />
              <input
                type="file"
                id="file"
                accept=".txt, .csv"
                onChange={handleFileChange}
                style={{ width: "100%", padding: "8px" }}
              />
            <button type="submit">Upload</button>
            
      </form>
      {message && (
        <p>{message}</p>
      )}
    </div>
    </>
    
  );
};

export default UploadEmails;