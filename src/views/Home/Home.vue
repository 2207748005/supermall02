<template>
    <div id="home" class="wrapper">
        <!-- <h2>首页</h2> -->
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
         <TabControl class="tab-control" 
                     :title="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
                     v-show="isTabFixed"></TabControl>
        <Scroll class="content" 
                ref="scroll" 
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <!-- 这里是给轮播图传值 -->
        <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper> 
        
        <!-- 导航 -->
        <RecommendView :recommends="recommends"></RecommendView>
        <FeatrueView></FeatrueView>
        <TabControl 
        :title="['流行','新款','精选']"
        @tabClick = "tabClick"
        ref="tabControl"
        ></TabControl>
        <GoodsList :goods="showGoods"></GoodsList>
        </Scroll>
        <!-- native把子组件变成原生的html元素，就可以监听到他的click事件了 -->
        <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
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
import Scroll from 'components/common/scroll/Scroll' //引用移动端滚动插件
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata,getHomeGoods } from 'network/home'

export default {
    name:"Home", 
    components:{
        NavBar,//头部导航
        HomeSwiper,//轮播图
        RecommendView,//轮播图下面的详情条
        FeatrueView,//本周流行
        TabControl,//
        GoodsList,//商品展示部分
        Scroll,
        BackTop
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
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    //销毁函数
    destroyed() {
        console.log('destroyed')
    },
    activated () {
        // console.log('activated');
        this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.scroll.refresh();//刷新
    },
    deactivated() {
        // console.log('deactivated')
        this.saveY=this.$refs.scroll.scroll.y;
    },
    created() {
        //请求多个数据 
       this.getHomeMultidata();
        // 请求商品数据
       this.getHomeGoods('pop');
       this.getHomeGoods('new');
       this.getHomeGoods('sell');

    },
    mounted() {
        // this.$refs.swiper
    //   this.tabOffsetTop=this.$refs.TabControl
    //所有组件都有一个$el属性，用于获取组件中的元素  
    console.log(this.$refs.tabControl.$el.offsetTop);
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
             //让隐藏的tabcontrol与显示的tabcintrol保持一致
             this.$refs.tabControl1.currentIndex=index;
             this.$refs.tabControl.currentIndex=index;
         },
         //监听回到顶部事件
         backClick(){
            //  console.log('1');
            this.$refs.scroll.scroll.scrollTo(0,0,1000)
         },
         //改变isShowBackTop的值让他显示与隐藏
         contentScroll(position){
            //  console.log(position)
            this.isShowBackTop=(-position.y)>1000;
            this.isTabFixed=(-position.y) > this.tabOffsetTop
         },
        loadMore(){
        //    console.log("到底了");
        // 改变页码让他显示更多
          this.getHomeGoods(this.currentType)
          //刷新图片高度，操你妈,解决了滚动不了得问题
          this.$refs.scroll.scroll.refresh();
        }, 
        swiperImageLoad(){
            //  console.log(this.$refs.tabControl.$el.offsetTop);
            this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop;
        },
        //  网络请求相关的方法
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
            // console.log(res)
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
        })
        },
        //请求商品方法
        getHomeGoods(type){
            const page=this.goods[type].page + 1;
            // console.log(page);
            getHomeGoods(type,page).then( res => {
            // console.log(r es)
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;
            //多次下拉加载数据
            this.$refs.scroll.scroll.finishPullUp();
        })
        }
    },
}
</script>
<style scoped>
/* 解决顶部吞噬 */
    #home{
      padding-top: 44px;
      height: 100vh;
      position: relative;
      /* z-index: 1; */
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
       /* position: sticky; */
       background-color: white;
       /* z-index: 1; */
       /* top: 44px; */
       width: 100%;
       position:absolute;
       z-index: 2;
   }
   .content{
       /* height: calc(100%-98px);   */
       height: 719px;
     
      /* position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0; */
   }
   .fixed{
      position:fixed;
      left:0;
      right: 0;
      top: 44px; 
   }
</style>