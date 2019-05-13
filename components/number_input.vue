<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<div class="minusplusnumber">
		<div class="mpbtn minus" :class="{disabled: shownValue === min}" @click="minus">-</div>
		<div>
			<input v-model.lazy="shownValue"
				type="number"
				:min="min"
				:max="max"
			>
		</div>
		<div class="mpbtn plus" :class="{disabled: shownValue === max}" @click="plus">+</div>
	</div>
</template>

<script lang="ts">
import {
	Component, Vue, Prop, Emit, Watch,
} from 'vue-property-decorator';

@Component
export default class NumberInput extends Vue {
	@Prop(Number)
	public max!: number;

	@Prop(Number)
	public min!: number;

	@Prop(Number)
	public value!: number;

	public shownValue = 1;

	@Emit()
	public input(value: number) { }

	@Watch('shownValue')
	public onShownValue(value: number) {
		value = Math.round(value);
		value = Math.min(value, this.max);
		value = Math.max(value, this.min);
		this.input(value);
		this.shownValue = value;
	}

	@Watch('value', { immediate: true })
	public onValue(value: number) {
		this.shownValue = value;
	}

	public minus() {
		this.shownValue--;
	}

	public plus() {
		this.shownValue++;
	}
}
</script>

<style lang="scss" scoped>
.disabled {
	color: #8f8f8f;
}
.minusplusnumber {
	border: 1px solid silver;
	border-radius: 5px;
	background-color: #fff;
	display: inline-block;
	user-select: none;
}
.minusplusnumber div {
	display: inline-block;
}
.minusplusnumber input {
	width: 20px;
	text-align: center;
	font-size: 15px;
	padding: 3px;
	border: none;
	-moz-appearance: textfield;
	&[type=number]::-webkit-inner-spin-button,
	&[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}
.minusplusnumber .mpbtn {
	padding: 3px 10px 3px 10px;
	cursor: pointer;
	border-radius: 5px;
	&.disabled {
		cursor: default;
	}
}
.minusplusnumber .mpbtn:hover {
	background-color: #ddd;
	&.disabled {
		background-color: rgb(224, 224, 224);
	}
}
.minusplusnumber .mpbtn:not(.disabled):active {
	background-color: #c5c5c5;
}
</style>
