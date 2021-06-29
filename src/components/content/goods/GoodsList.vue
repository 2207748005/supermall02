<template>
    <div class="goods">
        <GoodsListItem 
        :key="index" 
        :goodsItem="item" 
        v-for="(item,index) in goods"/>
       <!-- {{goods}} -->
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    name:"GoodsList",
    components:{
        GoodsListItem
    },
    props:{
         goods:{
             type:Array,
             default(){
                 return []
             }
         }
    }
}
</script>

<style scoped>
     .goods{
         display: flex;
         flex-wrap: wrap;
         justify-content:space-around;
     }

</style>