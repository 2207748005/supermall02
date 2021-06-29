<template>
    <div class="recommend">
        <!-- {{recommends}} -->
         <div v-for="a in recommends" :key="a.index" class="recommend-item">
             <a :href="a.link">
                 <img :src="a.image" alt="">
                 <div>{{a.title}}</div>
             </a>
         </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
        type:Array,
        default(){
            return []
        }
     }
    }
}
</script>

<style scoped>
     .recommend{
         display: flex;
         width: 100%;
         text-align: center;
         font-size: 12px;
         padding: 10px 0px 20px;
         border-bottom: 10px solid #eee;
     }
     .recommend-item{
         flex: 1;
     }
     .recommend-item img{
         width: 60px;
         height:60px;
     }
</style>