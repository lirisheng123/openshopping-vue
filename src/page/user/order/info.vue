<template>
    <div style="background: #f7f7f7;">
        <headerNav title="订单详情"/>
        <van-steps :active="active">
            <van-step>提交订单</van-step>
            <van-step>配送中</van-step>
            <van-step>交易完成</van-step>
        </van-steps>
        
        <van-cell class="logistics" to="/user/order/logistics/1" title="您的订单已由本人签收（已在配送员处采用无纸化方式签收本订单）。感谢您在京东购物，欢迎再次光临。参加评价还能赢取京豆哟。" label="2018-08-31 21:04:03" icon="logistics" is-link />
        <div style="height:15px;"></div>
        <van-cell-group>
            <van-cell
            center
            :border="false"
            >
      <template>
        <!-- <div>{{张三 138****6520}}</div> -->
        <div>{{orderAddress.userName+orderAddress.userPhone}}</div>
        <!-- <div>广东省深圳市南山区科技园 </div> -->
         <div>{{orderAddress.detailAddress}} </div>
      </template>
    </van-cell>
        </van-cell-group>
        
        <div style="height:15px;"></div>
        <div v-for="(product,i) in order.products" :key="i">
          <product-card :product='product' />
        </div>
        <div style="height:15px;"></div>
        <van-cell-group>
            <van-cell title="订单编号" :value="order.orderNo" />
            <van-cell title="下单时间" :value="order.createTime" />
            <!-- <van-cell title="订单状态" value="配送中" /> -->
        </van-cell-group>
        <div style="height:15px;"></div>
        <van-cell-group class="total">
            <van-cell title="商品总额" :value="order.totalAmount" />
            <van-cell title="运费" :value="order.freightAmount" />
            <van-cell title="实付金额" :value="order.payAmount" style="font-weight: 700;" />
        </van-cell-group>
        <div class="footer">
            <div class="munu">
                <!-- <van-button size="small">确认收货</van-button>
                <van-button size="small" type="danger">支付</van-button> -->
                 <van-button v-if="orderReturnApply.applyStatus" @click="applyReturn(true)"   size="small">申请退款</van-button>
                 <van-button v-if="orderReturnApply.applyStatus==false && orderReturnApply.status==0" @click="applyReturn(false)"  size="small">退款审核中</van-button>
                 <van-button v-if="orderReturnApply.applyStatus==false && orderReturnApply.status==1" @click="applyReturn(false)"  size="small">审核通过</van-button>
                 <van-button v-if="orderReturnApply.applyStatus==false && orderReturnApply.status==2" @click="applyReturn(false)"  size="small">审核不通过</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import {selectOrderReturnApply} from "@/api/returnApply"
import {selectOrderById} from "@/api/order"
import {selectorderAddress} from "@/api/orderAddress"
export default {
    data(){
        return{
            active:1,
            products:[
                {
                    imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                    title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                    price:'499',
                    quantity:2
                },
                {
                    imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                    title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                    price:'499',
                    quantity:2
                },
            ],
            order:{},
            orderAddress:{},
            orderReturnApply:{}
        }
    },
    created(){
       //获取active 和orderId
       //this.$route.params.id;
       this.active = this.$route.query.active;
       this.fetchOrder()
       this.getOrderAddress()
       this.getOrderReturnApply()
       
    },
    methods:{
       fetchOrder:function(){
           selectOrderById(this.$route.params.id).then(resp=>{
               let data = resp.data;
               this.order={
                orderId:data.orderId,   
                orderNo:data.orderNo,
                createTime:data.createTime,   
                totalAmount:data.totalAmount,
                freightAmount:data.freightAmount,
                payAmount:data.payAmount,
                payStatus:data.payStatus
               }
                 let orderitem= data.mallOrderItems; 
               this.order.products=[]
                 for(let j=0;j<orderitem.length;j++){
                      let value={
                        imageURL: orderitem[j].goodsCoverImg,
                        title: orderitem[j].goodsName,
                        price: orderitem[j].sellingPrice,
                        quantity: orderitem[j].goodsCount
                      }
                      this.order.products.push(value)
                 }
               
           })
       },
       getOrderAddress:function(){
          selectorderAddress(this.$route.params.id).then(resp=>{
              this.orderAddress= resp.data;
          })
       },
       getOrderReturnApply:function(){
            selectOrderReturnApply(this.$route.params.id).then(resp=>{
                this.orderReturnApply=resp.data;
                console.log("orderReturnApply:"+JSON.stringify(this.orderReturnApply))
                //判断对象是否为空
                if(Object.keys(this.orderReturnApply).length==0){
                    this.orderReturnApply.applyStatus=true;
                }else{
                     this.orderReturnApply.applyStatus=false;
                }
            })
       },
       applyReturn:function(edit){
           this.$router.push({path:"/user/order1/returnapply",query:{edit:edit,id:this.order.orderId}})
       }
    }
}
</script>

<style lang="less">
.logistics{
        margin-top: 15px;
    i{
        line-height: 60px;    font-size: 20px;
    }
    .van-cell__title span{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .van-cell__label{
        color: #999;
    }
}
.total{
    .van-cell__value{color: red;}
}
.footer{
    height:50px;
    .munu{
        position: fixed;
        height: 49px;
        border-top: 1px solid #e5e5e5;
        bottom: 0;
        background: #fff;
        width: 100%;
        line-height: 24px;
    text-align: right;
        .van-button{
            margin-right: 10px;
        }
    }
}
</style>
