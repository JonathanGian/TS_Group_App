import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { Avatar } from "@mui/material";

const Navigation = () => {

  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        try {
          const response = await fetch("http://localhost:5005/api/auth/validate-token", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            navigate("/login");
          }
        } catch (error) {
          console.error("Error validating token:", error);
          navigate("/login");
        }
      }
    }
  })
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }
  , [navigate, loggedIn]);


    const handleNavigation = (path: string) => {
        navigate(path);
    };

  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>
              <HomeIcon /> Home
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/upload-emails")}>
              <UploadIcon /> Upload Emails
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/status")}>
              <EmailIcon />
              Email Status
            </button>
          </li>
        </ul>

        
          <p>{loggedIn ? "Logged In": "User is not logged in"}</p>
          {loggedIn && <button onClick={logout}>Logout</button>}
        </nav>
    </>
  );
};

export default Navigation;
