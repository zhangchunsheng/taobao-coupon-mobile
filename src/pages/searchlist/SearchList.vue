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
import CatHead from 'common/head/Head'
import Goods from 'common/goods/Goods'
import BScroll from 'better-scroll'
import Sort from 'common/sort/Sort'
import Bus from '@/assets/js/eventBus'
export default {
    name: 'SearchList',
    data () {
        return {
            key: '',
            pageNo: 1,
            goodsList: [],
            total: '',
            title: '',
            sortnumber: 1,
            noData: false
        }
    },
    watch: {
        goodsList: function () {
            this._initScroll()
        }
    },
    created () {
        // this.key = this.$route.params.key
        // console.log(this.key)
        // console.log('created')
        // this.getSearchList(this.key)
        Bus.$on('sortnumber', sortnumber => {
            if (sortnumber !== this.sortnumber) {
                this.sortnumber = sortnumber
                this.pageNo = 1 
                this.noData = false
                this.goodsList = []
                this.getSearchList(this.key)
            }
        })
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
                            !this.noData && this.getSearchList(this.key)
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        getSearchList: function (key) {
            axios.get(process.env.API_ROOT + '/taobao/getMaterial?q=' + key + '&adzone_id=110127200290')
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
            vm.key = vm.$route.params.key
            vm.title = vm.$route.params.key
            vm.pageNo = 1 
            vm.noData = false
            vm.goodsList = []
            vm.getSearchList(vm.key)
        }
        })
    }
}
</script>

<style scoped lang="stylus">
    .sort-wrapper
        position: fixed
        top: 0
        left: 0
        right: 0
        z-index: 1000
    .wrapper
        position: absolute 
        top: .9rem
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
