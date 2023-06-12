<template>
  <div v-loading="loading" :style="defaultStyle" class="circle-wrapper">
    <div class="defaultClass" :id="id" :style="defaultStyle"></div>
    <div class="center-text-wrapper absolute flex">
      <div class="inner-circle"></div>
      <div>
        <p class="title">
          {{ typeData?.title || currentItem?.title || '报警数据' }}
        </p>
        <p class="rate" v-show="currentItem.show">
          {{ currentItem.count }}
        </p>
        <p class="rate">{{ result }}</p>
      </div>
    </div>
    <div class="regional_data absolute" @mousewheel="rollScroll($event)">
      <div class="overflow h">
        <!--                -->
        <ul class="regional_ul" :class="``" direction="vertical" ref="carousel" trigger="click" indicator-position="none">
          <li class="regional_li pointer" v-for="(item, i) in datalist" :key="i" pause-on-hove @click="tapItem(item, i)">
            <div class="regional_text fs12">
              <span
                class="color_dot bgGrey line-block"
                :style="{
                  background: colorList[i % colorList.length],
                }"
              ></span>
              {{ item.title }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { nextTick } from '@vue/runtime-core'
// import { watch } from 'vue';

const proxy: any = getCurrentInstance()?.proxy
const { id, defaultStyle, lists, loading } = defineProps({
  id: { type: String, default: 'container' },
  defaultStyle: {
    type: Object,
    default: () => {
      return { width: '100%', height: '500px' }
    },
  },
  lists: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

// 定义datalist单项数据类型
interface DatalistItem {
  title: string
  index: number
  transform: string
  rate: string
  subTypeCode: string
  count: number
}

// 定义报警类型数据
interface TypeData {
  key: string
  title: string
  val: number | undefined
}

let data: any = [],
  // flag = true,
  typeData: TypeData = $ref({ key: '', title: '', val: 0 })
let datalist: Array<DatalistItem> = $ref([])
const update = ({ list, tData }) => {
  // console.log(list, tData, 'list')
  console.log(dataIndex, 'dataIndex')
  if (tData) {
    typeData = tData
    if (typeData.key === 'all' && typeData.val) {
      typeData.title = '报警数据'
    }
    currentItem = {}
  }
  // 每次更新图表把突出的扇形收回
  myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: dataIndex,
  })
  console.log(tData, 'tData')
  data = []
  datalist = []
  for (let i = 0; i < list.length; i++) {
    let name = list[i].subTypeCodeName
    let subTypeCode = list[i].subTypeCode
    data.push({ ...list[i], value: list[i].count, name: name, subTypeCode })
    datalist.push({
      title: name,
      index: i,
      transform: '',
      rate: list[i].rate,
      subTypeCode,
      count: list[i].count,
    })
  }
  console.log(datalist, 'datalist')
  option.series[0].data = data
  myChart.setOption(option, true)
  // if (flag) {
  //     setTransform(dataIndex)
  //     flag = false
  //     // timer = setInterval(nfSetCarsY, timerNum)
  //     myChart.dispatchAction({
  //         type: 'showTip',
  //         seriesIndex: 0,
  //         dataIndex: dataIndex,
  //         position: function () {},
  //     })
  // }
}

const clickItem = (item) => {
  console.log(item, data, 'clickItem')
  // 点击item, 需根据item算出index
  let index = 0
  data.forEach((it, i) => {
    if (it.subTypeCode === item.subTypeCode) {
      index = i
    }
  })
  tapItem(item, index)
}

// let result: string | number = $ref(0)

let result = computed(() => {
  console.log(typeData, currentItem.rate, 'computed')
  return (typeData.val ?? currentItem.rate) || 0
})
// let resultNum = computed(() => {
//     console.log(typeData, currentItem.rate, 'computed')
//     return currentItem.count || 0
// })

defineExpose({ update, clickItem })

const colorList: string[] = ['#1563FF', '#8775FF', '#159AFF', '#66E1DF', '#34FFBF', '#2DE391', '#FF8800', '#FFC97A', '#D927D6']

let option = {
  title: {},
  tooltip: {
    show: false,
    trigger: 'item',
    triggerOn: 'none',
    formatter: '{b} :<br/> {c} ({d}%)',
    borderWidth: 1,
    borderColor: 'rgba(82, 206, 255, 1)', //边框颜色
    backgroundColor: 'rgba(26, 31, 59, 1)', // 提示框背景颜色
    textStyle: {
      // fontSize: 16,
      color: 'rgba(82, 206, 255, 1)', // 设置文本颜色 默认#FFF
    },
    position: function (pt) {
      return [pt[0], 130]
    },
  },
  grid: {
    left: 50,
    top: 10,
    bottom: '15%',
    right: '5%',
  },
  series: [
    {
      name: '报警占比',
      type: 'pie',
      radius: [160, 240], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
      center: ['65%', '50%'], //图的位置，距离左跟上的位置
      // legendHoverLink: false,
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false, //隐藏标线
          position: 'center',
        },
      },
      emphasis: {
        // 饼图鼠标移入的样式效果
        disable: true, //是否关闭扇区高亮效果
        scale: true, //扇区是否缩放
        scaleSize: 14, //放大的尺寸，这里为了保证不放大扇区设置的，可要可不要
      },
      data: data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        normal: {
          // borderRadius: 1,
          borderColor: '#152766',
          borderWidth: 2,
          color: function (params) {
            //自定义颜色
            return colorList[params.dataIndex % colorList.length]
          },
        },
      },
    },
  ],
}

let myChart = $ref(null)
let dataIndex = $ref(2)
let carousel = $ref(null)
let regional_ul_status = $ref(true)
let translateY = $ref(0)
let lastIndex: number | null = null
const carouselChange = (i: number, item) => {
  // let fistIndex = i == 0 ? 9 : i - 1
  // myChart.dispatchAction({
  //     type: 'hideTip',
  //     seriesIndex: 0,
  //     dataIndex: fistIndex,
  // })
  console.log(lastIndex, 'lastIndex')
  myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: lastIndex,
  })
  // myChart.dispatchAction({
  //     type: 'showTip',
  //     seriesIndex: 0,
  //     dataIndex: i,
  //     position: function (params) {},
  // })
  if (item.count > 0) {
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: i,
    })
    lastIndex = i
  }
}

const setTransform = (i) => {
  datalist[i - 1] ? (datalist[i - 1].transform = 'transform: translateX(20px);') : ''
  datalist[i] ? (datalist[i].transform = 'transform: translateX(50px);') : ''
  datalist[i + 1] ? (datalist[i + 1].transform = 'transform: translateX(20px);') : ''
}
let currentItem: any = $ref({})
const tapItem = (item: any, index: number) => {
  console.log(index, item, 'item')
  typeData = {
    key: 'all',
    title: '',
    val: undefined,
  }
  currentItem = { ...item, show: true }
  if (item.subTypeCodeName) {
    currentItem.title = item.subTypeCodeName
  }
  // myChart.dispatchAction({
  //     type: 'hideTip',
  //     seriesIndex: 0,
  //     dataIndex: datalist[index].index,
  // })
  nextTick(() => {
    dataIndex = index
    translateY = (dataIndex - 2) * 44
    datalist.map((item) => (item.transform = ''))
    setTransform(dataIndex)
    // 数量为0则不突出显示
    carouselChange(datalist[dataIndex].index, item)
    // timer = setInterval(nfSetCarsY, timerNum)
  })
}

// let timer = null,
//     timerNum = 3000

// const nfSetCarsY = () => {
//     dataIndex++
//     if (dataIndex < datalist.length) {
//         translateY = (dataIndex - 2) * 44
//         datalist.forEach((item) => (item.transform = ''))
//         setTransform(dataIndex)
//         // carouselChange(datalist[dataIndex].index)
//     }
//     if (dataIndex > datalist.length - 4) {
//         // 无感循环
//         setTimeout(() => {
//             regional_ul_status = false
//             dataIndex = 2
//             translateY = (dataIndex - 2) * 44
//             // if (dataIndex < datalist.length)
//             //     carouselChange(datalist[dataIndex].index)
//             setTransform(dataIndex)
//             setTimeout(() => {
//                 regional_ul_status = true
//             }, 600)
//         }, 600)
//     }
// }

onActivated(() => {
  let chartDom = document.getElementById(id)
  myChart = markRaw(echarts.init(chartDom))
  option && myChart.setOption(option)
  myChart.on('click', (e) => {
    console.log(e, 'click mychart')
    tapItem(e.data, e.dataIndex)
  })
  window.addEventListener('resize', myChart.resize)
  // if (!flag) {
  //     timer = setInterval(nfSetCarsY, timerNum)
  // }
})
onMounted(() => {
  // let chartDom = document.getElementById(id)
  // myChart = markRaw(echarts.init(chartDom))
  // option && myChart.setOption(option)
  // window.addEventListener('resize', myChart.resize)
  // timer = setInterval(nfSetCarsY, timerNum)
})
onUnmounted(() => {
  // clearInterval(timer)
  window.removeEventListener('resize', myChart.resize)
})
onDeactivated(() => {
  // clearInterval(timer)
  window.removeEventListener('resize', myChart.resize)
})
const rollScroll = proxy.$_.throttle((event: any) => {
  let scrollVal = event.wheelDelta || event.detail
  // clearInterval(timer)
  if (scrollVal < 0) {
    let num = (datalist.length - 5) * 44
    translateY > num ? num : (translateY += 20)
  } else {
    translateY < 0 ? 0 : (translateY -= 20)
  }
  // proxy.$_.debounce(() => (timer = setInterval(nfSetCarsY, timerNum)), 500)
})
</script>

<style scoped lang="scss">
.circle-wrapper {
  position: relative;
  height: 100%;
  width: 1092px !important;
  @media screen  and  (min-width:1922px) {
    width: 1392px !important;
  }
  .defaultClass {
    // position: relative;
    z-index: 1;
  }
  .center-text-wrapper {
    z-index: 1;
    position: absolute;
    // width: 38.5%;
    // height: 70%;
    width: 420px;
    height: 420px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    // top: 15%;
    // left: 45.8%;
    top: 90px;
    left: 500px;
    @media screen  and  (min-width:1922px) {
        left: 695px;
    }
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    p {
      font-size: 20px;
    }
    p.title {
      color: #fbc34b;
    }
    p.rate {
      font-size: 32px;
      color: #fff;
      margin-top: 10px;
    }
    .inner-circle {
      width: 280px;
      height: 280px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      position: absolute;
      // margin-top: 10px;
      margin-left: -2px;
    }
  }
  .regional_data {
    top: 9%;
    width: 200px;
    left: 12%;
    background-size: cover;
    z-index: 10;
    height: 86%;
    .regional_ul::-webkit-scrollbar {
      display: none;
    }
    .regional_ul {
      top: 10%;
      font-family: '上首时尚体';
      letter-spacing: 2.7px;
      color: rgba(255, 255, 255, 1);
      height: 100%;
      overflow-y: scroll;
      .regional_text {
        font-family: '上首时尚体';
        letter-spacing: 1.8px;
      }
      .regional_li {
        min-width: 84px;
        height: 28px;
        line-height: 28px;
        margin-bottom: 2px;
      }
      .color_dot {
        width: 8px;
        height: 8px;
        border-radius: 50px;
      }
    }
    :deep(.el-carousel__mask) {
      background: none !important;
    }
    :deep(.el-carousel__container) {
      height: 150px !important;
    }
    :deep(.is-active) {
      color: #45dbff !important;
      margin-left: 9% !important;
      transition: all 0.5s !important;
      background: url('@/assets/images/homepage/regionalxz.png') !important;
    }
    .regional_li_active {
    }
    .regional_li_active_max {
    }
  }
}
</style>
