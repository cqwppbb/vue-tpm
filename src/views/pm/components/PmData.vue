<script setup>
import {PmPushService} from "@/api/pm";
import {ref,inject} from "vue";
const PmList = ref([])
const loading = ref(false)
const TableData = ref({})

const PmPush = async () => {
  loading.value = true
  const res = await PmPushService()
  PmList.value = res.data.data
  loading.value = false

}
PmPush()

const setPmFinish = inject('sefPmFinish')
const  test = () =>{
  console.log(setPmFinish)
}
</script>
<template>
<el-table   stripe border  v-loading="loading" :data="PmList" ref="TableData"  style="width: 100%">
      <el-table-column type="selection" select="selected" width="55" />
      <el-table-column type="index" label="序号"  ></el-table-column>
      <el-table-column prop="area" label="区域"></el-table-column>
      <el-table-column prop="station" label="设备"></el-table-column>
      <el-table-column prop="item" label="PM编号"></el-table-column>
      <el-table-column prop="detail" label="内容" width="600"></el-table-column>
      <el-table-column prop="frequency" label="寿命"></el-table-column>
      <el-table-column prop="alive" label="实时寿命"></el-table-column>
      <el-table-column prop="done" label="完成情况"></el-table-column>
        <!-- row 就是 channelList 的一项， $index 下标 -->
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <slot :row="scope.row" :index="scope.$index"></slot>
        </template>
        <!-- row 就是 channelList 的一项， $index 下标 -->

      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>

    </el-table>
    <el-button @click="test">test</el-button>
</template>

<style scoped lang="scss">

</style>