<template>
	<transition name="fade">
		<component v-if="currentComponent" :is="currentComponent" @success="success" @skip="skip" :key="uniq"/>
	</transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ComponentOptions, Component as VueComponent } from 'vue';
import sampleSize from 'lodash/sampleSize';
import sample from 'lodash/sample';
import 'mdn-polyfills/Array.prototype.includes';
import { Unit } from '~/components/Unit.ts';
import unit from '~/components/physical-science/unit-conversions.vue';
import postime from '~/components/physical-science/position-time.1.vue';
import postime2 from '~/components/physical-science/position-time.2.vue';
import veltime from '~/components/physical-science/velocity-time.1.vue';
import veltime2 from '~/components/physical-science/velocity-time.2.vue';
import freebody from '~/components/physical-science/freebody.vue';
import '~/plugins/types.ts';

const units = {
	unitconv: [unit],
	postime: [postime, postime2],
	veltime: [veltime, veltime2],
	freebody: [freebody],
};

@Component({
	layout: 'study',
})
export default class Study extends Vue {
	public currentComponent?: VueComponent;
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
		if (this.validTopics.length === 0) {this.$router.replace('/'); }
		this.updateComponent();
	}

	get validTopics() {
		if (!this.$route.query.topics) { return []; }
		const topics: string[] =
			typeof this.$route.query.topics === 'string'
				? [this.$route.query.topics]
				: this.$route.query.topics;
		const validTopics = Object.keys(units).filter((topic) =>
			topics.includes(topic),
		);
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
