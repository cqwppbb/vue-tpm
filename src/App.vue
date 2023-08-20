<script setup>
// import {useRoute, userRouter} from 'vue-router'
// const router = useRouter()
// const route = useRoute()
// const golist = () => console.log(router,route)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<template>
	<div>
		<el-config-provider :locale="zhCn">
			<router-view></router-view>
		</el-config-provider>
	</div>
</template>

<style scoped></style>
