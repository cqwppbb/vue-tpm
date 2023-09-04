<script setup>
import {ref} from 'vue'
import PmEdit from "@/views/pm/components/PmEdit.vue";
import PmData from "@/views/pm/components/PmData.vue";
import {Delete, Edit} from "@element-plus/icons-vue";


const dialog = ref()


const PmDownload = () => {
  console.log('Download')
}
const PmAdd = () => {
  dialog.value.open({})
  console.log('新增PM')
}
const onPmEdit = (obj) => {
  console.log(obj)
  dialog.value.open(obj.row)
}
const onPmDelete = (obj) => {
  console.log(obj)
  console.log('删除PM')
}


</script>

<template>
  <page-container title="PM推送">
    <template #extra>
      <el-button @click="PmDownload">导出Excel</el-button>
      <el-button type="primary" @click="PmAdd">新增</el-button>
    </template>
    <el-form inline>
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
      <template #default="obj">
        <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onPmEdit(obj)"
        ></el-button>
        <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onPmDelete(obj)"
        ></el-button>
      </template>
    </PmData>
    <PmEdit ref="dialog"></PmEdit>

  </page-container>
</template>

<style lang="scss" scoped></style>
