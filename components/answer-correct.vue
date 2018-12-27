<template>
	<transition name="fade" mode="out-in">
		<span class="correct" v-if="correct" key="correct">
			<i class="el-icon-check"/> Correct!
		</span>
		<span class="incorrect" v-else-if="incorrect" key="incorrect">
			<i class="el-icon-close"/> Incorrect
		</span>
	</transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AnswerCorrect extends Vue {
	@Prop(Boolean)
	public correct: boolean;

	@Prop(Boolean)
	public incorrect: boolean;
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
