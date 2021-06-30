<template>
<!-- ref声明一个确定的子主键 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
//导入插件
import BScroll from 'better-scroll'

export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:Boolean,
        default:false  
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        //1创建BScroll对象
        this.scroll=new BScroll(this.$refs.wrapper,{
            //   probeType:3,
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        //监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            //   console.log(position);
            this.$emit('scroll', position)
        })
        //监听下拉事件
        // console.log(this.scroll)
         this.scroll.on('pullingUp',()=>{
            // console.log('到底了，上啦加载更多');
            this.$emit('pullingUp')
        })
    },
}
</script>
<style scoped>
 
  /* .content{
      height:4850px;
  } */
</style>