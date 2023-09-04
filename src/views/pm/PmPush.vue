<script setup>
import {ref} from 'vue'
import PmEdit from '@/views/pm/components/PmEdit.vue'
import PmData from '@/views/pm/components/PmData.vue'
import {Finished} from '@element-plus/icons-vue'
import {PmConfirmService, PmPushService} from "@/api/pm";
import {exportExcel} from "../../utils/exportExcle";


const PmList = ref([])
const PmTotal = ref(0)
const loading = ref(false)
const PmTable = ref()
const dialog = ref()
const area = ref('')
const station = ref('')
const params = ref({
  pagenum: 1,
  pagesize: 5,
  id: '',
  state: '',
  area: '',
  station: '',
})
const PmPush = async () => {
  loading.value = true
  params.value.area = area.value
  params.value.station = station.value
  const res = await PmPushService(params.value)
  PmList.value = res.data.data
  PmTotal.value = res.data.total
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

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  PmPush()
}
const onCurrentChange = (size) => {
  params.value.pagenum = size
  PmPush()
  console.log('当前页页数', size)
}

const PmDownload = async () => {
  await ElMessageBox.confirm('你确认提交吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  exportExcel('PM数据.xlsx')
}


</script>

<template>
  <page-container title="PM推送">
    <template #extra>
      <el-button @click="PmDownload">导出Excel</el-button>
    </template>
    <el-form inline>
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
    <PmData id="table" ref="PmTable" v-loading="loading" :data="PmList" class="Pmdata">
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
    <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :background="true"
        :page-sizes="[5, 10, 15, 20]"
        :total="PmTotal"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px; justify-content: flex-end"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
    />
    <PmEdit ref="dialog"></PmEdit>
  </page-container>
</template>

<style lang="scss" scoped>

</style>
