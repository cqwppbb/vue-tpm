<script setup>
import { ref } from 'vue';
const test = ref();
console.log(test);
// import { pmGetpushService } from '../../api/pm';
// const pmpush = ref([]);

// const getPmpush = async () => {
// 	const res = await pmGetpushService();
// 	pmpush.value = res.data.data;
// };
// getPmpush();
</script>

<template>
	<PageContainer title="PM推送">
		<template #extra>
			<el-button v-model="test">测试按钮</el-button>
		</template>
		<!-- <el-table :data="pmpush" style="width: 100%">
			<el-table-colum label="序号"></el-table-colum>
			<el-table-colum label="内容"></el-table-colum>
			<el-table-colum label="周期"></el-table-colum>
			<el-table-colum label="操作"></el-table-colum>
		</el-table> -->
	</PageContainer>
</template>

<style lang="scss" scoped></style>
