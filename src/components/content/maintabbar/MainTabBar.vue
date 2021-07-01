<template>
       <TabBar>
           <!-- activeColor="" -->
        <TabBarItem path="/Home" >
           <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
           <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
           <div slot="item-txt">首页</div>
        </TabBarItem>
        <TabBarItem path="/category">
          <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
           <div slot="item-txt">分类</div>
        </TabBarItem>
        <TabBarItem path="/cart">
          <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
          <img slot="item-icon-active" src="~/assets/img/tabbar/profile_active.svg" alt="">
           <div slot="item-txt">购物车</div>
        </TabBarItem>
        <TabBarItem path="/profile">
          <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
           <div slot="item-txt">我的</div>
        </TabBarItem>
      </TabBar>

</template>

<script>

import TabBar from 'components/common/tabbar/tabbar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
    name:"MainTabBar",
    components:{
        TabBar,
        TabBarItem
    }
}
</script>