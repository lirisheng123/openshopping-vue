<template>
    <div>
      <headerNav title="退货单"/>
      <div style="background:url(https://haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png) center 18px no-repeat;background-size:161px;">
          <div style="padding-top: 70px;">
            <van-cell-group>
                <van-field
                     :value="returnApply.returnName"
                    label="姓名"
                    placeholder="请输入姓名"
                    :disabled="returnApply.disabled"
                    type="textarea"
                />
                 <van-field
                    :value="returnApply.returnPhone"
                    label="手机号"
                    placeholder="请输入手机号"
                     :disabled="returnApply.disabled"
                     type="number"
                />
                 <van-field
                     :value="returnApply.returnAmount"
                    label="退款金额"
                    placeholder="请输入退款金额"
                     :disabled="returnApply.disabled"
                     type="number"
                />  
                 <van-field
                    :value="returnApply.reason"
                    @input="onReason"
                    label="原因"
                    placeholder="请输入原因"
                      :disabled="returnApply.disabled"
                     type="textarea "
                />
                <!-- <van-field
                    type="password"
                    placeholder="请输入密码"
                /> -->
            </van-cell-group>
            <div style="margin: 10px;">
                <van-button v-if="returnApply.disabled==false" size="large" type="primary" @click="submit"  style="height: 45px;line-height:45px;">申请退货</van-button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import {selectOrderReturnApply,generateOrderReturnApply} from "@/api/returnApply"
import {selectOrderById} from "@/api/order"
export default {

    data(){
        return {
             returnApply:{}
        }
     
    },
    created(){
      //判断是否为编辑
      //是,获取returnAppy值并且 把disabled设置true
       let edit = this.$route.query.edit;
       this.returnApply.disabled=true;
       console.log("edit:"+typeof(edit) )
       if(edit){
          console.log("enter edit")
          this.returnApply=JSON.parse(this.$route.query.params) ;
        //   console.log("returnApply type:"+typeof(this.returnApply))
          console.log("returnApply:"+JSON.stringify(this.returnApply) )
          this.returnApply.disabled=false;
          this.returnApply.reason=""
         
       }else{
           this.getReturnApply();
       }
        console.log("disabled:"+this.returnApply.disabled)
     
     
    },
    methods:{
      getReturnApply:function(){
          selectOrderReturnApply(this.$route.query.id).then(resp=>{
              this.returnApply= resp.data;
               console.log("returnApply:"+JSON.stringify(this.returnApply))
          })
      },
      submit:function(){
           this.returnApply.orderId=this.$route.query.id
            this.returnApply.status=0
            console.log("submit return apply:"+JSON.stringify(this.returnApply))
        generateOrderReturnApply(this.returnApply).then(resp=>{
            if(resp.code==200){
                //成功
                this.$router.push({path:'/user/order/info/'+this.$route.query.id})
            }else{
                //失败
                this.$toast("申请失败")
            }
        })
      },
      onReason(e){
          //注意.这里主要解决vant-field不能双向绑定的问题
        //   console.log("listen reson")
        //     console.log("e:"+JSON.stringify(e) )
          this.returnApply.reason=e
      }
    }
}
</script>

<style>

</style>
