import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ApiDataViewer from "./apiDataViwer";
import { TestArray, TestObject, ValidationConfig } from "../types/config-types";
import { flattenRecord } from "../utils/generalUtils";

export default function DataController() {
	const appContext = useContext(AppContext);
	const { originalValidations } = appContext;

	if (!originalValidations) return <></>;
	const data = originalValidations;
	const givenApis = Object.keys(data?._TESTS_ ?? {});
	const [leftApi, setLeftApi] = useState<string>("all");
	const [rightApi, setRightApi] = useState<string>("all");
	const [leftData, setLeftData] = useState<ViewMetaData[]>([]);
	const [rightData, setRightData] = useState<ViewMetaData[]>([]);
	const [searchText, setSearchText] = useState<string>("");
	useEffect(() => {
		const left = GetList(data, leftApi, searchText);
		const right = GetList(data, rightApi, searchText);
		const tempRightData: ViewMetaData[] = [];
		const tempLeftData: ViewMetaData[] = [];
		const alreadyDone = new Set<string>();
		let index = 0;

		for (const test of left) {
			const matched = right.some((t) => t._NAME_ === test._NAME_);
			let leftObject = undefined;
			let notIdenticalError = true;
			if (matched) {
				console.log("we found a match")
				leftObject = right.find((t) => t._NAME_ === test._NAME_);
				if (JSON.stringify(leftObject) === JSON.stringify(test)) {
					notIdenticalError = false;
				}
			}
			tempLeftData.push({
				testObject: test,
				matched: matched,
				missedObject: leftObject,
				notIdenticalError: notIdenticalError,
				index: index,
				void: false,
				owner: "left",
				api: leftApi,
			});
			tempRightData.push({
				testObject: leftObject ?? test,
				missedObject: leftObject,
				matched: matched,
				index: index,
				notIdenticalError: notIdenticalError,
				void: !matched,
				owner: "right",
				api: rightApi,
			});
			alreadyDone.add(test._NAME_);
			index++;
		}

		for (const test of right) {
			if (alreadyDone.has(test._NAME_)) continue;
			const matched = right.some((t) => t._NAME_ === test._NAME_);
			let rightObject = undefined;
			let notIdenticalError = false;
			if (matched) {
				rightObject = right.find((t) => t._NAME_ === test._NAME_);
				if (JSON.stringify(rightObject) !== JSON.stringify(test)) {
					notIdenticalError = true;
				}
			}
			tempLeftData.push({
				testObject: rightObject ?? test,
				matched: matched,
				missedObject: rightObject,
				notIdenticalError: notIdenticalError && matched,
				index: index,
				void: !matched,
				owner: "left",
				api: leftApi,
			});
			tempRightData.push({
				testObject: test,
				missedObject: rightObject,
				matched: matched,
				index: index,
				notIdenticalError: notIdenticalError && matched,
				void: false,
				owner: "right",
				api: rightApi,
			});
			index++;
		}

		setLeftData(tempLeftData);
		setRightData(tempRightData);
	}, [leftApi, rightApi, searchText,originalValidations]);

	return (
		<div className="p-4 border rounded-lg shadow-md">
			{/* Search Bar */}===
			<div className="mb-4">
				<input
					type="text" 
					placeholder="Search..."
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					className="w-full p-2 border rounded"
				/>
			</div>

			{/* Data Views */}
			<div className="flex">
				<div className="w-1/2 p-2">
					<ApiDataViewer
						givenApis={givenApis}
						data={leftData}
						selectedApi={leftApi}
						setSelectedApi={setLeftApi}
					/>
				</div>
				<div className="w-1/2 p-2">
					<ApiDataViewer
						givenApis={givenApis}
						data={rightData}
						selectedApi={rightApi}
						setSelectedApi={setRightApi}
					/>
				</div>
			</div>
		</div>
	);
}

export interface ViewMetaData {
	testObject: TestObject;
	missedObject?: TestObject;
	notIdenticalError: boolean;
	matched: boolean;
	index: number;
	void: boolean;
	owner: "left" | "right";
	api: string;
}

function GetList(
	data: ValidationConfig,
	api: string,
	search: string
): TestArray {
	try {
		console.log(data);
		const list = data._TESTS_?.[api] ?? flattenRecord(data._TESTS_);
		return list
			.filter((s) => JSON.stringify(s).includes(search))
			.sort((a, b) => a._NAME_.localeCompare(b._NAME_));
	} catch (e) {
		console.log(e);
		return [];
	}
}
