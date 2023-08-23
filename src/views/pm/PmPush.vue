<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { GetPmPushService, PmConfirmService } from '../../api/pm'
const pmlist = ref([])
const loading = ref(false)
const dialog = ref()

const GetPmPush = async () => {
  loading.value = true
  const res = await GetPmPushService()
  pmlist.value = res.data.data
  loading.value = false
  console.log(res)
}
GetPmPush()

const PmConfirm = async (row) => {
  await ElMessageBox.confirm('你确认提交吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await PmConfirmService(row.id)
  ElMessage.success('提交成功')
  GetPmPush()
}
//                         预留2个按键
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}

</script>

<template>
  <page-container title="推送PM作业">
    <template #extra>
      <el-button @click="onAddChannel">导出Excel</el-button>
    </template>

    <el-table v-loading="loading" :data="pmlist" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="area" label="区域"></el-table-column>
      <el-table-column prop="op" label="设备"></el-table-column>
      <el-table-column prop="pmcode" label="PM编号"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="frequence" label="寿命"></el-table-column>
      <el-table-column prop="alive" label="实时寿命"></el-table-column>
      <el-table-column prop="done" label="完成情况"></el-table-column>
        <!-- row 就是 channelList 的一项， $index 下标 -->
      <el-table-column label="操作" width="150">
        <!-- row 就是 channelList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="PmConfirm(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

  </page-container>
</template>

<style lang="scss" scoped></style>
