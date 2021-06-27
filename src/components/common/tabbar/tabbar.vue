<template>
    <div id="tab-bar">
        <slot ></slot>
    </div>
</template>

<script>
export default {
    name:"TabBar"
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
    }
</style>