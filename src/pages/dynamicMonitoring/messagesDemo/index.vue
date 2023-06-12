<template>
    <div id="meaages" class="tw w h">
        <transition name="slide-fade">
            <div v-show="isCollapseStatus" class="messages_left relative h">
                <navContent ref="navContentRef" :formData="formData" @carDetails="carDetailsTap" @tapClick="tapClick" @checkNode="checkNode" @setCollapseActiveName="collapseStatusChange" @zoomAndCenterIns="zoomAndCenterIns" @closeCarDetails="mapCarDateilsColse" @nodeClick="nodeClick" @isCollapse="isCollapse"></navContent>
            </div>
        </transition>
        <div class="messages_right h relative" :style="`width: ${isCollapseStatus?'calc(100% - 330px)':'calc(100% - 1px)'}`">
            <div class="w h tw">
                <!--    视频模式    -->
                <div class="relative w h bgWhite border-l" v-show="patternActive === 1" style="z-index: 999">
                    <videoPlayer class="w" ref="videoPlayerRef" :row="carItem" :props="{value: 'permissionCode'}" height="100%"></videoPlayer>
                </div>
                <!--    地图显示（不含轨迹模式）    -->
                <mapContent v-show="patternActive === 0" :formData="formData" ref="mapContentRef" @tapClick="tapClick"></mapContent>
                <!--    轨迹模式    -->
                <trackPattern v-show="patternActive === 2" ref="trackPatternRef" @carTrackPattern="carTrackPattern"></trackPattern>
            </div>
            
           
            <!--    模式切换    -->
            <patternCut @tapClick="tapClick" @setCollapseActiveName="patternCutStatusChange"></patternCut>
            <!--    工具栏    -->
            <toolsCut @tapClick="tapClick"></toolsCut>
    
            <el-button v-show="!isCollapseStatus" class="positionCl" style="left: 30px" @click="isCollapse" type="primary" icon="ArrowRight" circle />
        </div>
        
        <!--    车辆详情    -->
        <carDetails :formData="formData" ref="carDetailsRef" @tapClick="tapClick"></carDetails>
        <!--    地图车辆详情    -->
        <mapCarDateils ref="mapCarDateilsRef" @tapClick="tapClick"></mapCarDateils>
        <!--    照片查询    -->
<!--        <photoQueryContent :props="{value: 'vehicleCode', label: 'plateNum' }" ref="photoQueryRef"></photoQueryContent>-->
        <!--  抽查/ 视频  -->
        <spotCheck :props="{value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists" ref="spotCheckRef" ></spotCheck>
        <!--    发送语音    -->
        <sendVoice :props="{value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists" ref="sendVoiceRef"></sendVoice>
        <!--    车辆监控    -->
        <vehicleMonitoring :props="{value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists" ref="vehicleMonitoringRef"></vehicleMonitoring>
        <!--    文本信息    -->
        <txtMsg :props="{value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists" ref="txtMsgRef"></txtMsg>
        <!--    电子围栏下发    -->
        <electronicFence :props="{value: 'vehicleCode', label: 'plateNum' }" fence :carLists="carLists" ref="electronicFenceRef"></electronicFence>
        <!--    拍照    -->
        <setPhotograph :props="{value: 'vehicleCode', label: 'plateNum' }" :carLists="carLists" ref="photographRef"></setPhotograph>
        <!--    右下角报警提示    -->
        <callPolice :props="{value: 'vehicleCode', label: 'plateNum' }" ref="callPoliceRef" @takeMsg="takeMsg"></callPolice>
    </div>
    
</template>

<script setup  lang="tsx">
import navContent from './components/navContent/index.vue'
import mapContent from './components/mapContent/index.vue'
import carDetails from './components/carDetails/index.vue'
import mapCarDateils from './components/mapCarDateils/index.vue'
// import photoQueryContent from './components/photoQueryContent/index.vue'
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
import {removeVehicleUserFocus, saveVehicleUserFocus, getVehicleListForCheckedNodeNotPage} from "@/api/dynamicMonitoring/messages";


let { proxy } = getCurrentInstance()
let navContentRef = $ref(null)
let mapContentRef = $ref(null)
let carDetailsRef = $ref(null)
let mapCarDateilsRef = $ref(null)
let photoQueryRef = $ref(null)
let spotCheckRef = $ref(null)
let sendVoiceRef = $ref(null)
let vehicleMonitoringRef = $ref(null)
let txtMsgRef = $ref(null)
let electronicFenceRef = $ref(null)
let photographRef = $ref(null)
let callPoliceRef = $ref(null)
let trackPatternRef = $ref(null)
let videoPlayerRef = $ref(null)
let collapseActiveName = $ref('1')
let isCollapseStatus = $ref(true)
let patternActive = $ref(0)
// 当前车辆信息
let carItem = $ref({})

provide('collapseActiveName', computed(()=> collapseActiveName))
provide('patternActive', computed(()=> patternActive))

let formData = reactive({
    "is808": 0,
    "operatorIdList": [],
    "parentCode": "",
    "vehicleOperateTypeCodeList": [],
    "vehicleStatus": '',
    "vehicleType": '',
    "pageNumber": 1,
    "pageSize": 30,
    filter: false,
    keyword: '',
    type: '',
    vehicleCodeList: [],
    currentCheckedPermissionCodeList: []
})
let carLists = $ref([])

setTimeout(()=>{
    callPoliceRef.viewData()
}, 1000)

const checkNode = (data, obj, checkData)=>{
    formData = {...formData, ...checkData}
    nextTick(()=>{
        data.lastLongitude = data.longitude;
        data.lastLatitude = data.latitude;
        mapContentRef.getCarsBubble(data, obj, formData)
        if(obj.checkedKeys.includes(data.permissionCode) && data.vehicle){
            // 打开车辆详情
            // mapContentRef.zoomAndCenterIns.start(data, 20)
            // data['lnglat'] = {
            //     lng: data.longitude,
            //     lat: data.latitude,
            // }
            // mapContentRef.customBusiness(data)
        }else {
            mapContentRef.zoomAndCenterIns.zoomAndCenter(data)
            // 关闭车辆详情
            mapCarDateilsColse()
        }
    })
}

const nodeClick = (data, node, checkData) => {
    formData = {...formData, ...checkData}
    if(patternActive == 0){
        nextTick(()=>{
            if(data.vehicle){
                data.lastLongitude = data.longitude;
                data.lastLatitude = data.latitude;
                // mapContentRef.getCarsBubble(data, obj, formData)
                // 打开车辆详情
                data['lnglat'] = {
                    lng: data.longitude,
                    lat: data.latitude,
                }
                mapContentRef.customBusiness(data)
            }
        })
    }else if(patternActive == 1){
        if(data.vehicle || data.channelDtos){
            if(data.channelDtos){
                data['permissionCode'] = data.vehicleCode
            }
            carItem = data
        }
        nextTick(()=>{
            videoPlayerRef.getData(carItem)
        })
    }else if(patternActive == 2){
        if(data.vehicle){
            carItem = data
        }
        nextTick(()=>{
            lists = []  // 清空之前轨迹
            trackPatternRef.handClose()// 关闭轨迹显示区域
            trackPatternRef.viewData([data])  // 打开轨迹显示区域
        })
    }
}

// 左侧菜单切换
const collapseStatusChange = (val)=>{
    collapseActiveName = val
}

// 模式切换
const patternCutStatusChange = (val, eMap)=>{
    collapseActiveName = val
    patternActive = eMap
    // 轨迹或视频模式都切换到车辆详情并加载
    if(eMap == 1 || eMap == 2){
        navContentRef.getTree()
    }
    nextTick(()=>{
        if(eMap==2){
            getCars(formData).then(()=>{
                trackPatternRef.viewData(carLists)  // 打开轨迹显示区域
            })
        }else {
            lists = []; // 清空轨迹数据
            trackPatternRef.handClose()// 关闭轨迹显示区域
        }
    })
}

// 获取选中车辆
// type=> pattern:模式切换  mapClick: 地图点击行为
const getCars = (node, type)=>{
    return new Promise((resolve, reject)=>{
        let data = proxy.$_.cloneDeep(formData)
        if((data.currentCheckedPermissionCodeList.length > 0 || (data.currentCheckedPermissionCodeList.length == 0 && !node.vehicle ))&& !type){
            if(data.currentCheckedPermissionCodeList.length == 0 && !node.vehicle){
                data.currentCheckedPermissionCodeList = [node.permissionCode]
            }
            getVehicleListForCheckedNodeNotPage(data || {currentCheckedPermissionCodeList:["P000001"]}).then(res=>{
                carLists = res
                resolve(res)
            }).catch((err)=>{
                reject(err)
            })
        }else {
            if(type == 'mapClick'){
                // 地图车辆点击拍照
                carLists = node
            }else if(type == 'pattern'){
                // 模式切换 - 视频
                carLists = []
            }else {
                carLists = [node]
            }
            resolve(carLists)
            console.log(carLists);
        }
    
    })
}

// 发送照片/ 拍照
const sendPhoto = (data, type)=>{
    getCars(data, type).then(()=>{
        photographRef.viewData(data)
    })
}

// 发送语音
const sendVoiceEvent = (data, type)=>{
    getCars(data, type).then(()=>{
        sendVoiceRef.viewData(data)
    })
    // sendVoiceRef.viewData(data)
}

// 查看视频
const sendVideo = (data, type)=>{
    // 模式切换查看视频
    if(type == 'pattern'){
        // mapContentRef.updateMap()
    }else {
        getCars(data).then(()=>{
            spotCheckRef.viewData(data)
        })
    }
}

// 车辆监控
const monitoring = (data)=>{
    vehicleMonitoringRef.viewData(data)
}

// 文本信息
const txtDetails = (data)=>{
    getCars(data).then(()=>{
        txtMsgRef.viewData(data)
    })
}

// 电子围栏下发
const fenceIssue = (data)=>{
    electronicFenceRef.viewData(data)
}

// 照片查询
const photoQuery = (data)=>{
    getCars(data).then(()=>{
        photoQueryRef.viewData(data)
    })
}



// 查看车辆详情
const carDetailsTap = (data)=>{
    if(data.currentCheckedPermissionCodeList.length == 0 && data.vehicleCodeList.length == 0){
        return ElMessage.warning('请先选择车辆后再查看详情！')
    }
    carDetailsRef.viewData(data)
}

// 查看地图车辆详情
const mapCarDateilsViewData = (data)=>{
    mapCarDateilsRef.viewData(data)
}

// 关注
const attention = (item) => {
    proxy.MessageBox({msg: `确定关注${item.plateNum}！`, type: 'warning'}).then((close) => {
        saveVehicleUserFocus({vehicleCodeList: [item.vehicleCode]}).then((res)=>{
            item.focusId = true
            close()
        }).catch(()=>{
            close()
        })
    })
    
}

// 取消关注
const unfollow = (item) => {
    proxy.MessageBox({msg: `确定取消关注${item.plateNum}！`, type: 'warning'}).then((close) => {
        removeVehicleUserFocus({vehicleCodeList: [item.vehicleCode]}).then((res)=>{
            item.focusId = false
            close()
        }).catch(()=>{
            close()
        })
    })
}

// 推送消息（指令跟踪，平台事件）
const takeMsg = (data) => {
    if(data.messageType == 2) { // 指令下发回传
        carDetailsRef.instructionTracing(data)
    }else {
        carDetailsRef.platformEvent(data)
    }
}

// 关闭地图车辆详情
const mapCarDateilsColse = () => {
    mapCarDateilsRef.close()
}
let lists = [],dataLists = []

// 车辆轨迹
const carTrackPattern = (data, endPoint) => {
    let arr = [], num = data.length
    if(!num) return
    for (let i = 0; i < num; i++) {
        arr[i] = [data[i].longitude, data[i].latitude]
    }
    // lists = []
    if(lists.length == 0){
        mapContentRef.setTrackZoomAndCenter(arr[0], endPoint)
    }
    lists = [...lists, ...arr]
    
    dataLists = [...dataLists, ...data]
    trackPatternRef.setMapTrack(lists, dataLists, endPoint)
    
}

// 查看车辆详情 - 地图定位缩放
const zoomAndCenterIns = (data, zoom) => {
    // 只有地图模式才会地图车辆详情联动
    if(mapContentRef.patternActive == '0'){
        // mapContentRef.zoomAndCenterIns.start(data, zoom)
        mapContentRef.customBusiness(data, zoom)
    }
}

// 左侧菜单调整
const isCollapse = ()=>{
    isCollapseStatus = !isCollapseStatus
}

// 事件分发
const tapClick = (key, data, type) => {
    switch (key) {
        case 'sendPhoto':
            sendPhoto(data, type)
            break;
        case 'sendVoice':
            sendVoiceEvent(data, type)
            break;
        case 'sendVideo':
            sendVideo(data, type)
            break;
        case 'photoQuery':
            photoQuery(data)
            break;
        case 'carDateils':
            carDetailsTap(data)
            break;
        case 'mapCarDateils':
            mapCarDateilsViewData(data)
            break;
        case 'colseMapCarDateilsRef':
            mapCarDateilsColse()
            break;
        case 'quxiaoguanzhu':
            unfollow(data[0])
            break;
        case 'guanzhu':
            attention(data[0])
            break;
        case 'vehicleMonitoring':
            monitoring(data)
            break;
        case 'txtMsg':
            txtDetails(data)
            break;
        case 'electronicFence':
            fenceIssue(data)
            break;
    }
}
</script>

<style scoped>
.messages_left { width: 330px; z-index: 999}
.messages_right {}
</style>
