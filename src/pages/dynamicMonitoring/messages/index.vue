<template>
    <div id="meaages" class="tw_c w h">
        <!--        <transition name="slide-fade">-->
        <div v-show="isCollapseStatus" class="messages_left relative h">
            <navContent
                ref="navContentRef"
                :formData="formData"
                @carDetails="carDetailsTap"
                @tapClick="tapClick"
                @checkNode="checkNode"
                @zoomAndCenterIns="zoomAndCenterIns"
                @closeCarDetails="mapCarDateilsColse"
                @nodeClick="nodeClick"
                @isCollapse="isCollapse"
            ></navContent>
        </div>
        <!--        </transition>-->
        <div class="messages_right h relative"
             :style="`width: ${isCollapseStatus ? 'calc(100% - 330px)' : 'calc(100% - 1px)'}`">
            <div class="w h tw">
                <!--    视频模式    -->
                <div class="relative w h bgWhite border-l" v-if="patternActive === 1">
                    <videoPlayer ref="videoPlayerRef" v-if="carItem.vehicle" :row="carItem"
                                 :props="{ value: 'permissionCode' }" height="100%"></videoPlayer>
                    <div v-else class="w h tw_cy">
                        <el-image :src="dtjc_video_yd"></el-image>
                        <p class="fs24">点击车辆、观看视频</p>
                    </div>
                </div>
                <!--    地图显示（不含轨迹模式）    -->
                <mapContent v-show="patternActive === 0" :formData="formData" ref="mapContentRef"
                            @tapClick="tapClick"></mapContent>
                <!--    轨迹模式    -->
                <div class="w" v-if="patternActive === 2" v-loading="loading">
                    <trackPattern ref="trackPatternRef" @carTrackPattern="carTrackPattern"
                                  @clearLists="clearLists"></trackPattern>
                </div>
            </div>
            
            <!--    模式切换    -->
            <patternCut ref="patternCutRef" @tapClick="tapClick" @setCollapseActiveName="patternCutStatusChange"></patternCut>
            <!--    工具栏    -->
            <toolsCut ref="toolsCutRef" @tapClick="tapClick"></toolsCut>
            <!--    展开左侧树    -->
            <el-button v-show="!isCollapseStatus" class="positionCl" style="left: 30px" @click="isCollapse"
                       type="primary" icon="ArrowRight" circle/>
        </div>
        
        <!--    车辆详情    -->
        <carDetails :formData="formData" ref="carDetailsRef" @tapClick="tapClick"></carDetails>
        <!--    地图车辆详情    -->
        <mapCarDateils ref="mapCarDateilsRef" @tapClick="tapClick"></mapCarDateils>
        <!--  抽查/ 视频  -->
        <spotCheck :props="{ value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists"
                   ref="spotCheckRef"></spotCheck>
        <!--    发送语音    -->
        <sendVoice :props="{ value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists"
                   ref="sendVoiceRef"></sendVoice>
        <!--    车辆监控    -->
        <vehicleMonitoring :props="{ value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists"
                           ref="vehicleMonitoringRef"></vehicleMonitoring>
        <!--    文本信息    -->
        <txtMsg :props="{ value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists" ref="txtMsgRef"></txtMsg>
        <!--    电子围栏下发    -->
        <electronicFence :props="{ value: 'vehicleCode', label: 'plateNum' }" fence :carLists="carLists"
                         ref="electronicFenceRef"></electronicFence>
        <!--    拍照    -->
        <setPhotograph :props="{ value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists"
                       ref="photographRef"></setPhotograph>
    </div>
</template>

<script setup lang="tsx">
import dtjc_video_yd from '@/assets/dtjc_video_yd.png'
import navContent from './components/navContent/index.vue'
import mapContent from './components/mapContent/index.vue'
import carDetails from './components/carDetails/index.vue'
import mapCarDateils from './components/mapCarDateils/index.vue'
import spotCheck from './components/spotCheck/index.vue'
import sendVoice from './components/sendVoice/index.vue'
import vehicleMonitoring from './components/vehicleMonitoring/index.vue'
import txtMsg from './components/txtMsg/index.vue'
import electronicFence from './components/electronicFence/index.vue'
import setPhotograph from './components/setPhotograph/index.vue'
import callPolice from './components/callPolice/index.vue'
import trackPattern from './components/trackPattern/index.vue'
import patternCut from './components/patternCut/index.vue'
import toolsCut from './components/toolsCut/index.vue'
import videoPlayer from '@/businessComponents/CarDetailDialog/videoPlayer/index.vue'
import {
    removeVehicleUserFocus,
    saveVehicleUserFocus,
    getVehicleListForCheckedNodeNotPage
} from '@/api/dynamicMonitoring/messages'

let {proxy} = getCurrentInstance()
let navContentRef = $ref(null)
let mapContentRef = $ref(null)
let carDetailsRef = $ref(null)
let mapCarDateilsRef = $ref(null)
let spotCheckRef = $ref(null)
let sendVoiceRef = $ref(null)
let vehicleMonitoringRef = $ref(null)
let toolsCutRef = $ref(null)
let txtMsgRef = $ref(null)
let electronicFenceRef = $ref(null)
let photographRef = $ref(null)
let trackPatternRef = $ref(null)
let videoPlayerRef = $ref(null)
let patternCutRef = $ref(null)
let collapseActiveName = $ref('1')
let isCollapseStatus = $ref(true)
let loading = $ref(false)
let patternActive = $ref(0)
// 当前车辆信息
let carItem = $ref({})

provide('collapseActiveName', computed(() => collapseActiveName),)
provide('patternActive', computed(() => patternActive),)

let formData = reactive({
    is808: 0,
    operatorIdList: [],
    parentCode: '',
    vehicleOperateTypeCodeList: [],
    vehicleStatus: '',
    vehicleType: '',
    pageNumber: 1,
    pageSize: 30,
    filter: false,
    keyword: '',
    type: '',
    vehicleCodeList: [],
    currentCheckedPermissionCodeList: [],
})
let carLists = $ref([])

const checkNode = (data, obj, checkData) => {
    formData = {...formData, ...checkData}
    nextTick(() => {
        data.lastLongitude = data.longitude
        data.lastLatitude = data.latitude
        mapContentRef.getCarsBubble(data, obj, formData)
        if (obj.checkedKeys.includes(data.permissionCode) && data.vehicle) {
            // 打开车辆详情
            // mapContentRef.zoomAndCenterIns.start(data, 20)
            // data['lnglat'] = {
            //     lng: data.longitude,
            //     lat: data.latitude,
            // }
            // mapContentRef.customBusiness(data)
        } else {
            mapContentRef.zoomAndCenterIns.zoomAndCenter(data)
            // 关闭车辆详情
            mapCarDateilsColse()
        }
    })
}

const nodeClick = (data, node, checkData) => {
    formData = {...formData, ...checkData}
    if (patternActive == 0) {
        nextTick(() => {
            if (data.vehicle) {
                data.lastLongitude = data.longitude
                data.lastLatitude = data.latitude
                // 打开车辆详情
                data['lnglat'] = {
                    lng: data.longitude,
                    lat: data.latitude,
                }
                // if(data.vehicle){
                //     formData.vehicleCodeList.push(data.permissionCode)
                // }
                // mapContentRef.getCarsBubble(data, node, formData)
                mapContentRef.customBusiness(data)
            }
        })
    } else if (patternActive == 1) {
        if (data.vehicle || data.channelDtos) {
            if (data.channelDtos) {
                data['permissionCode'] = data.vehicleCode
            }
            carItem = data
            nextTick(() => {
                carItem.vehicleCode = carItem.permissionCode
                carItem.plateNum = carItem.orgName
                if (carItem.vehicle) {
                    carItem.showVideoMark = true
                    videoPlayerRef?.viewData(carItem)
                }
            })
        }
    } else if (patternActive == 2) {
        if (data.vehicle) {
            carItem = data
        }
        if (!loading && data.vehicle) {
            loading = true
            nextTick(() => {
                trackPatternRef?.handClose((status) => {
                    if (status) {
                        lists = [] // 清空之前轨迹
                        loading = false
                        trackPatternRef?.viewData([data]) // 打开轨迹显示区域
                    }
                }) // 关闭轨迹显示区域
            })
        } else {
            // ElMessage.warning('请选择车辆查看轨迹!')
        }
    }
}

// 模式切换
const patternCutStatusChange = (val, eMap) => {
    mapCarDateilsColse()
    collapseActiveName = val
    patternActive = eMap
    nextTick(() => {
        if (eMap == 2) {
            getCars(formData).then(() => {
                trackPatternRef?.viewData(carLists) // 打开轨迹显示区域
            })
        } else {
            lists = [] // 清空轨迹数据
            trackPatternRef?.handClose() // 关闭轨迹显示区域
        }
    })
}

// 获取选中车辆
// type=> pattern:模式切换  mapClick: 地图点击行为
const getCars = (node, type) => {
    return new Promise((resolve, reject) => {
        let data = proxy.$_.cloneDeep(formData),
            codeLists = data.currentCheckedPermissionCodeList,
            vehicleCodeList = data.vehicleCodeList
        if ((codeLists.length > 0 || (codeLists.length == 0 && !node?.vehicle) || (vehicleCodeList.length > 0 && node.vehicle) || (codeLists.length == 0 && vehicleCodeList.length == 0 && node?.vehicle)) && !type) {
            if (codeLists.length == 0 && !node?.vehicle && vehicleCodeList.length == 0) {
                data.currentCheckedPermissionCodeList = [node.permissionCode]
            }
            if (codeLists.length == 0 && node?.vehicle && vehicleCodeList.length == 0) {
                data.vehicleCodeList = [node.permissionCode]
            }
            data.haveGPS = false
            getVehicleListForCheckedNodeNotPage(data).then((res) => {
                carLists = res
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        } else {
            if (type == 'mapClick') {
                // 地图车辆点击拍照
                carLists = node
            } else if (type == 'pattern') {
                // 模式切换 - 视频
                carLists = []
            } else {
                carLists = [node]
            }
            resolve(carLists)
        }
    })
}

// 轨迹回放
const guijihuifang = (data) => {
    mapCarDateilsColse()
    patternCutRef.setPatternActive(2)
    collapseActiveName = '2'
    patternActive = 2
    carItem = data[0]
    carLists = data
    if (!loading) {
        loading = true
        nextTick(() => {
            trackPatternRef?.handClose((status) => {
                if (status) {
                    lists = [] // 清空之前轨迹
                    loading = false
                    trackPatternRef?.viewData(data) // 打开轨迹显示区域
                }
            }) // 关闭轨迹显示区域
        })
    }
}

// 发送照片/ 拍照
const sendPhoto = (data, type) => {
    getCars(data, type).then(() => {
        photographRef.viewData(data)
    })
}

// 发送语音
const sendVoiceEvent = (data, type) => {
    getCars(data, type).then(() => {
        sendVoiceRef.viewData(data)
    })
}

// 查看视频
const sendVideo = (data, type) => {
    // 模式切换查看视频
    if (type == 'pattern') {
        // mapContentRef.updateMap()
    } else {
        getCars(data, type).then(() => {
            nextTick(() => {
                spotCheckRef.viewData(data)
            })
        })
    }
}

// 车辆监控
const monitoring = (data) => {
    vehicleMonitoringRef.viewData(data)
}

// 文本信息
const txtDetails = (data) => {
    getCars(data).then(() => {
        txtMsgRef.viewData(data)
    })
}

// 电子围栏下发
const fenceIssue = (data) => {
    electronicFenceRef.viewData(data)
}

// 地图皮肤切换
const mapSwitching = (data) => {
    mapContentRef.skinSwitching(data)
}

// 地图工具
const mapTools = (data) => {
    mapContentRef.mapTools(data)
}

// 查看车辆详情
const carDetailsTap = (data) => {
    if (data.currentCheckedPermissionCodeList.length == 0 && data.vehicleCodeList.length == 0) {
        ElMessage.warning('请先选择车辆后再查看详情！')
        return
    }
    carDetailsRef.viewData(data)
}

// 查看地图车辆详情
const mapCarDateilsViewData = (data) => {
    mapCarDateilsRef.viewData(data)
}

// 关注
const attention = (item) => {
    proxy.MessageBox({msg: `确定关注${item.plateNum}！`, type: 'warning'}).then((close) => {
        saveVehicleUserFocus({vehicleCodeList: [item.vehicleCode]}).then((res) => {
            item.focusId = true
            close()
        }).catch(() => {
            close()
        })
    })
}

// 取消关注
const unfollow = (item) => {
    proxy.MessageBox({msg: `确定取消关注${item.plateNum}！`, type: 'warning'}).then((close) => {
        removeVehicleUserFocus({vehicleCodeList: [item.vehicleCode]}).then((res) => {
            item.focusId = false
            close()
        }).catch(() => {
            close()
        })
    })
}

// 推送消息（指令跟踪，平台事件）
const takeMsg = (data) => {
    if (data.messageType == 2) {
        // 指令下发回传
        carDetailsRef.instructionTracing(data)
    } else {
        carDetailsRef.platformEvent(data)
    }
}

// 关闭地图车辆详情
const mapCarDateilsColse = () => {
    mapCarDateilsRef.close()
}
let lists = [],
    dataLists = []

// 车辆轨迹
const carTrackPattern = (data, endPoint) => {
    let arr = [],
        num = data.length
    if (!num) return
    for (let i = 0; i < num; i++) {
        arr[i] = [data[i].longitude, data[i].latitude]
    }
    // lists = []
    // if(lists.length == 0){
    //     mapContentRef.setTrackZoomAndCenter(arr[0], endPoint)
    // }
    lists = [...lists, ...arr]
    
    dataLists = [...dataLists, ...data]
    trackPatternRef.setMapTrack(lists, dataLists, endPoint)
}

// 清空轨迹数据
const clearLists = () => {
    lists = []
}

// 查看车辆详情 - 地图定位缩放
const zoomAndCenterIns = (data, zoom) => {
    // 只有地图模式才会地图车辆详情联动
    if (mapContentRef.patternActive == '0') {
        // mapContentRef.zoomAndCenterIns.start(data, zoom)
        mapContentRef.customBusiness(data, zoom)
    }
}

// 左侧菜单调整
const isCollapse = () => {
    isCollapseStatus = !isCollapseStatus
}

// 事件分发
const tapClick = (key, data, type) => {
    switch (key) {
        case 'sendPhoto':
            sendPhoto(data, type)
            break
        case 'sendVoice':
            sendVoiceEvent(data, type)
            break
        case 'sendVideo':
            sendVideo(data, type)
            break
        case 'carDateils':
            carDetailsTap(data)
            break
        case 'mapCarDateils':
            mapCarDateilsViewData(data)
            break
        case 'colseMapCarDateilsRef':
            mapCarDateilsColse()
            break
        case 'quxiaoguanzhu':
            unfollow(data[0])
            break
        case 'guanzhu':
            attention(data[0])
            break
        case 'vehicleMonitoring':
            monitoring(data)
            break
        case 'txtMsg':
            txtDetails(data)
            break
        case 'electronicFence':
            fenceIssue(data)
            break
        case 'mapSwitching':
            mapSwitching(data)
            break
        case 'mapTools':
            mapTools(data)
            break
        case 'guijihuifang':
            guijihuifang(data)
            break
    }
}

defineExpose({takeMsg})
</script>

<style scoped>
.messages_left {
    width: 330px;
    z-index: 999;
}

.messages_right {
}
</style>
