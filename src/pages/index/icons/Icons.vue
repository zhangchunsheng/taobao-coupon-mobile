<template>
    <div class="icons">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(page,index) of pages" :key="index">
                <div class="icon" v-for="(item,index) of page" :key="index" @click="selecteCat(item.adzone_id,item.material_id,item.channel_name)">
                    <div class="icon-img">
                        <img class="icon-img-content" :src="item.icon">
                    </div>
                    <p class="icon-desc">{{item.channel_name}}</p>
                </div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
export default {
    name: 'HomeIcons',
    props: {
        list: Array
    },
    data () {
        return {
            swiperOption: {
                pagination: {
                        el: '.swiper-pagination'
                },
                autoplay: false,
                preventClicksPropagation: true // 阻止click冒泡。拖动Swiper时阻止click事件。
            },
            adzoneId: 0,
            materialId: 0
        }
    },
     computed: {
        pages () {
            const pages = []
            this.list.forEach((item, index) => {
                const page = Math.floor(index / 8)
                if (!pages[page]) {
                    pages[page] = []
                }
                pages[page].push(item)
            })
            return pages
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
@import '~styles/common.styl'
    .icons >>> .swiper-pagination-bullet-active
        background:$RedColor
        width: 16px
        border-radius: 4px
    .icons >>> .swiper-container
        height: 0
        padding-bottom: 55%
    .icons
        margin-top: .1rem
        .icon
            position:relative
            width:25%
            padding-bottom:25%
            float:left
            height:0
        .icon-img
            position:absolute
            top:0
            left:0
            right:0
            bottom:.44rem
            box-sizing: border-box
            padding: .1rem
            .icon-img-content
                display: block
                margin: 0 auto
                height: 100%
        .icon-desc
            position: absolute
            left: 0
            right: 0
            bottom: 0
            height: .44rem
            line-height: .44rem
            text-align: center
            color:$darkTextColor
            ellipsis()
</style>
