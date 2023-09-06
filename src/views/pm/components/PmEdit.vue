<script setup>
import {ref} from 'vue'
import {PmAddService, PmEditService} from '../../../api/pm.js'

const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  item: '',
  frequency: ''
})
const rules = {
  item: [
    {required: true, message: '请输入PM标签', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是 1-10 位的英文字母',
      trigger: 'blur'
    }
  ],

  detail: [
    {required: true, message: '请输入PM内容', trigger: 'blur'},
    {
      // pattern: /^\S{1,10}$/,
      message: 'PM内容必须是非空字符',
      trigger: 'blur'
    }
  ],
  frequency: [
    {required: true, message: '请输入频次', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '频次必须是数字',
      trigger: 'blur'
    }
  ],
  type: [
    {required: true, message: '请输入测点类型F/T', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '频次必须是数字',
      trigger: 'blur'
    }
  ]
}

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.msg
  if (isEdit=='edit') {
    await PmEditService(formModel.value)
    ElMessage.success('修改成功')
  } else if (isEdit == 'add') {
    const res = await PmAddService(formModel.value)
    const msg = res.data.status
    if (msg == 0){
      ElMessage.success('添加成功')
    }else if (msg == 1){
      ElMessage.error('添加失败，PM编号不能重复！')
    }

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
  if (row.msg=='edit') {
    formModel.value = {...row} // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  } else if (row.msg == 'add') {
    row.item ='';
    row.detail = '';
    row.frequency = ''
    formModel.value = {...row}
  }

}

// 向外暴露方法
defineExpose({
  open
})

</script>

<template>
  <el-drawer
      v-model="dialogVisible"
      :title="formModel.msg=='edit' ? '修改PM' : '新增PM'"
      width="30%"
  >
    <el-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        label-width="100px"
        style="padding-right: 30px"
    >
      <el-form-item label="区域"  prop="area">
        <el-input
            disabled
            v-model="formModel.area"
            placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="设备" disabled="disabled"  prop="machine">
        <el-input
            disabled
            v-model="formModel.machine"
            placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="工位"  prop="station">
        <el-input
            disabled
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
      <el-form-item label="寿命" prop="frequency">
        <el-input
            v-model="formModel.frequency"
            placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="测点类型" prop="type">
        <el-radio-group v-model="formModel.type" class="ml-4">
      <el-radio label="F">计数型</el-radio>
      <el-radio label="T">计时型</el-radio>
    </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" prop="detail">
        <el-input
            :autosize="{ minRows: 20}"
            type="textarea"
            :rows="3"
            v-model="formModel.detail"
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
  </el-drawer>
</template>
