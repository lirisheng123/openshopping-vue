<template>
    <div>
        <headerNav title="商城优惠券"/>
        <van-tabs >
            <van-tab title="优惠劵">
                <ul>
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            :offset="offset"
                            finished-text="没有更多了"
                            @load="onLoad"
                            >
                        <li  v-for="(item,index) in list" :key="index" :class="'couponitem '+(item.show?'show':'') ">
                            <div class="couponTop">
                                <div class="cpnamount">
                                    <div class="amountWrap">
                                        <div class="amount">
                                                <span class="amountSign" v-if="item.SignPosition=='left'" >{{item.Sign}}</span>
                                                <span class="amountNum">{{item.Coupon}}</span>
                                                <span class="amountSign" v-if="item.SignPosition=='right'" >{{item.Sign}}</span>                   
                                        </div>
                                        <div class="condition">
                                            <span>{{item.Condition}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="couponInfoWrap">
                                    <div class="cpninfo">
                                        <div class="detail">
                                        <span class="name">{{item.Name}}</span></div>
                                    </div>
                                    <div class="validity">
                                        <span>{{item.BeginDate}}-{{item.EndDate}}
                                        </span>
                                    </div>
                                    <van-button @click="receiveCoupon(item.Id)"  type="danger" size="mini">领取</van-button>
                                </div>
                            </div>
                            <div class="couponMid " v-if="item.Info!=''">
                                <span>详细信息</span>
                                <van-icon name="arrow" class="down" @click="onShowInfo(item.Id,index)" />
                            </div>
                            <div class="info"  v-if="item.Info!=''" >
                                <div class="text">
                                    {{item.Info}}
                                </div>
                            </div>
                        </li>
                    </van-list>
                </ul>
            </van-tab>
           
        </van-tabs>
    </div>
</template>

<script>
import { GetCoupon,ExchangeCoupon } from "../../../api/user.js";
import { fetchList,fetchAvailabelList ,getCoupon,getAllShopCoupon} from "@/api/coupon";
import {formatDate} from '@/utils/date';
export default {
  components: {
  },
  data() {
    return {
            loading:false,
            finished:false,
            list:[],
            page:1,
            offset:10
    };
  },
  created(){
    
  },
  computed: {
  },
  methods: {
        onLoad() {
              
            let params={
                pageNum:this.page,
                pageSize:10,
                endTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
            }
            // let userId=4;

            console.log("params:"+JSON.stringify(params))
            if(this.page==0){
                   this.list=[]
            }
            getAllShopCoupon(params).then(resp=>{
                
                let data = resp.data.list;
                if(data==null){
                   console.log("无优惠劵")
                   return
                }
                for(let i=0;i<data.length;i++){
                    let value={
                       
                        "Name":data[i].name,
                        "Id": data[i].mallCouponId,
                        "BeginDate":data[i].startTime,
                        "EndDate":data[i].endTime,
                        "Condition":"满"+data[i].minPoint+"可用",
                        "SignPosition":"right",
                        "Coupon":data[i].amount,
                        "Sign":"￥",
                        "Info":data[i].note,
                        "show":false
                    }
                    this.list.push(value)
                }
                this.loading=false
                if( resp.data.totalPage<=this.page){
                     this.finished = true;
                }
                if(this.page==0){
                      this.getFilterList()
                }
                this.page=this.page + 1;
            })
        },
        onShowInfo(id,index){
            this.list.forEach((item,itemIndex) => {
                if(index==itemIndex){
                    item.show=!item.show;
                    return;
                }
            });
        },
       receiveCoupon(couponId1){
           //领取优惠劵
           //判断权限是否足够,如果游客,则不能领取
            if(this.$store.getters.token==undefined||this.$store.getters.token==null||this.$store.getters.token==''){
               //没登录
                this.$router.push("/login")
                return
            }

            let userId = this.$store.getters.userId
            let params={
                couponId: couponId1,
                memberNickname:this.$store.getters.name
            }
             console.log("params:"+JSON.stringify(params))
            getCoupon(userId,params).then(resp=>{
                if(resp.code!=200){
                    //领取不成功
                    this.$toast("领取失败:"+resp.message)
                    
                }else{
                     this.$toast("领取成功")
                }
                


            })
       }
  }
};
</script>

<style lang="less">
.couponitem {
        padding: 0 10px;
  margin-top: 10px;
  position: relative;
  font-size: 12px;
  .couponTop {
    background-color: #fcebeb;
    border-left: 1px solid #f3d4d4;
    border-right: 1px solid #f3d4d4;
    border-bottom: 1px dashed  #f3d4d4;
    border-radius: 8px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    .cpnamount {
      position: relative;
      height: 90px;
      width: 34.08%;
      text-align: center;
      float: left;
      border-right: 1px dashed #f3d4d4;
    }
    .amountWrap {
      width: 100%;
      position: absolute;
      top: 50%;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);
      .amount {
        font-size: 15px;
        .amountSign {
          margin-right: 3px;
        }
        .amountNum {
          font-size: 39px;
          line-height: 1;
          font-weight: bold;
        }
      }
    }
  }
  .couponInfoWrap {
    position: relative;
    margin-left: 37.465%;
    height: 90px;
    .cpninfo {
      position: absolute;
      top: 26px;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);
      width: 100%;
      .detail {
        padding-right: 15px;
        word-break: break-all;
        .name {
          font-size: 13px;
          color: #000;
        }
      }
    }
    .validity {
        position: absolute;
        bottom: 16px;
        font-size: 10px;
    }
    button{
        right: 16px;
        position: absolute;
        bottom: 16px;
    }
  }
  .couponMid {
    position: relative;
    height: 31px;
    line-height: 31px;
    padding-left: 16px;
    font-size: 12px;
    
    background-color: #fcebeb;
    border-left: 1px solid #f3d4d4;
    border-right: 1px solid #f3d4d4;
    border-bottom: 1px solid #f3d4d4;
    border-radius: 8px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    i{
        right: 16px;
        position: absolute;
        top: 8px;
         -webkit-transform: rotate(90deg);
        transform: rotate(90deg);   
    }
  }
  
  .info{
      display: none;
      background-color: #fcebeb;
    border-left: 1px solid #f3d4d4;
    border-right: 1px solid #f3d4d4;
    border-bottom: 1px solid #f3d4d4;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
padding: 10px 25px 12px 15px;
    font-size: 12px;
  }
}
  .show{
      
  .couponMid {
          border-bottom: 1px dashed #f3d4d4;
          border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    i{
         -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);   
    }
  }
  .info{
      display: block;
  }
  }
  .gray{
      -webkit-filter: grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(graysale=1);
  }
</style>
