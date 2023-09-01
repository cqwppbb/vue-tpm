<script setup>
import { ref } from 'vue'
import PmEdit from '@/views/pm/components/PmEdit.vue'
import PmData from '@/views/pm/components/PmData.vue'
import { Finished } from '@element-plus/icons-vue'
import { PmConfirmService} from "@/api/pm";
import {PmPushService} from "@/api/pm";
const PmList = ref([])
const loading = ref(false)

const dialog = ref()
const area = ref('')
const station = ref('')

const PmPush = async () => {
  loading.value = true
  const  data ={
    area: area.value,
    station: station.value
  }
  const res = await PmPushService(data)
  PmList.value = res.data.data
  loading.value = false
}
PmPush()
const onPmFinish = async (data) => {
  data.index
  await PmConfirmService(data.row)

  PmPush()
}

const formConfirm = async () => {
  PmPush()
}

// const PmConfirm = async (res) => {
//   console.log(res)
//   await ElMessageBox.confirm('你确认提交吗？', '温馨提示', {
//     type: 'warning',
//     confirmButtonText: '确认',
//     cancelButtonText: '取消'
//   })
//   await PmConfirmService(res.id)
//   ElMessage.success('提交成功')
//   PmPush()
// }

const PmDownload = () => {
  console.log('Download')
}
</script>

<template>
  <page-container title="PM推送">
    <template #extra>
      <el-button @click="PmDownload">导出Excel</el-button>
    </template>
    <el-form  inline>
      <el-form-item label="区域:">
        <el-select v-model="area">
          <el-option label="CB" value="block"></el-option>
          <el-option label="CH" value="head"></el-option>
          <el-option label="CS" value="crank"></el-option>
          <el-option label="AS" value="as"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备:">
        <el-input v-model="station" placeholder="输入设备OP">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="formConfirm" type="primary">确认</el-button>
      </el-form-item>
    </el-form>
    <PmData :data="PmList" v-loading="loading">
      <template #cols>
        <el-table-column prop="life" label="实际寿命"></el-table-column>
      </template>
      <template  #operate="data">
        <el-button
          :icon="Finished"
          circle
          plain
          type="primary"
          @click="onPmFinish(data)"
        ></el-button>
      </template>
    </PmData>
    <PmEdit ref="dialog"></PmEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
