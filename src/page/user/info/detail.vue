<template>
    <div>
        <headerNav title="账号管理"/>
        <van-cell-group>
            <van-cell title="修改个人信息"  is-link />
            <van-cell title="修改登录密码"  is-link />
            <van-cell title="修改绑定手机"  is-link />
            <!-- <van-cell title="关联账号"  is-link />
            <van-cell title="切换账号"  is-link to="/login" /> -->
            <van-cell title="登出"  @click="logout()" />
        </van-cell-group>
    </div>
</template>
<script>
export default {
    data(){
     return{
    
    }
   },
   created(){
     
   
   },
   methods:{
       logout(){
           //发送登录请求
        this.$store.dispatch('LogOut').then((resp,error)=>{
            if(error!=null){
               //退出失败
               this.$toast(JSON.stringify(error))
            }else{
              //退出成功
               this.$toast("退出成功")
               this.$router.push("/user/index")
            }
        })
       }
   }
}
</script>

<style>

</style>
