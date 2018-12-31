<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>Convert</h1>
			</el-header>
			<el-main class="main">
				<span v-show="num">Convert {{ num }} {{ from }} to {{ to }}</span>
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
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import math from 'mathjs';
import { Significant } from '~/components/Math';
import sampleSize from 'lodash/sampleSize';
import answerCorrect from '~/components/answer-correct.vue';
const conversions = [['km', 'm', 'cm', 'ft', 'in'], ['kg', 'g', 'mg', 'lbs']];

@Component({
	components: {
		answerCorrect,
	},
})
export default class UnitConversions extends Vue {
	public input: {data?: string|null} = {
		data: null,
	};

	public num = '';

	public from = '';

	public to = '';

	public correct = false;

	public incorrect = false;

	public beforeMount() {
		const type = conversions[Math.floor(Math.random() * conversions.length)];
		const random = +(Math.random() * 50).toFixed(2);
		const [from, to] = sampleSize(type, 2);
		this.num = `${random}`;
		this.from = from;
		this.to = to;
	}

	public submit() {
		let correct = false;
		try {
			const sigfigs = Significant.getSF(this.num);
			// 'in' doesn't work for some reason, so replace it with 'inch'
			const template = `bignumber(${this.num}) ${this.from} to ${this.to}`.replace('in', 'inch');
			const correctAnswer = math
				.eval(template)
				.toNumeric();
			const significant = new Significant(correctAnswer, sigfigs);
			const answer = new Significant(`${this.input.data}`);
			correct = significant.equals(answer);
		} catch (e) {
			/**/
		}
		if (correct) {
			this.correct = true;
			this.incorrect = false;
			setTimeout(() => this.success(), 1000);
		} else {
			this.correct = false;
			this.incorrect = true;
		}
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
