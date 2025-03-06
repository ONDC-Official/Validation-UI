import { useState } from "react";
import "./App.css";
import YamlFileSelector from "./components/filleSelector";
import { AppContext } from "./context/AppContext";
import yaml from "js-yaml";
import { ValidationConfig } from "./types/config-types";
import DataController from "./components/dataController";

function App() {
	const [data, setData] = useState<ValidationConfig | undefined>(undefined);
	const [givenApis, setGivenApis] = useState<string[]>([]);
	console.log(data);
	return (
		<AppContext.Provider
			value={{
				originalValidations: data,
				setOriginalValidations: setData,
			}}
		>
			<div>
				<YamlFileSelector
					onFileSelect={(content) => {
						try {
							const d = yaml.load(content) as any;
							const validations = d["x-validations"] as ValidationConfig;
							setData(validations);
							setGivenApis(Object.keys(validations?._TESTS_ ?? {}));
							console.log(Object.keys(validations?._TESTS_ ?? {}));
						} catch (e) {
							alert("Invalid YAML file");
						}
					}}
				/>
				{data && <DataController />}
			</div>
		</AppContext.Provider>
	);
}

export default App;
