<template>
    <div class="classify">
        <div class="menu-wrapper" ref="menu-wrapper">
            <ul>
                <li v-for="(item,index) of goods" :key="index" class="menu-item border-bottom" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text">{{item.title}}</span>
                </li>
            </ul>
        </div>
        <div class="materials-wrapper" v-show="goods" ref="materials-wrapper">
            <ul>
                <li v-for="(item, index) of goods" :key="index" class="material-list material-list-hook">
                    <h1 class="title border-bottom">{{item.title}}</h1>
                    <ul class="materials-ul">
                        <li @click="selectMaterial(material,$event)" v-for="(material, ind) of item.sub_materials" :key="ind" class="material-item">
                            <div class="icon">
                                <img :src="material.icon" alt="" class="img">
                            </div>
                            <div class="content">
                                <h2 class="name">{{material.title}}</h2>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <tab-bar></tab-bar>
    </div>
</template>

<script type="text/ecmascript-6">
import TabBar from '../tabBar/TabBar'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import axios from 'axios'
// import Bus from '@/assets/js/eventBus'
BScroll.use(ObserveDOM)
BScroll.use(MouseWheel)
export default {
    name: 'Classify',
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        TabBar
    },
    created () {
        this.getInfo()
    }, 
    data () {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedMaterial: {},
            currentIndexNum: 0
        }
    },
    computed: {
        currentIndex () {
            return this.currentIndexNum
            /* for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i + 1]
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }
            return 0 */
        },
        selectedMaterials () {
            let materials = []
            this.goods.forEach((good) => {
                good.sub_materials.forEach((material) => {
                    materials.push(material)
                })
            })
            return materials
        }
    },
    methods: {
        getInfo: function () {
            axios.get(process.env.API_ROOT + '/coupon/getClassifyData')
            .then(this.handleGitInfoSucc)  
        },
        handleGitInfoSucc: function (res) {
            const data = res.data
            // console.log(data)
            if (data.code === 200) {
              this.goods = data.result.materials
                for (let i = 0; i < this.goods.length; i++) {
                    if (this.goods[i].sub_materials) {
                        for (let r = 0; r < this.goods[i].sub_materials.length; r++) {
                            
                        }
                    }
                }
            }
            // DOM 更新了 操作dom时一定要在$nextTick里
            this.$nextTick(() => {
                this._calculateHeight()
                this._initScroll()
            })
        },
        _initScroll: function () {
            this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
                click: true,
                observeDOM: true,
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                }
            }) 
            this.MaterialsScroll = new BScroll(this.$refs['materials-wrapper'], {
                probeType: 3,
                click: true,
                observeDOM: true,
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                }
            })
            this.MaterialsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y)) + 200
            })
        },
        _calculateHeight: function () {
            const element = this.$refs['materials-wrapper']
            let materialList = element.getElementsByClassName('material-list-hook')
            // console.log(materialList)
            let height = 0
            this.listHeight.push(height)
            for (let i = 0; i < materialList.length; i++) {
                let item = materialList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            } 
            // console.log(this.listHeight)
        },
        selectMenu: function (index, event) {
            // better-scroll 可以监听到此事件，浏览器原生不能监听到  防止pc端出现两次点击
            if (!event._constructed) {
                return
            }
            // 获取食物的li Dom节点列表
            const element = this.$refs['materials-wrapper']
            let materialList = element.getElementsByClassName('material-list-hook')
            let el = materialList[index]
            this.currentIndexNum = index
            // 调用better-scroll 方法滚动到响应位置
            this.MaterialsScroll.scrollToElement(el, 300)
        },
        selectMaterial: function (material, event) {
            if (!event._constructed) {
                return
            }
            this.materialId = material.material_id
            // console.log(this.materialId)
            this.$router.push({name: 'Cat', params: {'adzoneId': material.adzone_id, 'materialId': this.materialId, 'channelName': material.title}})
        }
    }
    
}
</script>

<style scoped lang="stylus">
    @import "~styles/common.styl"
    .classify 
        display: flex
        position: absolute
        top: 0
        bottom: 1.02rem
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 1.6rem
            width: 1.6rem
            background: #f3f5f7
            .menu-item
                display: table
                height: 1.08rem
                width: 1.12rem
                line-height: .28rem
                padding: 0 .24rem
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -0.02rem
                    background: #ffffff
                    font-weight: 700
                    .text
                        border: none 
                        color: $RedColor
                .text
                    display: table-cell
                    width: 1.12rem
                    vertical-align: middle
                    font-size: .24rem 
                    text-align: center
        .materials-wrapper
            flex: 1
            .title
                height: .8rem
                line-height: .8rem
                background: #f3f5f7
            .materials-ul
                overflow: hidden
                padding: .4rem  0
                .material-item
                    float: left 
                    width: 33.33%
                    text-align: center
                    &:last-child
                        &::before
                            border: none
                            margin-bottom: 0
                    .icon
                        width: 80%
                        height: 0
                        padding-bottom: 80%
                        margin: 10%
                        overflow: hidden
                        position: relative
                        .img
                            width: 100%
                            height: 100%
                            border-radius: 50%
                            position: absolute 
                            top: 0
                            left: 0
                    .content 
                        margin: .2rem 0 
                        padding: 0 .24rem
                        .name
                            height: .28rem
                            line-height: .28rem
                            font-size: .2rem
                            color: rgb(7,17,27)
                            overflow: hidden
                            white-space: nowrap
                            text-overflow: ellipsis

</style>
