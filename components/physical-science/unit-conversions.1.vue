<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>Convert</h1>
			</el-header>
			<el-main class="main">
				<span v-show="num">Convert {{num}} {{from}} to {{to}}</span>
				<br>
				<br>
				<el-form :model="input" :inline="true" @submit.native.prevent="submit">
					<el-form-item prop="data" :rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
    						]">
						<el-input v-model="input.data" placeholder="Answer"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit">Submit</el-button>
					</el-form-item>
				</el-form>
				<transition name="fade" mode="out-in">
					<span class="correct" v-if="correct" key="correct">
						<i class="el-icon-check"/> Correct!
					</span>
					<span class="incorrect" v-else-if="incorrect" key="incorrect">
						<i class="el-icon-close"/> Incorrect
					</span>
				</transition>
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import math from 'mathjs';
import { Significant } from '~/components/Math';
import sampleSize from 'lodash/sampleSize';
const conversions = [['km', 'm', 'cm', 'ft', 'in'], ['kg', 'g', 'mg', 'lbs']];

@Component
export default class UnitConversions extends Vue {
	public input: {data?: number|null} = {
		data: null,
	};
	public num = '';
	public from = '';
	public to = '';
	public correct = false;
	public incorrect = false;

	public beforeMount() {
		const type =
			conversions[Math.floor(Math.random() * conversions.length)];
		const random = +(Math.random() * 50).toFixed(2);
		const [from, to] = sampleSize(type, 2);
		this.num = '' + random;
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
			const answer = new Significant('' + this.input.data);
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
	public success() {/* */}

	public isNumber(rule, value, callback) {
		const errors: string[] = [];
		if (isNaN(Number(value))) {
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.correct {
	color: #3ac254;
}

.incorrect {
	color: #f56c6c;
}
</style>
