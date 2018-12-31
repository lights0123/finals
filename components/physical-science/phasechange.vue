<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span v-show="mass">
					{{ mass }}g of {{ material }} {{ directionName }}.
					Using the table below, how much energy is gained?
				</span>
				<br>
				<small v-if="direction === '-'">Hint: losing heat causes a negative energy gain</small>
				<br>
				<el-table :data="phaseChanges | objkey" style="width: 100%">
					<el-table-column prop="key" label="Phase Change" />
					<el-table-column prop="value" label="Value" />
				</el-table>
				<br>
				<el-form :model="input" :inline="true" @submit.native.prevent="submit">
					<el-form-item prop="data"
						:rules="[
							{ required: true, message: 'answer is required' },
							{ validator: isNumber },
						]"
					>
						<el-input v-model="input.data" placeholder="Answer">
							<template slot="append">J</template>
						</el-input>
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
import sample from 'lodash/sample';
import random from 'lodash/random';
import answerCorrect from '~/components/answer-correct.vue';
import { Material, materials, phaseChanges } from '~/components/Material.ts';

@Component({
	components: {
		answerCorrect,
	},
	filters: {
		objkey(obj) {
			const arr: Array<{key, value}> = [];
			Object.keys(obj).forEach((key) => {
				arr.push({ key, value: obj[key] });
			});
			return arr;
		},
	},
})
export default class PhaseChange extends Vue {
	public input: {data?: string|null} = {
		data: null,
	};

	public mass: number | null = null;
	public material: string | null = null;
	public direction: '+' | '-' | null = null;
	public directionName: string | null = null;
	public action?: string | null = null;
	public L: number | null = null;
	public phaseChanges: {} | null = null;
	public correct = false;
	public incorrect = false;

	public beforeMount() {
		const material: Material | undefined = sample(materials.filter(material => material.phaseChanges
															&& Object.keys(material.phaseChanges).length > 0));
		if (!material || !material.phaseChanges) return;
		this.material = material.name;
		this.phaseChanges = material.phaseChanges;
		this.action = sample(Object.keys(material.phaseChanges));
		if (!this.action) return;
		this.L = material.phaseChanges[this.action];
		this.mass = random(1, 50);
		if (random(0, 1) === 0) {
			this.direction = '+';
			this.directionName = phaseChanges[this.action]['+'];
		} else {
			this.direction = '-';
			this.directionName = phaseChanges[this.action]['-'];
		}
	}

	public submit() {
		if (!this.mass || !this.L) return;
		let energy = this.mass * this.L;
		if (this.direction === '-') energy = -energy;
		if (energy === Number(this.input.data)) {
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

.unit {
	vertical-align: middle;
}
</style>
