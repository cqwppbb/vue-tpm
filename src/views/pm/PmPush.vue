<script setup>
import {ref} from 'vue'
import PmEdit from '@/views/pm/components/PmEdit.vue'
import PmData from '@/views/pm/components/PmData.vue'
import {Finished} from '@element-plus/icons-vue'
import {PmDataService, PmFininshRecordCreateService, PmPushService, PmPushUpdateService} from '../../api/pm'
import {exportExcel} from "../../utils/exportExcle";
import {currentTime} from "../../utils/CurrentTime";
import {useUserStore} from '@/stores';

// ----------------------------------------------变量-------------------------------------------------
const userStore = useUserStore();
const PmList = ref([])
const PmTotal = ref(0)
const loading = ref(false)
const PmTable = ref()
const dialog = ref()
const area = ref('')
const area_options =ref([
    {id:1,label:'CH'},
    {id:2,label:'CB'},
    {id:3,label:'CS'},
    {id:4,label:'AS'},
])
const machine = ref('')
const machine_options = ref([])
const station = ref('')
const params = ref({
  page: 1,
  size: 10,
  push: 1,
})

//----------------------------------------------Request请求-------------------------------------------------
const GetPmPush = async () => {
  loading.value = true
  params.value.area = area.value
  params.value.machine = machine.value
  params.value.station = station.value

  const res = await PmPushService(params.value)
  PmList.value = res.data.results
  PmTotal.value = res.data.count
  loading.value = false
}
GetPmPush()

//----------------------------------------------按钮-------------------------------------------------
const OnAreaChange =() =>{
  GetPmPush()
  if (area.value =='CH'){
    machine_options.value =[
        {id:1,label:'加工中心',    value:'ch_cnc'},
        {id:2,label:'中间清洗机',  value:'ch_fine'},
        {id:3,label:'最终清洗机',  value:'ch_abb'},
        {id:4,label:'中间试漏机',  value:'ch_mid_leak'},
        {id:5,label:'最终试漏机',  value:'ch_final_leak'},
        {id:6,label:'压装机',     value:'ch_jwf'},
        {id:7,label:'拧紧机',     value:'ch_nut'},
        {id:8,label:'海门',       value:'ch_hm'},
        {id:9,label:'上下料机器人',value:'ch_load'},
        {id:10,label:'打标机',     value:'ch_marking'},
        {id:11,label:'辊道',       value:'ch_conv'},
    ]
  }else if(area.value == 'CB'){
    machine_options.value =[
        {id:1,label:'加工中心',    value:'cb_cnc'},
        {id:2,label:'中间清洗机',  value:'cb_fine'},
        {id:3,label:'最终清洗机',  value:'cb_abb'},
        {id:4,label:'中间试漏机',  value:'cb_mid_leak'},
        {id:5,label:'最终试漏机',  value:'cb_final_leak'},
        {id:6,label:'珩磨机',     value:'cb_fuji'},
        {id:7,label:'拧紧机',     value:'cb_nut'},
        {id:8,label:'海门',       value:'cb_hm'},
        {id:9,label:'上下料机器人',value:'cb_load'},
        {id:10,label:'打标机',     value:'cb_marking'},
        {id:11,label:'辊道',       value:'cb_conv'},
        {id:12,label:'吊具',       value:'cb_dj'},
    ]
  }else if(area.value =='CS'){
    machine_options.value =[
        {id:1,label:'预留',    value:'cb_cnc'},
    ]
  }else if(area.value =='AS'){
    machine_options.value =[
        {id:1,label:'预留',    value:'cb_cnc'},
    ]
  }
}
const OnMachineChange = () =>{
  GetPmPush()
}
const DownloadData = ref([])
const onPmFinish = async (data) => {
  data.index
  const dataPush = data.row
  dataPush.push = 0
  dataPush.done = 0
  dataPush.val_last = data.row.val_current
  dataPush.time_last = currentTime()
  await PmPushUpdateService(dataPush)
  const dataRecord = data.row
  const user = userStore.user;
  dataRecord.user = user
  await PmFininshRecordCreateService(data.row)
  GetPmPush()
}

const formConfirm = async () => {
  GetPmPush()
}
const onSizeChange = (size) => {
  params.value.page = 1
  params.value.size = size
  GetPmPush()
}
const onCurrentChange = (size) => {
  params.value.page = size
  GetPmPush()
  console.log('当前页页数', size)
}
const PmDownload = async () => {
  await ElMessageBox.confirm('你确认下载吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  exportExcel(DownloadData,'PM数据.xlsx')
}
const UpdateData = async () => {
  await ElMessageBox.confirm('你确认更新吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await PmDataService()
  ElMessage({
    message: '数据更新完成！',
    type: 'success',
  })
}
const handleSelectionChange =(val) => {
  DownloadData.value = val
}
</script>

<template>
  <page-container title="PM推送">
    <template #extra>
      <el-button @click="PmDownload">导出Excel</el-button>
      <el-button @click="UpdateData">更新数据</el-button>
    </template>
    <el-form inline>
      <el-form-item label="区域:">
        <el-select @change="OnAreaChange" v-model="area">
          <el-option
          v-for = 'item in area_options'
          :key = 'item.id'
          :label = 'item.label'
          :value = 'item.label'
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="设备:">
        <el-select @change="OnMachineChange" v-model="machine">
          <el-option
          v-for = 'item in machine_options'
          :key = 'item.id'
          :label = 'item.label'
          :value = 'item.value'
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工位:">
        <el-input v-model="station" placeholder="输入设备OP">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="formConfirm" type="primary">确认</el-button>
      </el-form-item>
    </el-form>
    <PmData @selection-change="handleSelectionChange" id="table" ref="PmTable" v-loading="loading" :data="PmList" class="Pmdata">
      <template #cols>
        <el-table-column prop="life" width="100" label="寿命"></el-table-column>
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
        v-model:current-page="params.page"
        v-model:page-size="params.size"
        :background="true"
        :page-sizes="[10, 15, 20, 25,50,PmTotal]"
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
