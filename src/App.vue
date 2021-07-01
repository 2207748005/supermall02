<template>
  <div id="app">
    <!-- 防止销毁 -->
    <keep-alive>
       <router-view/>
    </keep-alive>
    <maintabbar/>
  </div>
</template>

<script>

import maintabbar from 'components/content/maintabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    maintabbar
  }
}
</script> 

<style>
@import "./assets/css/base.css";
</style>
