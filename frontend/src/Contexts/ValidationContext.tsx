import React, { createContext, useState, ReactNode, useContext } from "react";
import { ValidationResult } from "../types";

interface ValidationContextProps {
	validationResult: ValidationResult | null;
	setValidationResult: React.Dispatch<React.SetStateAction<ValidationResult | null>>;
}

const ValidationContext = createContext<ValidationContextProps | undefined>(undefined);

const ValidationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

	return (
		<ValidationContext.Provider value={{ validationResult, setValidationResult }}>
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
