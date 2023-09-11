<script setup>
import {ref} from 'vue'
import PmEdit from '@/views/pm/components/PmEdit.vue'
import {PmFinishRecordService} from '../../api/pm'
import {exportExcel} from "../../utils/exportExcle";

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
const OnAreaChange =() =>{
  GetPmFinishRecord()
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
const machine = ref('')
const machine_options = ref([])
const OnMachineChange = () =>{
  GetPmFinishRecord()
}
const station = ref('')
const params = ref({
  page: 1,
  size: 10,
})
const DownloadData = ref([])
const GetPmFinishRecord = async () => {
  loading.value = true
  params.value.area = area.value
  params.value.machine = machine.value
  params.value.station = station.value
  const res = await PmFinishRecordService(params.value)
  PmList.value = res.data.results
  PmTotal.value = res.data.count
  loading.value = false
}
GetPmFinishRecord()

const formConfirm = async () => {
  GetPmFinishRecord()
}

const onSizeChange = (size) => {
  params.value.page = 1
  params.value.size = size
  GetPmFinishRecord()
}
const onCurrentChange = (size) => {
  params.value.page = size
  GetPmFinishRecord()
  console.log('当前页页数', size)
}
const PmDownload = async () => {
  await ElMessageBox.confirm('你确认下载吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  exportExcel(DownloadData, 'PM数据.xlsx')
}
const handleSelectionChange = (val) => {
  DownloadData.value = val
}

</script>

<template>
  <page-container title="PM完成记录">
    <template #extra>
      <el-button @click="PmDownload">导出Excel</el-button>
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
    <el-table
        @selection-change="handleSelectionChange"
        id="table" ref="PmTable"
        v-loading="loading"
        :data="PmList"
        class="Pmdata"
        stripe
        border
        style="width: 100%">
      <el-table-column select="selected" type="selection"/>
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="area" label="区域" width="80" align="center"></el-table-column>
      <el-table-column prop="station" width="120" label="设备" align="center"></el-table-column>
      <el-table-column prop="item" label="PM编号" width="100" align="center"></el-table-column>
      <el-table-column prop="detail" label="内容"  align="center"></el-table-column>
      <el-table-column prop="frequency" label="频次"  width="80"  align="center"></el-table-column>
      <el-table-column prop="type" width="80" label="类型" align="center"></el-table-column>
      <el-table-column prop="life" width="80" label="寿命" align="center"></el-table-column>
      <el-table-column prop="user" width="80" label="人员" align="center"></el-table-column>
      <el-table-column prop="ctime" width="80" label="时间" align="center"></el-table-column>


  <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>

    </el-table>
    <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.size"
        :background="true"
        :page-sizes="[10, 15, 20, 25,50,PmTotal]"
        :total="PmTotal"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px;
        justify-content: flex-end"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
    />
    <PmEdit ref="dialog"></PmEdit>
  </page-container>
</template>

<style lang="scss" scoped>

</style>
