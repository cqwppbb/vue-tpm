<script setup>
import { ref } from 'vue'

import PmEdit from "@/views/pm/components/PmEdit.vue";
import PmData from "@/views/pm/components/PmData.vue";
// import {Delete, Edit} from "@element-plus/icons-vue";


const dialog = ref()
//
// const onPmEdit = (row) => {
//   dialog.value.open(row)
// }
// const onPmDelete = () => {
//   console.log('删除PM')
// }



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
const PmConfirm = () => {

    console.log('提交')


}
const PmDownload = () => {
  console.log('Download')
}
const PmAd = () => {
  dialog.value.open({})
  console.log('新增PM')
}



</script>

<template>
  <page-container title="PM推送">
    <template #extra>
      <el-button @click="PmDownload">导出Excel</el-button>
      <el-button type="primary" @click="PmAd">新增</el-button>
      <el-button type="primary" @click="PmConfirm">提交</el-button>
    </template>
    <el-form  inline>
      <el-form-item label="区域:">
        <el-select>
          <el-option label="CB" value="CB"></el-option>
          <el-option label="CH" value="CH"></el-option>
          <el-option label="CS" value="CS"></el-option>
          <el-option label="AS" value="AS"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备:">
        <el-select>
          <el-option label="" value=""></el-option>
          <el-option label="" value=""></el-option>
          <el-option label="" value=""></el-option>
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认</el-button>
      </el-form-item>

    </el-form>
    <PmData></PmData>
    <PmEdit ref="dialog"></PmEdit>
<!--    <template #default="{ row, $index }">-->
<!--          <el-button-->
<!--            :icon="Edit"-->
<!--            circle-->
<!--            plain-->
<!--            type="primary"-->
<!--            @click="onPmEdit(row, $index)"-->
<!--          ></el-button>-->
<!--          <el-button-->
<!--            :icon="Delete"-->
<!--            circle-->
<!--            plain-->
<!--            type="danger"-->
<!--            @click="onPmDelete(row, $index)"-->
<!--          ></el-button>-->
<!--        </template>-->
  </page-container>
</template>

<style lang="scss" scoped></style>
