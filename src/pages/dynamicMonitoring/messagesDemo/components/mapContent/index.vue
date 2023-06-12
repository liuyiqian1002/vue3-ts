<template>
     <div class="messages_content w h">
        <div id="messages_map_content" v-loading="loading" element-loading-background="rgba(122, 122, 122, 0.8)" class="w h positionTl">
    
        </div>
    </div>
    
</template>

<script setup lang="tsx">
import qi from "@/assets/images/qi.png"
import iconXings from "@/assets/images/map/icon-xings.png"
import dian1 from "@/assets/images/map/dian1.png"
import dian2 from "@/assets/images/map/dian2.png"
import dian3 from "@/assets/images/map/dian3.png"
import dian4 from "@/assets/images/map/dian4.png"
import dian5 from "@/assets/images/map/dian5.png"
import chuzuche from '@/assets/images/cars/chuzuche.png'
import gongjiache from '@/assets/images/cars/gongjiaoche.png'
import lvyoukeyun from '@/assets/images/cars/lvyoukeyun.png'
import puhuo from '@/assets/images/cars/puhuo.png'
import weiyun from '@/assets/images/cars/weiyun.png'
import chuzuche_o from '@/assets/images/cars/chuzuche_o.png'
import gongjiache_o from '@/assets/images/cars/gongjiaoche_o.png'
import lvyoukeyun_o from '@/assets/images/cars/lvyoukeyun_o.png'
import puhuo_o from '@/assets/images/cars/puhuo_o.png'
import weiyun_o from '@/assets/images/cars/weiyun_o.png'
import {getVehicleDetail, getVehicleListForCheckedNodeNotPage, getVehicleState} from "../../../../../api/dynamicMonitoring/messages";

import {inject} from "vue";

let { proxy } = getCurrentInstance()
let switchCheck = inject('switchCheck')
watch(switchCheck, (val)=>{
    if(val){
        map.setMapStyle('amap://styles/dark');
    }else{
        map.setMapStyle('amap://styles/macaron');
    }
})


let patternActive = $ref(0)
let loading = $ref(false)
let carDateilsObj = $ref({})
let map, marker = $ref({}), cluster, markers = []



const initMap = (layers, zoom, center) => {
        map = new AMap.Map('messages_map_content', {
            resizeEnable: true,
            // center: center ? center : CONFIG.latLng,//108.3628,22.8150
            center: center ? center : [114.304569,30.593354],//108.3628,22.8150
            layers: layers,
            zoom: zoom ? zoom : 6,//设置初始化级别
            // zooms:[3,18], //设置缩放级别范围 3-18 级
        });

        
        map.plugin(["AMap.MouseTool", "AMap.RangingTool"], function () {  //鼠标工具插件
            let mousetool = new AMap.MouseTool(map);
            let rangingTool = new AMap.RangingTool(map);
            
            //创建右键菜单
            let contextMenu = new AMap.ContextMenu();
            
            //右键放大
            contextMenu.addItem("漫游", function () {
                
                mousetool.close(true)
                rangingTool.turnOff(true)
                map.setDefaultCursor('pointer');
            }, 0);
            //清楚车辆
            contextMenu.addItem("清除全部车辆", function () {
                mousetool.close(true)
                rangingTool.turnOff(true)
                for (let i = 0; i < radios.length; i += 1) {
                    radios[i].checked = false;
                }
                // zoomAndCenterIns.clearScribeMap();
                // pointCollectIns.removeAllMakers();
            }, 1);
            
            map.on('rightclick', function (e) {
                if (map.getDefaultCursor() === 'crosshair') {
                    return
                }
                contextMenu.open(map, e.lnglat);
            });
            
            map.on('click', function (e) {
                let cursor = map.getDefaultCursor()
                if (cursor === 'zoom-in') {
                    map.zoomIn();
                } else if (cursor === 'zoom-out') {
                    map.zoomOut();
                }
            });
        });
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });
        
        return map;
}

onMounted(()=>{
    initMap()
})

let imgobj = {
    10: lvyoukeyun,
    11: lvyoukeyun,
    20: puhuo,
    30: weiyun,
    // 40: weiyun,     // 已跟产品确认，不管
    // 50: weiyun,     // 已跟产品确认，不管
    // 60: weiyun,     // 已跟产品确认，不管
    // 70: weiyun,     // 已跟产品确认，不管
    80: gongjiache,
    90: chuzuche,
    91: chuzuche,
    // 99: chuzuche,     // 已跟产品确认，不管
    100: lvyoukeyun,
}
let imgobj_o = {
    10: lvyoukeyun_o,
    11: lvyoukeyun_o,
    20: puhuo_o,
    30: weiyun_o,
    // 40: weiyun,     // 已跟产品确认，不管
    // 50: weiyun,     // 已跟产品确认，不管
    // 60: weiyun,     // 已跟产品确认，不管
    // 70: weiyun,     // 已跟产品确认，不管
    80: gongjiache_o,
    90: chuzuche_o,
    91: chuzuche_o,
    // 99: chuzuche,     // 已跟产品确认，不管
    100: lvyoukeyun_o,
}
const getCarImg = (state)=>{
    if(state.online){
        return imgobj[state.vehicleOperateTypeCode]
    }else {
        return imgobj_o[state.vehicleOperateTypeCode]
    }
}

/**
 * 获取车辆状态图标
 * @param：state {openLocation:1,openAcc:2,runningSpeed：3}
 * **/
const getVehicleOnlieIcon = (state)=> {
    
    let editStr = `<div class="map_content_icon tw_c">`;
    if (state.online) {
        if (!state.openLocation) {
            editStr += `<svg style="fill: #26C9FF" class="icon vehicleStatus"><use xlink:href="#weidingwei"></use></svg>${state.plateNum}`;//未定位
        } else if (!state.openAcc) {
            editStr += `<svg style="fill: #26C9FF" class="icon vehicleStatus"><use xlink:href="#dingwei"></use></svg>${state.plateNum}`;//acc关
        } else if (state.runningSpeed == null || state.runningSpeed <= 0) {
            editStr += `<svg style="fill: #26C9FF" class="icon vehicleStatus"><use xlink:href="#tingche"></use></svg>${state.plateNum}`;//停车中
        } else if ((state.runningSpeed != null || state.runningSpeed > 0)  && !state.direction) {
            editStr += `<svg style='fill:#FF4D4F' class="icon vehicleStatus"><use xlink:href="#yizhuxiao"></use></svg>${state.plateNum}`;;//行驶
        }else if ((state.runningSpeed != null || state.runningSpeed > 0) && state.direction && state.direction>0) {
            editStr += `<svg style='transform:rotate(${state.direction}deg);fill:#26C9FF' class="icon vehicleStatus"><use xlink:href="#hangshizhong"></use></svg>${state.plateNum}`;//行驶
        }
        
    } else {
        // editStr = "<span class='vehicleStatus iconfont blackColor icon-lixian'  data-text='离线中' data-color='#4c5353' />";
        editStr += `<svg style="fill: #AAAAAA" class="icon vehicleStatus yizhuxiao"><use xlink:href="#yizhuxiao"></use></svg> ${state.plateNum}`;
    }
    editStr += `</div><img style="width: 10px; margin-left: 45px;margin-top: 5px;transform:rotate(${state.direction}deg);" src="${getCarImg(state)}" />`
    return editStr;
}

const initPointsToMarkers = (points)=> {
    for (let i = 0; i < points.length; i += 1) {
        let item = points[i];
        let maker = new AMap.Marker({
            position: item.lnglat,
            content: getVehicleOnlieIcon(item),
            offset: new AMap.Pixel(-50, -15),
            // label: {
            //     content: item.plateNum,
            //     offset: new AMap.Pixel(20, 1),
            // }
        });
        maker.vehicleId = item.vehicleId;
        AMap.event.addListener(maker, 'click', function (cluster) {
            emits('tapClick', 'colseMapCarDateilsRef')
            customBusiness(cluster);
        });
        markers.push(maker);
    }
    addCluster();
}

//地图定位和打点
const customBusiness = (cluster, zoom)=> {
    loading = true
    let target = cluster.target? cluster.target:cluster;
    getVehicleState({vehicleId: target.vehicleId}).then(res=>{
        let data = res[0]
        data.maker = target;
        data.lastLongitude = cluster.lnglat.lng;
        data.lastLatitude = cluster.lnglat.lat;
        zoomAndCenterIns.start(data, zoom)
        // zoomAndCenterIns.start(data, 10)
        loading = false
    }).catch(()=>{
        loading = false
    })
    
}

// 气泡显示效果
const addCluster = ()=> {
    if (cluster) {
        cluster.setMap(null);
    }
    var sts = [{
        url: dian5,
        size: new AMap.Size(24, 24),
        offset: new AMap.Pixel(-12, -12),
        textColor:'#fff'
    },{
        url: dian4,
        size: new AMap.Size(30, 30),
        offset: new AMap.Pixel(-15, -15),
        textColor:'#fff'
    },{
        url: dian3,
        size: new AMap.Size(38, 38),
        offset: new AMap.Pixel(-19, -19),
        textColor:'#fff'
    },{
        url: dian2,
        size: new AMap.Size(48, 48),
        offset: new AMap.Pixel(-24, -24),
        textColor:'#fff'
    },{
        url: dian1,
        size: new AMap.Size(60, 60),
        offset: new AMap.Pixel(-30, -30),
        textColor:'#fff'
    }];
    map.plugin(["AMap.MarkerClusterer"], function () {
        // new AMap.Text({styles: {'font-size': '10px'}})
        cluster = new AMap.MarkerClusterer(map, markers, {gridSize: 40,styles: sts, maxZoom: 16});
        loading = false
    });
}

// 地图定位，缩放
const zoomAndCenterIns = new function (){
    //私有成员，外部不能调用
    let self = this,
        //其他零散设置的中心点
        centerPointsVehicleId = [],
        SimpleMarker = null,//地图maker ui组件对象
        SimpleInfoWindow = null;//地图信息弹窗ui组件对象
    self.zoomAndCenter = (data) => {
        // map.setZoomAndCenter(4, [data.longitude, data.latitude]);
        map.setZoomAndCenter(6, [114.271438, 30.558833]);
    }
    
    self.start = (data, zoom)=> {
        if (!data.lastLongitude || !data.lastLatitude) {
            return ElMessage.warning("未找到经纬度相关数据");
        }
        carDateilsObj = data
        let position = [data.lastLongitude, data.lastLatitude]
        // 设置缩放级别和中心点
        map.setZoomAndCenter(zoom ? zoom : map.getZoom(), position);//[116.205467, 39.907761]
        centerPointsVehicleId.push(data.vehicleId);
        let params = {vehicleCode: data.vehicleCode, vehicleStatusDesc: data.vehicleStatusDesc, online: data.online, vehicleId: data.vehicleId, gpsTime: data.gpsTime, isOnline: data.isOnline,}
        getVehicleDetail(params).then(res=>{
            data = {...data, ...res}
            emits('tapClick', 'mapCarDateils', data)
            // carDateilsRef.viewData(data)
        })
    }
}


// 获取显示车辆信息
const getCarsBubble = (data, { checkedKeys }, formData)=>{
    markers = []
    if(checkedKeys.length>0){
        loading = true
        getVehicleListForCheckedNodeNotPage(formData || {currentCheckedPermissionCodeList:["P000001"]}).then(res=>{
            initPointsToMarkers(res)
        }).catch(()=>{
            loading = false
        })
    }else{
        initPointsToMarkers([])
    }
}

getCarsBubble({}, {checkedKeys:['P000001']})


const setTrackZoomAndCenter = (starPoint, endPoint) => {
    map.setZoomAndCenter(9, starPoint);
}

const updateMap = () => {
    markers = []
    initPointsToMarkers([])
}


let emits = defineEmits(['tapClick'])
const tapClick = (key)=>{
    emits('tapClick', key)
}

defineExpose({getCarsBubble, zoomAndCenterIns, patternActive, customBusiness, setTrackZoomAndCenter, updateMap})

</script>

<style lang="scss" scoped>
.messages_content {


}
</style>
