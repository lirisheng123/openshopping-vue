<template>
  <div class="goods">
     <headerNav title="商品详情"/>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <span class="goods-price">{{ goods.price }}</span>
        <!-- <span class="goods-market-price">{{ formatPrice(goods.market_price) }}</span> -->
        <!-- <span class="goods-price">{{ formatPrice(goods.price) }}</span>
        <span class="goods-market-price">{{ formatPrice(goods.market_price) }}</span> -->
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-subtit">{{goods.subtitle}}</div>
      </van-cell>
      
      <van-cell   @click="onClickShowTag" class="goods-tag" >
        <template slot="title" style="font-size:10px;">
            <!-- <img src="https://haitao.nos.netease.com/ba8a4c2fdaa54f82a45261293c116af61419663676663i46n3jlh10028.png"/>
            <span >挪威品牌</span>
            <img src="https://haitao.nosdn2.127.net/13bd59e6e29a4f06b278c586629e690d.png" /> -->
            <span >跨境商品</span>
            <van-icon name="passed" color="red" />
            <span >次日达</span>
            <van-icon name="passed" color="red" />
            <span >自提</span>
            <van-icon name="passed" color="red" />
            <span >闪电退款</span>
            <van-icon name="passed" color="red" />
            <span >前海保税仓</span>
            <van-icon name="passed" color="red" />
            <span >七天无理由退货（拆封后不支持）</span>
        </template>
      </van-cell>   
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell is-link  @click="showPromotion" >
        <template slot="title">
            <span style="margin-right: 10px;">领券</span>
            <van-tag type="danger" mark  style="margin-right: 5px;">满180减30</van-tag>
            <van-tag type="danger" mark  style="margin-right: 5px;">满300减100</van-tag>
        </template>
      </van-cell>
      
      <van-cell  is-link @click="showPromotion" >
        <template slot="title">
            <span style="margin-right: 10px;">促销</span>
            <van-tag type="danger" style="margin-right: 5px;">多买优惠</van-tag>
            <van-tag type="danger" style="margin-right: 5px;">满减</van-tag>
            <van-tag type="danger" style="margin-right: 5px;">限购</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    
    <van-cell-group class="goods-cell-group">
      <van-cell  is-link @click="showSku" >
        <template slot="title">
            <span style="margin-right: 10px;">已选</span>
            <span >选择商品</span>
        </template>
      </van-cell>
      
    </van-cell-group>
    
    <div class="goods-info">
        <p class="goods-info-title" >图文详情</p>
        <div v-html="goods.info"></div>
    </div>
    <van-goods-action>
        
      <van-goods-action-mini-btn icon="like-o" @click="sorry">
        收藏
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="showSku">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="showSku">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
    <van-actionsheet v-model="show" title="促销" style="font-size:14px;">
        
            <van-cell  is-link @click="sorry" >
                <template slot="title">
                    <van-tag type="danger">多买优惠</van-tag>
                    <span> 满2件，总价打9折</span>
                </template>
            </van-cell>
            <van-cell  is-link @click="sorry" >
                <template slot="title">
                    <van-tag type="danger">满减</van-tag>
                    <span> 满100元减50元</span>
                </template>
            </van-cell>
            <van-cell  is-link @click="sorry" >
                <template slot="title">
                    <van-tag type="danger">限购</van-tag>
                    <span> 购买不超过5件时享受单件价￥8.00，超出数量以结算价为准</span>
                </template>
            </van-cell>
    </van-actionsheet>
    
    <van-actionsheet v-model="showTag" title="服务说明" style="font-size:14px;">
        
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >次日达</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">指定时间前下单，次日送达</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >自提</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">我们提供多种自提服务，包括自提点、自助提货柜、移动自提车等服务</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >闪电退款</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">签收7天内退货的，提供先退款后退货服务。</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >七天无理由退货（拆封后不支持）</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">七天无理由退货（拆封后不支持）</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >前海保税仓</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">本商品由前海保税仓发货</div>
                </template>
            </van-cell>
    </van-actionsheet>
    <van-sku
          v-model="showBase"
          :sku="skuData.sku"
          :goods="skuData.goods_info"
          :goods-id="skuData.goods_id"
          :hide-stock="skuData.sku.hide_stock"
          :quota="skuData.quota"
          :quota-used="skuData.quota_used"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
           disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay"
          :message-config="messageConfig"
          :custom-sku-validator="customSkuValidator"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
  </div>
</template>

<script>
import skuData from '../../data/sku';
import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
import {fetchList as fetchProductAttrList} from '@/api/goodPropertyRelate'
import {getProduct as fetchProductList} from '@/api/product' 
import {createShoppingCart} from "@/api/shoppingCart"
import { selectById,fetchList} from "@/api/flash";
import {fetchList as fetchSecondPropertyList} from "@/api/flashProductRelation";
export default {
  components: {
  },
  data() {
    // this.skuData = skuData;
    // this.skuData ={};
    return {
      skuData:{},
      show:false,
      showTag:false,
      goods:{},
     
      // goods: {
      //   title: '【每日一粒益智又长高】 Lifeline Care 儿童果冻鱼油DHA维生素D3聪明长高 软糖 30粒 2件装',
      //   subtitle:'【品牌直采】Q弹美味，无腥味果冻鱼油，每粒含足量鱼油DHA，帮助视网膜和大脑健康发育，让你的宝宝明眼又聪明，同时补充400国际单位维生素D3，强壮骨骼和牙齿。特含DPA，让宝宝免疫力更强，没病来扰。',
      //   price: 2680,
      //   market_price:9999,
      //   express: '免运费',
      //   remain: 19,
      //   thumb: [
      //     'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
      //     'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
      //   ],
      //   info:'<p style="text-align:center;"><img src="https://haitao.nosdn2.127.net/ac19460151ee4d95a6657202bcfc653c1531470912089jjjq8ml410763.jpg" ></p><p style="text-align:center;"><img src="https://haitao.nos.netease.com/2a91cfad22404e5498d347672b1440301531470912182jjjq8mnq10764.jpg" ></p><p style="text-align:center;"><img src="https://haitao.nos.netease.com/caddd5a213de4c1cb1347c267e8275731531470912412jjjq8mu410765.jpg" ></p>',
      // },
      showBase: false,
      showCustom: false,
      showStepper: false,
      closeOnClickOverlay: true,
      initialSku: {},
      // initialSku: {
      //   s1: '30349',
      //   s2: '1193'
      // },
      goodPropertyRelate:[],
      goodProperty:[],
      product:{},
      customSkuValidator: (component) => {
        return '请选择xxx';
      },
      customStepperConfig: {
        quotaText: '单次限购100件',
        stockFormatter: (stock) => `剩余${stock}间`,
        handleOverLimit: (data) => {
          const { action, limitType, quota } = data;
          if (action === 'minus') {
            this.$toast('至少选择一件商品');
          } else if (action === 'plus') {
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              this.$toast(`限购${quota}件`);
            } else {
              this.$toast('库存不够了~~');
            }
          }
        }
      },
      messageConfig: {
        uploadImg: (file, img) => {
          return new Promise(resolve => {
            setTimeout(() => resolve(img), 1000);
          });
        },
        uploadMaxSize: 3
      },
      isSecond:false
    };
  },
  created(){
    //判断是否为为秒杀
    if(this.$route.query.second!=undefined&&this.$route.query.second!=null){
        //为秒杀
        this.isSecond=true
        this.getSecondProductDetail()
    }else{
      //不为秒杀
        this.isSecond=false
      this.getProductDetail();
    }
    
    // this.getSkuData();
  },
  methods: {
    formatPrice(data) {
      return '¥' + (data / 100).toFixed(2);
    },
    onClickCart() {     
     this.$router.push('/cart');
    },
    sorry() {
      Toast('暂无后续逻辑~');
    },
    showPromotion() {
        this.show=true;
    },
    showSku(){
        this.showBase=true;
    },
    onClickShowTag(){
        this.showTag=true;
    },
    onBuyClicked(data) {
      //直接购买
      //判断是否登录
      if(this.$store.getters.token==undefined||this.$store.getters.token==null||this.$store.getters.token==''){
       //没登录
         this.$router.push("/login")
         return
       }

    
      this.$toast(JSON.stringify(data));
       //携带着商品信息跳转到订单页面
       let params = {
         	
            "goodsCoverImg":this.goods.thumb[0],
            "goodsInfo":data.selectedSkuComb.goodsPropertyValue,
            "goodsName":this.goods.title,
            "goodsPropertyId":  data.selectedSkuComb.id,
            "sellingPrice":data.selectedSkuComb.realPrice,
            "goodsCount": data.selectedNum
           
       }
       console.log("producntParams:"+JSON.stringify(params))
       this.$router.push({path: '/order', query: {params: params,isSecond:this.isSecond}})
    },
    onAddCartClicked(data) {
      //判断是否登录
      if(this.$store.getters.token==undefined||this.$store.getters.token==null||this.$store.getters.token==''){
         //没登录
         this.$router.push("/login")
         return
       }

      if(this.isSecond==true){
         this.$toast("秒杀不能加入购物车")
         return
       }
      this.$toast(JSON.stringify(data));
      console.log("data:"+JSON.stringify(data))
      let userId =this.$store.getters.userId;
      let params={
         "goodsCount":data.selectedNum ,
         "goodsCoverImg": this.goods.thumb[0],
         "goodsInfo": data.selectedSkuComb.goodsPropertyValue,
         "goodsName": this.goods.title,
         "goodsPrice": data.selectedSkuComb.realPrice,
         "goodsPropertyId": data.selectedSkuComb.id,
         "userId": userId
      }
       console.log("producntParams cart:"+JSON.stringify(params))
      createShoppingCart(params).then(resp=>{
           if(resp.code==200){
            //  this.$router.push('/cart');
            this.$toast("加入购物车成功")
            //跳转到购物车页面
             this.showBase=false;
             
            // this.$router.push("/cart")
           }
           else{
             this.$toast("加入购物车失败");
             this.showBase=false;
           }
      })
    },
    getProductDetail(){
       //获取goodId ,根据路由获得
       let goodsId=this.$route.params.id
       fetchProductList(goodsId).then(resp=>{
          //构造 goods,skuData
          this.product = resp.data;
          this.goods={
              title: this.product.goodsName,
              price: this.product.sellingPrice,
              market_price:this.product.originalPrice,
              express: '免运费',
              remain: 19,
              thumb: [
                  this.product.goodsCoverImg,
                  this.product.goodsCoverImg
                // 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
              ],
              info:'<p style="text-align:center;"><img src="http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg" ></p><p style="text-align:center;"><img src="http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg" ></p><p style="text-align:center;"><img src="http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg" ></p>',
          }
          console.log("goods:"+JSON.stringify(this.goods))
          
          fetchSkuStockList(goodsId,{keyword:""}).then(response=>{
              this.goodProperty=response.data;
              console.log("goodProperty:"+JSON.stringify(this.goodProperty))

               fetchProductAttrList(goodsId,{type:0}).then(response=>{
                this.goodPropertyRelate=response.data;
                console.log("goodPropertyRelate:"+JSON.stringify(this.goodPropertyRelate))
                  this.getSkuData();
               });
          });

       })
      
    },
    getSecondProductDetail(){
      let flashId=this.$route.params.id
      console.log("flashId:"+flashId)
       selectById(flashId).then(resp=>{
          //构造 goods,skuData
          if(resp.data==null){
                    console.log("获取flash失败")
                    return
           }
          this.product = resp.data;
          fetchProductList(this.product.goodsId).then(resp=>{
          //构造 goods,skuData
           if(resp.data==null){
                    console.log("获取goodInfo失败")
                    return
           }
          let data = resp.data;
          this.goods={
              title: data.goodsName,
              price: this.product.sellingPrice,
              market_price:this.product.price,
              express: '免运费',
              remain: 19,
              thumb: [
                  data.goodsCoverImg,
                  data.goodsCoverImg
                // 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
              ],
              info:'<p style="text-align:center;"><img src="http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg" ></p><p style="text-align:center;"><img src="http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg" ></p><p style="text-align:center;"><img src="http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg" ></p>',
          }
          console.log("goods:"+JSON.stringify(this.goods))
          
          fetchSkuStockList(this.product.goodsId,{keyword:""}).then(response=>{
             if(resp.data==null||resp.data.length==0){
                    console.log("获取goodProperty失败")
                    return
              }
              this.goodProperty=response.data;
              console.log("goodProperty:"+JSON.stringify(this.goodProperty))
              //把goodPropery中的秒杀价格
              fetchSecondPropertyList(this.$route.params.id).then(resp=>{
                  if(resp.data==null||resp.data.length==0){
                    console.log("根据flashId获取相应的secondPropery")
                    return
                  }
                  resp.data.forEach(item => {

                      this.goodProperty.forEach(item1=>{
                         if(item.goodsPropertyId==item1.goodsPropertyId){
                            // console.log("item:"+JSON.stringify(item))
                             item1.originalPrice=item.propertyPrice
                             item1.sellingPrice=item.propertySellingPrice
                             item1.selledStockNum=item.propertySelledCount
                             item1.stockNum=item.propertyCount
                            //  console.log("item1:"+JSON.stringify(item1))
                         
                         }
                      })
                  });
                  console.log("change goodProperty:"+JSON.stringify(this.goodProperty))
                  fetchProductAttrList(this.product.goodsId,{type:0}).then(response=>{
                  this.goodPropertyRelate=response.data;
                  console.log("goodPropertyRelate:"+JSON.stringify(this.goodPropertyRelate))
                   this.getSkuData();
                  });
              })
             
          });

       })
          
       })
    },
    getSkuData(){

      console.log("enter sku data")
      let tree=this.getTree(this.goodPropertyRelate);

      let list=this.getPropertyList(this.goodProperty,tree);
      let sku= {
        tree: tree,
        list: list,
        price: this.product.sellingPrice,
        market_price:'10.00',
        stock_num: 227,
        collection_id: 2261,
        collection_price: 0,
        none_sku: false,
        sold_num: 0,
        min_price: '1.00',
        max_price: '1.00',
        messages: [
        ],
        hide_stock: false
      }
      console.log("sku:"+JSON.stringify(sku))
      this.skuData={
        kdt_id: 55,
        user_id: 4674509,
        offline_id: 0,
        activity_alias: '',
        sku: sku,
        goods_id: '946755',
        alias: '2oml0r0n5vytj',
        quota: 15,
        is_virtual: '0',
        quota_used: 0,
        goods_info: {
          title: '商品属性',
          picture:this.goods.thumb[0],
          price: 1,
          origin: ''
        }
      }
      console.log("skuData:"+JSON.stringify(this.skuData))
    },
    getTree(list){
    let tree=[]
     console.log("tree list:"+JSON.stringify(list))
    for(let i=0;i<list.length;i++){
      let values=this.getPropertyRelateValue(list[i].goodsPropertyRelateValue)
      let single={
          k: list[i].goodsPropertyRelateName,
          k_id: i,
          v: values,
          k_s: 's'+(i+1),
          count: list.length
      }
      tree.push(single)
    }
    console.log("tree:"+JSON.stringify(tree))
    return tree
    
    },
    getPropertyRelateValue(list){
    let  values=[];
    list = list.split(",")
    for(let i=0;i<list.length;i++){
      let value={
        id: i,
        name: list[i],
        imgUrl:this.goods.thumb[0]
        // imgUrl:
        // 'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
      }
      values.push(value)
    }
    console.log("relateValue:"+values)
    return values;
    },
    getPropertyList(propertys,tree){
      let list=[]
      for(let i=0;i<propertys.length;i++){
        //value为商品属性的值,例如{"容量":1L,"颜色":红色}
        // let values = propertys[i].goodsPropertyValue
        let s1
        let s2
        if(tree.length==2){
             s1 = this.getValueBySn(propertys[i].goodsPropertyValue,tree[0])
             s2 =this.getValueBySn(propertys[i].goodsPropertyValue,tree[1])
        }else{
            s1=this.getValueBySn(propertys[i].goodsPropertyValue,tree[0])
            s2='0'
        }
        let single={
          id: propertys[i].goodsPropertyId,
          //2021/4/15修改这里
          goodsPropertyValue:propertys[i].goodsPropertyValue,
          price: propertys[i].sellingPrice*100,
          realPrice:propertys[i].sellingPrice,
          discount: 100,
          code: '',
          s1: s1,
          s2: s2,
          extend: null,
          kdt_id: 55,
          discount_price: 0,
          stock_num: propertys[i].stockNum,
          stock_mode: 0,
          is_sell: null,
          combin_sku: false,
          goods_id: propertys[i].goodsId
        }
        list.push(single)
      }
      console.log("list:"+list)
      return list;  


    },
    getValueBySn(propertyValue,tree){
      propertyValue =JSON.parse(propertyValue)
      console.log("ValueBySn propertyValue:"+JSON.stringify(propertyValue))
       console.log("ValueBySn tree:"+JSON.stringify(tree))
      for(let i=0;i< propertyValue.length;i++){
        console.log("ValueBySn key:"+propertyValue[i].key)
        if(propertyValue[i].key==tree.k){
          let v = tree.v;
          for(let j=0;j<v.length;j++){
              if(v[j].name==propertyValue[i].value){
                console.log("ssssssssssss:"+v[j].id)
                return   v[j].id;
              }
          }
        }
      }

    }
  }
 
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }
  &-tag{
      font-size: 12px;
        border-top: 1px solid #e5e5e5;
        span{
      margin-right: 10px;
        }
        i{
            color: red;
            margin-right: 3px;
        }
        img{
          width: 12px;
          margin-right: 3px;
          margin-top: 6px;
      }
  }
  &-title {
        line-height: 18px;
    padding-top: 10px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #333;
    font-weight: 700;
    border-top: 1px solid #f0f0f0;
  }
  &-subtit{
      font-size: 13px;
    color: #333;
    line-height: 21px;
  }
  &-price {
    color: #f44;font-size: 20px;
  }
  &-market-price {    
    text-decoration: line-through;
    margin-left: 8px;
    font-size: 13px;
    color: #999;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-info-title{
      height: 44px;line-height: 44px;text-align: center;font-size: 14px;font-weight: 700;margin: 10px;border-top: 1px solid #e5e5e5;
  }
  &-info p{
          margin: 0;
    padding: 0;
    margin-block-end: 0;
    margin-block-start: 0;
    display: grid;
  }
  &-info img{
      width: 100%;
  }
}
</style>