<template>
    <van-cell-group class="additional">
        <van-card
        :title="product.title"
        :desc="product.desc"
        :num="(iscard?null:product.quantity)"
        style="background:#fff"
        >
            <template slot="thumb">
                <img :src="product.imageURL" />
                <p v-if="product.imageTag!=null&&product.imageTag!=''" class="image_tag">{{product.imageTag}}</p>
            </template>
            <template slot="tags">
                <p class="price" v-if="product.price!=null&&product.price!=''" >
                    ￥<span>{{product.price}}</span>
                    <!-- 修改 -->
                    <!-- <van-tag v-if="product.tags!=null" v-for="tag in product.tags" :key="tag" plain type="danger">{{tag}}</van-tag> -->
                    <ul v-if="product.tags!=null">
                    <van-tag  v-for="tag in product.tags" :key="tag" plain type="danger">{{tag}}</van-tag>
                    </ul>
                </p>
                <van-stepper v-if="iscard" v-model="product.quantity" :max="product.max"  :min="product.min"  :onChange="onChange(product)" />
            </template>
        </van-card>
        <van-cell  v-for="(gift,j) in product.gift" :key="j"  :value="'x'+gift.quantity" >
            <template slot="title">
                <van-tag type="danger" v-if="j==0" >赠品</van-tag>
                <span class="van-cell-text" :style="(j>0?'margin-left: 35px;':'')" >{{gift.title}}</span>
            </template>
        </van-cell>
        <slot />
    </van-cell-group>
</template>

<script>
export default {
    name:'product-card',
    props:{
        product:Object,
        iscard: {
            type: Boolean,
            default: false
        },
    },
    methods: {
      onChange(product){
          console.log("child product quantity:"+JSON.stringify(product))
          this.$emit('onChange', product)
      }
    }
}
</script>

<style lang="less">
.additional {
    .van-cell {
        padding: 0 15px;
        font-size: 12px;
    }
    .van-cell:not(:last-child)::after{
        border:0;
    }
    .van-card__title{
        font-size: 14px;
    }
    .van-cell__title {
        flex: 10;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .van-tag {
        line-height: 12px;
        margin-right: 5px;
    }
    .price {
          
      height: 22px;
      color: #e93b3d;
      font-size: 10px;
        overflow: hidden;
        height: 18px;
      span {
        font-size: 16px;
            margin-right: 5px;
      }
      .van-tag{
        font-size: 12px;
      }
    }
    .van-stepper{
        position: absolute;
        bottom: 5px;
        right: 5px;
        &__plus{
            width: 30px;
        }
        &__minus{
            width: 30px;
        }
    }
    .image_tag{
        position: absolute;
        bottom: 0;
        width: 90px;
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        color: #fff;
        text-align: center;
        background-color: rgba(0,0,0,.7);
    }
}
.additional::after{
    border-color: #f7f7f7;

}


</style>
