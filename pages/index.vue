<template>
	<section class="container">
		<el-container>
			<el-header>
				<h1>Select A Course</h1>
			</el-header>
			<el-main>
				<el-row>
					<el-col v-for="course in courses"
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
		</el-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
	public courses = [{ name: 'Physical Science', url: 'physical-science' }];
}
</script>

<style scoped>
.grid-content >>> button {
		width: 100%;
}
</style>
