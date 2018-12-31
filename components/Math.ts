/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import math from 'mathjs';

function trimNumeric(str: string) {
	return str.replace(/^[\s0]+|\s+$/g, '');
}

// eslint-disable-next-line import/prefer-default-export
export class Significant {
	public static getSF(num: string) {
		num = trimNumeric(num);
		if (num.charAt(0) === '-') {
			num = num.substring(1);
		}
		if (Number.isNaN(Number(num))) {
			throw new TypeError('not a number');
		}
		if (num.indexOf('.') === -1) {
			// No decimal
			let i = num.length - 1;
			for (; i > 0; i--) {
				if (num.charAt(i) !== '0') {
					break;
				}
			}
			return i + 1;
		}
		if (num.charAt(0) === '.') {
			num = trimNumeric(num.substring(1));
			return num.length;
		}
		return num.length - 1;
	}

	public number: math.BigNumber;
	public sigfigs: number;

	constructor(num: math.BigNumber | string, sig?: number) {
		if (typeof num === 'string') {
			this.number = math.bignumber(num);
			this.sigfigs = sig || Significant.getSF(num);
		} else {
			this.number = num;
			this.sigfigs = sig || this.number.precision();
		}
	}

	public equals(other: Significant) {
		return this.sigfigs === other.sigfigs
			&& this.number.toPrecision(this.sigfigs) === other.number.toPrecision(this.sigfigs);
	}

	public toSF(sf: number) {
		this.number = math.bignumber(this.number.toPrecision(sf));
		this.sigfigs = sf;
	}
}
