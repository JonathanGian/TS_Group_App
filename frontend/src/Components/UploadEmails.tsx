import React, { useState } from "react";
import axios from "axios";
import "./UploadEmails.css" ;
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useAuthCheck from "../Hooks/useAuthCheck";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
interface VerifyEmailResponse {
  success: boolean;
  result: string;
  message?: string;
}
interface ValidateEmailsResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    result: string;
    accept_all: boolean;
    role: boolean;
    free_email: boolean;
    disposable: boolean;
    spamtrap: boolean;
  }
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

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/")
  //Force refresh to avoid "issues"
  window.location.reload();

}
  const toggleSideBar = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };


  const handleSingleEmailValidation = async (): Promise<void> => {
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
      const { data }: {data:VerifyEmailResponse} = await axios.post(
        "http://localhost:5005/api/emails/validate-email",
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (data.success === true) {
        setEmailValidationResult(`Result: ${data.result} ✅`);
        setEmailValidationColor(data.result === "valid" ? "red" : "green");
      } else {
        setEmailValidationResult(data.message || "Validation failed.");
        setEmailValidationColor("red");
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setEmailValidationResult("Error validating email.");
      setEmailValidationColor("red");
    } finally {
      setIsValidatingSingle(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent):Promise<void> => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      const token = localStorage.getItem("token");
      const response= await axios.post<ValidateEmailsResponse>(
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
      const response = await axios.get<ValidateEmailsResponse>(
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
       
        <IconButton
        size="large"
        title="Menu"
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={toggleSideBar(true)}
    sx={{ color: "black", position: "absolute", left: 45, top: 25 }}
    >
      <MenuIcon />
    </IconButton>

        <Button
          variant="contained"
          className={"logout-button"}
          onClick={handleLogout}
          color="error"
          sx={{
            color: "black",
            backgroundColor: "lightcoral",
            "&:hover": { backgroundColor: "#e2bcbc" },
            textTransform: "none",
            position: "absolute",
            right: 20,
          }}
        >
          Logout
        </Button>
 
      
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
