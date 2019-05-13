<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<transition name="fade" mode="out-in">
		<span v-if="correct" key="correct" class="correct">
			<i class="el-icon-check" /> Correct!
		</span>
		<span v-else-if="incorrect" key="incorrect" class="incorrect">
			<i class="el-icon-close" /> Incorrect
		</span>
	</transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AnswerCorrect extends Vue {
	@Prop(Boolean)
	public correct!: boolean;

	@Prop(Boolean)
	public incorrect!: boolean;
}
</script>

<style scoped>
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
