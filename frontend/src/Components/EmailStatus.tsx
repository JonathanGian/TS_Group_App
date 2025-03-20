import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FetchEmailsResponse } from "../Types/Email.types";
import { AxiosResponse } from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { EmailData } from "../Types/Email.types";


const EmailStatus = () => {
  const [data, setData] = useState<EmailData[]>([]);
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);
 
  
  useEffect(() => {
    const fetchEmails = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        const response: AxiosResponse<FetchEmailsResponse> = await axios.get(
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

  // Group emails by batch id
  const groupedEmails = data.reduce<Record<number, EmailData[]>>(
    (acc, email) => {
      const batchId = email.batch_id;
      if (!acc[batchId]) {
        acc[batchId] = [];
      }
      acc[batchId].push(email);
      return acc;
    },
    {},
  );

  // Delete a single email
  const deleteEmail = async (emailId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5005/api/emails/${emailId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the email from state
      setData((prevData) => prevData.filter((email) => email.id !== emailId));
    } catch (error) {
      console.error("Error deleting email", error);
    }
  };

  // Delete an entire batch
  const deleteBatch = async (batchId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5005/api/emails/batch/${batchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove all emails in the batch from state
      setData((prevData) =>
        prevData.filter((email) => email.batch_id !== batchId),
      );
    } catch (error) {
      console.error("Error deleting batch", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          
          padding: 2,

          backgroundColor: "grey",
          height: "100vh",
          overflowY: "auto",
          width: "100vw",
        }}
      >{/* Top Button */}
        <Box sx={{ alignSelf: "flex-start", mb: 2 }}>
          <Button
            variant="contained"
            sx={{ color: "white", margin: 2 }}
            onClick={() => navigate("/upload-emails")}
          >
            Back to Dashboard
          </Button>
        </Box>
        {Object.entries(groupedEmails).map(([batchId, emails]) => (
          <Paper key={batchId} sx={{ width: "100%", mb: 3, p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Batch ID: {batchId}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteBatch(Number(batchId))}
              >
                Delete Batch
              </Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emails.map(
                  (email) => (
                    (
                      <TableRow key={email.id}>
                        <TableCell>{email.id}</TableCell>
                        <TableCell>{email.email}</TableCell>
                        <TableCell>{email.status}</TableCell>
                        <TableCell>{email.result}</TableCell>
                        <TableCell>{email.message}</TableCell>
                        <TableCell>{email.batch_created_at}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteEmail(email.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  ),
                )}
              </TableBody>
            </Table>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default EmailStatus;
