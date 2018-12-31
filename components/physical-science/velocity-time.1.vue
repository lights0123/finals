<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>What is the acceleration of the object?</h1>
			</el-header>
			<el-main class="main">
				<ve-line :data="chartData"
					:settings="chartSettings"
					:animation="{ animationDuration: 0 }"
					:legend-visible="false"
				/>
				<el-form :model="input" :inline="true" @submit.native.prevent="submit">
					<el-form-item prop="data"
						:rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
						]"
					>
						<el-input v-model="input.data" placeholder="Answer"><template slot="append">ᵐ⁄ₛ²</template></el-input>
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
import { Component, Vue } from 'vue-property-decorator';
import VeLine from 'v-charts/lib/line';
import random from 'lodash/random';
import answerCorrect from '~/components/answer-correct.vue';

@Component({
	components: {
		VeLine,
		answerCorrect,
	},
})
export default class VelTime extends Vue {
	public input: {data?: string|null} = {
		data: null,
	};

	public correct = false;

	public incorrect = false;

	public chartSettings = {
		xAxisType: 'value',
		yAxisName: ['Velocity (ᵐ⁄ₛ)'],
		xAxisName: ['Time (s)'],
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
	};

	public get vel() {
		let randomNum = random(-40, 40) / 2;
		// 10% chance of being 0
		if (random(0, 9) === 0) { randomNum = 0; }
		return randomNum;
	}

	public get timeIncrement() {
		return random(2, 6);
	}

	public get chartData() {
		const rows: Array<{time: number, velocity: number}> = [];
		for (let i = 0; i < 6 * this.timeIncrement; i += this.timeIncrement) {
			rows.push({ time: i, velocity: i * this.vel });
		}
		return {
			columns: ['time', 'velocity'],
			rows,
		};
	}

	public submit() {
		if (this.input.data && this.input.data.trim() === this.vel.toString()) {
			this.correct = true;
			this.incorrect = false;
			setTimeout(() => this.$emit('success'), 1000);
		} else {
			this.correct = false;
			this.incorrect = true;
		}
	}

	public isNumber(rule, value, callback) {
		const errors: string[] = [];
		if (Number.isNaN(Number(value))) {
			errors.push('answer must be a number');
		}
		callback(errors);
	}
}
</script>

<style scoped>
.main {
	text-align: center;
}
</style>
