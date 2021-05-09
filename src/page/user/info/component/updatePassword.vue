<template>
    <div>
      <headerNav title="修改密码"/>
      <div style="background:url(https://haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png) center 18px no-repeat;background-size:161px;">
          <div style="padding-top: 70px;">
            <van-cell-group>
                <van-field
                    
                    label="原密码"
                    placeholder="请输入原密码"
                     @input="onPhone"
                    type="password"
                />
                 <van-field
                    
                    label="密码"
                    placeholder="请输入要修改的密码"
                    @input="onPhone"
                 
                    type="password"
                />
               
            </van-cell-group>
            <div style="margin: 10px;">
                <van-button @click="changeConfirm()" size="large" type="primary" style="height: 45px;line-height:45px;">注册</van-button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
   data(){
    return{
      passordForm:{}
    }
  },
  created(){
        // Message.info("process.env.BASE_API:"+process.env.BASE_API)
        // Message.info("process.env.NODE_ENV:"+process.env.NODE_ENV)
     
  },
  methods:{
  
   
    onPhone(e){
      this.passordForm.phoneNumber=e
    },
    changeConfirm(){
       
       //发送登录请求
        registerUser(this.passordForm).then(resp=>{
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
