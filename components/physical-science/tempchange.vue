<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span v-show="mass">
					{{ mass }}g of {{ material }} {{ direction }} from {{ temp1 }}°C to {{ temp2 }}°C.
					If it has a specific heat of {{ c }} <img class="unit" src="~/assets/JgC.svg">, how much energy is gained?
				</span>
				<br>
				<small v-if="direction === 'lowers'">Hint: losing heat causes a negative energy gain</small>
				<br>
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
})
export default class TempChange extends Vue {
	public input: {data?: string|null} = {
		data: null,
	};

	public mass: number | null = null;
	public material: string | null = null;
	public direction: string | null = null;
	public temp1: number | null = null;
	public temp2: number | null = null;
	public c: number | null = null;
	public correct = false;
	public incorrect = false;

	public beforeMount() {
		const material: Material | undefined = sample(materials.filter(material => material.phases
															&& Object.keys(material.phases).length > 0));
		if (!material || !material.phases) return;
		const action = sample(Object.keys(material.phases));
		if (!action) return;
		const phase = material.phases[action];
		this.material = phase.name || `${action} ${material.name}`;
		this.c = phase.c;
		this.temp1 = random(phase.min, phase.max / 2);
		this.temp2 = random(this.temp1 + 1, phase.max);
		this.mass = random(1, 50);
		if (random(0, 1) === 0) {
			this.direction = 'lowers';
			const temp = this.temp1;
			this.temp1 = this.temp2;
			this.temp2 = temp;
		} else this.direction = 'rises';
	}

	public submit() {
		if (!this.temp1 || !this.temp2 || !this.mass || !this.c) return;
		const delta = this.temp2 - this.temp1;
		const energy = this.mass * this.c * delta;
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
