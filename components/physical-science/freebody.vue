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
				<div class="diagram">
					<div class="arrow down">
						<img src="~/assets/arrow_90.svg">
					</div>
					<div
						v-for="(amt, dir) in shownFigure"
						:key="dir"
						:class="['arrow', dir]"
						:style="style(dir, amt)"
					>
						<img v-if="dir === 'left' || dir === 'right'" src="~/assets/arrow.svg">
						<img v-else src="~/assets/arrow_90.svg">
					</div>
					<div class="body" />
				</div>
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

.diagram {
	display: grid;
	grid-template-columns: auto 50px auto;
	grid-template-rows: auto 50px auto;
}
.arrow {
	background-repeat: no-repeat;
}
.arrow.up,
.arrow.down {
	width: 30px;
	grid-column: 2;
	margin-left: auto;
	margin-right: auto;
	background-image: url("../../assets/arrow_90.svg");
	background-size: 30px auto;
}
.arrow img {
	visibility: hidden;
	display: block;
}
.arrow.down img,
.arrow.up img {
	width: 30px;
}
.arrow.left img,
.arrow.right img {
	height: 30px;
}
.arrow.up {
	grid-row: 1;
}

.arrow.down {
	background-image: url("../../assets/arrow_90.svg");
	transform: scaleY(-1);
	grid-row: 3;
}

.arrow.left,
.arrow.right {
	background-image: url("../../assets/arrow.svg");
	height: 30px;
	grid-row: 2;
	margin-top: auto;
	margin-bottom: auto;
	background-size: auto 30px;
}

.arrow.left {
	transform: scaleX(-1);
	grid-column: 1;
}

.arrow.right {
	grid-column: 3;
}

.body {
	width: 50px;
	height: 50px;
	border-style: solid;
	border-width: 1px;
	grid-column: 2;
	grid-row: 2;
}
</style>
