<template lang="html">
  <div class="page-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="mdi mdi-home-outline"></i>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in items">
        {{item.text}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <h1 v-if="title">{{title}}</h1>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/_variables';
	.page-header {
		margin-bottom: 20px;
	}
</style>
