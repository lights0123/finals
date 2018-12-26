<template>
<transition name="fade">
	<component :is="currentComponent" @success="success" :key="uniq"/>
</transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ComponentOptions } from 'vue';
import { Unit } from '~/components/Unit.ts';
import unit from '~/components/physical-science/unit-conversions.1.vue';
import '~/plugins/types.ts';

@Component({
	components: {
		unit,
	},
	layout: 'study',
})
export default class Study extends Vue {
	public currentComponent = 'unit';
	public uniq = 0;

	public success() {
		console.log('success');
		this.uniq++;
	}
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
