<script setup>
// import {PmPushService} from "@/api/pm";
import {ref} from "vue";
// const PmList = ref([])
// const loading = ref(false)
const TableData = ref({})

</script>
<template>
<el-table    stripe border    ref="TableData"  style="width: 100%">
  <el-table-column select="selected" type="selection"/>
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="area" label="区域" width="80" align="center"></el-table-column>
      <el-table-column prop="station" width="120" label="设备" align="center"></el-table-column>
      <el-table-column prop="item" label="PM编号" width="100" align="center"></el-table-column>
  <el-table-column label="内容" prop="detail" align="center"></el-table-column>
      <el-table-column prop="frequency" width="100" label="到期寿命" align="center"></el-table-column>
      <el-table-column prop="type" width="80" label="类型" align="center"></el-table-column>
      <slot name="cols">
      </slot>

        <!-- row 就是 channelList 的一项， $index 下标 -->
      <el-table-column label="操作" width="150" align="center" >
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
