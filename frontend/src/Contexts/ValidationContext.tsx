import React, { createContext, useState, ReactNode, useContext } from "react";
import { ValidationResult } from "../types";

interface ValidationContextProps {
	validationResult: ValidationResult | null;
	setValidationResult: React.Dispatch<React.SetStateAction<ValidationResult | null>>;
	bulkStatus: any; // TODO Replace any with the appropriate type later
	setBulkStatus: React.Dispatch<React.SetStateAction<any>>; // TODO Replace any with the appropriate type later
}

const ValidationContext = createContext<ValidationContextProps | undefined>(undefined);

const ValidationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
	const [bulkStatus, setBulkStatus] = useState<any>(null); // Replace `any` with the appropriate type if available

	return (
		<ValidationContext.Provider
			value={{ validationResult, setValidationResult, bulkStatus, setBulkStatus }}
		>
			{children}
		</ValidationContext.Provider>
	);
};

const useValidation = () => {
	const context = useContext(ValidationContext);
	if (!context) {
		throw new Error("useValidation must be used within a ValidationProvider");
	}
	return context;
};

export { ValidationProvider, useValidation };
