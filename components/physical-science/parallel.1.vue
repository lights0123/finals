<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>What is the motion of the object?</h1>
			</el-header>
			<el-main class="main">
				<el-form @submit.native.prevent="submit">
					<br>
					<span>Select one from each group.</span>
					<br>
					<br>
					<div v-for="(data, dir) in answers" :key="dir">
						<el-radio-group v-model="data.input" class="radio" required>
							<el-radio class="radioItem" label="+">The object is accelerating {{ data['+'] }}.</el-radio>
							<br>
							<el-radio class="radioItem" label="-">The object is accelerating {{ data['-'] }}.</el-radio>
							<br>
							<el-radio class="radioItem" label="0">The object is not accelerating {{ dir }}.</el-radio>
						</el-radio-group>
						<br>
					</div>
					<el-form-item>
						<el-button type="primary" :disabled="disabled" @click="submit">
							{{ disabled ? 'Select one item from each group' : 'Submit' }}
						</el-button>
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
import random from 'lodash/random';
import 'mdn-polyfills/Object.entries';
import answerCorrect from '~/components/answer-correct.vue';

@Component({
	components: {
		answerCorrect,
	},
})
export default class VelTime2 extends Vue {
	public answers = {
		vertically: { '+': 'upwards', '-': 'downwards', input: '' },
		horizontally: { '+': 'right', '-': 'left', input: '' },
	};

	public correct = false;

	public incorrect = false;

	public submit() {
		let vertically = '0';
		let horizontally = '0';
		if (this.figure.up - this.figure.down > 0) {
			vertically = '+';
		} else if (this.figure.up - this.figure.down < 0) {
			vertically = '-';
		}
		if (this.figure.right - this.figure.left > 0) {
			horizontally = '+';
		} else if (this.figure.right - this.figure.left < 0) {
			horizontally = '-';
		}
		if (this.answers.vertically.input === vertically && this.answers.horizontally.input === horizontally) {
			this.correct = true;
			this.incorrect = false;
			setTimeout(() => this.$emit('success'), 1000);
		} else {
			this.correct = false;
			this.incorrect = true;
		}
	}

	public get figure() {
		const gravity = 1;
		const normalForce = random(0, 3) / 2;
		const left = random(0, 3) / 2;
		const right = random(0, 3) / 2;
		return {
			down: gravity, up: normalForce, left, right,
		};
	}

	public get shownFigure(): { up?: number; left?: number; right?: number } {
		const obj = {};
		['up', 'left', 'right'].forEach((dir) => {
			if (this.figure[dir]) {
				obj[dir] = this.figure[dir];
			}
		});
		return obj;
	}

	public get disabled() {
		return Object.entries(this.answers).some(
			answer => answer[1].input === '',
		);
	}

	public style(dir, amt) {
		if (dir === 'up') {
			return {
				height: `${50 * amt}px`,
				backgroundSize: `30px ${50 * amt}px`,
			};
		}
		return {
			width: `${50 * amt}px`,
			backgroundSize: `${50 * amt}px 30px`,
		};
	}
}
</script>

<style scoped>
.main {
	align-items: center;
	display: flex;
	flex-direction: column;
}

.radio {
	text-align: left;
	margin-bottom: 20px;
}

.radio .radioItem:not(:last-child) {
	margin-bottom: 5px;
}
</style>
