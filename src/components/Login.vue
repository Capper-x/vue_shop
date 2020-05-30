<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登陆表单区域 ref为获取表单的实例对象进行重置-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" label-width="0px">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <!-- 按钮 -->
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //这是登陆表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
      //点击重置按钮 重置登录表单
      resetLoginForm(){
          this.$refs.loginFormRef.resetFields();
      },
      login(){
          //返回表单预验证是否通过
          this.$refs.loginFormRef.validate(async valid=>{
              if(!valid) return;  //如果不为ture则返回 不发起请求
              const {data:res} = await this.$http.post('login',this.loginForm);
              if(res.meta.status!==200) return this.$message.error('登陆失败！');
              this.$message.success('登陆成功！')
              //1.将登陆成功后的token保存到客户端到sessionStorage
              //    1项目中除了登陆之外的其他API借口必须在登陆后才能访问
              //    2token只有应当在当前网站打开期间生效，所以token保存在sessionStorage中
              console.log(res);
              window.sessionStorage.setItem('token',res.data.token);
              // 2.通过编程式导航赚到后台主页，地址是/home
              this.$router.push('/home')
          });
      }
  },
};
</script>

<style  scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>

