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