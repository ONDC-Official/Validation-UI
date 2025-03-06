import AttributeList from "./testCard";
import { ViewMetaData } from "./dataController";

interface ApiDataViewerProps {
	givenApis: string[];
	data: ViewMetaData[];
	setSelectedApi: (api: string) => void;
	selectedApi: string;
}

const ApiDataViewer: React.FC<ApiDataViewerProps> = ({
	givenApis,
	data,
	setSelectedApi,
	selectedApi,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedApi(event.target.value);
	};

	// const displayedData =
	// 	selectedApi === "all"
	// 		? flattenRecord(data?._TESTS_)
	// 		: data?._TESTS_?.[selectedApi] ?? {};

	return (
		<div className="p-4 border rounded-lg shadow-md">
			<label className="block mb-2 font-semibold">Select API:</label>
			<select
				className="p-2 border rounded w-full"
				value={selectedApi}
				onChange={handleChange}
			>
				<option value="all">Show All</option>
				{givenApis.map((api) => (
					<option key={api} value={api}>
						{api}
					</option>
				))}
			</select>

			<div className="mt-4 p-4 border rounded-lg bg-gray-100">
				<AttributeList tests={data} />
			</div>
		</div>
	);
};

export default ApiDataViewer;
