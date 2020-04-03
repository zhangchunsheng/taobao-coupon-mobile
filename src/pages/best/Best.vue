<template>
    <div class="page">
        <tab></tab>
        <!--<sort></sort>-->
        <div class="scroll" ref="scroll">
            <goods :goodslist="goodsList"></goods>
        </div>
        <!-- <nice-title :type="1">Best</nice-title> -->
        <tab-bar></tab-bar>
        <div class="bottom-tip" v-show="noData">暂无数据</div>
    </div>
</template>

<script type="text/ecmascript-6">
import TabBar from '../tabBar/TabBar'
import axios from 'axios'
import BScroll from 'better-scroll'
import NiceTitle from 'common/nicetitle/NiceTitle'
import Goods from 'common/goods/Goods'
import Sort from 'common/sort/Sort'
import Tab from 'common/tab/Tab'
import Bus from '@/assets/js/eventBus'
export default {
    name: 'best',
    data () {
        return {
            adzoneId: 110172200064,
            materialId: 3764,
            goodsList: [],
            pageNo: 1,
            noData: false,
            total: ''
        }
    },
    watch: {
        goodsList: function () {
            this._initScroll()
        }
    },
    created () {
        this.getGoods()
        /* 获取子组件的selectType的更新 */
        Bus.$on('sortnumber', sortnumber => {
            if (sortnumber !== this.sortnumber) {
                this.sortnumber = sortnumber
                this.pageNo = 1 
                this.noData = false 
                this.goodsList = []
                this.getGoods()
            }
        })
        Bus.$on('cat', materialId => {
            if (materialId !== this.materialId) {
                this.materialId = materialId
                this.pageNo = 1 
                this.noData = false
                this.goodsList = []
                this.getGoods()
            }
        })
    },
    components: {
        NiceTitle,
        Sort,
        Tab,
        Goods,
        TabBar
    },

    methods: {
        getGoods: function () {
            axios.get(process.env.API_ROOT + '/taobao/getOptimusMaterial?adzone_id=' + this.adzoneId + '&material_id=' + this.materialId + '&page_no=' + this.pageNo)
            .then(this.handlegetGoods100Succ)  
        },
        handlegetGoods100Succ: function (res) {
            // console.log(res.data)
            let data = res.data
            if (data.code === 200 && data.result.result_list.map_data) {
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
        },
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.scroll, {
                            click: true,
                            pullUpLoad: {
                                        threshold: 50
                                    }
                        })
                        this.scroll.on('pullingUp', () => {
                            console.log('触底')
                            this.pageNo++
                            !this.noData && this.getGoods()
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        }
    },
    mounted () {
        this._initScroll()
    }
}
</script>

<style scoped lang="stylus">
    .page
        .scroll
            position: absolute
            width: 100%
            top: 1.55rem
            left: 0
            bottom: 1rem
            z-index: -1
        .bottom-tip
            height: .8rem
            line-height: .8rem
            text-align: center
            font-size: .2rem
            color: #888 
            position: absolute
            bottom: 1rem
            width: 100%
            z-index: -2
</style>
