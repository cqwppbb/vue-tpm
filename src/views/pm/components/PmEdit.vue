<script setup>
import { ref } from 'vue'
import { PmEditService, PmDeleteService } from '../../../api/pm.js'

const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  item: '',
  frequency: ''
})
const rules = {
  item: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  frequency: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是 1-15 位的字母或数字',
      trigger: 'blur'
    }
  ]
}

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  console.log(formModel)
  if (isEdit) {
    await PmEditService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await PmDeleteService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

// 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
// open({})  => 表单无需渲染，说明是添加
// open({ id, cate_name, ... })  => 表单需要渲染，说明是编辑
// open调用后，可以打开弹窗
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  console.log(formModel.value)
}

// 向外暴露方法
defineExpose({
  open
})

</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.area ? '修改PM' : '新增PM'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="区域" prop="area">
        <el-input
          v-model="formModel.area"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="设备" prop="station">
        <el-input
          v-model="formModel.station"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="PM编号" prop="item">
        <el-input
          v-model="formModel.item"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="detail">
        <el-input
            type="textarea"
            :rows="3"
          v-model="formModel.detail"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="寿命" prop="frequency">
        <el-input
          v-model="formModel.frequency"
          placeholder=""
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
