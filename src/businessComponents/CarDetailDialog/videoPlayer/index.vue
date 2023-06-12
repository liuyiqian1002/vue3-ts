<template>
    <div class="set-col">
        <el-main class="relative pt0 h">
            <template v-if="isIframe">
                <el-tabs v-model="activeName" class="w h">
                    <el-tab-pane class="h" label="实时播放" name="first">
                        <iframe style="min-height: 600px" width="100%" :height="height" :key="new Date().getTime()" :src="iframeUrl"></iframe>
                    </el-tab-pane>
                    <el-tab-pane label="历史回放" name="second">
                        <iframe style="min-height: 600px" width="100%" :height="height" :key="new Date().getTime()" :src="historyUrl"></iframe>
                    </el-tab-pane>
                </el-tabs>
               <el-button size="small" type="primary" class="positionTr mt5 mr20" @click="videoMark">
                   视频标记
               </el-button>
            </template>
            
            <template v-else>
                <el-tabs v-model="activeName" class="w h">
                    <el-tab-pane class="h" label="实时播放" name="first">
                        <div>
                            <el-button size="small" type="primary" round>
                                实时视频预览
                            </el-button>
                            <el-button size="small" type="primary" round>
                                停止视频预览
                            </el-button>
                        </div>
                        <el-row class="mt20">
                            <el-col :span="12" class="tw_cy">
                                <p>车牌号 鄂A12354 通道1</p>
                                <video width="260" data-channel="1" autoplay controlsList="footbar" disablepictureinpicture
                                       :poster="pause"></video>
                            </el-col>
                            <el-col :span="12" class="tw_cy">
                                <p>车牌号 鄂A12354 通道2</p>
                                <video width="260" data-channel="1" autoplay controlsList="footbar" disablepictureinpicture
                                       :poster="pause"></video>
                            </el-col>
                        </el-row>
                        <el-row class="mt10">
                            <el-col :span="12" class="tw_cy">
                                <p>车牌号 鄂A12354 通道3</p>
                                <video width="260" data-channel="1" autoplay controlsList="footbar" disablepictureinpicture
                                       :poster="pause"></video>
                            </el-col>
                            <el-col :span="12" class="tw_cy">
                                <p>车牌号 鄂A12354 通道4</p>
                                <video width="260" data-channel="1" autoplay controlsList="footbar" disablepictureinpicture
                                       :poster="pause"></video>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="历史回放" name="second">
                        <div>
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="开始时间">
                                    <el-input v-model="formInline.user" placeholder="请选择开始时间" />
                                </el-form-item>
                                <el-form-item label="结束时间">
                                    <el-select v-model="formInline.region" placeholder="请选择结束时间">
                                        <el-option label="Zone one" value="shanghai" />
                                        <el-option label="Zone two" value="beijing" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">
                                        查寻录像时间
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <video data-channel="1" autoplay controlsList="footbar" disablepictureinpicture
                               :poster="pause"></video>
                    </el-tab-pane>
                </el-tabs>
               <el-button size="small" type="primary" class="positionTr mark-bnt mr20" @click="videoMark">
                   视频标记
               </el-button>
            </template>
        </el-main>
    </div>
   
    <!--  添加违规标记  -->
    <AddvideoMark ref="addvideoMarkRef" :row="rowData"></AddvideoMark>
</template>

<script setup lang="tsx">
import AddvideoMark from '../addVideoMark/index.vue'
import pause from '@/assets/images/pause.jpg'
import { getFlvPlayConfig, getHistoryFlvPlayConfig } from '@/api/dynamicMonitoring/eventTracking'
import { EventItem } from '../types'
let { row, props, height } = defineProps({
    row: { type: Object, default: ()=> {}},
    props: { type: Object, default: ()=> {}},
    height: { type: String, default: '600px'},
    // showVideoMark: { type: Boolean }
})

let isIframe = $ref(true)
let iframeUrl = $ref('')
let historyUrl = $ref('')
queueMicrotask(() => {
    // iframeUrl = 'http://61.183.9.49:8088/cgo8/topjtbvideo/realplay?platenum=%E9%84%82ALY767&colorcode=2'
})

let value = props?.value || 'vehicleCode'

let dialogFlag = $ref(false)
let activeName = $ref('first')
let addvideoMarkRef = $ref(null)
let navIndex = $ref(0)
const viewData = () => {
    dialogFlag = true
}

const formInline = reactive({
    user: '',
    region: '',
})

const onSubmit = () => {
    console.log('submit!')
}

let emits = defineEmits(['save'])
const save = () => {
    emits('save')
}

// 违规标记
const videoMark = (e) => {
    // console.log(row, 'videoMark')
    // row = JSON.parse(JSON.stringify(row))
    addvideoMarkRef.viewData()
}

const tapCar = (i) => {
    navIndex = i
    console.log(navIndex)
}
// 根据车辆Code获取视频信息
const getData = () => {
    if(!row[value]) return
    const param = { vehicleCode: row[value] }
    getFlvPlayConfig(param).then((res: any) => {
        if (res.url) {
            iframeUrl = res.url
        }
    })
}
let rowData = $ref(row)
watch(() => row, (val) => {
    console.log(row.plateNum, val.plateNum, 'videoMark watch')
    rowData = JSON.parse(JSON.stringify(val))
    getData()
},{deep: true})
watch(() => activeName, (val) => {
    console.log(val, 'watch activeName')
    if (val === 'second') {
        getHistoryData()
    }
})


// 根据车辆Code获取视频信息
const getHistoryData = () => {
    const param = { vehicleCode: row[value] }
    getHistoryFlvPlayConfig(param).then((res: any) => {
        if (res.url) {
            historyUrl = res.url
        }
    })
}
getData()


defineExpose({ viewData, getData })
</script>

<style scoped lang="scss">
.set-col {
    height: 100%;
    :deep(.el-tabs) {
        padding: 0 !important;
        .el-tabs__content,.el-tab-pane { height: calc(100% - 20px);}
        .mark-bnt {
            margin-top: -50px;
        }

        .el-tabs__header {
            margin-bottom: 0 !important;
        }
    }

    .navs {
        .is-active {
            background: #fff;
        }
    }
}
</style>
