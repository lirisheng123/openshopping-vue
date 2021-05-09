<template>
<div class="home">
    <BannerSwiper :data="banners" />
    <QuickLinkNav :data="quicknavlist" />
    <!-- <CustomColumn :data="customs" /> -->

    <div class="guess-like-wrap">
      <p class="guess-title">
        <span class="guess-layout">猜你喜欢</span>
      </p>
      <GoodList :data="goodslist" />
    </div>
    <!-- <Footer :data="navs" /> -->
  </div>
</template>
<script>
import "../../assets/style/index.css";
import GoodList from './components/GoodList.vue';
import BannerSwiper from './components/BannerSwiper.vue';
import QuickLinkNav from './components/QuickLinkNav.vue';
import CustomColumn from './components/CustomColumn.vue';
import {fetchList as fetchProduct} from '@/api/product'
import {fetchList as fetchRecommend} from '@/api/recommend'
import {fetchListWithChildren} from '@/api/productCate'
export default {
    name:"home",
    components:{
       GoodList,
       BannerSwiper,
       QuickLinkNav,
       CustomColumn
      
    },
    data(){  
        return{
            topheight:0,
            page:{},
            pageData:"",
            banners:[],
            quicknavlist:[],
            customs:null,
            goodslist:[]
        }
    },
    created(){
        // console.log("enter created:")
        // this.page = this.pageData
        // console.log("pageData:"+JSON.stringify( this.page))
        // GetPage().then(response=>{
        //     this.page=response;
        // });
        this.getBanner();
        this.getCategoryIcon();
        this.getRecommed();
    },
    methods:{
        // settopheight:function(value){
        //     this.topheight=value;
        // },
        getBanner:function(){
          this.banners=[
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"格力减价大放送"},
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"米家双十一"}
            ]
           
        },
        getCategoryIcon(){
           
           fetchListWithChildren().then(response => {
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            
            this.quicknavlist.push({label: list[i].categoryName, value: list[i].categoryId, icon:list[i].categoryPic});
          }

          //添加优惠卷和秒杀活动的icon
         
          this.quicknavlist.push({label: "优惠卷", value: -1, icon:"http://mall-photo.oss-cn-beijing.aliyuncs.com/%E4%BC%98%E6%83%A0%E5%8D%B7.png",url:"/home/coupon"});
           this.quicknavlist.push({label: "秒杀活动", value: -2, icon:"http://mall-photo.oss-cn-beijing.aliyuncs.com/%E6%B4%BB%E5%8A%A8.png",url:"/home/second"});
          });
          
          
          
        },
        getRecommed(){
            let list=[
                {id:7,src:"https://mall-photo.oss-cn-beijing.aliyuncs.com/%E7%94%B5%E9%A5%AD%E9%94%854.jpg",title:"电饭煲家用4L多功能智能大容量迷你电饭锅煮饭官方旗舰店正品",price:"1764.00"},
                {id:8,src:"https://mall-photo.oss-cn-beijing.aliyuncs.com/%E7%94%B5%E9%A5%AD%E9%94%855.jpg",title:"电饭煲家用3L升多功能迷你小型电饭锅1-2人智能4官方旗舰正品",price:"5065.00"},
                {id:9,src:"https://mall-photo.oss-cn-beijing.aliyuncs.com/%E7%94%B5%E9%A5%AD%E9%94%851.jpg",title:"智能家用电饭煲4L升电饭锅蛋糕多功能全自动2人正品煮饭E503",price:"8830.00"},
                {id:10,src:"https://mall-photo.oss-cn-beijing.aliyuncs.com/%E7%94%B5%E9%A5%AD%E9%94%852.jpg",title:"电饭煲C1小米电饭煲家用大容量电饭锅3-4人多功能自动",price:"3355.00"},
                {id:11,src:"https://mall-photo.oss-cn-beijing.aliyuncs.com/%E7%94%B5%E9%A5%AD%E9%94%853.jpg",title:"电饭煲家用小型1人-2人多功能智能电饭锅3-4人官方旗舰店",price:"8718.00 "},
                {id:12,src:"https://mall-photo.oss-cn-beijing.aliyuncs.com/%E7%94%B5%E9%A5%AD%E9%94%854.jpg",title:"电饭煲5L智能大容量家用3人多功能电饭锅4L正品官方旗舰店",price:"2132.00"}
            ]
           if(this.$store.getters.token==null||this.$store.getters.token==""){
             //直接从后端读取数据渲染
              this.goodslist=list
               return;
           }
           let params={
                size:6,
                recommendType:"userBased"
           }
           fetchRecommend(this.$store.getters.userId,params).then(resp=>{
             if(resp.data==null|| resp.data.length==0){
               //没有推荐的商品,从正常数据库中读取数据库
               this.goodslist=list;
               return;
             }
             this.goodslist=[]
             resp.data.forEach(item => {
                let value={
                  id:item.goodsId,
                  src:item.goodsCoverImg,
                  title:item.goodsName,
                  price:item.sellingPrice
                }
                this.goodslist.push(value)
             });
            if(this.goodslist.length<6){
              //从后端获取商品补充不足
              let length= this.goodslist.length
              for(let i =0;i<6-length;i++){

               
                  this.goodslist.push(list[i]);
              }
            }
            
           })
         
        }
    }
};
</script>
<style  lang="less" scoped>
.guess-title {
       font-size: 15px;
    }
</style>
