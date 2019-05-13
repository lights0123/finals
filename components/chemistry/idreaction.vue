<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-main class="main">
				<span>Identify the type of the following equation:</span>
				<br>
				<br>
				<span class="eq-in">
					<span v-for="part in equation.input" :key="part.molecule" class="eq-part">
						{{ part.molecule }}
					</span>
				</span>
				<span class="eq-out">
					<span v-for="part in equation.out" :key="part.molecule" class="eq-part">
						{{ part.molecule }}
					</span>
				</span>
				<br>
				<br>
				<el-form @submit.native.prevent="submit">
					<el-radio-group v-model="input" class="radio">
						<span v-for="name in eqTypes" :key="name">
							<el-radio class="radioItem" :label="name">{{ name }}</el-radio>
							<br>
						</span>
					</el-radio-group>
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
				<a
					href="https://sites.google.com/shaker.org/perryscience/honors-units/unit-11-chemical-reactions"
					target="_blank"
				>
					<el-button size="small" type="text">Help</el-button>
				</a>
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
import {
	Component, Vue, Emit, Watch,
} from 'vue-property-decorator';
import { Significant } from '~/components/Math';
import random from 'lodash/random';
import sample from 'lodash/sample';
import answerCorrect from '~/components/answer-correct.vue';
import numberInput from '~/components/number_input.vue';
import gcd from 'compute-gcd';
import { equations, EquationType } from '~/components/chemistry/equations.ts';
const mappedEquations = equations.map(({ input, out, type }) => {
	const m = ({ required, molecule }) => {
		for (let i = 0; i < 10; i++) {
			molecule = molecule.replace(new RegExp(`${i}`, 'g'), '₀₁₂₃₄₅₆₇₈₉'.charAt(i));
		}
		return { required, molecule };
	};
	return { input: input.map(m), out: out.map(m), type };
});
@Component({
	components: {
		answerCorrect,
		numberInput,
	},
})
export default class BalanceEq extends Vue {
	public input: string | null = null;

	public correct = false;
	public incorrect = false;

	public eqTypes = EquationType;

	public submit() {
		try {
			if (this.input === this.equation.type) {
				this.correct = true;
				this.incorrect = false;
				setTimeout(() => this.success(), 1000);
			} else {
				this.correct = false;
				this.incorrect = true;
			}
		} catch (e) {
			console.error(e);
		}
	}

	public get equation() {
		return sample(mappedEquations) || mappedEquations[0];
	}

	@Watch('equation', { deep: true })
	public clear() {
		this.correct = false;
		this.incorrect = false;
	}

	@Emit()
	public success() {
	/* */
	}
}
</script>

<style scoped>
.main {
	text-align: center;
}
@media (min-width: 520px) {
	.eq-part {
		white-space: nowrap;
	}
}
.eq-part:not(:last-child)::after {
	padding-left: 1em;
	padding-right: 1em;
	color: rgb(112, 112, 112);
	font-size: 1.1em;
	content: "+"
}
.eq-in::after {
	padding-left: 1em;
	padding-right: 1em;
	color: rgb(112, 112, 112);
	font-size: 1.2em;
	content: "→"
}
.radio {
	text-align: left;
	margin-bottom: 20px;
}

.radio .radioItem:not(:last-child) {
	margin-bottom: 5px;
}
</style>
