<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>Physical Science - Chemistry</h1>
			</el-header>
			<el-main>
				<el-button-group>
					<el-button type="primary" @click="select(true)">Select All</el-button>
					<el-button type="primary" @click="select(false)">Select None</el-button>
				</el-button-group>
				<br>
				<br>
				<el-row class="row" type="flex">
					<el-col
						v-for="unit in implUnits"
						:key="unit.num"
						:xl="24 / 3"
						:lg="24 / 3"
						:md="24 / 3"
						:sm="24 / 2"
						:xs="24"
						class="column"
					>
						<div class="grid-content">
							<el-card class="box-card">
								<div slot="header" class="card-header clearfix">
									<el-checkbox
										:indeterminate="unit.enabledTopics.length > 0 && unit.enabledTopics.length !== unit.topics.length"
										:value="unit.enabledTopics.length === unit.topics.length"
										class="checkbox"
										@change="checked => checked ? unit.enabledTopics = unit.topics.map((topic) => topic.id)
											: unit.enabledTopics = []"
									>
										Unit {{ unit.num }} - {{ unit.name }}
									</el-checkbox>
								</div>
								<el-checkbox-group v-model="unit.enabledTopics">
									<div v-for="topic in unit.topics" :key="topic.id" class="text item">
										<el-checkbox :label="topic.id" class="checkbox">{{ topic.name }}</el-checkbox>
									</div>
								</el-checkbox-group>
							</el-card>
						</div>
					</el-col>
				</el-row>
				<el-button
					type="primary"
					class="alignright"
					:disabled="selectedTopics.length === 0"
					@click="$router.push({ path: '/study', query: {topics: selectedTopics } })"
				>
					{{ selectedTopics.length === 0 ? `Select a topic first` : `Let's Go` }}
				</el-button>
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { Unit } from '~/components/Unit.ts';

@Component({
	layout: 'study',
})
export default class Physci extends Vue {
	public units: Unit[] = [
		{
			num: 8,
			name: 'Atomic Structure & Theory',
			topics: [
				// { name: 'Electron Energy Levels', id: 'eleclevels' },
				// { name: 'Photon Frequencies', id: 'photonfreq' },
				// { name: 'Electron Configuration', id: 'elecconfig' },
				// { name: 'Atomic Structure', id: 'atomstruct' },
			],
			enabledTopics: [],
		},
		{
			num: 9,
			name: 'Classification of Matter & Periodic Trends',
			topics: [
				// { name: 'Identifying Compounds', id: 'compoundident' },
				// { name: 'Periodic Trends', id: 'periodtrends' },
				// { name: 'Lewis Dot Structures', id: 'lewisstruct' },
			],
			enabledTopics: [],
		},
		{
			num: 10,
			name: 'Chemical Bonding',
			topics: [
				// { name: 'Naming Ionic Compounds', id: 'ionicnaming' },
				// { name: 'Naming Molecular Compounds', id: 'molecularnaming' },
			],
			enabledTopics: [],
		},
	];

	public get implUnits() {
		return this.units.filter(unit => unit.topics.length > 0);
	}

	public select(state: boolean) {
		this.units.forEach((unit) => {
			if (state) {
				unit.enabledTopics = unit.topics.map(topic => topic.id);
			} else {
				unit.enabledTopics = [];
			}
		});
	}

	public get selectedTopics() {
		const enabledTopics: string[] = [];
		this.units.forEach((unit) => {
			enabledTopics.push(...unit.enabledTopics);
		});
		return enabledTopics;
	}
}
</script>

<style scoped>
.card-header >>> span:last-child {
	white-space: normal;
	vertical-align: top;
	font-size: 16px;
	color: #303133;
	font-weight: 400;
	line-height: 23px;
}

.column {
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 10px;
}

.row {
	flex-wrap: wrap;
}

.alignright {
	float: right;
}

.text.item >>> label {
	word-break: break-all;
}

.text.item >>> span:last-child {
	white-space: normal;
	vertical-align: top;
}

.checkbox {
	width: 100%;
}
</style>
