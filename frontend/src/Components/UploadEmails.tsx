import React, { useState } from "react";
import axios from "axios";
import "./UploadEmail.css";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  Typography,
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useAuthCheck from "../Hooks/useAuthCheck";
import { useNavigate } from "react-router-dom";

interface VerifyEmailResponse {
  success: boolean;
  result: string;
  message?: string;
}
const UploadEmails: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isValidating, setIsValidating] = useState(false); // New state for validation loading
  const [emailValidationResult, setEmailValidationResult] = useState<
    string | null
  >(null);
  const [emailValidationColor, setEmailValidationColor] = useState("black");
  const [isValidatingSingle, setIsValidatingSingle] = useState(false); // New state for single email validation loading

  // useAuthCheck is a custom hook that checks if the user is authenticated
  // and redirects them to the login page if not.
  // It should be called at the top level of the component.
  useAuthCheck();

  
  const toggleSideBar = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  interface VerifyEmailResponse {
    success: boolean;
    result: string;
    message?: string;
  }
  
  const handleSingleEmailValidation = async () => {
    setIsValidatingSingle(true);
    setEmailValidationResult(null);
  
    if (!email.trim()) {
      setEmailValidationResult("Please enter an email address.");
      setEmailValidationColor("red");
      setIsValidatingSingle(false);
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get<VerifyEmailResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/emails/verify-email`,
        {
          params: { email },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (data.success) {
        const valid = data.result === "valid";
        setEmailValidationResult(valid ? "Valid Email ✅" : "Invalid Email ❌");
        setEmailValidationColor(valid ? "green" : "red");
      } else {
        setEmailValidationResult(data.message || "Validation failed.");
        setEmailValidationColor("red");
      }
    } catch {
      setEmailValidationResult("Error validating email.");
      setEmailValidationColor("red");
    } finally {
      setIsValidatingSingle(false);
    }
  };
  // Single Email Validation with Snapvalid API

//   const handleSingleEmailValidation = async () => {
//     setIsValidatingSingle(true); // Start validating
//     setEmailValidationResult(null); // Clear previous result

//     if (!email.trim()) {
//       setEmailValidationResult("Please enter an email address.");
//       setEmailValidationColor("red");
//       setIsValidatingSingle(false); // Stop validating
//       return;
//     }

//     try {
//       const apiKey = import.meta.env.VITE_SNAPVALID_API_KEY;
//       const data = await axios.get(
//         `/api/v1/verify/?apikey=${apiKey}&email=${email}`,
//       );

//       console.log("API Response:", data);
  

//     } catch (error) {
//       console.error("Error validating email:", error);
//   };
// }

  // This function handles the file upload and sends it to the backend.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5005/api/emails/upload-emails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage(response.data.message);
    } catch (error: any) {
      console.error("Error uploading emails:", error);
      setMessage("Error uploading emails");
    }
  };
  // Bulk Email Validation
  // This function handles the validation of all emails in the database.
  const handleValidation = async () => {
    setIsValidating(true);
    setMessage("Validating emails...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5005/api/emails/fetch-results",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setMessage("Emails have been validated successfully.");
      } else {
        setMessage(response.data.message || "Failed to validate emails.");
      }
    } catch (error: any) {
      console.error("Error validating emails:", error);
      setMessage("An error occurred while validating emails.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
 
 

      <header className={"header-frontpage"}>
        <h1 className={"header-h1"}>Email Validation App</h1>
        <button className={"header-button logout-button "}>Log out</button>
        <button
          className={"header-button menu-button"}
          onClick={toggleSideBar(true)}
        >
          Menu
        </button>
      </header>
      <main>
        {/* sidebar */}
        <Drawer open={open} onClose={toggleSideBar(false)}>
          <div>
            <h2 className={"menu-header"}>MENU</h2>
          </div>
          {/* Drawer Content */}
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleSideBar(false)}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/email/status")}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email Table" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <form onSubmit={handleSubmit}>
          <div className={"verify-email-container"}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
            <Button
              variant="contained"
              className={"verify-email-button"}
              onClick={handleSingleEmailValidation}
              disabled={isValidatingSingle}
              sx={{
                color: "black",
                backgroundColor: "#f5cccc",
                "&:hover": { backgroundColor: "#e2bcbc" },
                textTransform: "none",
              }}
            >
              {isValidatingSingle ? "⌛ Validating..." : "Verify Email"}
            </Button>
          </div>
          {/* Display Email Validation Result */}
          {emailValidationResult && (
            <Typography sx={{ color: emailValidationColor, marginTop: 1 }}>
              {emailValidationResult}
            </Typography>
          )}
          <div className="verify-email-container">
            <input
              type="file"
              id="file-upload"
              accept=".txt, .csv"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{
                  color: "black",
                  backgroundColor: "#f5cccc",
                  "&:hover": { backgroundColor: "#e2bcbc" },
                  textTransform: "none",
                }}
              >
                Upload File
              </Button>
            </label>
            {file && (
              <>
                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                  {file.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#d66d7f",
                    "&:hover": { backgroundColor: "#c0566e" },
                    marginLeft: 2,
                    textTransform: "none",
                  }}
                  onClick={handleSubmit}
                >
                  Submit File
                </Button>
              </>
            )}
          </div>
        </form>
        <div className={"verify-email-container"}>
          {/* Validate Button */}
          <Button
            variant="contained"
            className={"validate-email-button"}
            onClick={handleValidation}
            disabled={isValidating}
            sx={{
              color: "black",
              backgroundColor: "#f5cccc",
              "&:hover": { backgroundColor: "#e2bcbc" },
              textTransform: "none",
            }}
          >
            {/* Button Text */}
            {isValidating ? "⌛ Validating..." : "Validate Emails"}
          </Button>
        </div>
        {message && <p>{message}</p>}
      </main>
    </>
  );
};

export default UploadEmails;
