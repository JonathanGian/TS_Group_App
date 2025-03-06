import React from "react";
import EmailValidator from "../EmailValidator";
import BulkEmailUploader from "../BulkEmailUploader/BulkEmailUploder";
import Result from "../Result/Result";

const Overlay = () => {
	return (
		<div className="overlay">
			<EmailValidator />
			<BulkEmailUploader />
			<Result />
		</div>
	);
};

export default Overlay;
