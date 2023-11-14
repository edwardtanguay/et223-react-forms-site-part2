export interface IFrontendEmployee {
	firstName: string;
	lastName: string;
	age: number;
	hireDate: string;
	employeeNumber: string;
	notes: string;
}

export interface IBackendEmployee extends IFrontendEmployee {
	id: number;
}

export interface IFormField {
	idCode: string;
	label: string;
	value: string;
	isRequired: boolean;
	isValid: boolean;
}

export interface IFormInfo {
	status: "active" | "saving";
	fields: IFormField[];
}
