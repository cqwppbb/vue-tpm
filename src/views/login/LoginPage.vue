<script setup>
import {userLoginService} from "../../api/user";
import {Lock, User} from '@element-plus/icons-vue'
import {ref, watch} from 'vue'
import {useUserStore} from '@/stores'
import {useRouter} from 'vue-router'

const reset = ref(false)
const form = ref()

// 整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
})

const rules = {
  username: [
    { required: true, message: '请输入员工编号', trigger: 'blur' },
    { min: 8, max: 8, message: '员工编号为8位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  const token = res.data.access
  if (res) {
    userStore.setToken(token)
    ElMessage.success('登录成功')
    router.push('/')
  } else {
    ElMessage.error('登录失败')
  }

}

// 重置表单内容
watch(reset, () => {
  formModel.value = {
    username: '',
    password: '',
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg">
      <span class="title">PM管理系统</span>
    </el-col>
    <!-- <el-col :span="'6'">
    <H1>后台管理系统</H1>
    </el-col> -->
    <el-col :span="6" :offset="15" class="form">
      <!-- 登录相关表单 -->
      <el-form ref="form" :model="formModel" :rules="rules" size="large" autocomplete="off">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入员工编号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" name="password" :prefix-icon="Lock" type="password"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="info" :underline="false" @click="reset = true">
              重置
            </el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex"> </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(/src/assets/login/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
  }

  .title {
    position:relative;
    font-size:50px;
    font-weight: 1000;
    color: #ece2e2;
    top: 40%;
    left: 20%;
    margin: (10%,10%,10%,10%);
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;


    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
