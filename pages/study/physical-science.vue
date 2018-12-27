<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>Physical Science</h1>
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
						v-for="unit in units"
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
										@change="checked => checked ? unit.enabledTopics = unit.topics.map((topic) => topic.id) : unit.enabledTopics = []"
									>Unit {{unit.num}} - {{unit.name}}</el-checkbox>
								</div>
								<el-checkbox-group v-model="unit.enabledTopics">
									<div v-for="topic in unit.topics" :key="topic.id" class="text item">
										<el-checkbox :label="topic.id">{{ topic.name }}</el-checkbox>
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
				>{{selectedTopics.length === 0 ? `Select a topic first` : `Let's Go`}}</el-button>
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Unit } from '~/components/Unit.ts';

@Component({
	layout: 'study',
})
export default class Physci extends Vue {
	public units: Unit[] = [
		{
			num: 1,
			name: 'Introduction to Measurement and Nature of Science',
			topics: [
				{ name: 'Unit Conversions & Sig Figs', id: 'unitconv' },
			],
			enabledTopics: [],
		},
		{
			num: 2,
			name: 'Kinematics',
			topics: [
				{ name: 'Distance, Time, & Velocity', id: 'disttimevel' },	// TODO
				{ name: 'Acceleration', id: 'accel' },						// TODO
				{ name: 'Position-Time Graphs', id: 'postime' },
				{ name: 'Velocity-Time Graphs', id: 'veltime' },
				{ name: 'Freefall', id: 'freefall' },						// TODO
				{ name: 'Projectile Motion', id: 'projmotion' },			// TODO
			],
			enabledTopics: [],
		},
		{
			num: 3,
			name: 'Forces In Motion',
			topics: [
				{ name: 'Free Body Diagrams', id: 'freebody' },
				{ name: 'Momentum', id: 'momentum' },						// TODO
				{ name: 'Impulse', id: 'impulse' },							// TODO
				{ name: 'Law of Gravitation', id: 'grav' },					// TODO
			],
			enabledTopics: [],
		},
		{
			num: 4,
			name: 'Work, Power, and Conservation of Energy',
			topics: [
				{ name: 'Kinetic Energy', id: 'kinetic' },					// TODO
				{ name: 'Potential Energy', id: 'potential' },				// TODO
				{ name: 'Work', id: 'work' },								// TODO
				{ name: 'Power', id: 'power' },								// TODO
			],
			enabledTopics: [],
		},
		{
			num: 5,
			name: 'Electricity',
			topics: [
				{ name: `Ohm's Law`, id: 'ohmlaw' },						// TODO
				{ name: 'Parallel Circuits', id: 'parallel' },				// TODO
				{ name: 'Series Circuits', id: 'series' },					// TODO
			],
			enabledTopics: [],
		},
		{
			num: 6,
			name: 'Thermal Energy',
			topics: [
				{ name: 'Temperature Change (Q=mcΔT)', id: 'tempchange' },	// TODO
				{ name: 'Phase Change (Q=mL)', id: 'phasechange' },			// TODO
			],
			enabledTopics: [],
		},
		// {
		// 	num: 7,
		// 	name: 'Waves, EMS, and Astronomy',
		// 	topics: ['Temperature Change (Q=mcΔT)', 'Phase Change (Q=mL)'],
		// 	enabledTopics: [],
		// },
	];
	public select(state: boolean) {
		this.units.forEach((unit) => {
			if (state) {
				unit.enabledTopics = unit.topics.map((topic) => topic.id);
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
</style>
