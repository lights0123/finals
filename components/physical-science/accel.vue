<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span>
					A car accelerates from {{ vel[0] === 0 ? 'a standstill' : `${vel[0]} ᵐ⁄ₛ` }}
					to {{ vel[1] === 0 ? 'a standstill' : `${vel[1]} ᵐ⁄ₛ` }} in {{ time }} seconds.
					What is its acceleration? Use significant figures.
				</span>
				<br>
				<br>
				<el-form :model="input" :inline="true" @submit.native.prevent="submit">
					<el-form-item prop="data"
						:rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
						]"
					>
						<el-input v-model="input.data" placeholder="Answer" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit">Submit</el-button>
					</el-form-item>
				</el-form>
				<answer-correct :correct="correct" :incorrect="incorrect" />
				<br>
				<br>
				<el-button size="mini" @click="$emit('skip')">Skip</el-button>
				<br>
				<br>
				<a href="https://sites.google.com/shaker.org/perryscience/honors-units/unit-2-kinematics" target="_blank">
					<el-button size="small" type="text">Help</el-button>
				</a>
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { Significant } from '~/components/Math';
import random from 'lodash/random';
import answerCorrect from '~/components/answer-correct.vue';

@Component({
	components: {
		answerCorrect,
	},
})
export default class Acceleration extends Vue {
	public input: {data?: string|null} = {
		data: null,
	};

	public correct = false;
	public incorrect = false;

	public submit() {
		const sigfigs = Math.min(
			...[this.vel[0], this.vel[1], this.time]
				.filter(num => num > 0)
				.map(num => Significant.getSF(`${num}`)),
		);
		const significant = new Significant(`${this.accel}`, sigfigs);
		try {
			const answer = new Significant(`${this.input.data}`);
			if (significant.equals(answer)) {
				this.correct = true;
				this.incorrect = false;
				setTimeout(() => this.success(), 1000);
			} else {
				this.correct = false;
				this.incorrect = true;
			}
		} catch (e) { /* */ }
	}

	public get vel(): [number, number] {
		let v1;
		let	v2;
		if (random(0, 1) === 0) {
			if (random(0, 2) === 0) v1 = 0;
			else v1 = random(1, 20);
			v2 = random(v1 + 5, v1 + 20);
		} else {
			if (random(0, 2) === 0) v2 = 0;
			else v2 = random(1, 20);
			v1 = random(v2 + 5, v2 + 20);
		}
		return [v1, v2];
	}

	public get time() {
		return random(2, 20);
	}

	private get accel() {
		return (this.vel[1] - this.vel[0]) / this.time;
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
}
</script>

<style scoped>
.main {
	text-align: center;
}
</style>
