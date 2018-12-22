<template>
  <section class="container">
    <el-container>
      <el-header>
        <h1>Physical Science</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col v-for="course in courses" :key="course.url" :span="24 / 4">
            <div class="grid-content"><el-button>{{course.name}}</el-button></div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Physci extends Vue {}
</script>