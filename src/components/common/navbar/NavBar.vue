<template>
    <div class="nav-bar">
       <div class="left">
           <slot name="left"></slot>
       </div>
       <div class="center">
           <slot name="center"></slot>
       </div>
       <div class="right">
           <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:"NavBar"
}
</script>

<style scoped>
   .nav-bar{
       display: flex;
       /* position: fixed;
       z-index: 999; */
       height: 44px;
       line-height: 44px;
       text-align: center;
       /* background-color: #f6f6f6; */
       box-shadow: 0px -3px 10px rgba(100, 100, 100, 0.1);
   }
   .left,.right{
       width: 60px;
   }
   .center{
       flex: 1;
   }
</style>