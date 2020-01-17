<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/. -->

<template>
	<section class="container">
		<el-container class="container">
			<el-header>
				<h1>What did I get on the Final?</h1>
			</el-header>
			<el-main class="main">
				<el-form ref="form" :model="form" label-width="120px">
					<el-form-item label="Year To Date">
						<el-input-number v-model.number="form.ytd" />
					</el-form-item>
					<el-form-item label="Quarter 1">
						<el-input-number v-model.number="form.q1" />
					</el-form-item>
					<el-form-item label="Quarter 2">
						<el-input-number v-model.number="form.q2" />
					</el-form-item>
				</el-form>

				You got {{ final }}% on the final!

				<p v-if="diff < 0.03">
					Your final may not have been entered, or it may
					be the same as your previous YTD.
				</p>
			</el-main>
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import 'vue-awesome/icons/globe';
import 'vue-awesome/icons/brands/github';
import 'vue-awesome/icons/regular/copyright';

@Component
export default class Index extends Vue {
	form = {
		ytd: 0,
		q1: 0,
		q2: 0,
	};

	get final() {
		return this.form.ytd * 5 - this.form.q1 * 2 - this.form.q2 * 2;
	}
  
  get diff() {
  	return Math.abs(this.final - this.form.ytd);
  }
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
