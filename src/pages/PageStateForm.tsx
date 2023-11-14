import { ChangeEvent, useState } from "react";
import * as config from "../config";

const initialFormInfo = {
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
		const _setFormInfo = structuredClone(formInfo);
		const firstNameField = _setFormInfo.fields.find(
			(m) => m.idCode === "firstName"
		);
		if (firstNameField) {
			firstNameField.value = value;
		}
		setFormInfo(_setFormInfo);
	};

	const handleFieldLastName = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const _setFormInfo = structuredClone(formInfo);
		const lastNameField = _setFormInfo.fields.find(
			(m) => m.idCode === "lastName"
		);
		if (lastNameField) {
			lastNameField.value = value;
		}
		setFormInfo(_setFormInfo);
	};

	const handleFieldAge = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const _setFormInfo = structuredClone(formInfo);
		const ageField = _setFormInfo.fields.find((m) => m.idCode === "age");
		if (ageField) {
			ageField.value = value;
		}
		setFormInfo(_setFormInfo);
	};

	return (
		<section className="flex gap-8">
			<form>
				<fieldset className="border border-slate-500 p-4 rounded max-w-[25rem]">
					<legend>New Member</legend>

					<div className="mb-4 flex gap-2">
						<label className="w-32" htmlFor="firstName">
							First Name:
						</label>
						<input
							type="text"
							autoFocus
							id="firstName"
							onChange={handleFieldFirstName}
						/>
					</div>

					<div className="mb-4 flex gap-2">
						<label className="w-32" htmlFor="lastName">
							Last Name:
						</label>
						<input
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
							type="text"
							id="age"
							className="w-12 text-right"
							onChange={handleFieldAge}
						/>
					</div>

					<div className="mt-5 flex justify-end pr-3">
						<button>Add Member</button>
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
