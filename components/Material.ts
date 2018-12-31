/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export interface Phase {
	name?: string,
	c: number,
	min: number,
	max: number;
}
export interface Material {
	name: string,
	phases?: {
		solid?: Phase,
		liquid?: Phase,
		gas?: Phase,
	},
	phaseChanges?: {
		fusion?: number,
		vaporization?: number,
	}
}
export const materials: Material[] = [
	{
		name: 'water',
		phases: {
			solid: {
				name: 'ice',
				c: 2.108,
				min: -100,
				max: 0,
			},
			liquid: {
				c: 4.196,
				min: 0,
				max: 100,
			},
			gas: {
				name: 'steam',
				c: 1.996,
				min: 100,
				max: 300,
			},
		},
		phaseChanges: {
			fusion: 334,
			vaporization: 2501,
		},
	},
	{
		name: 'copper',
		phases: {
			solid: {
				c: 0.39,
				min: 0,
				max: 300,
			},
		},
		phaseChanges: {
			fusion: 209,
			vaporization: 4730,
		},
	},
];
export const phaseChanges = {
	fusion: {
		'+': 'melts',
		'-': 'freezes',
	},
	vaporization: {
		'+': 'boils',
		'-': 'condenses',
	},
};
