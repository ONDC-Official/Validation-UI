import { Context, createContext } from "react";
import { ValidationConfig } from "../types/config-types";

interface AppContextProps {
	originalValidations: ValidationConfig | undefined;
	setOriginalValidations: React.Dispatch<
		React.SetStateAction<ValidationConfig | undefined>
	>;
}

export const AppContext: Context<AppContextProps> =
	createContext<AppContextProps>({} as AppContextProps);
