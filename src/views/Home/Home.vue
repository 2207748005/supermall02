<template>
    <div id="home">
        <!-- <h2>首页</h2> -->
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <!-- 这里是给轮播图传值 -->
        <HomeSwiper :banners="banners"></HomeSwiper> 
        
        <!-- 导航 -->
        <RecommendView :recommends="recommends"></RecommendView>
        <FeatrueView></FeatrueView>
        <TabControl 
        class="tab-control" 
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ></TabControl>
        <GoodsList :goods="showGoods"></GoodsList>
    </div>

</template>

<script>
// 引入组件

import HomeSwiper from './childcomps/HomeSwiper'
import RecommendView from './childcomps/RecommendView'
import FeatrueView from './childcomps/FeatrueView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata,getHomeGoods } from 'network/home'

export default {
    name:"Home", 
    components:{
        NavBar,//头部导航
        HomeSwiper,//轮播图
        RecommendView,//轮播图下面的详情条
        FeatrueView,//本周流行
        TabControl,//
        GoodsList//商品展示部分
    },
    data() {
        return {
            // result:null
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop'
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created() {
        //请求多个数据 
       this.getHomeMultidata();
        // 请求商品数据
       this.getHomeGoods('pop');
       this.getHomeGoods('new');
       this.getHomeGoods('sell');
    },
    methods: {
        // 事件监听相关的方法
         tabClick(index){
             switch(index){
                 case 0:
                     this.currentType='pop'
                     break;
                 case 1:
                     this.currentType='new'
                     break;
                 case 2:
                     this.currentType='sell'
                     break;
             }
         },

        //  网络请求相关的方法
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
            // console.log(res)
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
        })
        },
        getHomeGoods(type){
            const page=this.goods[type].page + 1;
            // console.log(page);
            getHomeGoods(type,page).then( res => {
            // console.log(res)
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;
        })
        }
    },
}
</script>
<style scoped>
/* 解决顶部吞噬 */
    #home{
      padding-top: 44px;
    }
   .home-nav{
       background-color: var(--color-tint);
       color: white;
       position: fixed;
       left: 0px;
       right: 0px;
       top: 0px;
       z-index: 1;
   }
   .tab-control{
       /* 粘性定位 */
       position: sticky;
       background-color: white;
       z-index: 1;
       top: 44px;
   }
</style>