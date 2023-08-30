<script setup>
import { ref,provide } from 'vue'
import PmEdit from "@/views/pm/components/PmEdit.vue";
import PmData from "@/views/pm/components/PmData.vue";
import {Finished} from "@element-plus/icons-vue";


const dialog = ref()


const onPmFinish = (data) => {
   data.index
  console.log(data.index)
  // console.log(index)
  console.log('完成PM')
}

provide('sefPmFinish', onPmFinish)


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
    <PmData>
      <template #default='data'>
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
