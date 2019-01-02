<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<transition name="fade">
		<component
			:is="currentComponent"
			:key="uniq"
			@success="success"
			@skip="skip"
		/>
	</transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Component as VueComponent } from 'vue';
import sample from 'lodash/sample';
import 'mdn-polyfills/Array.prototype.includes';
import empty from '~/components/empty.vue';
import '~/plugins/types.ts';

const units = {
	unit: [() => import('~/components/physical-science/unit-conversions.vue')],
	accel: [() => import('~/components/physical-science/accel.vue')],
	postime: [
		() => import('~/components/physical-science/position-time.1.vue'),
		() => import('~/components/physical-science/position-time.2.vue'),
	],
	veltime: [
		() => import('~/components/physical-science/velocity-time.1.vue'),
		() => import('~/components/physical-science/velocity-time.2.vue'),
	],
	freefall: [
		() => import('~/components/physical-science/freefall.1.vue'),
		() => import('~/components/physical-science/freefall.2.vue'),
	],
	projmotion: [() => import('~/components/physical-science/projmotion.vue')],
	freebody: [() => import('~/components/physical-science/freebody.vue')],
	tempchange: [() => import('~/components/physical-science/tempchange.vue')],
	phasechange: [() => import('~/components/physical-science/phasechange.vue')],
	heatcurve: [() => import('~/components/physical-science/heatcurve.vue')],
};

@Component({
	layout: 'study',
})
export default class Study extends Vue {
	public currentComponent: (() => Promise<VueComponent>) | VueComponent = empty;

	public uniq = 0;

	public success() {
		this.updateComponent();
	}

	public skip() {
		this.updateComponent();
	}

	public updateComponent() {
		this.uniq++;
		this.currentComponent = sample(this.validTopics) || empty;
	}

	public beforeMount() {
		if (this.validTopics.length === 0) { this.$router.replace('/'); }
		this.updateComponent();
	}

	get validTopics() {
		if (!this.$route.query.topics) { return []; }
		const topics: string[] =			typeof this.$route.query.topics === 'string'
			? [this.$route.query.topics]
			: this.$route.query.topics;
		const validTopics = Object.keys(units).filter(topic => topics.includes(topic));
		const components: VueComponent[] = [];
		validTopics.forEach((topic) => {
			components.push(...units[topic]);
		});
		return components;
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
