<template>
  <div class="good-list-wrap">
    <ul class="good-list-box">
      <li class="good-list-item" v-for="good in data" :key="good.id">
        <router-link :to="'/product/' + good.id">
          <div class="good-product">
            <div class="good-img">
              <img class="lazy-img-fadein" v-lazy="good.src" />
            </div>

            <p class="good-text">{{ good.title }}</p>

            <p class="good-price">
              ¥&nbsp;
              <span class="price">{{ good.price }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script >


export default {
    name:"goodList",
    props: {
        data:{
        type: Array,
        default: () => []
        }
    },
    data(){  
        return{
            topheight:0,
            page:{},
           
            banners:null,
            quicknavlist:null,
            customs:null,
            goodslist:null
        }
    },
    created(){
      
        
    },
    methods:{
        settopheight:function(value){
            this.topheight=value;
        }
    }
};
</script>

<style lang="less" scoped>
.good-list-box {
  overflow: hidden;

  .good-list-item {
    float: left;
    width: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 8px;
    position: relative;

    padding: 15px;
     height: 250px;

    &:nth-child(odd) {
      padding-right: 4px;
    }

    &:nth-child(2n) {
      padding-left: 4px;
    }

    a {
      display: block;
    }

    .good-product {
      background-color: #fff;
      padding-bottom: 6px;
      font-size: 0;

      .good-img {
        position: relative;
        width: 100%;
        height: 160px;

        img {
          // width: 371px;
          // height: 371px;
           height: 160px;
        }
      }

      .good-text {
        height: 25px;
         font-size: 13px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
        color: #232326;
        margin-top: 10px;
        line-height: 32px;
        margin-bottom: 6px;
        padding: 0 10px;
      }

      .good-price {
           height: 20px;
           font-size: 15px;
        overflow: hidden;
        color: #f23030;
        display: inline-block;
        padding: 0 10px 0 8px;
        position: relative;
        top: 5px;
        line-height: 20px;
      }
    }
  }
}
// .good-product {
//       background-color: #fff;
//       padding-bottom: 6px;
//       font-size: 0;

//       .good-img {
//         position: relative;
//         width: 100%;

//         img {
//           width: 371px;
//           height: 371px;
//         }
//       }

//       .good-text {
//         height: 65px;
//         font-size: 26px;
//         overflow: hidden;
//         -o-text-overflow: ellipsis;
//         text-overflow: ellipsis;
//         display: -webkit-box;
//         -webkit-line-clamp: 2;
//         -webkit-box-orient: vertical;
//         word-break: break-word;
//         color: #232326;
//         margin-top: 10px;
//         line-height: 32px;
//         margin-bottom: 6px;
//         padding: 0 10px;
//       }

//       .good-price {
//         height: 50px;
//         font-size: 28px;
//         overflow: hidden;
//         color: #f23030;
//         display: inline-block;
//         padding: 0 10px 0 8px;
//         position: relative;
//         top: 5px;
//         line-height: 50px;
//       }
//     }
</style>
