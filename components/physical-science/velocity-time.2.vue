<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>What is the motion of the object?</h1>
			</el-header>
			<el-main class="main">
				<ve-line
					:data="chartData"
					:settings="chartSettings"
					:animation="{ animationDuration: 0 }"
					:legend-visible="false"
				></ve-line>
				<el-form @submit.native.prevent="submit">
					<el-radio-group class="radio" v-model="input">
						<el-radio class="radioItem" label="+">The object is speeding up</el-radio>
						<br>
						<el-radio class="radioItem" label="-">The object is slowing down</el-radio>
						<br>
						<el-radio class="radioItem" label="0">The object is at a constant speed</el-radio>
						<br>
						<el-radio class="radioItem">The object is not moving</el-radio>
					</el-radio-group>
					<el-form-item>
						<el-button type="primary" @click="submit">Submit</el-button>
					</el-form-item>
				</el-form>
				<answer-correct :correct="correct" :incorrect="incorrect"/>
				<br>
				<br>
				<el-button @click="$emit('skip')" size="mini">Skip</el-button>
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
export default class VelTime2 extends Vue {
	public input: string | null = null;
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
		// 25% chance of being 0
		if (random(0, 3) === 0) {
			randomNum = 0;
		}
		return randomNum;
	}
	public get timeIncrement() {
		return random(2, 6);
	}
	public get chartData() {
		const rows: Array<{ time: number; velocity: number }> = [];
		for (let i = 0; i < 6 * this.timeIncrement; i += this.timeIncrement) {
			rows.push({ time: i, velocity: i * this.vel });
		}
		return {
			columns: ['time', 'velocity'],
			rows,
		};
	}
	public submit() {
		if (this.input === '+' && this.vel > 0 ||
			this.input === '-' && this.vel < 0 ||
			this.input === '0' && this.vel === 0) {
			this.correct = true;
			this.incorrect = false;
			setTimeout(() => this.$emit('success'), 1000);
		} else {
			this.correct = false;
			this.incorrect = true;
		}
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
