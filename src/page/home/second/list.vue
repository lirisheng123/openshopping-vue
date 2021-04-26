<template>
    <div>
        <headerNav title="秒杀活动"/>
        <van-tabs >
            <van-tab title="正在进行">
                <ul>
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            :offset="offset"
                            finished-text="没有更多了"
                            @load="onLoad"
                            >
                         <div v-for="(product,i) in products" :key="i">
                                <div  @click="showProduct(product)">
                                   
                                    <product-card :product='product' > 
                                       <!-- <template slot>
                                            <van-cell value="倒计时" >
                                                <template slot="title">
                                                    <van-tag type="danger">促销</van-tag>
                                                    <span class="van-cell-text" >满60元减5元</span>
                                                     <van-count-down use-slot :time="time" bind:change="onChange">
                                                        <text class="item">{{ timeData.hours }}</text>
                                                        <text class="item">{{ timeData.minutes }}</text>
                                                        <text class="item">{{ timeData.seconds }}</text>
                                             </van-count-down>
                                                </template>
                                            </van-cell>
                                        </template> -->
                                      
                                    </product-card>
                                </div>
                        </div>
                    </van-list>
                </ul>
            </van-tab>
            <van-tab title="未开始">
               <ul>
                    <van-list
                            v-model="preLoading"
                            :finished="preFinished"
                            :offset="preOffset"
                            finished-text="没有更多了"
                            @load="preOnLoad"
                            >
                         <div v-for="(product,i) in preProducts" :key="i">
                                <div  @click="showProduct(product)">
                                    <product-card :product='product' />
                                    <!-- <van-card
                                        :origin-price="product.price"
                                        :price="product.sellingPrice"
                                        :title="product.name"
                                        :thumb="product.imageURL"
                                        >
                                        <view slot="footer">
                                            <van-count-down use-slot :time="time" bind:change="onChange">
                                                <text class="item">{{ timeData.hours }}</text>
                                                <text class="item">{{ timeData.minutes }}</text>
                                                <text class="item">{{ timeData.seconds }}</text>
                                             </van-count-down>
                                        </view>
                                    </van-card> -->
                                </div>
                        </div>
                    </van-list>
                </ul>
            </van-tab>
           
        </van-tabs>
    </div>
</template>

<script>
import { GetCoupon,ExchangeCoupon } from "../../../api/user.js";
import { selectById,fetchList} from "@/api/flash";
import {getProduct as fetchProductList} from '@/api/product' 
import {formatDate} from '@/utils/date';

export default {
  components: {
  },
  data() {
    return {
            loading:false,
            finished:false,
            products:[],
            page:1,
            offset:10,

            preLoading:false,
            preFinished:false,
            prePage:1,
            preOffset:10,
            preProducts:[],

            time: 30 * 60 * 60 * 1000,
            timeData: {},
    };
  },
  created(){
    
  },
  computed: {
  },
  methods: {
        onChange(e) {
            this.setData({
            timeData: e.detail,
            });
        },
        onLoad() {
              
            let params={
                pageNum:this.page,
                pageSize:10,
                status:1,
                nowTime:formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
               
            }
            // let userId=4;

            console.log("params:"+JSON.stringify(params))
            if(this.page==1){
                   this.products=[]
            }
            fetchList(params).then(resp=>{
                
                let list = resp.data.list;
                if(list==null){
                   console.log("无活动")
                   return
                }
                // for(let i=0;i<data.length;i++){
                //     let value={
                       
                //         "Name":data[i].name,
                //         "BeginDate":data[i].startTime,
                //         "EndDate":data[i].endTime,
                //         "Condition":"满"+data[i].minPoint+"可用",
                //         "SignPosition":"right",
                //         "Coupon":data[i].amount,
                //         "Sign":"￥",
                //         "Info":data[i].note,
                //         "show":false
                //     }
                //     this.list.push(value)
                // }
                // new Promise((resolve,reject)=>{

                    // console.log("this:"+this)
                    for(let i=0;i< list.length;i++){
                     //获取商品的其他信息
                     
                     fetchProductList(list[i].goodsId).then(resp=>{
                            if(resp.data==null){
                                console.log("没有获取到商品的信息")
                                return
                            }
                            // let product = list[i]
                            // product.imageURL=resp.data.goodsCoverImg
                            // product.name = resp.data.goodsName
                            let product={
                                id: list[i].goodsId,
                                mallFlashPromotionId:list[i].mallFlashPromotionId,
                                imageURL: resp.data.goodsCoverImg,
                                title: resp.data.goodsName,
                                price: list[i].price
                            }
                            this.products.push(product)
                        })
                    }
                    this.loading=false
                    if( resp.data.totalPage<=this.page){
                        this.finished = true;
                    }
                    if(this.page==0){
                        this.getFilterList()
                    }
                    this.page=this.page + 1;

                // }).then((data,resp)=>{
                     
                // })
                  
            
                    
            })
        },
      
        preOnLoad() {
              
            let params={
                pageNum:this.prePage,
                pageSize:10,
                status:1,
             
                endTime:formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
            }
            // let userId=4;

            console.log("params:"+JSON.stringify(params))
            if(this.prePage==1){
                   this.preProducts=[]
            }
            fetchList(params).then(resp=>{
                
                let list = resp.data.list;
                if(list==null){
                   console.log("无活动")
                   return
                }
                // for(let i=0;i<data.length;i++){
                //     let value={
                       
                //         "Name":data[i].name,
                //         "BeginDate":data[i].startTime,
                //         "EndDate":data[i].endTime,
                //         "Condition":"满"+data[i].minPoint+"可用",
                //         "SignPosition":"right",
                //         "Coupon":data[i].amount,
                //         "Sign":"￥",
                //         "Info":data[i].note,
                //         "show":false
                //     }
                //     this.list.push(value)
                // }
                // new Promise((resolve,reject)=>{

                    // console.log("this:"+this)
                    for(let i=0;i< list.length;i++){
                     //获取商品的其他信息
                     
                     fetchProductList(list[i].goodsId).then(resp=>{
                            if(resp.data==null){
                                console.log("没有获取到商品的信息")
                                return
                            }
                            // let product = list[i]
                            // product.imageURL=resp.data.goodsCoverImg
                            // product.name = resp.data.goodsName
                            let product={
                                id: list[i].goodsId,
                                imageURL: resp.data.goodsCoverImg,
                                title: resp.data.goodsName,
                                price: list[i].price
                            }
                            this.preProducts.push(product)
                        })
                    }
                    this.preLoading=false
                    if( resp.data.totalPage<=this.prePage){
                        this.preFinished = true;
                    }
                    if(this.prePage==0){
                        this.getFilterList()
                    }
                    this.prePage=this.prePage + 1;

              
            })
        },
        showProduct(product){ 
           console.log("enter to the product detail")
           this.$router.push({path:'/product/'+product.mallFlashPromotionId,query:{second:true}});
        //    this.$router.push('/product/'+product.id);
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
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}  
</style>
