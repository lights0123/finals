<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span>
					{{ mass }}g of {{ material.name }} follows this heating curve. How much energy is gained?
					Use a minimum of 4 significant figures.
				</span>
				<br>
				<small v-if="material.direction === '-'">Hint: losing heat causes a negative energy gain</small>
				<ve-line :data="curve"
					:settings="chartSettings"
					:animation="{ animationDuration: 0 }"
					:legend-visible="false"
					:theme="{ line: { smooth: false } }"
					:digit="0"
					:extend="{ tooltip: { formatter: tooltip }, xAxis: { interval: 0 }}"
				/>
				<el-table :data="phaseChanges | objkey" style="width: 100%">
					<el-table-column prop="key" label="Phase Change" />
					<el-table-column prop="value" label="Value" />
				</el-table>
				<el-table :data="specHeat" style="width: 100%">
					<el-table-column prop="key" label="Specific Heat" />
					<el-table-column prop="value" label="Value" />
				</el-table>
				<el-form :model="input" :inline="true" @submit.native.prevent="submit">
					<el-form-item prop="data"
						:rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
						]"
					>
						<el-input v-model="input.data" placeholder="Answer">
							<template slot="append">J</template>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit">Submit</el-button>
					</el-form-item>
				</el-form>
				<answer-correct :correct="correct" :incorrect="incorrect" />
				<br>
				<br>
				<el-button size="mini" @click="$emit('skip')">Skip</el-button>
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
// TODO: fix rerender issue
import { Component, Vue, Emit } from 'vue-property-decorator';
import VeLine from 'v-charts/lib/line';
import random from 'lodash/random';
import sample from 'lodash/sample';
import math from 'mathjs';
import answerCorrect from '~/components/answer-correct.vue';
import { Significant } from '~/components/Math.ts';
import {
	Material, materials, phaseChanges, Phase,
} from '~/components/Material.ts';
@Component({
	components: {
		VeLine,
		answerCorrect,
	},
	filters: {
		objkey(obj) {
			const arr: Array<{key, value}> = [];
			Object.keys(obj).forEach((key) => {
				arr.push({ key, value: obj[key] });
			});
			return arr;
		},
	},
})
export default class HeatCurve extends Vue {
	public input = {
		data: '',
	};

	public correct = false;

	public incorrect = false;

	public chartSettings = {
		xAxisType: 'value',
		yAxisName: ['Temperature (°C)'],
		xAxisName: ['Time'],
		lineStyle: {
			color: {
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [
					{
						offset: 0,
						color: '#7956EC', // color at 0% position
					},
					{
						offset: 1,
						color: '#3CECCF', // color at 100% position
					},
				],
				globalCoord: false, // false by default
			},
		},
		digit: 0,
	};

	public get mass() {
		return random(1, 50);
	}

	public get material(): Material {
		return materials.find(material => material.name === 'water') || materials[0];
	}

	public get phases() {
		const order = ['solid', 'fusion', 'liquid', 'vaporization', 'gas'];
		const amount = random(2, order.length);
		const start = random(0, order.length - amount);
		const phases = order.slice(start, start + amount);
		let direction = '+';
		if (random(0, 1) === 0) {
			phases.reverse();
			direction = '-';
		}
		return { phases, direction };
	}

	public getTemperature(phaseName: string) {
		if (this.material.phases && this.material.phases.solid && this.material.phases.liquid) {
			if (phaseName === 'fusion') return this.material.phases.solid.max;
			if (phaseName === 'vaporization') return this.material.phases.liquid.max;
		}
		if (!this.material.phases) return 0;
		const phase: Phase = this.material.phases[phaseName];
		return random(phase.min + 1, phase.max - 1);
	}

	public get startTemperature(): number {
		const { phases: { phases: [phaseName] } } = this;
		return this.getTemperature(phaseName);
	}

	public get endTemperature(): number {
		const { phases: { phases } } = this;
		const phaseName = phases[phases.length - 1];
		return this.getTemperature(phaseName);
	}

	public get curve() {
		const rows: Array<{ time: number; temperature: number }> = [];
		let i = 0;
		if (!this.isChange(this.phases.phases[0])) {
			rows.push({ time: i, temperature: this.startTemperature });
			i++;
		}
		this.phases.phases.forEach((phase) => {
			if (!this.isChange(phase)) return;
			rows.push({ time: i, temperature: this.getTemperature(phase) });
			i++;
			rows.push({ time: i, temperature: this.getTemperature(phase) });
			i++;
		});
		if (!this.isChange(this.phases.phases[this.phases.phases.length])) {
			rows.push({ time: this.phases.phases.length, temperature: this.endTemperature });
		}
		return {
			columns: ['time', 'temperature'],
			rows,
		};
	}

	public mL(phase: string) {
		if (this.material.phaseChanges) return this.mass * this.material.phaseChanges[phase];
		return 0;
	}

	public mcAT(phase: string, delta?: number) {
		if (!this.material.phases) return 0;
		const phaseData: Phase = this.material.phases[phase];
		if (!delta) {
			delta = phaseData.max - phaseData.min;
		}
		return this.mass * phaseData.c * delta;
	}

	public energy(phase: string, delta?: number) {
		if (this.isChange(phase)) return this.mL(phase);
		return this.mcAT(phase);
	}

	public mcATTo(phase: string, to: number, subtractFrom) {
		if (this.isChange(phase)) {
			return this.mL(phase);
		}
		if (this.material.phases) {
			if (subtractFrom) {
				return this.mcAT(phase, this.material.phases[phase].max - to);
			}
			return this.mcAT(phase, to - this.material.phases[phase].min);
		}
		return 0;
	}

	public submit() {
		let energy = 0;
		this.phases.phases.slice(1, this.phases.phases.length - 1).forEach((phase) => {
			energy += this.energy(phase);
		});
		energy += this.mcATTo(this.phases.phases[0], this.startTemperature, this.phases.direction === '+');
		energy += this.mcATTo(this.phases.phases[this.phases.phases.length - 1], this.endTemperature, this.phases.direction === '-');
		if (this.phases.direction === '-') energy = -energy;
		try {
			if (new Significant(math.bignumber(energy), 4).equals(new Significant(this.input.data, 4))) {
				this.correct = true;
				this.incorrect = false;
				setTimeout(() => this.success(), 1000);
			} else {
				this.correct = false;
				this.incorrect = true;
			}
		} catch (e) { /* */ }
	}

	public get phaseChanges() {
		return this.material.phaseChanges;
	}

	public get specHeat() {
		const val: Array<{key: string, value: number}> = [];
		if (this.material.phases) {
			Object.keys(this.material.phases).forEach((phaseName) => {
				if (!this.material.phases) return;
				const phase: Phase = this.material.phases[phaseName];
				val.push({ key: phase.name || `${phaseName} ${this.material.name}`, value: phase.c });
			});
		}
		return val;
	}

	@Emit()
	public success() { /* */ }

	public isNumber(rule, value, callback) {
		const errors: string[] = [];
		if (Number.isNaN(Number(value))) {
			errors.push('answer must be a number');
		}
		callback(errors);
	}

	public tooltip([{ data }]) {
		return `${data[1]} °C`;
	}

	public isChange(phase: string) {
		return ['fusion', 'vaporization'].includes(phase);
	}
}
</script>

<style scoped>
.main {
	text-align: center;
}

.radio {
	text-align: left;
	margin-bottom: 20px;
}

.radio .radioItem:not(:last-child) {
	margin-bottom: 5px;
}
</style>
