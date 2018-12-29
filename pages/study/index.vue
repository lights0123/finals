<template>
	<transition name="fade">
		<component
			:is="currentComponent"
			v-if="currentComponent"
			:key="uniq"
			@success="success"
			@skip="skip"
		/>
	</transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { Component as VueComponent } from 'vue';
import sample from 'lodash/sample';
import 'mdn-polyfills/Array.prototype.includes';
import unit from '~/components/physical-science/unit-conversions.vue';
import postime from '~/components/physical-science/position-time.1.vue';
import postime2 from '~/components/physical-science/position-time.2.vue';
import veltime from '~/components/physical-science/velocity-time.1.vue';
import veltime2 from '~/components/physical-science/velocity-time.2.vue';
import freebody from '~/components/physical-science/freebody.vue';
import parallel from '~/components/physical-science/parallel.1.vue';
import '~/plugins/types.ts';

const units = {
	unitconv: [unit],
	postime: [postime, postime2],
	veltime: [veltime, veltime2],
	freebody: [freebody],
	parallel: [parallel],
};

@Component({
	layout: 'study',
})
export default class Study extends Vue {
	public currentComponent: VueComponent | null = null;

	public uniq = 0;

	public success() {
		this.updateComponent();
	}

	public skip() {
		this.updateComponent();
	}

	public updateComponent() {
		this.uniq++;
		this.currentComponent = sample(this.validTopics);
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
