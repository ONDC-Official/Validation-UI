import React, { useState } from "react";

type YamlFileSelectorProps = {
	onFileSelect: (content: string) => void;
};

const YamlFileSelector: React.FC<YamlFileSelectorProps> = ({
	onFileSelect,
}) => {
	const [fileName, setFileName] = useState<string>("");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.name.endsWith(".yaml")) {
			setFileName(file.name);
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					onFileSelect(e.target.result as string);
				}
			};
			reader.readAsText(file);
		} else {
			alert("Please select a valid YAML file.");
		}
	};

	return (
		<div className="p-4 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
			<input
				type="file"
				accept=".yaml"
				onChange={handleFileChange}
				className="hidden"
				id="yaml-upload"
			/>
			<label
				htmlFor="yaml-upload"
				className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
			>
				Select YAML File
			</label>
			{fileName && (
				<p className="mt-2 text-gray-700 dark:text-gray-300">
					Selected: {fileName}
				</p>
			)}
		</div>
	);
};

export default YamlFileSelector;
