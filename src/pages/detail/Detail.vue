<template>
    <div v-if="data">
        <detail-header :title="data.title" :scrollY="scrollY"></detail-header>
        <fade>
            <parameter :itemProperties="itemProperties" :listShow="PropertiesTip" v-show="PropertiesTip" v-on:hide="hideProperties"></parameter>
        </fade>
        <fade>
            <div class="mask" v-show="PropertiesTip"  @click="hideProperties" ></div>
        </fade>
        <fade>
            <tpwd-pop :tpwd="TpwdTip" v-show="tpwdMask" v-on:tpwdhide="hideTpwdMask"></tpwd-pop>
        </fade>
        <fade>
            <div class="mask" v-show="tpwdMask"  @click="hideTpwdMask"></div>
        </fade>
        <div class="detail" ref="detail">
            <div class="wrapper">
                <detail-swiper :swiperimgs="data.small_images.string" :sightName="name"></detail-swiper>
                <div class="good-info">
                    <h1 class="title"><span class="is-tianmao">{{data.user_type}}</span>{{data.title}}</h1>
                    <div class="row">
                        <span class="quanhou">券后价 ￥ <span class="strong">{{data.zk_final_price}} </span></span>
                        <span class="goods-sales">已售: {{data.volume}}</span>
                    </div>
                    <div class="row">
                        <span class="goods-price"> 原价{{data.reserve_price}}</span>
                        <!--<span class="favorite" :class="{'favorited':favorited}" @click="favorite">{{favorited ? '已收藏':'收藏'}} <i class="icon-14"></i></span>-->
                    </div>
                    <div class="quan-info" @click="getCoupon" >
                        <div class="desc">
                            <div class="left">
                                <div class="wrapper">
                                    <p class="coupon_price"> <span class="strong">{{data.coupon_amount | parseInt}}</span>元优惠券</p>
                                    <p class="date">{{data.coupon_start_time |date}} ~ {{data.coupon_end_time | date}}</p>
                                </div>
                            </div>
                            <div class="right"><span class="text">立即领券</span></div>
                        </div>
                    </div>
                    <div style="margin-top: 6px" class="quan-info" @click="getCoupon1" >
                        <div class="desc">
                            <div class="left">
                                <div class="wrapper">
                                    <p class="coupon_price"> <span class="strong">{{data.coupon_amount | parseInt}}</span>元优惠券</p>
                                    <p class="date">{{data.coupon_start_time |date}} ~ {{data.coupon_end_time | date}}</p>
                                </div>
                            </div>
                            <div class="right"><span class="text">复制文字</span></div>
                        </div>
                    </div>
                    <div class="goods-introduce">{{data.item_description}}</div>
                </div>
                <div class="split"></div>
                <!--<div class="item-properties" @click="showProperties">
                    参数
                    <i class="icon-3 to-right"></i>
                </div>-->
                <div class="split"></div>
                <nice-title :type="0">店铺信息</nice-title>
                <div class="shop-content">
                    <div class="shop-wrapper">
                        <div class="shop-title">
                            <div class="shop-name">
                                    {{data.shop_title}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="split"></div>
                <nice-title :type="0">宝贝详情</nice-title>
                <div class="detail-img">
                    <div class="detail-img-wrapper" >
                        <img class="img" v-for="(item,index) of data.small_images.string" :key="index" :src="item" >
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import DetailHeader from './header/Header'
import DetailSwiper from './swiper/Swiper'
import Parameter from './parameter/Parameter'
import TpwdPop from './tpwdpop/TpwdPop'
import BScroll from 'better-scroll'
import NiceTitle from 'common/nicetitle/NiceTitle'
import Fade from 'common/fade/FadeAnimation'
import {saveToLocal, loadFromLocal, deleteToLocal} from '@/assets/js/Store'
export default {
    name: 'Detail',
    data () {
        return {
            data: {},
            name: '牙膏',
            TpwdTip: '',
            favorited: false,
            itemProperties: [],
            PropertiesTip: false,
            scrollY: 0,
            showAbs: true,
            tpwdMask: false
        }
    },
    created () {
        this.data = this.$route.params
        if (this.data.hasOwnProperty('item_id')) {
            this.selectFavorite()
        } else {
            this.$router.push({name: 'Index'})
        }
    },
    mounted () {
        // console.log(this.data)
        this._initScroll()
    },
    filters: {
        round (number) {
            return number.toFixed(1)
        },
        parseInt (number) {
            return parseInt(number)
        },
        date (date) {
            return date.slice(0, 11)
        }
    },
    methods: {
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.detail, {
                            click: true,
                            probeType: 3
                        })
                        this.scroll.on('scroll', (pos) => {
                            this.scrollY = Math.abs(Math.round(pos.y))
                            this.scrollY > 200 ? (this.showAbs = false) : (this.showAbs = true)
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        getCoupon: function () {
            var ua = navigator.userAgent.toLowerCase()
            var isWeixin = ua.indexOf('micromessenger') !== -1
            if (!isWeixin) {
                // window.location.href = this.data.coupon_share_url
                if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { // 移动端
                    window.location.href = this.data.coupon_share_url.replace('https', 'taobao')
                } else {
                    window.open(this.data.coupon_share_url)
                }
            } else {
                window.open(this.data.coupon_share_url)
                /*if (!this.TpwdTip) { // 二次点击直接显示不请求
                    axios.get('https://coupon-collect.luomor.com/coupon/getTPwd?click_url=' + this.data.click_url + '&coupon_share_url=' + this.data.coupon_share_url + '&title=' + this.data.title)
                    .then(this.handleTpwdSucc) 
                } else {
                    this.tpwdMask = true
                }*/
            }
        },
        getCoupon1: function () {
            if (!this.TpwdTip) { // 二次点击直接显示不请求
                axios.get('https://coupon-collect.luomor.com/coupon/getTPwd?click_url=' + this.data.click_url + '&coupon_share_url=' + this.data.coupon_share_url + '&title=' + this.data.title)
                .then(this.handleTpwdSucc) 
            } else {
                this.tpwdMask = true
            }
        },
        handleTpwdSucc: function (res) {
            let data = res.data
            let couponTpwd = data.result.coupon_tpwd
            let tpwd = data.result.tpwd
            if (couponTpwd !== '') {
                this.TpwdTip = '复制框内整段文字，打开【手淘APP】即可领券购买。' + couponTpwd
            } else {
                this.TpwdTip = '复制框内整段文字，打开【手淘APP】即可立即购买。' + tpwd
            }
            
            this.tpwdMask = true
            // console.log(data.result)
        },
        favorite: function () { // 收藏
            if (!this.favorited) {
                saveToLocal(this.data.item_id, 'favorite', this.data)
            } else {
                this.deleteFavorate()
            }
            this.selectFavorite()
        },
        selectFavorite: function () { // 查询收藏
            let fav = loadFromLocal(this.data.item_id, 'favorite', '')
            fav ? (this.favorited = true) : (this.favorited = false)
        },
        deleteFavorate: function () { // 取消该商品的收藏
            deleteToLocal(this.data.item_id, 'favorite', '')
        },
        showProperties: function () {
            this.PropertiesTip = true
        },
        hideProperties: function () {
            this.PropertiesTip = false
        },
        hideTpwdMask: function () {
            this.tpwdMask = false
        }
    },
    components: {
        DetailHeader,
        DetailSwiper,
        NiceTitle,
        Parameter,
        Fade,
        TpwdPop
    },
    beforeRouteLeave (to, from, next) {
        to.meta.isBack = true
        next()
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .mask
        position: fixed
        top: 0
        left: 0
        bottom: 0
        right: 0
        width: 100%
        height: 100%
        background: rgba(7,17,27, .5)
        z-index: 499
    .detail
        position: absolute 
        top: 0
        left: 0
        right: 0
        bottom: 0
        .good-info
            padding:  .2rem
            .title
                font-size: .3rem
                line-height: .4rem
            .row
                height: .6rem
                line-height: .6rem
                font-size: .2rem
                .quanhou
                    color: $RedColor=#FC436D
                    .strong
                        font-size: .36rem
                        font-weight: 700
                .goods-sales
                    float: right
                .goods-price
                    text-decoration:line-through
                    color: #888
                .favorite
                    float: right
                .favorited
                    color: $RedColor
            .quan-info
                width: 100%
                background-color: #fe1335
                background-size: auto 100%;
                height: 0
                padding-bottom: 23.897%
                position: relative
                z-index: 50
                .desc
                    width: 100%
                    height: 100%
                    position: absolute 
                    top: 0
                    left: 0
                    display: flex
                    .left
                        flex:7
                        padding: .4rem 0 .4rem .3rem
                        .wrapper
                            position: relative
                            height: 100%
                            border-right: 1px dotted #fff
                            color: #fff
                            .coupon_price
                                width: 100%
                                font-size: .28rem
                                position: absolute 
                                top: 0
                                text-align: center
                                font-weight: 700
                                .strong
                                    font-size: .36rem
                                    margin-right: .1rem
                            .date
                                width: 100%
                                position: absolute 
                                bottom: 0
                                font-size: .2rem
                                text-align: center
                    .right
                        position: relative
                        flex:4
                        padding: .4rem 0
                        .text
                            position: absolute
                            width: 100%
                            text-align: center 
                            top: 50%
                            color: #fff
                            font-size: .32rem
                            margin-top: -0.16rem
            .goods-introduce
                color: #888888
                font-size: .2rem
                line-height: .4rem
        .split
            height: .14rem
            width: 100%
            background: #f5f5f5
        .detail-img
            width: 100%
            .detail-img-wrapper
                .img
                    width: 100%  
        .item-properties
            padding: 0 .2rem
            line-height: .6rem 
            .to-right
                float: right
                line-height: .6rem
                color: #ccc
        .shop-content
            padding: .2rem
            .shop-wrapper
                .shop-icon
                    display: inline-block
                    width: 1.2rem
                    height: 1.2rem
                    margin-right: .3rem
                    .img
                        width: 100%
                        height:100%
                .shop-title
                    display: inline-block
                    vertical-align: top
                    height: 1.2rem
                    .shop-name
                        height: .8rem
                        line-height: .8rem
                        font-size: .28rem
                    .shop-type
                        height: .4rem
                        .img
                            height: .4rem
                .shop-desc
                    display: flex
                    padding: .3rem 0
                    .box
                        flex: 3
                        text-align: center
                        .mini-text
                            display: inline-block
                            font-size: .2rem
                            padding: .08rem
                            border-radius: .08rem
                            height: .24rem
                        
</style>
