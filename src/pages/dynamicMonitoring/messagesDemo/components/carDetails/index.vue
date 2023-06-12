<template>
    <div ref="twdrawer" class="tw-drawer-a relative">
        <el-drawer :with-header="false" :modal="false" modal-class="tw-drawer-dynamicMonitoring transition"
                   :close-on-click-modal="false" :before-close="beforeClose" :model-value="drawer" close-on-press-escape
                   :size="twdrawerWsize" direction="rtl" class="tw-drawer">
            <div class="positionTr" style="top: 12px; right: 14px;z-index: 9999">
                <el-icon @click="onScreenfull" class="pointer mr10">
                    <svg-icon :icon-class="twdrawerLeft == '330px'?'fangda':'suoxiao'" size="18px"></svg-icon>
                </el-icon>
                <!--                -->
                <button aria-label="el.drawer.close" class="el-drawer__close-btn" type="button">
                    <el-icon :size="20" @click="beforeClose" class="pointer mr10" style="transform: rotate(90deg)">
                        <!--                    <svg-icon icon-class="add" size="20px"></svg-icon>-->
                        <Close/>
                    </el-icon>
                </button>
            
            </div>
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane name="first" lazy>
                    <template #label>
                        <div class="tw_c">
                            <span class="mr5 tw_c">
                                <svg-icon icon-class="cheliangguohu" color="initial" size="16px"></svg-icon>
                            </span>
                            车辆状态
                        </div>
                    </template>
                    <!--   url="/business/vehicle/getVehicleListForCheckedPermission"-->
                    <!--   :tableParams="{vehicleCode: '', pageNumber: 1, pageSize: 20}"-->
                    <tw-table
                        ref="tableStatusRef"
                        class="p0"
                        :lists="carStatutsLists"
                        id="car_status_dongtai"
                        :columns="mainData.columns"
                        :headBtns="mainData.headBtns"
                        :pageSizesArr="[30, 50, 100]"
                        :tableParams="formData"
                        @handleCurrentChange="handleCurrentChange"
                        @handleSizeChange="handleSizeChange"
                    ></tw-table>
                </el-tab-pane>
                <el-tab-pane name="second" lazy>
                    <template #label>
                        <div class="tw_c">
                            <span class="mr5 tw_c">
                                <svg-icon icon-class="cheliangguohu" color="initial" size="16px"></svg-icon>
                            </span>
                            指令跟踪
                        </div>
                    </template>
                    <div :style="`height: ${tabHeight}px` ">
                        <el-auto-resizer>
                            <template #default="{ height, width }">
                                <el-table-v2
                                    :columns="mainData.zlgzColumns"
                                    :data="mainData.zlgzList"
                                    :width="width"
                                    :height="height"
                                    fixed
                                />
                            </template>
                        </el-auto-resizer>
                    </div>
                    
<!--                    <tw-table-->
<!--                        ref="tableRef"-->
<!--                        method="post"-->
<!--                        id="zhilinggenzong_dongtai"-->
<!--                        :columns="mainData.zlgzColumns"-->
<!--                        :lists="mainData.zlgzList"-->
<!--                        :tableBtns="mainData.tableBtns"-->
<!--                        :showPagination="false"-->
<!--                        :headBtns="mainData.headBtns"-->
<!--                    ></tw-table>-->
                </el-tab-pane>
                <el-tab-pane name="third" lazy>
                    <template #label>
                        <div class="tw_c">
                            <span class="mr5 tw_c">
                                <svg-icon icon-class="cheliangguohu" color="initial" size="16px"></svg-icon>
                            </span>
                            平台事件
                        </div>
                    </template>
                    <div :style="`height: ${tabHeight}px` ">
                        <el-auto-resizer>
                            <template #default="{ height, width }">
                                <el-table-v2
                                    :columns="mainData.setimgColumns"
                                    :data="mainData.setimgList"
                                    :width="width"
                                    :height="height"
                                    fixed
                                />
                            </template>
                        </el-auto-resizer>
                    </div>
<!--                    <tw-table-->
<!--                        ref="tableRef"-->
<!--                        method="post"-->
<!--                        id="pingtaishijian_dongtai"-->
<!--                        url="/business/driver/page"-->
<!--                        :tableParams="{vehicleCode: '', pageNumber: 1, pageSize: 20}"-->
<!--                        :columns="mainData.columns"-->
<!--                        :tableBtns="mainData.tableBtns"-->
<!--                        :headBtns="mainData.headBtns"-->
<!--                    ></tw-table>-->
                </el-tab-pane>
            </el-tabs>
        
        </el-drawer>
        <!--  设置列  -->
        <setCols ref="setColsRef" @save="saveCols" :columns="columns"></setCols>
        
    </div>

</template>

<script setup lang="tsx">
import { ElAutoResizer } from 'element-plus'

import setCols from './components/setCols/index.vue'
import {
    getVehicleListForCheckedPermissionCount,
    getVehicleListForCheckedPermission
} from "../../../../../api/dynamicMonitoring/messages";

let { proxy } = getCurrentInstance()
let activeName = $ref('first')
let drawer = $ref(false)
let twdrawer = $ref(null)
let twdrawerWsize = $ref('100%')
let twdrawerLeft = $ref('330px')
let setColsRef = $ref(null)
let tableStatusRef = $ref(null)
let tabHeight = window.innerHeight - 130
let formData = $ref({})
let carStatutsLists = $ref([])
let columns = [
    { prop: 'cityName', label: '市区',width: 100},
    { prop: 'companyName', label: '企业',width: 220},
    { prop: 'vehicleOperateTypeName', label: '营运类型'},
    { prop: 'plateNum', label: '车牌号'},
    { prop: 'plateColorName', label: '颜色',width: 80},
    { prop: 'simNum', label: 'SIM卡号'},
    { prop: 'operatorName', label: '运营商'},
    { prop: 'gpsTime', label: '卫星时间',width: 180},
    { prop: 'online', label: '是否上线',width: 100, formatter: (row)=> row.online?'是':'否'},
    { prop: 'runningSpeed', label: '速度',width: 100},
    { prop: 'vehicleStatusDesc', label: '车辆状态',width: 200},
    { prop: 'postionDetail', label: '详细位置'},
    // { prop: 'plateNum', label: '来源', width: 120 },
]

let mainData = reactive({
    headBtns: [{
        icon: '', name: '照片查询', click: (row) => {
            // proxy.MessageBox({msg: '是否确定进行车辆抽查!', type: 'warning'}).then((close) => {
            //     // spotCheckRef.viewData()
            //     close()
            // })
        }
    }, {
        icon: '', name: '设置列', click: (row) => {
            setColsRef.viewData()
        }
    }, {
        icon: '', name: '抽查', click: (row) => {
            proxy.MessageBox({msg: '是否确定进行车辆抽查!', type: 'warning'}).then((close) => {
                emits( 'tapClick','sendVideo')
                close()
            })
        }
    }, {
        icon: '', name: '导出', click: (row) => {
        
        }
    }],
    columns: [
        { prop: 'cityName', label: '市区',width: 100},
        { prop: 'companyName', label: '企业',width: 220},
        { prop: 'vehicleOperateTypeName', label: '营运类型'},
        { prop: 'plateNum', label: '车牌号'},
        { prop: 'plateColorName', label: '颜色',width: 80},
        { prop: 'simNum', label: 'SIM卡号'},
        { prop: 'operatorName', label: '运营商'},
        { prop: 'gpsTime', label: '卫星时间',width: 180},
        { prop: 'online', label: '是否上线',width: 100, formatter: (row)=> row.online?'是':'否'},
        { prop: 'runningSpeed', label: '速度',width: 100},
        { prop: 'vehicleStatusDesc', label: '车辆状态',width: 200},
        { prop: 'postionDetail', label: '详细位置'},
        // { prop: 'plateNum', label: '来源', width: 120 },
    ],
    tableBtns: {
        prop: "btns", label: "操作", fixed: "right", width: 80, btns: [
            {
                icon: 'bianji', name: '编辑', click: (row) => {
                
                }
            },
            {
                icon: 'quguan', name: '取消关联', click: (row) => {
                
                }
            },
        ]
    },
    zlgzColumns: [
        { key: 'createTime', dataKey: 'createTime', title: '上报时间', width: 200 },
        { key: 'serialNo', dataKey: 'serialNo', title: '流水号', width: 180 },
        { key: 'plateNum', dataKey: 'plateNum', title: '车牌号', width: 120 },
        { key: 'processStatusText', dataKey: 'processStatusText', title: '请求结果', width: 100 },
        { key: 'processMethodText', dataKey: 'processMethodText', title: '指令类型', width: 120 },
        { key: 'processDesc', dataKey: 'processDesc', title: '指令描述', width: 240 },
        { key: 'resultStatusText', dataKey: 'resultStatusText', title: '应答结果', width: 100 },
        { key: 'processResult', dataKey: 'processResult', title: '应答内容', width: 420 },
    ],
    zlgzList: [],
    setimgColumns: [
        { key: 'createTime', dataKey: 'createTime', title: '接收时间', width: 200 },
        { key: 'resultStatusText', dataKey: 'resultStatusText', title: '事件类型', width: 100 },
        { key: 'processResult', dataKey: 'processResult', title: '事件描述', width: 420 },
    ],
    setimgList: []
    //
})

mainData.columns = proxy.$_.cloneDeep(columns)

const onScreenfull = () => {
    if (twdrawerLeft == '330px') {
        twdrawerLeft = '0'
    } else {
        twdrawerLeft = '330px'
    }
}

let emits = defineEmits(['handleClose', 'beforeClose', 'tapClick'])

const beforeClose = () => {
    drawer = false
    emits('handleClose', 'before')
}

// 取消
const handleClose = (key) => {
    twdrawerWsize = '100%'
    drawer = false
}

// 动态响应事件
const tapclick = (key) => {
    emits(key)
}

// 车辆状态
const viewData = (data) => {
    getCarDateils(data)
    activeName = 'first'
    drawer = true
}

// 指令跟踪
const instructionTracing = (data) => {
    // getCarDateils(data)
    if(data.data.length){
        mainData.zlgzList = [...mainData.zlgzList, ...data.data]
    }else {
        mainData.zlgzList.unshift(data.data)
    }
    activeName = 'second'
    drawer = true
}

// 平台事件
const platformEvent = (data) => {
    if(data.data.length){
        mainData.setimgList = [...mainData.setimgList, ...data.data]
    }else {
        mainData.setimgList.unshift(data.data)
    }
    // getCarDateils(data)
    activeName = 'third'
    drawer = true
}

// 保存设置列
const saveCols = (lists) => {
    let arr =proxy.$_.cloneDeep(columns)
    if(lists.length == columns.length){
        mainData.columns = arr
    }else {
        mainData.columns = arr.filter((item)=> lists.includes(item.prop))
    }
}

const getCarDateils = (data) => {
    formData = data
    getTable()
    getVehicleListForCheckedPermissionCount(formData).then(res=>{
        tableStatusRef.setTableTotal(res)
    })
}

const handleCurrentChange = (val) => {
    formData.pageNumber = val
    getTable()
}

const handleSizeChange = (val) => {
    formData.pageSize = val
    getTable()
}

const getTable = () => {
    getVehicleListForCheckedPermission(formData).then(res=>{
        carStatutsLists = res.rows
    })
}

defineExpose({viewData, handleClose, instructionTracing, platformEvent})

</script>

<style lang="scss" scoped>
.drawer__footer {
    box-shadow: 0px -1px 6px rgb(0 0 0 / 10%);
    height: 64px;
    background: var(--el-bg-color);
}

.tw-drawer-a {
    :deep(.el-drawer) {
        //border-bottom-left-radius: 20px;
        border-top-left-radius: 10px;
        overflow: hidden;
        width: 100%;
        
        .el-drawer__header {
            padding: 12px 0;
            border-bottom: 1px solid var(--el-menu-border-color);
            margin-bottom: 0px
        }
        
        .el-drawer__body {
            padding: 5px
        }
        
        .drawer__footer {
            border-top: 1px solid var(--el-menu-border-color)
        }
    }
    
    :deep(.tw-drawer-dynamicMonitoring) {
        top: 60px !important;
        left: v-bind(twdrawerLeft) !important;
    }
}


//.tw-drawer { height: calc(100% - 100px) !important;}
</style>
