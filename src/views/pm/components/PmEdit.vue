<script setup>
import {onMounted, ref} from 'vue'
import {PmAddService, PmDeleteService, PmEditService, PmModifyRecordPostService} from '../../../api/pm.js'
import {useUserStore} from '../../../stores/modules/user';

const userStore = useUserStore();
onMounted(() => {
  userStore.getUser();
});

const dialogEdit = ref(false)
const dialogDelet = ref(false)
const formRefEdit = ref()
const formRefDelete = ref()
const formModelEdit = ref({})
const formPostData = ref({})
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
      pattern: /^[Z0-9]{1,15}$/,
      message: '频次必须是数字',
      trigger: 'blur'
    }
  ],
  type: [
    {required: true, message: '请选择测点类型F/T', trigger: 'blur'},
    {
      // pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '必须选测点类型',
      trigger: 'blur'
    }
  ],
  radio: [
    {required: true, message: '请选择更改范围', trigger: 'blur'},
    {
      // pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '必须选更改范围',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRefEdit.value.validate()
  const isEdit = formModelEdit.value.msg
  delete formModelEdit.value.msg
  delete formPostData.value.msg
  formPostData.value.user = userStore.user
  console.log(formPostData.value)
  console.log(formModelEdit.value)
  if (isEdit == 'edit') {
    formPostData.value.notes = '修改'
    const resPmEdit = await PmEditService(formModelEdit.value)
    const resPmModifyEdit = await PmModifyRecordPostService(formPostData.value)

    if (resPmEdit.status == 200) {
      if (resPmModifyEdit.status == 200) {
        ElMessage.success('修改成功')
      }
    } else {
      ElMessage.error('修改失败！')
    }
  } else if (isEdit == 'add') {
    const resPmAdd = await PmAddService(formModelEdit.value)
    formModelEdit.value.user = userStore.user
    formModelEdit.value.notes = '新增'
    const resPmModifyAdd = await PmModifyRecordPostService(formModelEdit.value)

    if (resPmAdd.status == 200) {
      if (resPmModifyAdd.status == 200) {
        ElMessage.success('添加成功')
      }
    } else {
      ElMessage.error('添加失败！')
    }

  }
  dialogEdit.value = false
  emit('success')
}
const onSubmitDelete = async () => {
  formPostData.value.notes = '删除'
  console.log(formModelEdit.value)
  await formRefDelete.value.validate()
  const PmDelete = await PmDeleteService(formModelEdit.value)
  const PmModifyDelete = await PmModifyRecordPostService(formPostData.value)
  dialogDelet.value = false
  console.log(PmDelete)
  if (PmDelete.status == 204) {
    if (PmModifyDelete.status == 200) {
      ElMessage.success('删除成功')
    }
  } else {
    ElMessage.error('删除失败！')
  }

  emit('success')
}

// 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
// open({})  => 表单无需渲染，说明是添加
// open({ id, cate_name, ... })  => 表单需要渲染，说明是编辑
// open调用后，可以打开弹窗
const open = (row) => {
  formPostData.value = row
  row.range = 'all'
  if (row.msg == 'edit') {
    dialogEdit.value = true
    formModelEdit.value = {...row} // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  } else if (row.msg == 'add') {
    dialogEdit.value = true
    formModelEdit.value = {...row}
    row.detail = '';
    row.frequency = ''
  } else if (row.msg == 'delete') {
    dialogDelet.value = true
    formModelEdit.value = {...row}
  }
}

// 向外暴露方法
defineExpose({
  open
})

</script>

<template>
  <el-drawer
      v-model="dialogEdit"
      :title="formModelEdit.msg=='edit' ? '修改' : '新增'"
      width="30%"
  >
    <el-form
        ref="formRefEdit"
        :model="formModelEdit"
        :rules="rules"
        label-width="100px"
        style="padding-right: 30px"
    >
      <el-form-item label="区域" prop="area">
        <el-input
            disabled
            v-model="formModelEdit.area"
            placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item disabled="disabled" label="设备" prop="machine">
        <el-input
            disabled
            v-model="formModelEdit.machine"
            placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="工位" prop="station">
        <el-input
            disabled
            v-model="formModelEdit.station"
            placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="更改范围" prop="type">
        <el-radio-group v-model="formModelEdit.range" size="large">
          <el-radio-button label="all">所有工位</el-radio-button>
          <el-radio-button label="one">单台</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="PM编号" prop="item">
        <el-input
            v-model="formModelEdit.item"
            placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item label="频次" prop="frequency">
        <el-input-number
            type="number"
            v-model="formModelEdit.frequency"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="测点类型" prop="type">
        <el-radio-group v-model="formModelEdit.type" size="large">
          <el-radio-button label="F">计数型</el-radio-button>
          <el-radio-button label="T">计时型</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" prop="detail">
        <el-input
            :autosize="{ minRows: 20}"
            type="textarea"
            :rows="3"
            v-model="formModelEdit.detail"
            placeholder=""
        ></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEdit = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-drawer>
  <el-dialog width="500" v-model="dialogDelet" title="删除">
    <el-form ref="formRefDelete" :model="formModelEdit">
      <!--      <el-form-item label="更改范围" :label-width="formLabelWidth">-->
      <!--        <el-select v-model="formModelEdit.range">-->
      <!--          <el-option label="所有工位" value="all"/>-->
      <!--          <el-option label="单台" value="one"/>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogDelet = false">取消</el-button>
        <el-button type="primary" @click="onSubmitDelete">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
