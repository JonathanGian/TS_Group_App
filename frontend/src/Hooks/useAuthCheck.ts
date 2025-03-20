import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "http://localhost:5005/api/auth/validate-token",
          {
            method: "GET",
            headers: headers,
          },
        );
  
        const data = await response.data;
 
        if (response.status !== 200 || !data.success) {
          localStorage.removeItem("token"); // Remove invalid token
          navigate("/login");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);
};

export default useAuthCheck;
