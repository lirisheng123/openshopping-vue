<template>
 <div>
  <div class="card">
    <headerNav title="购物车"/>
       <van-cell  :value="editName" @click="editClick()"  class="head">
        <!-- <template slot="title"  >
          <van-checkbox v-model="checkedAll" >全选</van-checkbox>
        </template> -->
       </van-cell>
        
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      
      <div class="promotion-group">
        <div  v-for="(item,index) in goods"
          :key="index" class="card-goods__item"> 
          <van-checkbox :name="item.id"></van-checkbox>

          <product-card :product='item' :iscard='true' @onChange="onChange"  >
            <!-- <template slot>
              <van-cell value="" >
                  <template slot="title">
                      <van-tag type="danger">{{""}}</van-tag>
                      <span class="van-cell-text" >{{""}}</span>
                  </template>
              </van-cell>
            </template> -->
          </product-card>
        </div>
        </div>
    
       <!-- <div class="promotion-group">
        
        <van-cell  is-link class="head">
        <template slot="title">
          <van-checkbox v-model="checkedAll" >京东自营</van-checkbox>
        </template>
      </van-cell> 
      
      
      <div  v-for="(item,index) in goods"
        :key="index+10" class="card-goods__item"> 
        <van-checkbox :name="item.id"></van-checkbox>
      
        <product-card :product='item' :iscard='true' >
          <template slot>
            <van-cell value="修改" >
                <template slot="title">
                    <van-tag type="danger">促销</van-tag>
                    <span class="van-cell-text" >满60元减5元</span>
                </template>
            </van-cell>
          </template>
        </product-card>
      </div> 
       <van-cell value="去凑单" is-link class="promotion">
        <template slot="title">
          <p><van-tag type="danger">满减</van-tag>购满60元，可减5元</p>
        </template>
      </van-cell> 
      <div  v-for="(item,index) in goods"
        :key="index+20" class="card-goods__item"> 
        <van-checkbox :name="item.id"></van-checkbox>
      
        <product-card :product='item' :iscard='true' >
          <template slot>
            <van-cell value="修改" >
                <template slot="title">
                    <van-tag type="danger">促销</van-tag>
                    <span class="van-cell-text" >满60元减5元</span>
                </template>
            </van-cell>
          </template>
        </product-card>
      </div>
        </div>  -->
    </van-checkbox-group>
    
    <!-- <div style="height:50px;"></div> -->
     
    <van-submit-bar v-if="!isEidt"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >
    <template slot>
      <van-checkbox v-model="checkedAll"  >全选</van-checkbox>
    </template>
    </van-submit-bar> 
  <!-- <div v-if="isEidt" >
     <van-button @click="deleteClick()" :disabled="!checkedGoods.length"   size="normal" center square type="danger">删除</van-button>
  </div> -->
    <van-cell v-if="isEidt"  class="bottom"   > 
        <template slot="title">
          <van-checkbox v-model="checkedAll"   >全选</van-checkbox>
           <!-- <van-button :click="deleteClick()" :disabled="!checkedGoods.length"   size="normal" center square type="danger">删除</van-button> -->
        </template>
        <template slot="right-icon"  >
          <van-button @click="deleteClick()" :disabled="!checkedGoods.length"   size="normal" center square type="danger">删除</van-button>
        </template>
     </van-cell> 
   
  </div>
  <navigate />
 </div>
</template>

<script>
import {fetchShopList,deleteShoppingCart,clearShopCart,updateQuantity} from "@/api/shoppingCart"
import user from '../../store/modules/user'
import myButton   from './myButton'
export default {
  components: {
    myButton
  },
  data() {
    return {
      checkedAll:false,
      isEidt:false,
     
      // checkedGoods: ['1', '2', '3'],
      checkedGoods: [],
      goods:[]
      // goods: [{
      //   id: '1',
      //   title: '星巴克(Starbucks)星冰乐 轻盈香草味 咖啡饮料 281ml*6瓶礼盒装低脂减糖',
      //   desc: '3.18kg/件',
      //   price: '200.00',
      //   quantity: 1,
      //   imageURL: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg',
      //   imageTag:'比加入时降5元',
      // }, {
      //   id: '2',
      //   title: '陕西蜜梨',
      //   desc: '约600g',
      //   price: '690.00',
      //   quantity: 1,
      //   imageURL: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg',
      //     gift: [
      //       {
      //         title: "星巴克（Starbucks）星冰乐小熊吊饰星巴克（Starbucks）星冰乐小熊吊饰",
      //         quantity: 2
      //       },
      //       {
      //         title: "星巴克（Starbucks）星冰乐小熊吊饰星巴克（Starbucks）星冰乐小熊吊饰",
      //         quantity: 1
      //       }
      //     ]
      // }, {
      //   id: '3',
      //   title: '美国伽力果',
      //   desc: '约680g/3个',
      //   price: '2680.00',
      //   quantity: 1,
      //   imageURL: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
      // }]
    };
  },
  created(){
      if(this.$store.getters.token==undefined||this.$store.getters.token==null||this.$store.getters.token==''){
       //没登录
         this.$router.push("/login")
         return
       }
     this.getShopCartList()
  },
  watch: {
     checkedAll: function (val) {
        console.log("checkedAll:"+typeof(val) )
        if(val==true){
          this.checkedGoods=this.goods.map(item=>{
            return  item.id
          })
        }else{
            console.log("checkedAll:false")
           this.checkedGoods=[]
         }
       }
     
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },
    totalPrice() {
      return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? parseFloat(item.price)*(item.quantity)*100: 0), 0);
    },

    editName(){
      return this.isEidt?"完成":"管理"
    }
  },
  methods: {
    onSubmit() {
      
      let cateIds=[]
      
       for(let i=0;i<this.goods.length;i++){
          if(this.checkedGoods.indexOf(this.goods[i].id) !== -1){
              cateIds.push(this.goods[i].id);
          }
       }
       console.log("cateIds:"+JSON.stringify(cateIds))

      this.$router.push({path: '/order', query: {cateIds: cateIds}})
    },
    getShopCartList(){
        //暂时默认为4,等与权限集成的时候,在进行改变
       let userId=this.$store.getters.userId
       this.goods=[]
       console.log("goods:"+JSON.stringify(this.goods))
       fetchShopList(userId).then(resp=>{
          let data= resp.data;
          for(let i=0;i<data.length;i++){
            let value={
                id: data[i].cartItemId,
                title:  data[i].goodsName,
                desc: data[i].goodsInfo,
                price: data[i].goodsPrice,
                quantity:data[i].goodsCount,
                imageURL:data[i].goodsCoverImg,
                imageTag:''
                // imageTag:'比加入时降5元',
            }
            this.goods.push(value)
          }
       })
    },
    editClick(){
      this.isEidt=!this.isEidt
    },
    onChange(product){
      console.log("quantity product:"+JSON.stringify(product))
      //更改购物的状态
      updateQuantity(product.id,{quantity:product.quantity}).then(resp=>{
        if(resp.code!=200){
          this.$toast("修改数量失败")
        }
      })
    },
    deleteClick(){
      // console.log("value:"+value)
       console.log("删除触发")
       let userId=this.$store.getters.userId
       let param={
         ids:this.checkedGoods
       }
       console.log("delete:"+param)
       deleteShoppingCart(userId,this.checkedGoods).then(resp=>{
          if(resp.code!=200){
             this.$$toast("删除失败")
          }else{
            //删除成功
            this.getShopCartList()
            this.checkedAll=false
            // this.checkedGood=[]
            
          }
       })
    }
  }
};
</script>

<style lang="less">
.card-goods {
  font-size: 12px;
  &__item {
    position: relative;
    .van-checkbox{
      width: 20px;
      height: 20px;
      top: 40px;
      left: 5px;
      z-index: 1;
      position: absolute;
    }
    .additional{
      width: 100%;
        padding-left: 15px;
    box-sizing: border-box;
    }
  }
}
.head{
      padding-left: 5px;
     border-bottom: 1px solid #eee;
}

.bottom{
     
    left: 0;
    bottom: 50px;
    width: 100%;
    z-index: 100;
    position: fixed;
    -webkit-user-select: none;
    user-select: none;
}

.card{
  background: #f7f7f7;
  .van-submit-bar__bar {
      border-top: 1px solid #f7f7f7;
      .van-checkbox{
        padding-left: 5px;
      }
  }
  .promotion{
      .van-tag {
          line-height: 12px;
          margin-right: 5px;
      }
      .van-cell__title{

      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
    }
    .promotion-group{
      margin-top: 10px;
      box-shadow: 5px 5px 5px #e5e5e5;
    }
}

.edit{
   padding-left: 5px;
   border-bottom: 1px solid #eee;
   position: absolute;
   bottom: 0px;
}
.edit .editButtom{
   width: 20%;
   height: 100%;
}

.van-submit-bar {
  
    bottom: 50px;
   
}

    
</style>