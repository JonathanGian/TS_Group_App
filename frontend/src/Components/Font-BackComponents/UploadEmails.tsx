import React, { useState } from "react";
import axios from "axios";
import './UploadEmail.css';

import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Table } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import useAuthCheck from "../../Hooks/useAuthCheck";

const UploadEmails: React.FC = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  
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
      const token = localStorage.getItem("token"); 
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

  const sidebarItems = [
    {
      text: "Email Status",
      icon: <InboxIcon />
    },
    {
      text: "Table",
      icon: <MailIcon />
    }
]

 

  return (
    <>
      <header className={"header-frontpage"}>
        <h1 className={"header-h1"}>Email Validation App</h1>
        <button className={"header-button logout-button "}>Log out</button>
        <button className={"header-button menu-button"} onClick={toggleSideBar(true)}>Menu</button>
      </header>
      <main>
        {/* sidebar */}
        <Drawer open={open} onClose={toggleSideBar(false)}>
          <div>
            <h2 className={"menu-header"}>MENU</h2>
          </div>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleSideBar(false)}>
            <List>
              {sidebarItems.map((item, index) => (
                  <ListItem key={`sidebarItem-${index}`} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              
            </List>
          </Box>
        </Drawer>
      
        
        {/* <h1>Upload Emails</h1> */}
        <form onSubmit={handleSubmit}>
          <div className={"verify-email-container"}>
            <input onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address" />
            <button className={"verify-email-button"}>Verify email</button>
          </div>
          <div className={"verify-email-container"}>
            <input
                type="file"
                id="file"
                accept=".txt, .csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            <label htmlFor="file" className="custom-file-label">
              §
            </label>
            <button className={"verify-email-button"} type="submit">Upload</button>
          </div>          
        </form>
        {message && (
          <p>{message}</p>
        )}
      </main>  
    </>
    
  );
};

export default UploadEmails;