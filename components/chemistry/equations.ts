export interface EquationPart {
	required: number;
	molecule: string;
}
export enum EquationType {
	Synthesis = 'Synthesis',
	Decomposition = 'Decomposition',
	Combustion = 'Combustion',
	SingleReplacement = 'Single Replacement',
	DoubleReplacement = 'Double Replacement'
}
export interface Equation {
	input: EquationPart[];
	out: EquationPart[];
	type: EquationType;
}
export const equations = [
	{
		input: [
			{ required: 4, molecule: 'Al' },
			{ required: 3, molecule: 'O2' },
		],
		out: [{ required: 2, molecule: 'Al2O3' }],
		type: EquationType.Synthesis,
	},
	{
		input: [
			{ required: 1, molecule: 'C3H8' },
			{ required: 5, molecule: 'O2' },
		],
		out: [
			{ required: 3, molecule: 'CO2' },
			{ required: 4, molecule: 'H2O' },
		],
		type: EquationType.Combustion,
	},
	{
		input: [
			{ required: 1, molecule: 'Al(NO3)3' },
			{ required: 3, molecule: 'NaOH' },
		],
		out: [
			{ required: 1, molecule: 'Al(OH)3' },
			{ required: 3, molecule: 'NaNO3' },
		],
		type: EquationType.DoubleReplacement,
	},
	{
		input: [
			{ required: 2, molecule: 'KNO3' },
			{ required: 2, molecule: 'KNO2' },
		],
		out: [
			{ required: 1, molecule: 'O2' },
		],
		type: EquationType.Decomposition,
	},
];
