<template>
    <div id="detail">
        <!-- 头部导航 -->
        <DetailNavBar class="detail-nav"/>
        <Scroll class="content" ref="scroll">
            <!-- 轮播图 -->
           <DetailSwiper :top-images="topImages" />
           <DetailBaseInfo  :goods="goods"/>
           <DetailShopInfo :shop="shop"/>
           <DetailGoodsInfo :detail-info="detailInfo"
           @imageLoad="imageLoad"/>
           <DetailParamInfo :paramInfo="paramInfo"/>
           <!-- {{goods}} -->
           <DetailCommentInfo :commentInfo="commentInfo" />
           <GoodsList :goods="recommendList" />
           <!-- <DetailRecommendInfo :recommend-list="recommendList" /> -->
        </Scroll>
    </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
// import DetailRecommendInfo from './childcomps/DetailRecommendInfo'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        // DetailRecommendInfo
    },
    data() {
        return {
            iid:null,
            topImages:[],
            goods: {},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendList: []
        }
    },
    created() {
        //用来拿取传输过来的id
        // console.log(this.$route.params.iid)
        this.iid=this.$route.params.iid;
        //  请求到得数据
        getDetail(this.iid).then(res=>{
            // console.log(res);
             // 2.1.获取结果
            const data = res.result;
            // 2.2.获取顶部信息
            this.topImages=data.itemInfo.topImages;
            // 2.3.获取商品信息
            // console.log(data.itemInfo);
            // console.log("1"+new Good())
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
            //创建店铺信息的对象
            this.shop=new Shop(data.shopInfo)
            // 2.5.获取商品信息
            this.detailInfo = data.detailInfo
            //获取参数信息
            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //取出评论信息
            if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
        getRecommend().then((res, error) => {
            console.log(res);
          if (error) return
          this.recommendList = res.data.list
        })
    },
    methods: {
        imageLoad(){
            this.$refs.scroll.scroll.refresh();
        }
    },
}
</script>

<style scoped>
   #detail{
       position:relative;
       z-index: 9;
       background-color: #fff;
       height: 100vh;
       /* 设置为视图高度 */
   }
   .content{
      position: absolute;
    top: 44px;
    bottom: 60px;
   }
   .detail-nav{
       position:relative;
       z-index: 9;
       background-color: #fff;
   }
</style>