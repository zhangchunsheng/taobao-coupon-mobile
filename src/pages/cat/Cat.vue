<template>
    <div class="search-list">
        <cat-head class="header" :title="title"></cat-head>
        <!--<div class="sort-wrapper">
            <sort class="sort"></sort>
        </div>-->
        <div class="wrapper" ref="wrapper">
            <goods :goodslist="goodsList"></goods>
        </div>
        <div class="bottom-tip" v-show="noData">暂无数据</div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Goods from 'common/goods/Goods'
import CatHead from 'common/head/Head'
import BScroll from '@better-scroll/core'
import Sort from 'common/sort/Sort'
import Bus from '@/assets/js/eventBus'
export default {
    name: 'SearchList',
    data () {
        return {
            adzoneId: 0,
            materialId: 0,
            pageNo: 1,
            pageSize: 20,
            goodsList: [],
            title: '',
            noData: false
        }
    },
    watch: {
        goodsList: function () {
            this._initScroll()
        }
    },
    created () {
        // this.adzoneId = this.$route.params.adzoneId
        // this.materialId = this.$route.params.materialId
        // console.log(this.adzoneId)
        // console.log(this.materialId)
        // console.log('created')
        // this.getSearchList(this.adzoneId, this.materialId)
        Bus.$on('sortnumber', sortnumber => {
            if (sortnumber !== this.sortnumber) {
                this.sortnumber = sortnumber 
                this.pageNo = 1 
                this.noData = false
                this.goodsList = []
                this.getSearchList(this.adzoneId, this.materialId)
            }
        })
    },
    activated () {
        console.log('activated')
        this.refresh()
    },
    components: {
        Goods,
        Sort,
        CatHead
    },
    methods: {
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs['wrapper'], {
                            click: true,
                            pullUpLoad: {
                                        threshold: 50
                                    }
                        })
                        this.scroll.on('pullingUp', () => {
                            console.log('触底')
                            this.pageNo++
                            !this.noData && this.getSearchList(this.adzoneId, this.materialId)
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        refresh: function () {
          if (this.scroll) {
            this.scroll.refresh()
          }
        },
        getSearchList: function (adzoneId, materialId) {
            axios.get(process.env.API_ROOT + '/taobao/getOptimusMaterial?adzone_id=' + adzoneId + '&material_id=' + materialId + '&page_no=' + this.pageNo)
            .then(this.handlegetSearchListSucc)  
        },
        handlegetSearchListSucc: function (res) {
            let data = res.data
            if (data.code === 200) {
                if (this.pageNo === 1) {
                    this.goodsList = data.result.result_list.map_data
                } else {
                    this.scroll.finishPullUp() // 告诉scroll已经加载完成
                    console.log(this.pageNo)
                    this.goodsList.push.apply(this.goodsList, data.result.result_list.map_data)
                }
                if (data.result.result_list.map_data.length < this.pageSize) {
                    this.noData = true
                }
                // console.log(this.goodsList)
            }
        }
    },
    mounted () {
        this._initScroll()
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
        if (from.path === '/detail') {
            // console.log('返回的的')
            to.meta.isBack = true
        } else {
            // console.log('新进入的')
            vm.adzoneId = vm.$route.params.adzoneId
            vm.materialId = vm.$route.params.materialId
            vm.title = vm.$route.params.channelName
            vm.noData = false
            vm.pageNo = 1
            vm.goodsList = []
            vm.getSearchList(vm.adzoneId, vm.materialId)
        }
        })
    }
}
</script>

<style scoped lang="stylus">
    .header
        position: fixed
        top: 0
        left: 0
        right: 0
        z-index: 1000
    .sort-wrapper
        position: fixed
        top: .8rem
        left: 0
        right: 0
        z-index: 1000
    .wrapper
        position: absolute 
        top: 0.9rem
        left: 0
        bottom: 0
        right: 0
    .bottom-tip
        height: .8rem
        line-height: .8rem
        text-align: center
        font-size: .2rem
        color: #888 
        position: absolute
        bottom: 0
        width: 100%
        z-index: -1

</style>
