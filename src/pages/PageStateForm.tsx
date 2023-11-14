/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import * as config from "../config";
import axios from "axios";
import { IFormInfo } from "../interfaces";

const initialFormInfo: IFormInfo = {
	status: "active",
	fields: [
		{
			idCode: "firstName",
			label: "First Name",
			value: "",
			isRequired: true,
			isValid: false,
		},
		{
			idCode: "lastName",
			label: "Last Name",
			value: "",
			isRequired: true,
			isValid: false,
		},
		{
			idCode: "age",
			label: "Age",
			value: "",
			isRequired: true,
			isValid: false,
		},
	],
};

export const PageStateForm = () => {
	const [formInfo, setFormInfo] = useState(initialFormInfo);

	const handleFieldFirstName = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const _formInfo = structuredClone(formInfo);
		const firstNameField = _formInfo.fields.find(
			(m) => m.idCode === "firstName"
		);
		if (firstNameField) {
			firstNameField.value = value;
		}
		setFormInfo(_formInfo);
	};

	const handleFieldLastName = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const _formInfo = structuredClone(formInfo);
		const lastNameField = _formInfo.fields.find(
			(m) => m.idCode === "lastName"
		);
		if (lastNameField) {
			lastNameField.value = value;
		}
		setFormInfo(_formInfo);
	};

	const handleFieldAge = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const _formInfo = structuredClone(formInfo);
		const ageField = _formInfo.fields.find((m) => m.idCode === "age");
		if (ageField) {
			ageField.value = value;
		}
		setFormInfo(_formInfo);
	};

	const blankOutForm = () => {
		const _formInfo = structuredClone(formInfo);
		const firstName = _formInfo.fields.find(
			(m) => m.idCode === "firstName"
		);
		const lastName = _formInfo.fields.find(
			(m) => m.idCode === "lastName"
		);
		const age = _formInfo.fields.find(
			(m) => m.idCode === "age"
		);
		if (firstName && lastName && age) {
			firstName.value = "";
			lastName.value = "";
			age.value = "";
		}
		_formInfo.status = "active";
		setFormInfo(_formInfo);
	};

	const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const member = {
			firstName: formInfo.fields.find((m) => m.idCode === "firstName")
				?.value,
			lastName: formInfo.fields.find((m) => m.idCode === "lastName")
				?.value,
			age: Number(formInfo.fields.find((m) => m.idCode === "age")?.value),
		};

		const _formInfo = structuredClone(formInfo);
		_formInfo.status = "saving";
		setFormInfo(_formInfo);
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		};

		setTimeout(() => {
			(async () => {
				try {
					const response = await axios.post(
						"http://localhost:3021/members",
						member,
						{ headers }
					);
					if (response.status === 201) {
						blankOutForm();
					} else {
						console.log(`ERROR: ${response.status}`);
					}
				} catch (error: any) {
					console.log(`ERROR: ${error.message}`);
				}
			})();
		}, 1500);
	};

	return (
		<section className="flex gap-8">
			<form onSubmit={handleSubmitForm}>
				<fieldset className="border border-slate-500 p-4 rounded max-w-[25rem]">
					<legend>New Member</legend>

					<div className="mb-4 flex gap-2">
						<label className="w-32" htmlFor="firstName">
							First Name:
						</label>
						<input
							disabled={formInfo.status === "saving"}
							type="text"
							autoFocus
							value={
								formInfo.fields.find(
									(m) => m.idCode === "firstName"
								)?.value
							}
							id="firstName"
							onChange={handleFieldFirstName}
						/>
					</div>

					<div className="mb-4 flex gap-2">
						<label className="w-32" htmlFor="lastName">
							Last Name:
						</label>
						<input
							disabled={formInfo.status === "saving"}
							value={
								formInfo.fields.find(
									(m) => m.idCode === "lastName"
								)?.value
							}
							type="text"
							id="lastName"
							onChange={handleFieldLastName}
						/>
					</div>

					<div className="mb-4 flex gap-2">
						<label className="w-32" htmlFor="age">
							Age:
						</label>
						<input
							disabled={formInfo.status === "saving"}
							value={
								formInfo.fields.find(
									(m) => m.idCode === "age"
								)?.value
							}
							type="text"
							id="age"
							className="w-12 text-right"
							onChange={handleFieldAge}
						/>
					</div>

					<div className="mt-5 flex justify-end pr-3">
						<button
							disabled={formInfo.status === "saving"}
							className={
								formInfo.status === "saving" ? "opacity-60" : ""
							}
						>
							{formInfo.status === "saving"
								? "Saving..."
								: "Add Member"}
						</button>
					</div>
				</fieldset>
			</form>
			{config.debugging() && (
				<section className="mt-4">
					<pre className="text-orange-900 text-xs">
						{JSON.stringify(formInfo, null, 2)}
					</pre>
				</section>
			)}
		</section>
	);
};
