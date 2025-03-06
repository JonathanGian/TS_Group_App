import React from "react";
import axios from "axios";
import { useValidation } from "../../Contexts/ValidationContext";

const BulkStatus = () => {
	const API_KEY = import.meta.env.VITE_API_KEY;
	const { setBulkStatus } = useValidation();

	const checkStatus = async () => {
		const options = { method: "GET", headers: { accept: "application/json" } };

		try {
			const response = await axios.get(`api/check-queue-progress/?api_key=${API_KEY}`);
			const data = await response.data;
			setBulkStatus(data);
		} catch (error) {
			console.error("Error checking status:", error);
		}
	};

	return (
		<>
			<div>
				<h1>Bulk Status</h1>
				<button onClick={checkStatus}>Check Status</button>
			</div>
		</>
	);
};

export default BulkStatus;
