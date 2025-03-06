
import axios from "axios";

  const BulkStatus = () => {

    const API_KEY = import.meta.env.VITE_API_KEY;
    const checkStatus = async () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};
    
        try {
            const response = await axios.get(`api/check-queue-progress/?api_key=${API_KEY}`);
          console.log("response:",response);
            console.log(response.status);
            const data = await response.data;
    console.log("response:",data);
            } catch (error) {
            console.error('Error checking status:', error);
        }
        }
    return (
      <div>
        <h1>Bulk Status</h1>
        <button onClick={checkStatus}>Check Status</button>
        </div>
    );
  }
  
    export default BulkStatus;