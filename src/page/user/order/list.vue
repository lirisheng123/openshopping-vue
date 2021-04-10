<template>
<div>
     <headerNav title="我的订单"/>
    <van-tabs v-model="active">
        <van-tab title="全部">
            
            <div v-for="(item,index) in allList" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                    <div slot="header">
                        <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.state" :to="'/user/order/info/'+item.orderid"/>
                    </div>
                        <div>
                            <router-link :to="'/user/order/info/'+item.orderid">
                            <div v-for="(product,i) in item.products" :key="i">
                                <product-card :product='product' />
                            </div>
                            <!-- <div  v-if="item.products.length>1" class="more" >
                                <div class="item" v-for="(product,i) in item.products" :key="i">
                                    <div >
                                        <img :src="product.imageURL"/>
                                    </div>
                                </div>
                            </div> -->
                            </router-link>
                        </div>
                        <div slot="footer">
                             <span class="total">{{"总价"+item.payAmount}}</span>
                            <van-button    v-if="item.status==2" size="small">确认收货</van-button> 
                             <!-- <van-button v-if="item.status==4" size="small">退货中</van-button>                            -->
                            <van-button v-if="item.status==0" size="small" type="danger">支付</van-button>
                            <!-- <van-button size="small">确认收货</van-button> -->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>

        </van-tab>
         <van-tab title="待支付">
            <div v-for="(item,index) in payList" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                    <div slot="header">
                        <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.state" :to="'/user/order/info/'+item.orderid"/>
                    </div>
                        <div>
                            <!-- <router-link :to="'/user/order/info/'+item.orderid"> -->
                             <router-link :to="{path:'/user/order/info/'+item.orderid,query:{active:0}}">
                            <div  v-for="(product,i) in item.products" :key="i">
                                <product-card :product='product' />
                            </div>
                            <!-- <div  v-if="item.products.length>1" class="more" >
                                <div class="item" v-for="(product,i) in item.products" :key="i">
                                    <div >
                                        <img :src="product.imageURL"/>
                                    </div>
                                </div>
                            </div> -->
                            </router-link>
                        </div>
                        <div slot="footer">
                            <span class="total">{{"总价"+item.payAmount}}</span>
                            <!-- <van-button v-if="item.status==2" size="small">确认收货</van-button>  -->
                             <!-- <van-button v-if="item.status==4" size="small">退货中</van-button>                            -->
                            <van-button @click="changeOrderStatus(item.orderid,1)" v-if="item.status==0" size="small" type="danger">支付</van-button>
                            <!-- <van-button size="small">确认收货</van-button>      -->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>
        </van-tab>
        <van-tab title="待发货">
            <div v-for="(item,index) in sendList" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                    <div slot="header">
                        <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.state" :to="'/user/order/info/'+item.orderid"/>
                    </div>
                        <div>
                            <router-link :to="{path:'/user/order/info/'+item.orderid,query:{active:0}}">
                            <div  v-for="(product,i) in item.products" :key="i">
                                <product-card :product='product' />
                            </div>
                            <!-- <div  v-if="item.products.length>1" class="more" >
                                <div class="item" v-for="(product,i) in item.products" :key="i">
                                    <div >
                                        <img :src="product.imageURL"/>
                                    </div>
                                </div>
                            </div> -->
                            </router-link>
                        </div>
                        <div slot="footer">
                            <span class="total">{{"总价"+item.payAmount}}</span>
                            <!-- <van-button v-if="item.status==2" size="small">确认收货</van-button>  -->
                             <!-- <van-button v-if="item.status==4" size="small">退货中</van-button>                            -->
                            <!-- <van-button v-if="item.status==0" size="small" type="danger">支付</van-button> -->
                            <!-- <van-button size="small">确认收货</van-button>      -->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>
        </van-tab>
        <van-tab title="待收货">
               <div v-for="(item,index) in receiveList" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                    <div slot="header">
                        <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.state" :to="'/user/order/info/'+item.orderid"/>
                    </div>
                        <div>
                            <!-- <router-link :to="'/user/order/info/'+item.orderid"> -->
                             <router-link :to="{path:'/user/order/info/'+item.orderid,query:{active:1}}">
                            <div  v-for="(product,i) in item.products" :key="i">
                                <product-card :product='product' />
                            </div>
                            <!-- <div  v-if="item.products.length>1" class="more" >
                                <div class="item" v-for="(product,i) in item.products" :key="i">
                                    <div >
                                        <img :src="product.imageURL"/>
                                    </div>
                                </div>
                            </div> -->
                            </router-link>
                        </div>
                        <div slot="footer">
                            <span class="total">{{"总价"+item.payAmount}}</span>
                            <van-button  @click="changeOrderStatus(item.orderid,3)"  v-if="item.status==2" size="small">确认收货</van-button> 
                             <!-- <van-button v-if="item.status==4" size="small">退货中</van-button>                            -->
                            <!-- <van-button v-if="item.status==0" size="small" type="danger">支付</van-button> -->
                            <!-- <van-button size="small">确认收货</van-button>      -->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>
        </van-tab>
        <van-tab title="已完成">
           <div v-for="(item,index) in finishList" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                    <div slot="header">
                        <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.state" :to="'/user/order/info/'+item.orderid"/>
                    </div>
                        <div>
                            <!-- <router-link :to="'/user/order/info/'+item.orderid"> -->
                             <router-link :to="{path:'/user/order/info/'+item.orderid,query:{active:2}}">
                            <div  v-for="(product,i) in item.products" :key="i">
                                <product-card :product='product' />
                            </div>
                            <!-- <div  v-if="item.products.length>1" class="more" >
                                <div class="item" v-for="(product,i) in item.products" :key="i">
                                    <div >
                                        <img :src="product.imageURL"/>
                                    </div>
                                </div>
                            </div> -->
                            </router-link>
                        </div>
                        <div slot="footer">
                            <span class="total">{{"总价:"+item.payAmount}}</span>
                            <!-- <van-button v-if="item.status==2" size="small">确认收货</van-button>  -->
                             <!-- <van-button v-if="item.status==4" size="small">退货中</van-button>                            -->
                            <!-- <van-button v-if="item.status==0" size="small" type="danger">支付</van-button> -->
                            <!-- <van-button size="small">确认收货</van-button>      -->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>
       </van-tab>
             
        <!-- <van-tab title="已取消">内容 5</van-tab> -->
    </van-tabs>
</div>
</template>

<script>
import {selectOrder,updateOrderStatus} from "@/api/order"
import user from '../../../store/modules/user';
export default {
    components:{
    },
    data(){
        return{
            active:0,
            
            list:[
                {
                    orderid:1,
                    ordercode:'4511248234235',
                    state:'待付款',
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
                            quantity:1
                        },
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
                        {
                            imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        },
                    ]
                },
                {
                    orderid:2,
                    ordercode:'4511248234235',
                    state:'待收货',
                    products:[
                        {
                            imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        }
                    ]
                },
                {
                    orderid:3,
                    ordercode:'4511248234235',
                    state:'已完成',
                    products:[
                        {
                            imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        }
                    ]
                },
                {
                    orderid:4,
                    ordercode:'4511248234235',
                    state:'已取消',
                    products:[
                        {
                            imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        }
                    ]
                },
            ],
            allList:[],
            receiveList:[],
            payList:[],
            sendList:[],
            finishList:[]

        }
    },
    created(){
        //判断
        this.active= this.$route.params.id;
        this.getAllList();
        this.getPayList();
        this.getSendList();
        this.getReceiveList();
        this.getFinishList();
        
    },
    methods:{
        getAllList:function(){
           let userId=4; 
          let params={
              pageNum:1,
              pageSize:5,
              status:-1  
          };            
           this.allList=this.fetchList(userId,params);
        },
        getReceiveList:function(){
            let userId=4; 
            let params={
              pageNum:1,
              pageSize:5,
              status:2 
            };   
            this.receiveList=this.fetchList(userId,params);
        },
        getPayList:function(){
           let userId=4; 
            let params={
              pageNum:1,
              pageSize:5,
              status:0 
            };   
            this.payList=this.fetchList(userId,params);
        },
        getSendList:function(){
           let userId=4; 
            let params={
              pageNum:1,
              pageSize:5,
              status:1
            };   
            this.sendList=this.fetchList(userId,params);
        },
        getFinishList:function(){
             let userId=4; 
            let params={
              pageNum:1,
              pageSize:5,
              status:3 
            };   
            this.finishList=this.fetchList(userId,params);
        },
        fetchList:function(userId,params)
        {
              let list=[] ;
              selectOrder(userId,params).then(resp=>{
              let data= resp.data.list;
              for(let i = 0;i<data.length;i++){
                  let order={
                      orderid:data[i].orderId,
                      ordercode:data[i].orderNo,
                      payAmount:data[i].payAmount,
                      status:data[i].orderStatus
                  }
                  if(order.status==0){
                        order.state="待支付"
                    }else if(order.status==1){
                            order.state="待发货"
                    }else if(order.status==2){
                            order.state="待收货"
                    }else if(order.status==3){
                            order.state="完成"
                    }else if(order.status==4){
                            order.state="退货中"
                    }else {
                            order.state="已取消"
                    }
                  let orderitem= data[i].mallOrderItems; 
                  order.products=[]
                 for(let j=0;j<orderitem.length;j++){
                      let value={
                        imageURL: orderitem[j].goodsCoverImg,
                        title: orderitem[j].goodsName,
                        price: orderitem[j].sellingPrice,
                        quantity: orderitem[j].goodsCount
                      }
                      order.products.push(value)
                 }
                 list.push(order)
                    
              }
             
              
          })
               console.log("list:"+JSON.stringify(list))
               return list
        },
        changeOrderStatus:function(orderId,status)  {
            let date =this.changeDateToString(new Date)     
            let params={
                orderStatus:status,
                date: date
            }
            updateOrderStatus(orderId,params).then(resp=>{
                if(resp.code==200){
                    this.getAllList();
                    this.getPayList();
                    this.getSendList();
                    this.getReceiveList();
                    this.getFinishList();
                    this.active=this.active+1
                }
            })
        },
        changeDateToString(date){
            Date.prototype.Format = function (fmt) { //author: meizz 
                            var o = {
                                "M+": this.getMonth() + 1, //月份 
                                "d+": this.getDate(), //日 
                                "h+": this.getHours(), //小时 
                                "m+": this.getMinutes(), //分 
                                "s+": this.getSeconds(), //秒 
                                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                                "S": this.getMilliseconds() //毫秒 
                            };
                            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                            for (var k in o)
                            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                            return fmt;
           }
           
          var time2 = date.Format("yyyy-MM-dd hh:mm:ss"); 
          console.log("date:"+time2)
          return time2;

        }   
    }
    
}
</script>

<style lang="less">

.order-item{
    margin-bottom: 10px;
    font-size: 12px;
    .title{
        border-bottom: 1px solid #e5e5e5;

        .van-cell__title{
            flex: 2;
        }
        .van-cell__value{
            color: red;
        }
    }

    
    .van-panel__footer {
        text-align: right;
        border-bottom: 1px solid #e5e5e5;
    }
    .van-button {
        margin-left: 5px;
    }
    .total{
    position: absolute;
    top: 17px;
    left: 15px;
    font-size: 13px;
    }
    .more{
        overflow-x: scroll;white-space: nowrap;    -webkit-overflow-scrolling: touch;    margin: 5px 0 5px 15px;
        .item{
            width: 90px; height:90px; margin-right: 10px;display: inline-block;
            img{
                width: 100%;
            }
        }
    }
}
</style>
