<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span>
					A ball is thrown so that its peak height is {{ height }} meters.
					Given that gravity is 9.8 ᵐ⁄ₛ², how long did it take?
					Use significant figures.
				</span>
				<br>
				<br>
				<el-form :model="input" :inline="true">
					<el-form-item prop="time"
						:rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
						]"
					>
						<el-input v-model="input.time" placeholder="Time" @keyup.native.enter="submit" />
					</el-form-item>
					<br>
					<answer-correct :correct="timeCorrect" :incorrect="timeIncorrect" />
					<br>
					<span>What was the initial velocity?</span>
					<br>
					<br>
					<el-form-item prop="vel"
						:rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
						]"
					>
						<el-input v-model="input.vel" placeholder="Velocity" @keyup.native.enter="submit" />
					</el-form-item>
					<br>
					<answer-correct :correct="velCorrect" :incorrect="velIncorrect" />
					<br>
					<el-form-item>
						<el-button type="primary" @click="submit">Submit</el-button>
					</el-form-item>
				</el-form>
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
export default class FreeFall1 extends Vue {
	public input: {time: string, vel: string} = {
		time: '',
		vel: '',
	};

	public timeCorrect = false;
	public timeIncorrect = false;
	public velCorrect = false;
	public velIncorrect = false;

	public submit() {
		const sigfigs = Significant.getSF(`${this.height}`);
		let timeCorrect = false;
		let velCorrect = false;
		try {
			timeCorrect = new Significant(`${this.time}`, sigfigs).equals(new Significant(`${this.input.time}`));
		} catch (e) { /* */ }
		try {
			velCorrect = new Significant(`${this.vel}`, sigfigs).equals(new Significant(`${this.input.vel}`));
		} catch (e) { /* */ }
		if (timeCorrect) {
			this.timeCorrect = true;
			this.timeIncorrect = false;
		} else {
			this.timeCorrect = false;
			this.timeIncorrect = true;
		}
		if (velCorrect) {
			this.velCorrect = true;
			this.velIncorrect = false;
		} else {
			this.velCorrect = false;
			this.velIncorrect = true;
		}
		if (timeCorrect && velCorrect)setTimeout(() => this.success(), 1000);
	}

	public get height() {
		return random(3, 100);
	}

	public get time() {
		return Math.sqrt(2 * this.height / 9.8);
	}

	public get vel() {
		return this.time * 9.8;
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
