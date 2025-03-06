import { ConfigSyntax, TestObjectSyntax } from "../constants/syntax";

export type Primitive = number | string | boolean | null;
export type ValidVariableLine = string | Primitive[];

export type TestObject = {
	[TestObjectSyntax.Name]: string;
	[TestObjectSyntax.Return]: string | TestObject[];
	[TestObjectSyntax.Scope]?: string;
	[TestObjectSyntax.ErrorCode]?: number;
	[TestObjectSyntax.SuccessCode]?: number;
	[TestObjectSyntax.Continue]?: string;
	[key: string]: ConfigVariable | number | TestObject[] | undefined;
};

export type ConfigVariable = string | Primitive[];

export type TestArray = TestObject[];

export type SessionDataValue = string | Primitive[] | null;

export type SessionDataApi = {
	[key: string]: SessionDataValue;
};

export type ValidationConfig = {
	[ConfigSyntax.Tests]: Record<string, TestArray>;
	[ConfigSyntax.SessionData]: Record<string, SessionDataApi>;
};
