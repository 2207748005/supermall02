<template>
<!-- 监听事件itemClick() -->
    <div class="tab-bar-item" @click="itemClick()">
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
        <div v-if="!isActive">
            <slot  name="item-icon"></slot>
        </div>
        <slot v-else name="item-icon-active"></slot>
        <!-- 动态绑定类 -->
        <div :style="activeStyle">
            <slot name="item-txt"></slot>
        </div>
        
        </div>   
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path: String,
        activeColor:{
            type:String,
            default:'#FF5777'
        }
    },
    data() {
        return {
            // isActive:true,
            // path:'/Home'
        }
    },
    computed:{
        //让路由动态决定颜色的改变
        isActive(){
            // 如果里面包含就返回true，不包含则返回false
            return this.$route.path.indexOf(this.path)!==-1 
        },
        activeStyle(){
            // 看isActive是否处于活跃
            return this.isActive ? {color : this.activeColor } : {}
        }
    },
    methods: {
        itemClick(){
            this.$router.replace(this.path)
        }
    },
    
}
</script>

<style>
   #tab-bar{
        display: flex;
        background-color: #f6f6f6;
        position: fixed;
        bottom:0px;
        left:0px;
        right:0px;
        box-shadow: 0px -3px 10px rgba(100, 100, 100, 0.1);
    }
    .tab-bar-item{
        flex: 1;
        text-align: center;
        height: 49px;
    }

    .tab-bar-item img{
        height:24px;
        width:24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
    /* .active{
        color: #FF5777;
        } */
</style>