<template>
    <div id="trackPattern_dongtai" class="h w relative">
        <!--    轨迹地图区域    -->
        <div id="trackPattern_dongtai_map" :style="trackContentStatus?'height: calc( 100% - 75px )':''"></div>
    
        <!--    轨迹播放控件    -->
        <div class="trackPattern_control positionBc">
            <el-slider v-model="trackPatternVal" :show-tooltip="false" :show-input-controls="false" size="small" input-size="small" />
            <div class="tw_clr">
                <div class="tw_clr">
                    <div class="trackPattern_control_icons" v-show="navg">
                        <el-icon class="pointer" size="24px" v-show="trackPatternStatus" @click="carTrackPattern"><VideoPlay/></el-icon>
                        <el-icon class="pointer" size="24px" v-show="!trackPatternStatus" @click="stopCarTrackPattern"><VideoPause/></el-icon>
                    </div>
                    <p class="pl30">{{mainData.data.length}}/{{mainData.allCount}}</p>
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
        <div id="trackPattern_content_box" class="trackPattern_map trackPattern_map_modal w positionBl" ref="trackPatternMapRef" :class="`${isFullscreen?'h':''}`" :style="trackContentStatus?'height:75px':''">
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
                    <el-col :span="6">
                        <tw-es-date v-show="!mainData.formData.timeType" class="mb0 ml10" :formData="mainData.formData" :item="{label: '时间范围', key: ['startTime', 'endTime'], type:'esDate', placeholder: '选择时间', data: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss'} }"></tw-es-date>
                    </el-col>
                    <el-col class="tw_cr pr20" :span="12">
                        <el-button type="primary" icon="Search" @click="Search">搜索</el-button>
                        <el-button icon="Refresh" @click="reset"></el-button>
<!--                        <el-button>配置</el-button>-->
                    </el-col>
                </el-row>
            </el-form>
            <div class="pl10 pt5 pr10 relative">
                <el-tabs type="card" v-model="activeName" @tab-click="handleClick" class="">
                    <el-tab-pane name="guijishuju" lazy>
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon size="14px" color="inherit" icon-class="guijihuifang" />
                                <span class="ml5">轨迹数据</span>
                            </span>
                        </template>
                        <div class="pt5" :style="`height: ${trackHeight == 333?'249': trackHeight - 80}px`">
                            <el-auto-resizer>
                                <template #default="{ height, width }">
                                    <!--                                            :estimated-row-height="40"-->
                                    <el-table-v2
                                        :header-height="32"
                                        :row-height="32"
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
                    <el-tab-pane label="Config" name="tingcheshuju" lazy>
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon size="14px" color="inherit" icon-class="tingcheshuju" />
                                <span class="ml5">停车数据</span>
                            </span>
                        </template>
                        <tw-table
                            class="p0"
                            ref="carTableRef"
                            size="small"
                            id="stop_car_table"
                            showIndex
                            :lists="mainData.parkLists"
                            :columns="mainData.parkColumns"
                            :showPagination="false"
                            :isTableHeader="false"
                        >
                        </tw-table>
                    </el-tab-pane>
                    <el-tab-pane label="Role" name="xingshishuju" lazy>
                        <template #label>
                            <span class="tw_c">
                                  <SvgIcon size="14px" color="inherit" icon-class="hangshishuju" />
                                  <span class="ml5">行驶数据</span>
                            </span>
                        </template>
                        <tw-table
                            class="p0"
                            ref="xsTableRef"
                            size="small"
                            id="travel_car_table"
                            showIndex
                            :lists="mainData.travelLists"
                            :columns="mainData.travelColumns"
                            :showPagination="false"
                            :isTableHeader="false"
                        >
                        </tw-table>
                    </el-tab-pane>
                    <el-tab-pane label="Task" name="suduqushi" lazy>
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon size="14px" color="inherit" icon-class="zhexiantu" />
                                <span class="ml5">速度趋势</span>
                            </span>
                        </template>
                        <div class="w" :style="`height: ${trackHeight == 333?'254': trackHeight - 80}px`">
                            <line-max ref="lineMaxRef" id="track_line_max_echart" :defaultStyle="{ width: '100%', height: trackHeight == 333?'254px': trackHeight - 80+'px' }"></line-max>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Task" name="quanbubaojing" lazy>
                        <template #label>
                            <span class="tw_c">
                                <SvgIcon size="14px" color="inherit" icon-class="jingbao" />
                                <span class="ml5">全部报警({{mainData.allpoliceNum}})</span>
                            </span>
                        </template>
                        <tw-table
                            class="p0"
                            ref="allTableRef"
                            size="small"
                            id="all_travel_car_table"
                            showIndex
                            url="/operation/track/alarmPage"
                            :columns="mainData.allpoliceColumns"
                            :isTableHeader="false"
                            :tableParams="mainData.formData"
                        >
                            <!--                            :showPagination="false"-->
                        </tw-table>
                    </el-tab-pane>
                </el-tabs>
                
                <div class="absolute" style="top: 8px; right: 20px">
                    <el-button size="small" @click="tapSetLists">设置列</el-button>
                    <el-button v-show="activeName != 'suduqushi'" size="small" @click="trackExprot" type="primary">
                        <svg-icon color="var(--el-text-color)" icon-class="daochu" size="14px"></svg-icon>
                        <span class="ml5">导出</span>
                    </el-button>
                    <el-button link>
                        <svg-icon :icon-class="!trackContentStatus?'shousuo':'zhankai'" @click="trackContentStatus = !trackContentStatus"></svg-icon>
                    </el-button>
                    <el-button link>
                        <svg-icon icon-class="fangda2" @click="onScreenfull"></svg-icon>
                    </el-button>
                </div>
            </div>
        </div>
        <!--  设置列  -->
        <setLists v-model:lists="mainData[arrSetlistsStr]" ref="arrSetlistsRef"></setLists>
    </div>
    
</template>

<script setup lang="tsx">
import { ElAutoResizer} from "element-plus";
import {getToken} from "../../../../../utils/auth";
import chuzuche from "@/assets/images/cars/chuzuche.png";
import {
    alarmCount, exportAlarmPage,
    exportParkTime,
    exportTrackData,
    exportTravelTime,
    stopPushTrack
} from "@/api/dynamicMonitoring/messages";
import setLists from "./components/setLists/index.vue"




let collapseActiveName = inject('collapseActiveName')
// let mapStatus = inject('mapStatus')
let drawerFlag = $ref(false)
let isFullscreen = $ref(false)

let loading = $ref(false)
let lineMaxRef = $ref(null)
let carTableRef = $ref(null)
let xsTableRef = $ref(null)
let allTableRef = $ref(null)
let arrSetlistsRef = $ref(null)
let arrSetlistsStr = ref('columns')
let map, marker
let trackPatternStatus = $ref(true)
let trackContentStatus = $ref(false)
let playStatus = $ref(false)
let trackPatternVal = $ref(0)
let trackPatternSpeedVal = $ref(50)
let carSpeed = $ref(1000)
let trackConH = $ref('333px')
let trackHeight = $ref(333)

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

    // "endTime": "2022-11-01 23:59:59",
    // "plateNum": "鄂ASK782",
    // "startTime": "2022-11-01 00:00:57",
    // "vehicleCode": "HBASK7822",
    // "timeType": '',
let mainData = reactive({
    
    
    formData: {
        "voms-token": getToken(),
        "endTime": proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "plateNum": "",
        "startTime": proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'),
        "vehicleCode": "",
        "timeType": '',
        pageNumber: 1,
        pageSize: 20
    },
    allCount: 1000,
    data:[],
    parkLists: [],      // 停车数据
    travelLists: [], // 行驶数据
    columns: [
        {title: '序号', width: 80, cellRenderer: (row) => row.rowIndex+1, label: "序号"},
        { width: 100, dataKey: 'plateNum', key: "plateNum", title: "车牌号", hidden: false, label: "车牌号"},
        { width: 160, dataKey: 'gspTimeString', key: "gspTimeString", title: "卫星时间" , hidden: false, label: "卫星时间"},
        { width: 180, dataKey: 'receiveTime', key: "receiveTime", title: "接收时间" , hidden: false, label: "接收时间"},
        { width: 80, dataKey: 'runningSpeed', key: "runningSpeed", title: "速度km/h" , hidden: false, label: "速度km/h"},
        { width: 80, dataKey: 'directionCN', key: "directionCN", title: "行驶方向" , hidden: false, label: "行驶方向"},
        { width: 100, dataKey: 'totalDistance', key: "totalDistance", title: "里程(km)" , hidden: false, label: "里程(km)"},
        { width: 320, dataKey: 'vehicleStatusDesc', key: "vehicleStatusDesc", title: "车辆状态" , hidden: false, label: "车辆状态"},
        { width: 150, dataKey: 'alarmStatusName', key: "alarmStatusName", title: "报警状态" , hidden: false, label: "报警状态"},
        { width: 80, dataKey: 'limitedSpeed', key: "limitedSpeed", title: "限速km/h" , hidden: false, label: "限速km/h"},
        { width: 140, dataKey: 'parkTime', key: "parkTime", title: "停车时长" , hidden: false, label: "停车时长"},
        { width: 160, dataKey: 'locationName', key: "locationName", title: "位置信息" , hidden: false, label: "位置信息"},
    ],
    parkColumns: [
        { prop: "gpsTimeStart", label: "开始时间", hidden: false},
        { prop: "gpsTimeEnd", label: "结束时间", hidden: false},
        { prop: "parkTime", label: "停车时长", hidden: false},
        { prop: "gpsAddr", label: "停车位置", hidden: false},
    ],
    travelColumns: [
        { prop: "gpsTimeStart", label: "开始时间", hidden: false},
        { prop: "gpsTimeEnd", label: "结束时间", hidden: false},
        { prop: "travelTime", label: "行驶时长", hidden: false},
        { prop: "travelMileage", label: "行驶里程", hidden: false},
        { prop: "startGpsAddr", label: "开始位置", hidden: false},
        { prop: "endGpsAddr", label: "结束位置", hidden: false},
    ],
    allpoliceNum: 0,
    allpoliceColumns: [
        { prop: "alarmTypeName", label: "报警类型", hidden: false},
        { prop: "eventStartTime", label: "开始时间", hidden: false},
        { prop: "eventEndTime", label: "结束时间", hidden: false},
        { prop: "duration", label: "持续时长", hidden: false},
        { prop: "currentSpeed", label: "速度（km/h）", hidden: false},
        { prop: "limitSpeed", label: "限速值（km/h）", hidden: false},
        { prop: "eventStartLocation", label: "开始位置", hidden: false},
        { prop: "eventEndLocation", label: "结束位置", hidden: false},
    ]
})

let activeName = $ref('guijishuju')
let trackPatternMapRef = $ref(null)
let emits = defineEmits(['carTrackPattern','clearLists'])
let source = null

// 设置列
const tapSetLists = () => {
    switch (activeName) {
        case 'guijishuju':
            arrSetlistsStr.value = 'columns'
            break;
        case 'tingcheshuju':
            arrSetlistsStr.value = 'parkColumns'
            break;
        case 'xingshishuju':
            arrSetlistsStr.value = 'travelColumns'
            break;
        case 'quanbubaojing':
            arrSetlistsStr.value = 'allpoliceColumns'
            break;
    }
    nextTick(()=>{
        console.log(arrSetlistsStr);
        arrSetlistsRef.viewData()
    })
}

// 重置
const reset = () => {
    mainData.formData= {
        "voms-token": getToken(),
        "endTime": proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "plateNum": "",
        "startTime": proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'),
        "vehicleCode": "",
        "timeType": '',
        pageNumber: 1,
        pageSize: 20
    }
}

// 轨迹导出
const trackExprot = () => {
    let objApi = {
        'guijishuju': { api:exportTrackData, txt: '轨迹数据', data: mainData.formData },
        'tingcheshuju': { api:exportParkTime, txt: '停车数据', data: {parkTimeDtos: mainData.parkLists, plateNum: mainData.formData.plateNum} },
        'xingshishuju': { api:exportTravelTime, txt: '行驶数据', data: {travelTimeDtos: mainData.travelLists, plateNum: mainData.formData.plateNum} },
        'quanbubaojing': { api:exportAlarmPage, txt: '全部报警', data: mainData.formData },
    }
    proxy.MessageBox({msg: `确定导出${objApi[activeName].txt}吗？`, type: 'warning'}).then((close) => {
        objApi[activeName].api(objApi[activeName].data).then(res=>{
            ElMessage.success('导出成功，可到下载列表查看！')
            close()
        }).catch(()=>{
            close()
        })
    })
}

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
            if (ev.data == 0) {
                playStatus = true
                if(mainData.data.length == 0){
                    marker = new AMap.Marker({
                        map: map,
                        position: mainData.data[0] || [114.304569,30.593354],
                        icon: chuzuche,
                        offset: new AMap.Pixel(-26, -13),
                        autoRotation: true,
                    });
                }else {
                    let lastObj = mainData.data[0]
                    map.setZoomAndCenter(7, [lastObj.longitude, lastObj.latitude]);
                    setTimeout(()=>{
                        trackPatternStatus = false
                        navg = pathSimplifierIns.createPathNavigator(0, {
                            loop: false,
                            speed: carSpeed * trackPatternSpeedVal,
                            pathNavigatorStyle: {
                                width: 18,
                                height: 58,
                                content: PathSimplifier.Render.Canvas.getImageContent(chuzuche, onload, onerror),
                                strokeStyle: null,
                                fillStyle: null
                            }
                        })
                        navg.start();
                        getNaviStatus()
                    }, 1000)
                }
                source.close();
            } else {
                playStatus = false
                let res = JSON.parse(ev.data);
                // 数据加载完成
                if(res.originalTrackVos){
                    mainData.allCount = res.allCount
                    mainData.data = [...mainData.data, ...res.originalTrackVos] // 轨迹数据
                    mainData.parkLists = [...mainData.parkLists, ...res.parkTimeDtos]   // 停车数据
                    mainData.travelLists = [...mainData.travelLists, ...res.travelTimeDtos] // 行驶数据
                    trackPatternVal = mainData.data.length / res.allCount * 100     // 数据进度条
                    if(activeName == 'suduqushi'){
                        // lineMaxRef.resize()
                        lineMaxRef.update(mainData.data)
                    }
                    map.setZoomAndCenter(10, res.locations[0]);
                    emits('carTrackPattern', res.originalTrackVos, res.endPoint)
                }
            }
        };
        source.onerror = function (err) {
            source.close();
        }
    
        // 获取报警数
        alarmCount(mainData.formData).then(res=>{
            mainData.allpoliceNum = res
        })
    } else {
        ElMessage.warning('您的浏览器不支持消息推送，请更换谷歌、火狐或其他浏览器！');
    }
}

const handleClick = (tab) => {
    nextTick(()=>{
        if(tab.props.name == 'tingcheshuju'){
            carTableRef.setTableDataHeight()
        }else if(tab.props.name == 'xingshishuju'){
            xsTableRef.setTableDataHeight()
        }else if(tab.props.name == 'suduqushi'){
            lineMaxRef.update(mainData.data)
            lineMaxRef.resize()
        }else if(tab.props.name == 'quanbubaojing'){
            // allTableRef.setTableDataHeight()
            allTableRef.getTable()
        }
    })
}

const handClose = (fn:any)=>{
    // stopPushTrack({}).then(()=>{
    drawerFlag = false
    if(source) source.close();
    mainData.parkLists = []
    mainData.data = []
    mainData.travelLists = []
    cacheTrackTable = []
    trackPatternVal = 0
    if(fn){
        fn(true)
    }
    // }).catch(()=>{
    //     if(fn){
    //         fn(false)
    //     }
    // })
}

let carLists = []
const viewData = (carLists)=>{
    navg = null
    drawerFlag = true
    if(carLists.length == 0) return
    cacheTrackTable = [];
    if(map){
        map = new AMap.Map('trackPattern_dongtai_map', {
            center: [114.304569,30.593354],//108.3628,22.8150
            zoom: 6,//设置初始化级别
        });
    }else{
        initMap()
    }
    if(carLists.length>0){
        carLists = carLists
        mainData.formData.plateNum = carLists[0].orgName || carLists[0].plateNum
        mainData.formData.vehicleCode = carLists[0].permissionCode ||  carLists[0].vehicleCode
        getTable()
    }
   
    // }, 1000)
}

// 搜索
const Search = () => {
    if(!mainData.formData.vehicleCode) return ElMessage.warning('请选择车辆!')
    navg = null
    emits('clearLists')
    handClose(()=>{
        drawerFlag = true
        nextTick(()=>{
            if(map){
                map = new AMap.Map('trackPattern_dongtai_map', {
                    center: [114.304569,30.593354],//108.3628,22.8150
                    zoom: 6,//设置初始化级别
                });
            }else{
                initMap()
            }
            getTable()
        })
    })
}

// 轨迹小汽车开跑
let navg, timer
const carTrackPattern = () => {
    if(!playStatus) return ElMessage.warning('轨迹还在加载中')
    let status = navg.getNaviStatus()
    if(status == "pause"){
        navg.resume()
    }else {
        startPathNavigator()
    }
    nextTick(()=>{
        getNaviStatus()
    })
}


const startPathNavigator = () => {
    
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
            
            nextTick(()=>{
                navg = pathSimplifierIns.createPathNavigator(0, {
                    loop: false,
                    speed: carSpeed * trackPatternSpeedVal,
                    pathNavigatorStyle: {
                        width: 18,
                        height: 58,
                        content: PathSimplifier.Render.Canvas.getImageContent(chuzuche, onload, onerror),
                        strokeStyle: null,
                        fillStyle: null
                    }
                })
            })
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
       
        pathSimplifierIns.clearPathNavigators()
    }
}

// 暂停
const stopCarTrackPattern = ()=>{
    if(!playStatus) return ElMessage.warning('轨迹还在加载中')
    if(!navg) return
    clearInterval(timer)
    trackPatternStatus = true
    navg.pause()
}

// 小汽车开跑速度
const setCarTrackPatternSpeed = (val) => {
    if(!navg) return
    navg.setSpeed(carSpeed*val)
}

// 全屏
const onScreenfull = () => {
    isFullscreen = !isFullscreen
    if(isFullscreen){
        trackConH = window.innerHeight - 60 + 'px'
        trackHeight = window.innerHeight - 60
    }else {
        trackConH = '333px'
        trackHeight = 333
    }
    handleClick({props:{name: activeName}})
}

defineExpose({ setMapTrack, viewData, handClose, clearPath})

</script>

<style scoped lang="scss">
#trackPattern_dongtai {
    :deep(.trackPattern_map) {
        height: v-bind(trackConH);background: var(--el-bg-color);
        .el-drawer__body { padding: 0;}
        .el-tabs__header { height: 34px;margin-bottom: 0 }
        .el-tabs, .el-tabs__item { height: 34px; line-height: 32px; border: none;margin-bottom: 0}
        .el-tabs--card>.el-tabs__header .el-tabs__nav { border: none}
        .el-tabs__item.is-active { background: rgba(231,241,255,1);border-radius: 8px 8px 0 0;}
        .el-table-v2__header-cell { background: var(--el-bg-color);}
    }
    #trackPattern_dongtai_map { height: calc( 100% - v-bind(trackConH))}
    .trackPattern_map_modal { height: v-bind(trackConH)}
    .trackPattern_control {
        padding: 0 40px;
        bottom: 350px;width: 763px;height: 60px;border-radius: 6px;background: var(--el-bg-color);box-shadow: 0 5px 12px 4px rgba(0,0,0,0.09), 0 3px 6px 0 rgba(0,0,0,0.12), 0 1px 2px -2px rgba(0,0,0,0.16);
        :deep(.el-slider__button-wrapper) { display: none }
    }
}

</style>
