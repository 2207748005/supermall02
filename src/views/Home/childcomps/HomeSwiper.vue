<template>
    <Swiper>
        <SwiperItem v-for="item in banners" :key="item.index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageload" />
            </a>
        </SwiperItem> 
    </Swiper>
</template>


<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:"HomeSwiper",
    props:{
        banners:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    data() {
        return {
            isLoad:false
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
    methods:{
        //监听图片加载事件
        //设置只让他监听一次就可以了，减小服务器压力
        imageload(){
            if(!this.isLoad){
            this.$emit('swiperImageLoad')
            this.isLoad=true;
            }   
      }
    }
}
</script>