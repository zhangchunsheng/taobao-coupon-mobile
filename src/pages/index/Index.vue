<template>
    <div class="app">
        <index-header></index-header>
        <div class="content" ref="content">
            <div>
              <swiper :list="swiperList"></swiper>
              <icons :list="iconlist"></icons>
              <banner :goodslist="bannerList"></banner>
              <div v-if="goodsList.length>0">
                <nice-title :type="1">每日精选</nice-title>
                <goods :goodslist="goodsList"></goods>
                <div class="bottom-tip">我也是有底线的</div>
              </div>
            </div>
        </div>
        <tab-bar></tab-bar>
    </div>
</template>

<script>
import TabBar from '../tabBar/TabBar'
import NiceTitle from 'common/nicetitle/NiceTitle'
import Swiper from './swiper/Swiper'
import axios from 'axios'
import BScroll from 'better-scroll'
import MouseWheel from '@better-scroll/mouse-wheel'
import IndexHeader from './header/IndexHeader'
import Icons from './icons/Icons'
import Goods from 'common/goods/Goods'
import Banner from './banner/Banner'
BScroll.use(MouseWheel)
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to luomor.com',
      swiperList: [],
      iconlist: [],
      goodsList: [],
      goodinfo: []
    }
  },
  created () {
    console.log(process.env.API_ROOT)
    this.getInfo()
    this.getTop100()
  },
  updated () {
    console.log('updated')
  },
  activated () {
    console.log('activated')
    this.refresh()
  },
  components: {
    NiceTitle,
    Swiper,
    Icons,
    Goods,
    IndexHeader,
    Banner,
    TabBar
  },
  watch: {
      goodsList: function () {
        this._initScroll()
      }
  },
  computed: {
      // ...mapState(["indexTop100Url"])
      bannerList () {
          return this.goodsList.slice(0, 15)
      }
  },
  methods: {
    _initScroll () {
        if (!this.scroll) {
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.content, {
                        click: true,
                        mouseWheel: {
                          speed: 20,
                          invert: false,
                          easeTime: 300
                        }
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
    getInfo: function () {
        axios.get(process.env.API_ROOT + '/coupon/getIndexmData')
        .then(this.handleGitInfoSucc)
    },
    handleGitInfoSucc: function (res) {
        const data = res.data
        console.log(data)
        if (data.code === 200) {
          this.swiperList = data.result.swiper
          this.iconlist = data.result.channel
        }
        
        // DOM 更新了 操作dom时一定要在$nextTick里
        this.$nextTick(() => {
            // this._initScroll()
            // this._calculateHeight()
        })
    },
    getTop100: function () {
        axios.get(process.env.API_ROOT + '/taobao/getOptimusMaterial?adzone_id=110127200290&material_id=3763')
        .then(this.handleGitTop100Succ)
    },
    handleGitTop100Succ: function (res) {
        console.log(res)
        let data = res.data
        // debugger
        if (data.code === 200) {
            this.goodsList = data.result.result_list.map_data
        }
    }
  },
  mounted () {
    // console.log(this.$store.state)
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
