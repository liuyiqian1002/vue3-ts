<template>
    <div id="trackPattern_dongtai" class="h w relative">
        <!--    轨迹地图区域    -->
        <div id="trackPattern_dongtai_map"></div>
    
        <!--    轨迹播放控件    -->
        <div class="trackPattern_control positionBc">
            <el-slider v-model="trackPatternVal" :show-tooltip="false" :show-input-controls="false" size="small" input-size="small" />
            <div class="tw_clr">
                <div class="tw_clr">
                    <div class="trackPattern_control_icons">
                        <el-icon class="pointer" size="24px" v-show="trackPatternStatus" @click="carTrackPattern"><VideoPlay/></el-icon>
                        <el-icon class="pointer" size="24px" v-show="!trackPatternStatus" @click="stopCarTrackPattern"><VideoPause/></el-icon>
                    </div>
                </div>
                <div class="tw_c">
                    <svg-icon icon-class="bofangsudu"></svg-icon>
                    <div class="w200 ml10">
                        <el-slider v-model="trackPatternSpeedVal" :show-tooltip="false" :show-input-controls="false" size="small" input-size="small" @input="setCarTrackPatternSpeed" />
                    </div>
                </div>
            </div>
        </div>
        
        <!--    轨迹控制区域    -->
        <div class="trackPattern_map trackPattern_map_modal" ref="trackPatternMapRef">
            <el-form size="small" :model="mainData.formData" class="pt5 pb5 pl5 border-b">
                <el-row>
                    <el-col :span="3">
<!--                            <tw-select class="mb0" :formData="mainData.formData" :item="{label: '车牌号', key: 'companyId', type:'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1 }, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码', children: []}" ></tw-select>-->
                        <el-form-item class="mb0">
                            <template #label><span class="ml10">车牌号</span></template>
                            <el-input v-model="mainData.formData.plateNum" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item class="mb0">
                            <template #label><span class="ml10">自定义时间</span></template>
                            <el-select v-model="mainData.formData.timeType" placeholder="" clearable>
                                <el-option label="前天" :value="1" />
                                <el-option label="昨天" :value="2" />
                                <el-option label="今天" :value="3" />
                                <el-option label="最近1小时" :value="4" />
                                <el-option label="最近3小时" :value="5" />
                                <el-option label="最近6小时" :value="6" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <tw-es-date v-show="!mainData.formData.timeType" class="mb0 ml10" :formData="mainData.formData" :item="{label: '时间范围', key: ['startTime', 'endTime'], type:'esDate', placeholder: '选择时间', data: { valueFormat: 'YYYY-MM-DD'} }"></tw-es-date>
                    </el-col>
                    <el-col class="tw_cr pr20" :span="13">
                        <el-button type="primary" icon="Search">搜索</el-button>
                        <el-button icon="RefreshRight"></el-button>
                        <el-button>配置</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div class="pl10 pt5 pr10 relative">
                <el-tabs type="card" v-model="activeName" class="">
                    <el-tab-pane name="guijishuju">
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon color="inherit" icon-class="cheliangxunjian" />
                                <span class="ml5">轨迹数据</span>
                            </span>
                        </template>
                        <div class="pt5" style="height: 249px">
                            <el-auto-resizer>
                                <template #default="{ height, width }">
                                    <!--                                            :estimated-row-height="40"-->
                                    <el-table-v2
                                        :header-height="40"
                                        :row-height="40"
                                        :columns="mainData.columns"
                                        :data="mainData.data"
                                        :width="width"
                                        :height="height"
                                        size="small"
                                        fixed
                                    />
                                </template>
                            </el-auto-resizer>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Config" name="tingcheshuju">
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon color="inherit" icon-class="tingche" />
                                <span class="ml5">停车数据</span>
                            </span>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="Role" name="xingshishuju">
                        <template #label>
                            <span class="tw_c">
                                  <SvgIcon color="inherit" icon-class="hangshishuju" />
                                  <span class="ml5">行驶数据</span>
                            </span>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="Task" name="suduqushi">
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon color="inherit" icon-class="zhexiantu" />
                                <span class="ml5">速度趋势</span>
                            </span>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="Task" name="quanbubaojing">
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon color="inherit" icon-class="jingqingpeizhi" />
                                <span class="ml5">全部报警</span>
                            </span>
                        </template>
                    </el-tab-pane>
                </el-tabs>
                
                <div class="absolute" style="top: 8px; right: 20px">
                    <el-button size="small">设置列</el-button>
                    <el-button size="small" type="primary">
                        <svg-icon color="var(--el-text-color)" icon-class="zhilinggenzong" @click="handClose" size="14px"></svg-icon>
                        <span class="ml5">导出</span>
                    </el-button>
                    <el-button link>
                        <svg-icon icon-class="zhilinggenzong" @click="handClose"></svg-icon>

                    </el-button>
                    <el-button link>
                        <svg-icon icon-class="zhilinggenzong" @click="handClose"></svg-icon>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="tsx">
import { ElAutoResizer} from "element-plus";
import {getToken} from "../../../../../utils/auth";
import {inject} from "vue";
import chuzuche from "@/assets/images/cars/chuzuche.png";
import {stopPushTrack} from "@/api/dynamicMonitoring/messages";

// {
//     "endTime": "",
//     "plateNum": "",
//     "startTime": "",
//     "timeType": "",
//     "vehicleCode": ""
// }


let collapseActiveName = inject('collapseActiveName')
// let mapStatus = inject('mapStatus')
let drawerFlag = $ref(false)

let loading = $ref(false)
let map, marker = $ref({}), cluster, markers = []
let trackPatternStatus = $ref(true)
let trackPatternVal = $ref(0)

let trackPatternSpeedVal = $ref(50)
let carSpeed = $ref(1000)

let { proxy } = getCurrentInstance()
let switchCheck = inject('switchCheck')
watch(switchCheck, (val)=>{
    if(val){
        map.setMapStyle('amap://styles/dark');
    }else{
        map.setMapStyle('amap://styles/macaron');
    }
})



const initMap = () => {
    map = new AMap.Map('trackPattern_dongtai_map', {
        resizeEnable: true,
        // center: center ? center : CONFIG.latLng,//108.3628,22.8150
        center: [114.304569,30.593354],//108.3628,22.8150
        zoom: 6,//设置初始化级别
    });
    
    
    map.plugin(["AMap.MouseTool", "AMap.RangingTool"], function () {  //鼠标工具插件
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

let mainData = reactive({
    formData: {
        "voms-token": getToken(),
        "endTime": "2022-11-01 23:59:59",
        "plateNum": "鄂ASK782",
        "startTime": "2022-11-01 00:00:57",
        "vehicleCode": "HBASK7822",
        "timeType": ''
    },
    data:[],
    columns: [
        {title: '序号', width: 80, cellRenderer: (row) => row.rowIndex+1},
        { width: 100, dataKey: 'plateNum', key: "plateNum", title: "车牌号"},
        { width: 160, dataKey: 'gspTimeString', key: "gspTimeString", title: "卫星时间" },
        { width: 180, dataKey: 'receiveTime', key: "receiveTime", title: "接收时间" },
        { width: 80, dataKey: 'runningSpeed', key: "runningSpeed", title: "速度km/h" },
        { width: 80, dataKey: 'directionCN', key: "directionCN", title: "行驶方向" },
        { width: 100, dataKey: 'totalDistance', key: "totalDistance", title: "里程(km)" },
        { width: 320, dataKey: 'vehicleStatusDesc', key: "vehicleStatusDesc", title: "车辆状态" },
        { width: 150, dataKey: 'alarmStatusName', key: "alarmStatusName", title: "报警状态" },
        { width: 80, dataKey: 'limitedSpeed', key: "limitedSpeed", title: "限速km/h" },
        { width: 140, dataKey: 'parkTime', key: "parkTime", title: "停车时长" },
        { width: 160, dataKey: 'locationName', key: "locationName", title: "位置信息" },
    ]
})

let activeName = $ref('guijishuju')
let trackPatternMapRef = $ref(null)
let emits = defineEmits(['carTrackPattern'])
let source = null

const getTable = ()=>{
    if ('EventSource' in window) {
        // 指令下发，获取轨迹数据
        let url = encodeURI(`api/operation/track/getTrackData?req=${JSON.stringify(mainData.formData)}`);
        source = new EventSource(url);
        source.onopen = function () {
            let msgArr = ['连接中', '已连接', '连接已断'];
            console.log('EventSource：' + msgArr[this.readyState]);
        };
    
    //消息接收
        source.onmessage = function (ev) {
            if(!drawerFlag) return source = null
            if (ev.data == "0") {
                
                // marker = new AMap.Marker({
                //     map: map,
                //     position: trackPointData[0],
                //     icon: "https://webapi.amap.com/images/car.png",
                //     offset: new AMap.Pixel(-26, -13),
                //     autoRotation: true,
                //     angle: -90,
                // });
                // marker.moveAlong(trackPointData, 6000);
                
                source.close();
            } else {
                let res = JSON.parse(ev.data);
                // console.log(res);
                mainData.data = [...mainData.data, ...res.originalTrackVos]
                emits('carTrackPattern', res.originalTrackVos, res.endPoint)
            }
        };
        
        source.onerror = function (err) {
            source.close();
        }
    } else {
        ElMessage.warning('您的浏览器不支持消息推送，请更换谷歌、火狐或其他浏览器！');
    }
}


const handClose = ()=>{
    stopPushTrack({}).then(()=>{
        drawerFlag = false
        source = null
        mainData.data = []
        cacheTrackTable = []
    })
}

const viewData = (carLists)=>{
    drawerFlag = true
    // setTimeout(()=>{
        cacheTrackTable = [];
        // speedData = [];
    if(map){
        map = new AMap.Map('trackPattern_dongtai_map', {
            center: [114.304569,30.593354],//108.3628,22.8150
            zoom: 6,//设置初始化级别
        });
    }else{
        initMap()
    }
    if(carLists.length>0){
        mainData.formData.plateNum = carLists[0].plateNum
        mainData.formData.vehicleCode = carLists[0].vehicleCode
        getTable()
    }
   
    // }, 1000)
}


// 轨迹小汽车开跑
let navg, timer
const carTrackPattern = () => {
    if(navg){
        let status = navg.getNaviStatus()
        if(status == "pause"){
            navg.resume()
        }else {
            startPathNavigator()
        }
    }else {
        startPathNavigator()
    }
    
    getNaviStatus()
}


const startPathNavigator = () => {
    navg = pathSimplifierIns.createPathNavigator(0, {
        loop: false,
        speed: carSpeed * trackPatternSpeedVal,
        pathNavigatorStyle: {
            width: 16,
            height: 32,
            content: PathSimplifier.Render.Canvas.getImageContent(chuzuche, onload, onerror),
            strokeStyle: null,
            fillStyle: null
        }
    })
    navg.start();
}

let cacheTrackTable = []
let pathSimplifierIns, PathSimplifier
// 轨迹绘制
const setMapTrack = (PathData, dataLists, endPoint ) => {
    // 数据对象为空或无数据直接返回
    if (PathData === null || PathData.length === 0) {
        return;
    }
    cacheTrackTable = dataLists
    //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
    AMapUI.load(['ui/misc/PathSimplifier'], function (data) {
        PathSimplifier = data
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        // 初始化轨迹组件
        initPathSimplifier(PathSimplifier, PathData, name);
    });
}

const getNaviStatus = ()=>{
    trackPatternStatus = false
    timer = setInterval(()=>{
        let status = navg.getNaviStatus()
        if(status == "pause"){
            trackPatternStatus = true
            navg.destroy()
            clearInterval(timer)
        }
    }, 1000)
}

// 初始化轨迹
const initPathSimplifier = (PathSimplifier, PathData, name) => {
    let startPoint = PathData[0];
    //
    //创建组件实例
    pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        autoSetFitView: false,
        map: map, //所属的地图实例
        getPath: function (pathData, pathIndex) {
            //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
            return pathData.path;
        },
        getHoverTitle: function (pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
                //point
                let row = cacheTrackTable[pointIndex];
                if (row !== undefined && row !== null) {
                    let info = [];
                    info.push("<div>卫星时间：" + row.gspTimeString || '-');
                    /* info.push("报警类型：" + row.alarmStatusName);*/
                    info.push("速　度　：" + row.runningSpeed);
                    /* info.push("位　置　：" + row.locationName);*/
                    info.push("</div>");
                    return info.join("<br>");
                }
            }
            return "";
        },
        renderOptions: {
            //轨迹线的样式
            pathLineStyle: {
                strokeStyle: 'green',
                lineWidth: 6,
                dirArrowStyle: true
            },
            pathLineHoverStyle: false,
            getPathStyle: function(pathItem, zoom) {
                
                let color = "#3366cc", lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));
                
                return {
                    pathLineStyle: {
                        strokeStyle: color,
                        lineWidth: lineWidth
                    },
                    pathLineSelectedStyle: {
                        lineWidth: lineWidth + 2
                    },
                    pathNavigatorStyle: {
                        fillStyle: color
                    }
                };
            }
            
        },
        clickToSelectPath: false,//设置轨迹线不能点击
    });
    
    //构建轨迹
    pathSimplifierIns.setData([{
        name: name,//'车辆轨迹',
        path: PathData
    }]);
    
    // carTrackPattern(PathSimplifier, pathSimplifierIns)
}


// 清空轨迹
const clearPath = () => {
    if(pathSimplifierIns){
        // pathSimplifierIns.setData([])
        // map.destroy()
        // initMap()
        // pathSimplifierIns.render()
        // pathSimplifierIns.hide()
        pathSimplifierIns.clearPathNavigators()
    }
}

// 暂停
const stopCarTrackPattern = ()=>{
    if(!navg) return
    clearInterval(timer)
    trackPatternStatus = true
    navg.pause()
}

const setCarTrackPatternSpeed = (val) => {
    if(!navg) return
    navg.setSpeed(carSpeed*val)
}


defineExpose({ setMapTrack, viewData, handClose, clearPath})

</script>

<style scoped lang="scss">
#trackPattern_dongtai {
    :deep(.trackPattern_map) {
        height: 333px !important;
        .el-drawer__body { padding: 0;}
        .el-tabs__header { height: 34px;margin-bottom: 0 }
        .el-tabs, .el-tabs__item { height: 34px; line-height: 32px; border: none;margin-bottom: 0}
        .el-tabs--card>.el-tabs__header .el-tabs__nav { border: none}
        .el-tabs__item.is-active { background: rgba(231,241,255,1);border-radius: 8px 8px 0 0;}
        .el-table-v2__header-cell { background: rgba(241,241,246,1);}
    }
    #trackPattern_dongtai_map { height: calc( 100% - 333px)}
    .trackPattern_map_modal { height: 333px}
    .trackPattern_control {
        padding: 0 40px;
        bottom: 350px;width: 763px;height: 60px;border-radius: 6px;background: rgba(255,255,255,1);box-shadow: 0 5px 12px 4px rgba(0,0,0,0.09), 0 3px 6px 0 rgba(0,0,0,0.12), 0 1px 2px -2px rgba(0,0,0,0.16);
        :deep(.el-slider__button-wrapper) { display: none }
    }
}

</style>
