/* AttributeList.tsx */
import React, { useContext, useState } from "react";
import { ViewMetaData } from "./dataController";
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

interface AttributeCardProps {
	data: ViewMetaData;
}

const AttributeCard: React.FC<AttributeCardProps> = ({ data }) => {
	const [showRaw, setShowRaw] = useState(false);

	const toggleRaw = () => setShowRaw((prev) => !prev);

	const {originalValidations,setOriginalValidations} = useContext(AppContext);
	console.log("redering");
	const fundelete = () => {
		setOriginalValidations(or => {
			if (!or) return undefined; // Handle undefined case
	
			// Create a new copy of the original state
			const newValidations = { ...or, _TESTS_: { ...or._TESTS_ } };
	
			// Filter out the test object
			newValidations._TESTS_[data.api] = (newValidations._TESTS_[data.api] || []).filter(
				t => t._NAME_ !== data.testObject._NAME_
			);
	
			return newValidations; // Return a new object to trigger re-render
		});
	};

	// Determine base background styling based on card state.
	const bgClasses = data.void
		? "bg-gray-100"
		: data.matched
		? "bg-green-100"
		: "bg-red-100";

	const textClasses = data.void
		? "text-gray-600"
		: data.matched
		? "text-green-600"
		: "text-red-600";

	return (
		<div
			className={`relative rounded-lg shadow-md p-6 flex flex-col justify-between w-full max-w-md transition-transform hover:shadow-lg ${bgClasses}`}
		>
			{/* "View Raw" Button */}
			<div className="absolute top-4 right-4 flex gap-2">
			<button
				onClick={toggleRaw}
				className="text-gray-500 hover:text-gray-700 focus:outline-none"
				title={showRaw ? "Hide Raw" : "View Raw"}
			>
				{showRaw ? <FiEyeOff size={20} /> : <FiEye size={20} />}
			</button>
			<button
				onClick={fundelete}
				className="text-red-500 hover:text-red-700 focus:outline-none"
				title="Delete"
			>
				<FiTrash2 size={20} />
			</button>

		</div>

			<div>
				<h3 className="text-xl font-semibold mb-2 text-gray-800">
					{data.testObject._NAME_}
				</h3>
				{data.void ? (
					<p className="text-sm text-gray-500">Not Present Here</p>
				) : (
					<p
						className={`text-sm ${
							data.notIdenticalError ? "text-red-600" : "text-blue-600"
						}`}
				 	>
						{data.notIdenticalError ? "Not Identical" : "Tests are identical"}
					</p>
				)}

				{/* Add more details as needed */}
			</div>

			{showRaw && (
				<pre className="mt-4 p-3 bg-gray-50 text-gray-800 text-xs rounded overflow-auto border border-gray-200">
					{JSON.stringify(data.testObject, null, 2)}
				</pre>
			)}
		</div>
	);
};

interface AttributeListProps {
	tests: ViewMetaData[];
}

const AttributeList: React.FC<AttributeListProps> = ({ tests }) => {
	return (
		<div className="flex flex-wrap justify-center gap-8 p-8">
			{tests.map((test, index) => (
				<AttributeCard key={index} data={test} />
			))}
		</div>
	);
};

export default AttributeList;
