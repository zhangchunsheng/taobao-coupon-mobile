<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item of list" :key="item.material_id">
        <img class="swiper-img" :src="item.icon" @click="selecteCat(item.adzone_id,item.material_id,item.channel_name)">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> 
      <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
  </div>
</template>

<script>
export default {
   name: 'HomeSwiper',
   props: {
     list: Array
   },
   data () {
       return {
        swiperOption: {
          // mousewheel: true,
          // direction : 'vertical',//设置垂直
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          autoplay: 3000,
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, // 修改swiper的父元素时，自动初始化swiper 
          preventClicksPropagation: true // 阻止click冒泡。拖动Swiper时阻止click事件。
        }
      }
   },
   computed: {
     showSwiper: function () {
       return this.list.length
     },
     swiper () {
        return this.$refs.mySwiper.swiper
     }
   },
   methods: {
        selecteCat: function (adzoneId, materialId, channelName) {
            this.adzoneId = adzoneId
            this.materialId = materialId
            this.channelName = channelName
            this.$router.push({name: 'Cat', params: {'adzoneId': adzoneId, 'materialId': materialId, 'channelName': channelName}})
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
  .wrapper >>> .swiper-pagination-bullet-active
    background:$RedColor
    width: 16px
    border-radius: 4px
  .wrapper
    overflow:hidden
    width:100%
    height:0
    padding-bottom 41.58%
    background:#eee
    .swiper-img
      width:100%
</style>
