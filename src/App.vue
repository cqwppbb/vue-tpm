<script setup>
// import {useRoute, userRouter} from 'vue-router'
// const router = useRouter()
// const route = useRoute()
// const golist = () => console.log(router,route)

</script>

<template>
	<div>
		<hr />
		<router-view></router-view>
		<hr />
		<hr />
		我是APP
		<!-- <el-button @click="$router.push('/home')">跳首页</el-button>
		<el-button @click="golist">跳首页</el-button> -->
	</div>
</template>

<style scoped></style>
