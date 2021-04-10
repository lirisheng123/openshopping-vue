<template>
  <div class="order">
     <headerNav title="确认订单"/>
     <van-cell
      center
      :border="false"
      class="contact-card"
      is-link
      :to="'/user/address?id=' +userAddress.addressId"
    >
      <template v-if="type === 'add'">
        <strong>选择地址</strong>
      </template>
      <template v-else>
        <strong>{{userAddress.userName+" "+userAddress.userPhone}}</strong>
        <!-- <div>{{广东省深圳市南山区科技园 }}</div> -->
        <div>{{userAddress.detailAddress}} </div>
      </template>
    </van-cell>
    <div style="height:15px;"></div>
    <div class="card" v-for="(product,i) in products" :key="i">
      <product-card :product='product' />
    </div>
    <div style="height:15px;"></div>
    <van-cell-group>
      <van-field
        label="留言"
        type="textarea"
        placeholder="请输入留言"
        rows="1"
        autosize
      />
    </van-cell-group>
    <div style="height:15px;"></div>
    <van-cell-group class="total">
        <van-cell title="优惠券" is-link @click="onPopupShow" :value="seletedCoupon | formateCoupon " />
    </van-cell-group>
    
    <div style="height:15px;"></div>
    <van-cell-group class="total">
        <van-cell title="商品总额" :value="confirmOrder.totalAmount" />
        <van-cell title="运费" :value="confirmOrder.freightAmount" />
        <van-cell title="折扣" :value="confirmOrder.couponAmount" />
        <van-cell title="实付金额" :value="confirmOrder.payAmount" style="font-weight: 700;" />
    </van-cell-group>

    <div style="height:50px;"></div>
    <van-submit-bar
      :price="confirmOrder.payAmount"
      button-text="提交订单"
      label='实付金额：'
      @submit="onSubmit"
    />

     <!-- <van-popup
       v-model="popupShow"
      position="bottom"
     > -->
        <!-- <div v-for="(item,index) in couponList"  :key="index">
            <van-cell   bind:click="onClick(item)"  title="单元格" :value="item | formateCoupon" />
        </div> -->
      
     <!-- </van-popup> -->
     <van-popup 
        v-model="popupShow"
        position="bottom" 
        style="height: 40%"
     >
       <div v-for="(item,index) in couponList"  :key="index">
            <van-cell   @click="onClick(item)"   :value="item | formateCoupon" />
        </div>
     </van-popup>
        
     <payment 
          :payShow="payShow" 
          :payStatus="payStatus" 
          :payTitle = "payTitle"
          @paySubmit="submitFns" 
          @payClose="payShow=false"
     >

    
</payment>
  
   
  </div>
</template>



<script>
import {generateConfirmOrder,generateOrder} from "@/api/order"
import {selectDefaultByUserId} from "@/api/userAdress"
import {fetchAvailabelList} from "@/api/coupon"
import eventBus from '@/utils/eventbus.js';
import user from '../../store/modules/user';
const defaultComfiredOrder={
  userId:null,
  totalAmount:null,
  payStatus:null,
  payType:"手机",
  payTime:null,
  extraInfo:null,
  orderStatus:null,
  payAmount:null,
  freightAmount:null,
  couponAmount:null,
  shopCateIds:null,
  orderAddressId:null,
  mallOrderItems:null
 
}
 
export default {
  data() {
    return {
      type: "add1",
      confirmOrder:{},
      products: [
        {
          imageURL:
            "https://img10.360buyimg.com/mobilecms/s88x88_jfs/t17572/12/840082281/351445/e1828c58/5aab8dbbNedb77d88.jpg",
          title: "良品铺子 肉肉聚汇猪肉脯 猪蹄卤 辣味小吃520g",
          desc: "0.670kg/件，肉肉聚汇520g",
          price: "59.80",
          quantity: 2
        },
        {
          imageURL:
            "https://img10.360buyimg.com/mobilecms/s88x88_jfs/t22720/128/1410375403/319576/8dbd859f/5b5e69b3Nf4f0e9e7.jpg",
          title: "元朗 鸡蛋卷 饼干糕点 中秋礼盒 广东特产680g",
          desc: "1.320kg/件",
          price: "65.80",
          quantity: 1,
          gift: [
            {
              title: "星巴克（Starbucks）星冰乐小熊吊饰星巴克（Starbucks）星冰乐小熊吊饰",
              quantity: 2
            },
            {
              title: "星巴克（Starbucks）星冰乐小熊吊饰星巴克（Starbucks）星冰乐小熊吊饰",
              quantity: 1
            }
          ]
        },
        {
          imageURL:
            "https://img10.360buyimg.com/mobilecms/s88x88_jfs/t17572/12/840082281/351445/e1828c58/5aab8dbbNedb77d88.jpg",
          title: "良品铺子 肉肉聚汇猪肉脯 猪蹄卤 辣味小吃520g",
          desc: "0.670kg/件，肉肉聚汇520g",
          price: "59.80",
          quantity: 2
        },
      ],
      payAction:false,
      payShow: false,
      payStatus: "",
      payTitle:"请输入支付密码",
      userAddress:{},
      couponList:[],
      popupShow:false
      // seletedCoupon:{}
    };
  },
  computed:{
    seletedCoupon:{
       get(){//回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
         
       },
      set(val){//监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
       //val就是fullName的最新属性值
        console.log("set seletedCoupon:"+val)
        let amount;
        if(val==null){
          amount=0;
        }else{
          amount=val.amount;
        }
        this.confirmOrder.couponAmount=amount;
        this.confirmOrder.payAmount=this.confirmOrder.totalAmount+this.confirmOrder.freightAmount-amount
        // const names = val.split(' ');
        // console.log(names)
        // this.firstName = names[0];
        // this.lastName = names[1];
      }
    }
  },
  created(){
    //根据路由过来的origin判断来源,购物车,还是商业详情页面,秒杀页面
  //  console.log("enter created")
    // this.$on('selectAddress', function(data){
    //     //赋值给首页的附近医院数据模型
    //     console.log('activated data:'+data)
    //     console.log(1);
    //     this.userAddress=data;
    //     this.$Toast("返回值")
    // }.bind(this));
  //  this.generateConfirmFormCart();
    

  },
  filters: {
    formateCoupon: function (value) {
       console.log("formateCoupon:"+value)
        //  return "你好"
      if (!value) return '无可用优惠劵'
       value="满"+value.minPoint+"减"+value.amount;
       console.log("value:"+value)
      // value = value.toString()
      // return value.charAt(0).toUpperCase() + value.slice(1)
      return value
    }
  },
  methods: {
    onSubmit() {
      //根据普通的订单还是秒杀订单
      //目前测试暂时预设环境: 购物车,正常购物,支付成功
      
      // this.$toast("点击按钮");
      // this.payShow=true;
      this.confirmOrder.payStatus=this.payStatus
      this.confirmOrder.payType="手机"
      this.confirmOrder.payTime=new Date()
      this.confirmOrder.orderStatus=1
      this.confirmOrder.orderAddressId=this.userAddress.addressId
      this.confirmOrder.userId=4
      this.confirmOrder.shopCateIds=this.$route.query.cateIds
      this.confirmOrder.couponHistoryId=this.seletedCoupon.couponHistoryId
      console.log("confirmOrder:"+JSON.stringify(this.confirmOrder))
      generateOrder(this.confirmOrder).then(resp=>{
           
           //判断是否成功,成功,则跳转到订单跳转页面
           
      })
    },
    generateConfirmFormCart(){

    
       let params={
         cartIds:this.$route.query.cateIds
       }
       generateConfirmOrder(params).then(resp=>{
           this.confirmOrder = resp.data;
           let data = this.confirmOrder.mallOrderItems
           this.products=[]
           for(let i=0;i<data.length;i++){
              let value={
                  imageURL:
                       "https://img10.360buyimg.com/mobilecms/s88x88_jfs/t17572/12/840082281/351445/e1828c58/5aab8dbbNedb77d88.jpg",
                  title: data[i].goodsName,
                  desc: data[i].goodsInfo,
                  price: data[i].sellingPrice,
                  quantity: data[i].goodsCount
              }
              this.products.push(value)
           }
          this.confirmOrder.freightAmount=0.0
          this.getUserCouponAvaibleList();
       })
    },
    generateConfirmFormDetail(){
        
    },
    payClick:function(){
        // 显示支付键盘
        this.payShow = true;
    },
    submitFns:function(value){
        // 关闭键盘
        // let vm =this
        if(value=='123456'){
            //密码正确
            setTimeout(function(_this){
                _this.payStatus = true;
                // _this.$toast("支付成功");
                _this.onSubmit()
                console.log("支付成功")  
            },100,this)
            // console.log("支付成功")  
            // this.$toast("支付成功");
        }else{
            // 密码错误
            setTimeout(function(_this){
                _this.payStatus = false;
                // this.$toast("支付失败");
            },100,this)
        }
    },
    getUserDefaultAddress(){
       let userId =4 
       selectDefaultByUserId(userId).then(resp=>{
            this.userAddress=resp.data
            if(this.userAddress==null){
              this.type="add";
              this.userAddress={}
              this.userAddress.addressId=1000
            }else{
               this.formateUserAddress()
            }
           
       })
    },
    formateUserAddress(){
      let phone = this.userAddress.userPhone
      let newphone=phone.substr(0, 3) + '****' + phone.substr(phone.length - 4);
      this.userAddress.userPhone=newphone
    },
    getUserCouponAvaibleList(){
      let count = this.confirmOrder.totalAmount
      // let count = 10000
      let userId= 4
      let params={
        pageNum:1,
        pageSize:100,
        count:count
        // count:this.confirmOrder.totalAmount
      }
      console.log("getUserCouponAvaibleList")
      fetchAvailabelList(userId,params).then(resp=>{
         this.couponList = resp.data.list;

          function compare(property){
              return function(a,b){
                      var value1 = a[property];
                      var value2 = b[property];
                      return value1 - value2;
              }
          }
          console.log("couponList:"+JSON.stringify(this.couponList))
          this.couponList= this.couponList.sort(compare('amount'))
          this.seletedCoupon=this.couponList[0]
        }
      )
           
    },
    onPopupShow(){
      console.log("enter onPopupShow ")
      this.popupShow=true;
    },
    onClick(row){
       console.log("onClick")
       this.seletedCoupon=row;
       this.popupShow=false
    }
    
  },
  activated(){  
    //根据key名获取传递回来的参数，data就是map
    console.log('enter activated ')
     if (!this.$route.meta.isBack){
       //初始化数据
         console.log("enter created")
        this.generateConfirmFormCart();
        // this.confirmOrder={
        //   totalAmount:100,
        //   freightAmount:0,
        //   couponAmount:0,
        //   payAmount:0
        // }
        // this.getUserCouponAvaibleList();
        this.getUserDefaultAddress();
        // this.userAddres.addressId=1000
        // this.getUserCouponAvaibleList();
        
      }
      //添加监听selectAddress事件
      //注意,这个在返回事件之前就应该被添加,要不然会监听不到事件的返回
      eventBus.$on('selectAddress', function(data){
        //赋值给首页的附近医院数据模型
        // this.nearestOrg = data;
        console.log('activated data:'+JSON.stringify(data) )
        this.userAddress=data;
        this.userAddress={
          addressId:data.id,
          userName:data.name,
          userPhone:data.tel,
          detailAddress:data.address,
        }
        this.type="add1";
        this.formateUserAddress()
      }.bind(this));
      this.$route.meta.isBack = false 
      
  },
  beforeRouteEnter(to, from, next) {
      if (from.name == 'address') { // 这个name是下一级页面的路由name
          console.log("enter address")
          to.meta.isBack = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
      }
      next()
    },
  beforeRouteLeave(to, from, next) {
      if (to.name != 'address') { // 这个name是下一级页面的路由name
         //在提交订单时,去掉该监听器
          eventBus.$off('selectAddress')
      }
      next()
    }
  
};
</script>

<style lang="less">
.order {
  font-size: 14px;
  background: #f7f7f7;
  .contact-card::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
  }
  .total {
    .van-cell__value {
      color: red;
    }
  }
  
  .van-submit-bar__bar {
    border-top: 1px solid #f7f7f7;
  }
  .additional {
    .van-cell {
      padding: 0 15px;
      font-size: 12px;
    }
    .van-cell__title {
      flex: 11;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-tag {
      line-height: 12px;
      margin-right: 5px;
    }
    
    .price {
      color: #e93b3d;
      font-size: 10px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
