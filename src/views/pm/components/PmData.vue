<script setup>
// import {PmPushService} from "@/api/pm";
import {ref} from "vue";
// const PmList = ref([])
// const loading = ref(false)
const TableData = ref({})


// const PmPush = async () => {
//   loading.value = true
//   const res = await PmPushService()
//   PmList.value = res.data.data
//   loading.value = false
// }
// PmPush()

</script>
<template>
<el-table   stripe border    ref="TableData"  style="width: 100%">
  <el-table-column select="selected" type="selection"/>
      <el-table-column type="index" label="序号"  ></el-table-column>
      <el-table-column prop="area" label="区域"></el-table-column>
      <el-table-column prop="station" width="120" label="设备"></el-table-column>
      <el-table-column prop="item" label="PM编号"></el-table-column>
  <el-table-column label="内容" prop="detail" width="300"></el-table-column>
      <el-table-column prop="frequency" label="频次"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <slot name="cols">
<!--        <el-table-column prop="val_last" label="上次寿命"></el-table-column>-->
<!--        <el-table-column prop="val_current" label="实时寿命"></el-table-column>-->
<!--        <el-table-column prop="time_last" label="上次时间"></el-table-column>-->
<!--        <el-table-column prop="time_last" label="当前时间"></el-table-column>-->
<!--        <el-table-column prop="life" label="实际寿命"></el-table-column>-->
<!--        <el-table-column prop="push" label="推送"></el-table-column>-->
<!--        <el-table-column prop="done" label="完成情况"></el-table-column>-->
      </slot>

        <!-- row 就是 channelList 的一项， $index 下标 -->
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <slot name="operate" :row="scope.row" :index="scope.$index"></slot>
        </template>
        <!-- row 就是 channelList 的一项， $index 下标 -->

      </el-table-column>

  <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>

    </el-table>


</template>

<style scoped lang="scss">

</style>