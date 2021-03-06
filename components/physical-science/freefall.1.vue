<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span>
					An object drops from {{ height }} meters. Given that gravity is 9.8 ᵐ⁄ₛ², how long does it take to fall?
					Use significant figures.
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
export default class FreeFall1 extends Vue {
	public input: {data?: string|null} = {
		data: null,
	};

	public correct = false;
	public incorrect = false;

	public submit() {
		const sigfigs = Significant.getSF(`${this.height}`);
		const significant = new Significant(`${this.time}`, sigfigs);
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

	public get height() {
		return random(3, 100);
	}

	public get time() {
		return Math.sqrt(2 * this.height / 9.8);
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
