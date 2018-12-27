import Vue, { ComponentOptions, AsyncComponent } from 'vue';
import { Route } from 'vue-router';

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		layout?: string;
	}
}

declare module 'vue/types/vue' {
	// 3. Declare augmentation for Vue
	interface Vue {
		$route: Route;
	}
}
