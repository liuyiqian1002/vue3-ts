<template>
    <transition name="fade-transform" mode="out-in" appear>
        <template v-if="dialogFlag">
            <div id="callPolice" class="el-notification right" :class="mainData.msgLists[0].alarmLevel == 1?'yujing':'baojing'" style="bottom: 16px; z-index: 2044; width: 430px; height: 210px">
                    <el-icon class="el-notification__icon el-notification--warning" v-if="mainData.msgLists[0].alarmLevel == 1">
                        <!--            alarmLevel 1是预警  2是报警-->
                        <svg-icon icon-class="yujingtongzhi" color="#FAAD14" size="24px"></svg-icon>
                    </el-icon>
                    <el-icon class="el-notification__icon el-notification--warning" v-else>
                        <!--            alarmLevel 1是预警  2是报警-->
                        <svg-icon icon-class="baojingtongzhi" color="#FF4D4F" size="24px"></svg-icon>
                    </el-icon>
            
                    <div class="el-notification__group"><h2 class="el-notification__title">{{ title }}</h2>
                        <div class="el-notification__content " style=" width: 330px">
                            <tw-descriptions :column="2" :label-width="74" :lists="mainData.descriptionsLists"
                                             :data="mainData.msgLists[0] ?? {}"></tw-descriptions>
                        </div>
                        
                        <el-button class="absolute" style="bottom: 10px; right: 12px" type="primary" link>查看详情</el-button>
                        <el-progress class="w positionBl" :stroke-width="4" :text-inside="true" :percentage="num*10" />
                        <el-icon class="el-notification__closeBtn" @click="close"><Close/></el-icon>
                    </div>
            </div>
        </template>
        
    </transition>
    
</template>

<script setup lang="tsx">
import {getToken} from "../../../../../utils/auth";

let { type, title } = defineProps({
    title: { type: String, default: '报警'},
    type: { type: String, default: 'info'},
})

let mainData = reactive({
    formData: {},
    msgLists: [],
    descriptionsLists: [
        { key: 'plateNum', label: '车牌号码：', span: 2 },
        { key: 'alarmStatusName', label: '报警类型：', span: 2 },
        { key: 'alarmLevelString', label: '报警级别：' },
        { key: 'runningSpeed', label: '当前速度：' },
        { key: 'currentConfigSpeedLimit', label: '系统限速：' },
        { key: 'currentRoadSpeedLimit', label: '路段限速：' },
        { key: 'companyName', label: '企业信息：' },
    ],
    // websocket相关
    socketObj: {
        onopen: '',
        onerror: '',
        onclose: '',
        onsend: '',
        onmessage: '',
    }, // websocket实例对象
    //心跳检测
    heartCheck: {
        timeout: 10000, // 超时时间
        timeoutObj: null, // 计时器对象——向后端发送心跳检测
        serverTimeoutObj: null, // 计时器对象——等待后端心跳检测的回复
        // 心跳检测重置
        reset: function () {
            // console.log(1, mainData.heartCheck);
            clearTimeout(mainData.heartCheck.timeoutObj);
            clearTimeout(mainData.heartCheck.serverTimeoutObj);
            return this;
        },
        // 心跳检测启动
        start: function () {
            mainData.heartCheck.timeoutObj && clearTimeout(mainData.heartCheck.timeoutObj);
            mainData.heartCheck.serverTimeoutObj && clearTimeout(mainData.heartCheck.serverTimeoutObj);
            // @ts-ignore
            mainData.heartCheck.timeoutObj = setTimeout(() => {
                // 这里向后端发送一个心跳检测，后端收到后，会返回一个心跳回复
                mainData.socketObj.send("HeartBeat");
                console.log("发送心跳检测");
                // @ts-ignore
                mainData.heartCheck.serverTimeoutObj = setTimeout(() => {
                    // 如果超过一定时间还没重置计时器，说明websocket与后端断开了
                    console.log("未收到心跳检测回复");
                    // 关闭WebSocket
                    mainData.heartCheck.socketObj.close();
                }, mainData.heartCheck.timeout);
            }, mainData.heartCheck.timeout);
        },
    },
    socketReconnectTimer: null, // 计时器对象——重连
    socketReconnectLock: false, // WebSocket重连的锁
    socketLeaveFlag: false, // 离开标记（解决 退出登录再登录 时出现的 多次相同推送 问题，出现的本质是多次建立了WebSocket连接）
})

let dialogFlag = $ref(false)
// let timer = $ref(false)
let num = $ref(0)
let timer
const viewData = ()=>{
    if(!dialogFlag){
        if(mainData.msgLists.length> 0){
            dialogFlag = true
            num = 0
            timer = setInterval(()=>{
                num= num+1
                if(num>10){
                    mainData.msgLists.splice(0,1)
                    dialogFlag = false
                    clearInterval(timer)
                    if(mainData.msgLists.length>0){
                        setTimeout(()=>{
                            viewData()
                        }, 1000)
                    }
                }
            }, 1000)
        }
        
    }
}

const close = ()=>{
    dialogFlag = false
    mainData.msgLists.splice(0,1)
    clearInterval(timer)
}



// websocket重连
const socketReconnect = ()=> {
    if (mainData.socketReconnectLock) {
        return;
    }
    mainData.socketReconnectLock = true;
    mainData.socketReconnectTimer && clearTimeout(mainData.socketReconnectTimer);
    // @ts-ignore
    mainData.socketReconnectTimer = setTimeout(() => {
        console.log("WebSocket:重连中...");
        mainData.socketReconnectLock = false;
        // websocket启动
        createWebSocket();
    }, 10000);
}
// 连接成功建立的回调
const onopenCallback= (event)=> {
    console.log("WebSocket:已连接");
    // 心跳检测重置
    // mainData.heartCheck.reset().start();
    mainData.heartCheck.reset()
}
// 连接发生错误的回调
const onerrorCallback= (event)=>  {
    console.log("WebSocket:发生错误");
    // websocket重连
    socketReconnect();
}
// 连接关闭的回调
const oncloseCallback= (event)=> {
    console.log("WebSocket:已关闭");
    // 心跳检测重置
    mainData.heartCheck.reset();
    if (!mainData.socketLeaveFlag) {
        // 没有离开——重连
        // websocket重连
        socketReconnect();
    }
}
// 向后端发送数据的回调
const onsendCallback= ()=> {
    console.log("WebSocket:发送信息给后端");
}

let emits = defineEmits(['save', 'takeMsg'])

// 接收到消息的回调
const getMessageCallback= (msg)=> {
    if (msg.data.indexOf("HeartBeat") > -1) {
        // 心跳回复——心跳检测重置
        // 收到心跳检测回复就说明连接正常
        console.log("收到心跳检测回复");
        // 心跳检测重置
        mainData.heartCheck.reset().start();
    } else {
        // 普通推送——正常处理
        console.log("收到推送消息");
        let data = JSON.parse(msg.data);
        if(data.messageType == 1) {
            mainData.msgLists.push(data.data)
            viewData()
        }else if(data.messageType == 2) { // 指令下发回传
            emits('takeMsg', data)
        }else if(data.messageType == 3) { // 平台事件
            emits('takeMsg', data)
        }
        
        // 相关处理
        // console.log(data);
    }
}

// let data = {
//     alarmLevel: 1,
//     alarmLevelString: "预警",
//     alarmStatusName: "超速报警",
//     companyName: "李顺",
//     currentConfigSpeedLimit: "77km/h",
//     currentRoadSpeedLimit: "76km/h",
//     eventPrimaryId: "234",
//     gpsTime: "2022-12-12 12:11:22",
//     plateColorName: "黄",
//     plateNum: "鄂A111UW",
//     popup: true,
//     runningSpeed: "100km/h",
//     vehicleCode: "HBA111UW2",
// }
// mainData.msgLists.push(data)
// viewData()
// setInterval(()=>{
//     data.alarmLevel = data.alarmLevel==1?2:1
//     mainData.msgLists.push(data)
//     viewData()
// }, 10000)

// websocket事件绑定
const socketEventBind = ()=> {
    // 连接成功建立的回调
    mainData.socketObj.onopen = onopenCallback;
    // 连接发生错误的回调
    mainData.socketObj.onerror = onerrorCallback;
    // 连接关闭的回调
    mainData.socketObj.onclose = oncloseCallback;
    // 向后端发送数据的回调
    mainData.socketObj.onsend = onsendCallback;
    // 接收到消息的回调
    mainData.socketObj.onmessage = getMessageCallback;
    
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = () => {
        mainData.socketObj.close();
    };
}

// websocket启动
const createWebSocket= ()=> {
    let webSocketLink = `ws://59.175.148.195:6601/websocket/voms?voms-token=${getToken()}`; // webSocket地址
    // console.log(webSocketLink);
    try {
        if ("WebSocket" in window) {
            mainData.socketObj = new WebSocket(webSocketLink);
        } else if ("MozWebSocket" in window) {
            mainData.socketObj = new MozWebSocket(webSocketLink);
        }
        // websocket事件绑定
        socketEventBind();
    } catch (e) {
        console.log("catch" + e);
        // websocket重连
        socketReconnect();
    }
}

createWebSocket()

const save = ()=>{
    emits('save')
}

defineExpose({viewData})
</script>

<style lang="scss" scoped>
    #callPolice {
        :deep(.el-descriptions__header) { margin-bottom: 0 }
        :deep(.el-descriptions__body) { width: 100%}
        :deep(.el-descriptions__label) { color: rgba(0,0,0,0.45);margin-right: 0}
        :deep(.el-descriptions__label:not(.is-bordered-label)) { padding-right: 0}
        :deep(.el-descriptions__content) { width: 90px;display: inline-block }
        :deep(.el-descriptions__cell) { padding-bottom: 4px}
        :deep(.el-descriptions__body) { background: rgba(0,0,0,0)}
        :deep(.el-progress-bar__inner) {
            transition: width 1s linear;overflow: hidden;
            .el-progress-bar__innerText { display: none}
        }
    }
    .yujing {
        border: 1px solid rgba(255,229,143,1);background: rgba(255,251,230,1);
        :deep(.el-progress-bar__outer) {
            background: #A89967;
            .el-progress-bar__inner { background: url("@/assets/images/yujing.png")}
        }
    }
    .baojing {
        border: 1px solid rgba(255,163,158,1);background: rgba(255,241,240,1);
        :deep(.el-progress-bar__outer) {
            background: #A86A67;
            .el-progress-bar__inner { background: url("@/assets/images/baojing.png")}
        }
    }
</style>
