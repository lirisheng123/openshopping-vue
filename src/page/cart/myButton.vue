<template>
  
     <van-button :click="deleteClick" :disabled="!checkedGoods.length"   size="normal" center square type="danger">删除</van-button>
</template>

<script>

export default {
  name:'my-button',
    props:{
      
        checkedGoods: {
            type: Boolean,
            default: false
        }
    },
    // watch:{
    //    isDelete: function (val) {
           
    //        this.fullName = val + ' ' + this.lastName
    //     }
    // },
    methods: {
     
      deleteClick(){
          console.log("delete click触发")
          this.$emit('deleteClick', true)
      }
    }
};
</script>

<style lang="less">

    
</style>