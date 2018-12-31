<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container class="container">
			<el-header>
				<h1>Select A Course</h1>
			</el-header>
			<el-main class="main">
				<el-row>
					<el-col
						v-for="course in courses"
						:key="course.url"
						:xl="24 / 4"
						:lg="24 / 4"
						:md="24 / 4"
						:sm="24 / 2"
						:xs="24"
					>
						<div class="grid-content">
							<el-button class="button" @click="$router.push(`/study/${course.url}`)">{{ course.name }}</el-button>
						</div>
					</el-col>
				</el-row>
			</el-main>
			<el-footer class="footer">
				<el-col :xl="24 / 4"
					:lg="24 / 4"
					:md="24"
					:sm="24"
					:xs="24"
					class="col"
				>
					<h3>Ben Schattinger</h3>
					<ul>
						<li>
							<a href="https://lights0123.com" target="_blank">
								<icon class="icon" name="globe" /> My Website
							</a>
						</li>
						<li>
							<a href="https://github.com/lights0123" target="_blank">
								<icon class="icon" name="brands/github" /> My GitHub
							</a>
						</li>
					</ul>
				</el-col>
				<el-col :xl="24 / 4"
					:lg="24 / 4"
					:md="24"
					:sm="24"
					:xs="24"
					class="col"
				>
					<h3>Copyright</h3>
					<ul>
						<li>
							<a href="/LICENSE.txt" target="_blank">
								<icon class="icon" name="regular/copyright" />
								Copyright 2018 Ben Schattinger under the Mozilla Public License Version 2.0.
							</a>
						</li>
						<li>
							<a href="https://github.com/lights0123/finals" target="_blank">
								<icon class="icon" name="brands/github" /> This project is open source! Fork this on GitHub
							</a>
						</li>
					</ul>
				</el-col>
				<el-col :xl="24 / 2"
					:lg="24 / 2"
					:md="24"
					:sm="24"
					:xs="24"
					class="col"
				>
					<h3>About</h3>
					<p>
						This website is designed for studying for finals for various courses - right now, it only support Physical Science.
					</p>
				</el-col>
			</el-footer>
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import 'vue-awesome/icons/globe';
import 'vue-awesome/icons/brands/github';
import 'vue-awesome/icons/regular/copyright';
import Icon from 'vue-awesome/components/Icon.vue';

@Component({
	components: {
		Icon,
	},
})
export default class Index extends Vue {
	public courses = [{ name: 'Physical Science', url: 'physical-science' }];
}
</script>

<style scoped>
.grid-content >>> button {
	width: 100%;
}

.container {
	display: flex;
	min-height: 100vh;
	flex-direction: column;
}

.body {
	flex: 1;
}

.footer h3 {
	text-align: left;
	padding-bottom: 1em;
}

.footer {
	height: auto !important;
	background-color: #f7fbfd;
	padding-bottom: 2em;
}

.footer a {
	text-decoration: none;
	color: inherit;
}

.footer li {
	list-style-type: none;
	padding-bottom: 0.2em;
	color: #333;
}

.footer ul {
	padding-left: 0;
}

.icon {
	vertical-align: middle;
}

@media only screen and (min-width: 1200px) {
	.footer .col:not(:last-child) {
		padding-right: 3em;
	}

	.footer {
		padding-left: 5em;
		padding-right: 5em;
	}
}
</style>
