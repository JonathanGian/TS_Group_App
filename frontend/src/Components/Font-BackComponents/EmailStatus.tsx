import React, { useState, useEffect } from "react";
import axios from "axios";
import { DynamicTable } from "./DynamicTable";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";

const EmailStatus = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmails = async () => {
      if (data.length) {
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5005/api/emails/status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.success) {
          setData(response.data.emails);
        } else {
          console.error("Failed to fetch emails", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching emails", error);
      }
    };

    fetchEmails();
  }, []);

  if (!localStorage.getItem("token")) {
    console.error("No token found in localStorage");
    return (
      <Box>
        <Typography variant="h4" color="red">
          Please login to view email status.
        </Typography>
      </Box>
    );
  }
  return (
    <>
          <Navigation />
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backgroundColor: "grey",
        
      }}
    >
      <Box sx={{ alignSelf: "flex-start" }}>
        <Button
          variant="contained"
          sx={{ color: "white", margin: 2 }}
          onClick={() => navigate("/upload-emails")}
        >
          Back to Dashboard
        </Button>
      </Box>
      <DynamicTable data={data} />
    </Box>
    </>
  );
};

export default EmailStatus;
