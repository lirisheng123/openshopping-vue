<template>
    <div>
      <headerNav title="注册"/>
      <div style="background:url(https://haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png) center 18px no-repeat;background-size:161px;">
          <div style="padding-top: 70px;">
            <van-cell-group>
                <van-field
                    
                    label="账号名"
                    placeholder="请输入账号名"
                    @input="onUsername"
                 
                    type="textarea"
                />
                 <van-field
                    
                    label="账号名"
                    placeholder="请输入手机号"
                    @input="onPhone"
                 
                    type="textarea"
                />
                <van-field
                    label="密码"
                     @input="onPassword"
                    type="password"
                    placeholder="请输入密码"
                />
            </van-cell-group>
            <div style="margin: 10px;">
                <van-button @click="registerConfirm()" size="large" type="primary" style="height: 45px;line-height:45px;">注册</van-button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import {registerUser} from "@/api/login"
export default {
   data(){
    return{
      registerForm:{}
    }
  },
  created(){
        // Message.info("process.env.BASE_API:"+process.env.BASE_API)
        // Message.info("process.env.NODE_ENV:"+process.env.NODE_ENV)
     
  },
  methods:{
    onUsername(e){
     this.registerForm.loginName=e
    },
    onPassword(e){
      this.registerForm.passwordMd5=e
    },
    onPhone(e){
      this.registerForm.phoneNumber=e
    },
    registerConfirm(){
       
       //发送登录请求
        registerUser(this.registerForm).then(resp=>{
          if(resp.code==200){
            //注册成功,跳转到登录页面
             this.$toast("注册成功")
             this.$router.push("/login/password")
          }else{
             this.$toast("注册失败")
          }
        })
       
    }
  }
}
</script>

<style>

</style>
