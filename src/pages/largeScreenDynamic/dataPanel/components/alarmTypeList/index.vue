<template>
  <div class="alarm-type-list white" ref="alarmTypeRef">
    <div class="slot-wrapper">
      <slot></slot>
    </div>
    <div class="type-list-wrapper" ref="ulRef">
      <!-- :style="{ height: innerHeight + 'px' }" TODO 滚轮优化 @wheel="onWheel"  --> 
      <div class="inner-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" ref="ulInnerRef">
        <div class="type-item tw_lr p20 border-box mt20 pointer" v-for="(item, index) in newLists" :key="index" @click="alarmListData(item)">
          <div class="left-wrapper tw_clr">
            <div class="left">
              <el-image :src="getImageUrl(item.subTypeCode || 5, item)">
                <template #placeholder>
                  <div class="image-slot">
                    <Loading size="16" />
                  </div>
                </template>
              </el-image>
            </div>
            <div class="right pl10">
              <div class="title ellipsis">
                {{ item.subTypeCodeName }}
              </div>
              <div class="num mt10">
                {{ formatNumber(item.count) }}
              </div>
            </div>
          </div>
          <div class="right-wrapper relative tw_c">
            <el-image class="pointer" :src="progress">
              <template #placeholder>
                <div class="image-slot">
                  <Loading size="14" />
                </div>
              </template>
            </el-image>
            <div class="rate absolute">
              {{ item.processingRate }}
            </div>
            <div class="text absolute fs12">处理率</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 图片
import progress from '@/assets/images/dataPanel/progress.png'

// 报警类型图标
// import chouyan from '@/assets/images/dataPanel/8.png'

import { AlarmListItem } from '../../types'

let { lists, id } = defineProps<{
    lists: Array<AlarmListItem>
    id: string
}>()
// console.log(lists, 'list')
// let emits = defineEmits(['viewData'])
// const tapCar = (item)=>{
//     emits('viewData', item)
// }
// console.log(process,'process')
// const mode = process.env.MODE
const getImageUrl = (code: number, item: AlarmListItem) => {
    // return mode === 'development' ? `/src/assets/images/dataPanel/${code}.png` : `/assets/images/dataPanel/${code}.png`
    return new URL(`/src/assets/images/dataPanel/${code}.png`, import.meta.url)
        .href
}

const emits = defineEmits(['viewData'])

// 点击事件
const alarmListData = (item: AlarmListItem) => {
    console.log('onItemClick', item)
    emits('viewData', item)
}

const ulRef = $ref(null)
const ulInnerRef = $ref(null)
let timer: any = 0
let scrollTop = 0
let count = 1
onMounted(() => {
    // TODO 列表循环滚动
    // const list = this.$refs.list
    // if (lists.length > 0) {
    // addScroll()
    // }
})
let newLists: Array<AlarmListItem> = $ref([])

let innerHeight = $ref(0)
let scrollHeight = $ref(0)
let minScrollHeight = $ref(0)
let maxScrollHeight = $ref(0)
let len = $ref(0)
let time = $ref(0)
const itemHeight = 120
if (lists) {
    innerHeight = lists.length * itemHeight
}
watch(
    () => lists,
    (val) => {
        ulInnerRef.style.animation = `listInfiniteLoopScroll`
        len = val.length
        innerHeight = len * itemHeight
        time = len * 3
        scrollHeight = maxScrollHeight = innerHeight + (len % 5) * itemHeight
        minScrollHeight = 5 * itemHeight + (len % 5) * itemHeight
        if (val.length > 5) {
            // ulRef.scrollTop = 0
            newLists = [...val, ...val]
            addScroll()
        } else {
            newLists = val
        }
    },
)
const addScroll = () => {
    // clearInterval(timer)
    addFrameKey()
}

let timeoutId = null
const sTimeOut = (t?: number) => {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        console.log(timeoutId, 'timeoutId')
        ulRef.scrollTop = 0
        time = len * 3
        scrollHeight = innerHeight + (len % 5) * itemHeight
        addFrameKey(false)
    }, (t || time) * 1000)
}
const addFrameKey = (sTime = true, t?: number) => {
    if(len <= 5) {
        return
    }
    let style = document.createElement('style')
    style.type = 'text/css'
    style.id = 'frameKey' + id
    // let height = scrollHeight + (len % 5) * 120
    // console.log(scrollHeight, len, (len % 5) * itemHeight, 'addFrameKey')
    let keyFrames = `
    @keyframes listInfiniteLoopScroll${id + len} {
        0% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        100% {
            -webkit-transform: translate(0, -${scrollHeight}px);
            transform: translate(0, -${scrollHeight}px);
        }
    }`
    ulInnerRef.style.animation = `listInfiniteLoopScroll${id + len} ${
        t || time
    }s linear infinite normal`
    console.log(`set animation ${time}s`)
    // scrollHeight = maxScrollHeight
    // ulInnerRef.style.transform = `translate(0,0)`
    style.innerHTML = keyFrames
    // 滚动过的
    if (sTime) {
        sTimeOut()
    }

    const dom = document.getElementById('frameKey' + id)
    if (dom) {
        document.getElementsByTagName('head')[0].removeChild(dom)
    }
    document.getElementsByTagName('head')[0].appendChild(style)
    // document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('head')[0].lastChild);
    // document.getElementsByTagName('head')[0].removeChild(document.getElementById('frameKey'));
    // }
}

let isEnter: boolean = $ref(false)

const onWheel = (e) => {
    // console.log(isEnter, len, scrollHeight, time, e.wheelDelta, 'eeee')
    // 如果鼠标不在当前组件，则不触发滚轮事件, 或者数量不够滚动
    if (!isEnter || len <= 15) {
        return
    }
    console.log(scrollHeight, time, e.wheelDelta, 'e')
    // if (scrollHeight === maxScrollHeight && time === len*3) {
    //     addFrameKey()
    //     return
    // }
    if (e.wheelDelta > 0) {
        scrollHeight += e.wheelDelta
        time += 3
        if (time > len * 3) {
            time = len * 3
            addFrameKey()
        } else {
            sTimeOut()
        }
    } else {
        scrollHeight -= Math.abs(e.wheelDelta)
        time -= 3
        if (time < 0) {
            time = 0
            addFrameKey()
        }
    }
    if (scrollHeight <= minScrollHeight) {
        // scrollHeight = minScrollHeight
        addFrameKey()
        return
    }
    if (scrollHeight >= maxScrollHeight) {
        scrollHeight = maxScrollHeight
        addFrameKey()
        return
    }
    console.log(ulRef.scrollTop, '11111')
    // console.log(scrollHeight, innerHeight, e.wheelDelta, 'scrollHeight')
    addFrameKey()
}
const onMouseEnter = () => {
    isEnter = true
}
const onMouseLeave = () => {
    isEnter = false
}
onUnmounted(() => {})
const formatNumber = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
</script>
<style scoped lang="scss">
.alarm-type-list {
    width: 370px;
    min-height: 600px;
    overflow: hidden;
    .slot-wrapper {
        // height: 40px;
    }
    .type-list-wrapper {
        min-height: 540px;
        max-height: 600px;
        // overflow: scroll; // TODO:XXX 滚动有bug，所以暂时屏蔽
        overflow: hidden;
        .inner-wrapper {
            // animation: listInfiniteLoopScroll 10s linear infinite normal;
        }
        // transition: 1s;
        .type-item {
            width: 370px;
            height: 100px;
            // border: 1px solid rgba(255, 255, 255, 0.05);
            background: rgba(39, 202, 255, 0.04);
            .left-wrapper {
                .title {
                    color: rgba(255, 255, 255, 0.65);
                    max-width: 110px;
                    font-size: 14px;
                }
                .num {
                    font-size: 24px;
                    color: rgba(255, 255, 255, 0.85);
                }
                .left {
                    width: 68px;
                }
            }
            .right-wrapper {
                .text {
                    margin-top: 45px;
                    color: #d0deee;
                }
            }
        }
    }
    .type-list-wrapper::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
}
</style>
<style lang="scss">
@keyframes listInfiniteLoopScroll {
    100% {
        transform: translate(0, -600px);
        display: none;
    }
}
</style>