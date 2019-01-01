<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span>
					A ball is thrown from a {{ height }} meter tall cliff with an initial velocity of {{ vel }} ᵐ⁄ₛ.
					Given that gravity is 9.8 ᵐ⁄ₛ², how long did it take for the ball to reach the ground?
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
					<span>How far from the base of the cliff did it land?</span>
					<br>
					<br>
					<el-form-item prop="distance"
						:rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
						]"
					>
						<el-input v-model="input.distance" placeholder="Distance" @keyup.native.enter="submit" />
					</el-form-item>
					<br>
					<answer-correct :correct="distCorrect" :incorrect="distIncorrect" />
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
export default class FreeFall2 extends Vue {
	public input: {time: string, distance: string} = {
		time: '',
		distance: '',
	};

	public timeCorrect = false;
	public timeIncorrect = false;
	public distCorrect = false;
	public distIncorrect = false;

	public submit() {
		const sigfigs = Math.min(Significant.getSF(`${this.height}`), Significant.getSF(`${this.vel}`));
		let timeCorrect = false;
		let distCorrect = false;
		try {
			timeCorrect = new Significant(`${this.time}`, sigfigs).equals(new Significant(`${this.input.time}`));
		} catch (e) { /* */ }
		try {
			distCorrect = new Significant(`${this.distance}`, sigfigs).equals(new Significant(`${this.input.distance}`));
		} catch (e) { /* */ }
		if (timeCorrect) {
			this.timeCorrect = true;
			this.timeIncorrect = false;
		} else {
			this.timeCorrect = false;
			this.timeIncorrect = true;
		}
		if (distCorrect) {
			this.distCorrect = true;
			this.distIncorrect = false;
		} else {
			this.distCorrect = false;
			this.distIncorrect = true;
		}
		if (timeCorrect && distCorrect)setTimeout(() => this.success(), 1000);
	}

	public get height() {
		return random(3, 100);
	}

	public get vel() {
		return random(3, 25);
	}

	public get time() {
		return Math.sqrt(2 * this.height / 9.8);
	}

	public get distance() {
		return this.vel * this.time;
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
