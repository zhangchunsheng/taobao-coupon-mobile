<template>
    <div>
        <tab :tabs="tabList"></tab>
        <div class="content" ref="content">
            <!--<sort></sort>-->
            <div>
                <goods :goodslist="goodsList"></goods>
            </div>
            <!-- <nice-title :type="1">Moch</nice-title> -->
            <div class="bottom-tip" v-show="noData">暂无数据</div>
        </div>
        <tab-bar></tab-bar>
    </div>
</template>

<script type="text/ecmascript-6">
import TabBar from '../tabBar/TabBar'
import axios from 'axios'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import NiceTitle from 'common/nicetitle/NiceTitle'
import Goods from 'common/goods/Goods'
import Sort from 'common/sort/Sort'
import Tab from 'common/tab/Tab'
import Bus from '@/assets/js/eventBus'
BScroll.use(ObserveDOM)
BScroll.use(Pullup)
BScroll.use(MouseWheel)
export default {
    name: 'moch',
    data () {
        return {
            groupId: 6,
            adzoneId: 110172200064,
            materialId: 3764,
            goodsList: [],
            pageNo: 1,
            noData: false,
            total: '',
            tabList: []
        }
    },
    watch: {
        goodsList: function () {
            this._initScroll()
        }
    },
    created () {
        this.initMaterials()
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
        initMaterials: function () {
            let materials = JSON.parse('[{"group_id":1,"title":"实时热销榜","desc":"特色：淘客渠道每日实时热销爆款，官方数据实时更新。数量：每个material_id 同时产出500款商品","sub_materials":[{"adzone_id":"110172200064","material_id":28029,"title":"大服饰","icon":"https://img.alicdn.com/imgextra/i1/790237325/O1CN01cqM0Ku23ytm3d4LKF_!!790237325.png?t=1585567894000"},{"adzone_id":"110172200064","material_id":28027,"title":"大快消","icon":"https://img.alicdn.com/imgextra/i4/790237325/O1CN01xVWS3123ytlzyZgNZ_!!790237325.png?t=1585570301000"},{"adzone_id":"110172200064","material_id":28026,"title":"综合","icon":"https://img.alicdn.com/imgextra/i2/790237325/O1CN01NkRqaJ23ytm1Q93BT_!!790237325.jpg?t=1585570202000"},{"adzone_id":"110172200064","material_id":28028,"title":"电器美家","icon":"https://img.alicdn.com/imgextra/i4/790237325/O1CN017e2Q6D23ytm23DrpB_!!790237325.jpg?t=1585571911000"}]},{"group_id":2,"title":"好券直播","desc":"特色：数据源同联盟app的好券直播。小时计更新，展示联盟高佣优质商品库中的领券热门商品。数量：每个material_id 同时产出200款商品","sub_materials":[{"adzone_id":"110172200064","material_id":3756,"title":"综合","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":3767,"title":"女装","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":3758,"title":"家居家装","icon":"http://file.17gwx.com/sqkb/cate/2017/12/14/919415a323f6c82b5b.jpg"},{"adzone_id":"110172200064","material_id":3759,"title":"数码家电","icon":"http://file.17gwx.com/sqkb/cate/2017/11/28/264865a1d33d37b91e.jpeg"},{"adzone_id":"110172200064","material_id":3762,"title":"鞋包配饰","icon":"http://file.17gwx.com/sqkb/cate/2017/12/19/638195a38b02210270.jpeg"},{"adzone_id":"110172200064","material_id":3763,"title":"美妆个护","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3764,"title":"男装","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3765,"title":"内衣","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3760,"title":"母婴","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3761,"title":"食品","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3766,"title":"运动户外","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"}]},{"group_id":3,"title":"大额优惠","desc":"特色：联盟精品商品库中的大额券商品，券面额大且券折扣力度高的商品，小时更新。数量：每个material_id 同时产出500款商品","sub_materials":[{"adzone_id":"110172200064","material_id":9660,"title":"综合","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":9658,"title":"女装","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":9655,"title":"家居家装","icon":"http://file.17gwx.com/sqkb/cate/2017/12/14/919415a323f6c82b5b.jpg"},{"adzone_id":"110172200064","material_id":9656,"title":"数码家电","icon":"http://file.17gwx.com/sqkb/cate/2017/11/28/264865a1d33d37b91e.jpeg"},{"adzone_id":"110172200064","material_id":9648,"title":"鞋包配饰","icon":"http://file.17gwx.com/sqkb/cate/2017/12/19/638195a38b02210270.jpeg"},{"adzone_id":"110172200064","material_id":9653,"title":"美妆个护","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":9654,"title":"男装","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":9652,"title":"内衣","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":9650,"title":"母婴","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":9649,"title":"食品","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":9651,"title":"运动户外","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"}]},{"group_id":4,"title":"精品商品","desc":"特色：联盟精品商品库中的高佣商品，佣金最高达90%，按天更新。数量：每个material_id 同时产出500款商品","sub_materials":[{"adzone_id":"110172200064","material_id":13366,"title":"综合","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":13367,"title":"女装","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":13368,"title":"家居家装","icon":"http://file.17gwx.com/sqkb/cate/2017/12/14/919415a323f6c82b5b.jpg"},{"adzone_id":"110172200064","material_id":13369,"title":"数码家电","icon":"http://file.17gwx.com/sqkb/cate/2017/11/28/264865a1d33d37b91e.jpeg"},{"adzone_id":"110172200064","material_id":13370,"title":"鞋包配饰","icon":"http://file.17gwx.com/sqkb/cate/2017/12/19/638195a38b02210270.jpeg"},{"adzone_id":"110172200064","material_id":13371,"title":"美妆个护","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":13372,"title":"男装","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":13373,"title":"内衣","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":13374,"title":"母婴","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":13375,"title":"食品","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":13376,"title":"运动户外","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"}]},{"group_id":5,"title":"优质商品","desc":"特色：综合品牌、佣金和券因素的优质商品。数量：每个material_id 同时产出200款商品","sub_materials":[{"adzone_id":"110172200064","material_id":3786,"title":"综合","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":3788,"title":"女装","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":3792,"title":"家居家装","icon":"http://file.17gwx.com/sqkb/cate/2017/12/14/919415a323f6c82b5b.jpg"},{"adzone_id":"110172200064","material_id":3793,"title":"数码家电","icon":"http://file.17gwx.com/sqkb/cate/2017/11/28/264865a1d33d37b91e.jpeg"},{"adzone_id":"110172200064","material_id":3796,"title":"鞋包配饰","icon":"http://file.17gwx.com/sqkb/cate/2017/12/19/638195a38b02210270.jpeg"},{"adzone_id":"110172200064","material_id":3794,"title":"美妆个护","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3790,"title":"男装","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3787,"title":"内衣","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3789,"title":"母婴","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3791,"title":"食品","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"},{"adzone_id":"110172200064","material_id":3795,"title":"运动户外","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"}]},{"group_id":6,"title":"母婴主题","desc":"特色：定位在母婴市场，围绕从备孕到儿童不同阶段对商品的诉求提供商品库。适用于母亲节、520、61儿童节等母婴主题节气，也适用于母婴类网站选品需求。数量：每个material_id 同时产出1000款商品","sub_materials":[{"adzone_id":"110172200064","material_id":4040,"title":"母婴_备孕","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":4041,"title":"母婴_0至6个月","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"},{"adzone_id":"110172200064","material_id":4044,"title":"母婴_4至6岁","icon":"http://file.17gwx.com/sqkb/cate/2017/12/14/919415a323f6c82b5b.jpg"},{"adzone_id":"110172200064","material_id":4042,"title":"母婴_7至12个月","icon":"http://file.17gwx.com/sqkb/cate/2017/11/28/264865a1d33d37b91e.jpeg"},{"adzone_id":"110172200064","material_id":4043,"title":"母婴_1至3岁","icon":"http://file.17gwx.com/sqkb/cate/2017/12/19/638195a38b02210270.jpeg"},{"adzone_id":"110172200064","material_id":4045,"title":"母婴_7至12岁","icon":"http://file.17gwx.com/sqkb/cate/2017/11/30/128335a1fedf594da7.jpeg"}]},{"group_id":7,"title":"有好货","desc":"特色：商品本身是受欢迎的品质好货，淘宝有好货的产品心智。数量：每个material_id 同时产出1000款商品","sub_materials":[{"adzone_id":"110172200064","material_id":4092,"title":"品质好货","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"}]},{"group_id":8,"title":"潮流范","desc":"特色：代表当下时尚和流行趋势的商品，商品调性类似淘宝ifashion、潮电街、酷动城。数量：每个material_id 同时产出1000款商品","sub_materials":[{"adzone_id":"110172200064","material_id":4093,"title":"流行趋势","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"}]},{"group_id":9,"title":"特惠","desc":"特色：优质特惠宝贝。 优先考虑销量高, 评价高,点击转化好, 创意具有吸引力的优质低价宝贝，以及30天的历史新低宝贝, 覆盖了手淘主要特惠场景的优质宝贝.数量：每个material_id 同时产出1000款商品","sub_materials":[{"adzone_id":"110172200064","material_id":4094,"title":"特惠宝贝","icon":"http://file.17gwx.com/sqkb/cate/2018/04/03/540265ac2f7c42d1ce.jpg"}]}]')
            let materialsobj = {}
            for (let i in materials) {
              materialsobj[materials[i].group_id] = materials[i]
            }
            this.tabList = materialsobj[this.groupId].sub_materials
            this.adzoneId = this.tabList[0].adzone_id
            this.materialId = this.tabList[0].material_id
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
                    let that = this
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.content, {
                            click: true,
                            observeDOM: true,
                            pullUpLoad: {
                                threshold: 50
                            },
                            mouseWheel: {
                                speed: 20,
                                invert: false,
                                easeTime: 300
                            }
                        })
                        this.scroll.on('pullingUp', () => {
                            console.log('触底')
                            that.pageNo++
                            !that.noData && that.getGoods()
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
    .content
        position: absolute
        width: 100%
        top: .9rem
        bottom: .2rem
        left: 0
        overflow: hidden
        .bottom-tip
            height: .8rem
            line-height: .8rem
            text-align: center
            font-size: .2rem
            color: #888
</style>
