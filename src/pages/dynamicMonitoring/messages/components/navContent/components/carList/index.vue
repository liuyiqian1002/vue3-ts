<template>
    <div class="carList">
<!--        <div role="tab" aria-expanded="true" aria-controls="el-collapse-content-8535"-->
<!--             aria-describedby="el-collapse-content-8535">-->
<!--            <div class="el-collapse-item__header pl20 tw_clr" :class="collapseActiveName=='1'?'is-active':''" role="button" tabindex="1" @click="collapseChange('1')">-->
<!--                <div>-->
<!--                    <el-icon :style="collapseActiveName == '1'?'transform: rotate(180deg)':''"><ArrowDown /></el-icon>-->
<!--                    车辆列表-->
<!--                </div>-->
<!--                <p class="pr20 tw_c">-->
<!--                    <svg-icon icon-class="liebiaoshousuo" size="26px" @click.stop="isCollapse"></svg-icon>-->
<!--                </p>-->
<!--            </div>-->
<!--        </div>-->
<!--            <div v-show="collapseActiveName == '1'" class="el-collapse-item__wrap" role="tabpanel" aria-hidden="false" aria-labelledby="el-collapse-head-8535">-->
            <div class="el-collapse-item__wrap" role="tabpanel" aria-hidden="false" aria-labelledby="el-collapse-head-8535">
                <div class="el-collapse-item__content">
                    <div>
                        <div class="header_tab relative">
                            <div class="positionTr w" style="z-index: 99">
                                <div class="w tw_clr mt10" style="height: 20px">
                                    <div class="tw_c pl10">
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="车辆详情"
                                            placement="bottom-start"
                                        >
                                            <el-button size="small" round type="primary" @click.stop="carDetails">
                                                <template #icon>
                                                    <svg-icon icon-class="puhuo" size="16px" color="#fff"></svg-icon>
                                                </template>
                                            </el-button>
                                        </el-tooltip>
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="抽查"
                                            placement="bottom-start"
                                        >
                                            <el-button size="small" round type="primary" @click="choucha">
                                                <template #icon>
                                                    <svg-icon icon-class="a-anquanjianchatongji1" size="16px" color="#fff"></svg-icon>
                                                </template>
                                            </el-button>
                                        </el-tooltip>
                                        <el-button size="small" round type="primary" @click="concernManagement">
                                            <template #icon>
                                                <svg-icon icon-class="guanzhu" size="16px" color="#fff"></svg-icon>
                                            </template>
                                        </el-button>
                                    </div>
    
                                   
                                    <div class="tw_cr">
                                        <el-switch
                                            v-model="value3"
                                            size="large"
                                            inline-prompt
                                            :before-change="msgStatuschange"
                                            active-text="弹出"
                                            inactive-text="不弹出"
                                        />
<!--                                        <p class="pl10 pr10 tw_c">-->
<!--                                            -->
<!--                                            <el-button type="primary" size="small" @click.stop="carDetails">车辆详情</el-button>-->
<!--                                        </p>-->
                                       
                                        <span class="pl10 pr10 tw_c">
                                            <el-popover placement="right-end" :visible="visible" :width="580">
                                                <template late #reference>
                                                    <el-icon :size="16" class="pointer" @click="showSetting"><Setting /></el-icon>
                                                </template>
                                                <el-icon class="positionTr pointer" style="top: 14px; right: 20px;z-index: 9999" size="24" @click="visible = false"><Close /></el-icon>
                                                <el-tabs style="height: 360px" v-model="setActiveName" class="demo-tabs" @tab-click="handleClick">
                                                    <el-tab-pane label="筛选设置" name="first">
                                                       <tw-custom-form
                                                           label-width="80px"
                                                           @save="setSave"
                                                           :showBtns="true"
                                                           :lists="mainData.setLists"
                                                           :formData="mainData.setFormData">
                                                           <template #vehicleType>
                                                                <el-radio-group v-model="mainData.setFormData.vehicleType">
                                                                    <el-radio label="">全部车辆</el-radio>
                                                                    <el-radio :label="0">4G车辆</el-radio>
                                                                    <el-radio :label="1">主动安全</el-radio>
                                                                    <el-radio :label="2">关注车辆</el-radio>
                                                                </el-radio-group>
                                                                <!--     后续开发     -->
<!--                                                                <span class="tw_c pointer" @click="concernSet">-->
<!--                                                                    <svg-icon icon-class="guanzhushezhi" size="16px" color="#27CAFF"></svg-icon>-->
<!--                                                                </span>-->
                                                           </template>
                                                       </tw-custom-form>
                                                    </el-tab-pane>
<!--                                                    <el-tab-pane label="显示设置" name="second">-->
<!--                                                          <tw-custom-form-->
<!--                                                              ref="ruleFormRef"-->
<!--                                                              @save="setSave"-->
<!--                                                              :formData="mainData.setFormData"-->
<!--                                                              :lists="mainData.setShowLists"-->
<!--                                                              label-width="100px"-->
<!--                                                              :showBtns="true"-->
<!--                                                          >-->
<!--                                                              <template #vehicleDisplayList>-->
<!--                                                                  <el-checkbox-group v-model="mainData.setFormData.vehicleDisplayList">-->
<!--                                                                      <el-checkbox style="width: 148px" label="0">车牌号码</el-checkbox>-->
<!--                                                                      <el-checkbox style="width: 92px" label="1">车牌颜色</el-checkbox>-->
<!--                                                                      <el-checkbox :label="2">当前所在行政区</el-checkbox>-->
<!--                                                                      <el-checkbox style="width: 148px" label="3" >速度及当前状态信息</el-checkbox>-->
<!--                                                                      <el-checkbox style="width: 92px" label="4" >驾驶员姓名</el-checkbox>-->
<!--                                                                      <el-checkbox label="5" >车辆营运路线</el-checkbox>-->
<!--                                                                      <el-checkbox label="6"  >SIM卡号</el-checkbox>-->
<!--                                                                </el-checkbox-group>-->
<!--                                                              </template>-->
<!--                                                          </tw-custom-form>-->
<!--                                                    </el-tab-pane>-->
                                              </el-tabs>
                                            </el-popover>
                                        </span>
                                        <el-icon :size="16" class="mr10 pointer" @click="updateCarLists"><RefreshRight /></el-icon>
    
    
                                        <p class="border_r h20"></p>
                                        <span class="pl10 pr10 tw_c">
                                            <el-icon class="pointer" :size="16" @click.stop="isCollapse"><Fold /></el-icon>
                                        </span>
                                    </div>
                                   
<!--                                    <svg-icon class-name="pointer" icon-class="liebiaoshousuo" size="26px" ></svg-icon>-->
                                </div>
                            </div>
<!--                            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">-->
<!--                                <el-tab-pane label="已审核" name="first">-->
                            <p class="h40"></p>
                                    <tw-custom-form
                                        class="nav_custom-form pl10 pr10"
                                        label-width="0"
                                        :gutter="10"
                                        :lists="mainData.lists"
                                        :formData="formData"
                                        @checkChange="onSeek"
                                    ></tw-custom-form>
                                    <div class="nav_content tw_clr">
                                        <el-select class="nav_content_keyword w" v-model="formData.keyword"
                                                   filterable
                                                   allow-create
                                                   remote
                                                   reserve-keyword
                                                   placeholder="请输入企业名/车牌号/sim卡号"
                                                   :remote-method="remoteMethod"
                                                   clearable
                                        >
                                            <!--                                                   @change="onSeek('car')"-->
                                            <el-option v-for="(item, i) in cities" :key="i" :label="item.name" :value="item.name"></el-option>
                                        </el-select>
                                        <el-button text icon="search" @click="onSeek('car')"></el-button>
                                    </div>
                                    
                                    <!--                    <el-input class="nav_content_keyword" v-model="formData.keyword" placeholder="请输入企业名/车牌号/sim卡号" clearable @change="onSeek"></el-input>-->
                                    <el-scrollbar ref="scrollbarRef" :style="`height: ${getTreeHieght}px;`">
<!--                                        style="min-width: 330px"-->
                                        <el-tree style=" width: max-content;min-width: 100%" class="tw_tree pl10 pr10" v-if="treeStatus" ref="mapTreeRef" highlight-current :props="props" :load="loadNode" :indent="24" lazy show-checkbox  node-key="permissionCode" :defaultExpandedKeys="defaultExpandedKeys" @check="checkNode" :filter-node-method="filterNode" @node-click="nodeClick" @node-contextmenu="nodeContextmenu">
                                            <template #default="{ node, data }">
                                                <div class="custom-tree-node w tw_clr">
                                                    <div class="tw_nowrap tw_cl" :id="data.permissionCode">
                                                        <svg-icon v-if="data.vehicle" :style="getVehicleOnlieIcon(data).icon == 'hangshizhong'?`transform:rotate(${data.direction}deg`:''" :icon-class="getVehicleOnlieIcon(data).icon" :color="getVehicleOnlieIcon(data).color" size="14px"></svg-icon>
                                                        <img v-if="data.vehicle" class="ml5 mr5" style="width: 6px" :src="getCarImg(data)" alt="">
                                                        <span :class="permissionCode == data.permissionCode?'danger': ''">{{ data.orgName }}</span>
                                                        <div class="tw_c" v-if="!data.vehicle">
                                                            <el-icon class="is-loading" v-show="totalObj[data.permissionCode]?.value == undefined"><Loading /></el-icon>
                                                            <span class="grey_2 ml5" v-show="totalObj[data.permissionCode]?.value != undefined">({{totalObj[data.permissionCode]?.value}}/{{totalObj[data.permissionCode]?.total}})</span>
                                                        </div>
                                                        <spanv v-else>&nbsp;{{data.plateColorName}}&nbsp;【{{data.cityName}}】</spanv>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-tree>
                                        <p style="height: 200px"></p>
                                    </el-scrollbar>
<!--                                </el-tab-pane>-->
<!--                                <el-tab-pane class="pl5" label="未审核" name="second"></el-tab-pane>-->
<!--                            </el-tabs>-->
                        
                        </div>
                        
                    </div>
                    
                </div>
            </div>
    
        <!--    关注车辆管理    -->
        <carManagement :title="title" ref="carManagementRef"></carManagement>
        <!--    关注车辆设置    -->
        <carSet :title="title" ref="carSetRef"></carSet>
        <!--    选中车辆右键    -->
        <contextmenuContent ref="contextmenuContentRef" :lists="mainData.contextmenuLists"></contextmenuContent>
    </div>
</template>

<script setup lang="tsx">
import contextmenuContent from './components/contextmenuContent/index.vue'
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

let imgChuzuche = $ref(chuzuche)
let imgGongjiache = $ref(gongjiache)
let imgLvyoukeyun = $ref(lvyoukeyun)
let imgPuhuo = $ref(puhuo)
let imgWeiyun = $ref(weiyun)
let imgChuzuche_o = $ref(chuzuche_o)
let imgGongjiache_o = $ref(gongjiache_o)
let imgLvyoukeyun_o = $ref(lvyoukeyun_o)
let imgPuhuo_o = $ref(puhuo_o)
let imgWeiyun_o = $ref(weiyun_o)
let imgobj = {
    10: imgLvyoukeyun,
    11: imgLvyoukeyun,
    20: imgPuhuo,
    30: imgWeiyun,
    // 40: weiyun,     // 已跟产品确认，不管
    // 50: weiyun,     // 已跟产品确认，不管
    // 60: weiyun,     // 已跟产品确认，不管
    // 70: weiyun,     // 已跟产品确认，不管
    80: imgGongjiache,
    90: imgChuzuche,
    91: imgChuzuche,
    // 99: chuzuche,     // 已跟产品确认，不管
    100: imgLvyoukeyun,
}
let imgobj_o = {
    10: imgLvyoukeyun_o,
    11: imgLvyoukeyun_o,
    20: imgPuhuo_o,
    30: imgWeiyun_o,
    // 40: weiyun,     // 已跟产品确认，不管
    // 50: weiyun,     // 已跟产品确认，不管
    // 60: weiyun,     // 已跟产品确认，不管
    // 70: weiyun,     // 已跟产品确认，不管
    80: imgGongjiache_o,
    90: imgChuzuche_o,
    91: imgChuzuche_o,
    // 99: chuzuche,     // 已跟产品确认，不管
    100: imgLvyoukeyun_o,
}
const getCarImg = (state)=>{
    if(state.online){
        return imgobj[state.vehicleOperateTypeCode]
    }else {
        return imgobj_o[state.vehicleOperateTypeCode]
    }
}


import carManagement from './components/carManagement/index.vue'
import carSet from './components/carSet/index.vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import {
    associateCompanyAndVehicle, getDynamicSearchConfigDto,
    getNodesForSearch,
    getTreesList,
    getVehicleStateStatistic,
    saveDynamicSearchConfigDto, saveVehicleStateSnapshoot
} from "../../../../../../../api/dynamicMonitoring/messages";
import {getCurrentInstance} from "vue";
import electronicFence from "@/pages/dynamicMonitoring/messages/components/electronicFence/index.vue";
import {useStore} from "vuex";


let { proxy } = getCurrentInstance()
let { formData } = defineProps({
    formData: { type: Object, default:()=>{ return {"is808": 0, "operatorIdList": [], "parentCode": "", "vehicleOperateTypeCodeList": [], "vehicleStatus": '', "vehicleType": '', filter: false, keyword: '', type: ''}}}
})
// let { collapseActiveName} = defineProps({
//     collapseActiveName: { type:String, default: '1'}
// })
// let collapseActiveName = inject('collapseActiveName')
// let collapseActiveName = $ref('is-active')

const store = useStore()
let mapTreeRef = $ref(null)
let defaultExpandedKeys = $ref(['P000001'])
let activeName = $ref('first')
let setActiveName = $ref('first')
let carManagementRef = $ref(null)
let carSetRef = $ref(null)
let visible = $ref(false)
let value3 = $ref(true)
let title = $ref('title')
let checkList = $ref([])
let totalObj = $ref({})
let cities = $ref({})
let treeTotalLoading = $ref(false)
let treeStatus = $ref(true)
let permissionCode = $ref('')
let scrollbarRef = $ref(null)
let contextmenuContentRef = $ref(null)


let mainData = reactive({
    lists: [
        { key: 'vehicleOperateTypeCodeList',type:'select', multiple: true, col:12, remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props:{ label: 'typeName', value:'typeCode'}, placeholder: '营运类型', change:()=>{ onSeek() }},
        { key: 'operatorIdList',col:12, type:'select', multiple: true, remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props:{ label: 'name', value:'id'}, placeholder: '运营商', change:()=>{ onSeek() } },
        { key: 'vehicleType',type: 'select', col:12, placeholder: '车辆类别', children: [{ label: '4G车辆', value: 0 },{ label: '主动安全车辆', value: 1 }, { label: '关注车辆', value: 2 },], change:()=>{ onSeek() }},
        { key: 'vehicleStatus', type:'select', placeholder: '车辆状态', children: [{ label: '行驶车辆', value: 0 },{ label: '停止车辆', value: 1 },{ label: '在线车辆', value: 2 },{ label: '离线车辆', value: 3 },{ label: '报警车辆', value: 4 }], col:12, change:()=>{ onSeek() }},
        { key: 'filter', type: 'checkbox',children:[ {label:'过滤车辆', value:false}], col:12},
        { key: 'is808', type: 'checkbox',children:[{label:'808车辆', value:0}], props: {trueLabel: 1, falseLabel: 0}, col:12, change:()=>{ onSeek() } },
    ],
    setLists: [
        { key: 'vehicleType', label: '车辆类别', col:24, slot: true },
        { key: 'vehicleStatus',type: 'radio', col:24, label: '车辆状态', children: [{ label: '全部状态', value: '' }, { label: '行驶车辆', value: 0 },{ label: '停止车辆', value: 1 },{ label: '在线车辆', value: 2 },{ label: '离线车辆', value: 3 },{ label: '报警车辆', value: 4 }],},
        { label: '营运类型', key: 'vehicleOperateTypeCodeList',type:'select', multiple: true, remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props:{ label: 'typeName', value:'typeCode'}, placeholder: '营运类型'},
        { label: '运营商', key: 'operatorIdList', type:'select', multiple: true, remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props:{ label: 'name', value:'id'}, placeholder: '运营商' },
    ],
    setShowLists: [
        { key: 'vehicleDisplayList', label: '列表展示内容', col:24, slot: true },
    ],
    setFormData: {
        "configType": 0,
        "operatorIdList": [],
        "vehicleDisplayList": [],
        "vehicleOperateTypeCodeList": [],
        "vehicleStatus": '',
        "vehicleType": ''
    },
    contextmenuLists: [
        {
            name: '文本信息', icon: 'fasongzhaopian', isshow: true, click: () => {
                emits('tapClick', 'txtMsg')
            }
        },
        {
            name: '拍照', icon: 'fasongyuyin', isshow: true, click: () => {
                emits('tapClick', 'sendPhoto')
            }
        },
    ],
    checkObj: {
        checkedKeys: []
    }
})


value3 = sessionStorage.getItem('msgStatus') === undefined? true: sessionStorage.getItem('msgStatus') == 'true'? true:false
store.dispatch('system/setMsgStatus', value3)
const msgStatuschange = (val) => {
    let status = !value3
    let txt = status?'弹出':'不弹出'
    proxy.MessageBox({msg: `确定${txt}消息吗？`, type: 'warning'}).then((close) => {
        sessionStorage.setItem('msgStatus', status)
        store.dispatch('system/setMsgStatus', status)
        value3 = status
        close()
    })
}

// 抽查
const choucha = () => {
    if(mainData.checkObj.checkedKeys.length == 0){
        // let keys = proxy.$_.map(treeData, 'vehicleCode');
        mainData.checkObj.checkedKeys = mainData.checkObj.checkedKeys
        ElMessage.warning('请选择想查看信息再抽查！')
    }else {
        let total = 0
        formData.currentCheckedPermissionCodeList.forEach(item=> total+=totalObj[item]?.total)
        if(total > 500) return ElMessage.warning('勾选车辆数不能大于500辆')
        if(formData.currentCheckedPermissionCodeList.length == 0 && formData.vehicleCodeList.length == 0) return ElMessage.warning('没有可操作的车辆')
    
        proxy.MessageBox({msg: '是否确定进行车辆抽查!', type: 'warning'}).then((close) => {
            saveVehicleStateSnapshoot(formData).then(res=>{
                emits('tapClick', 'sendVideo')
                close()
            }).catch(()=>{
                close()
            })
        })
    }
}

// 获取设置配置
const showSetting = () => {
    visible = true
    // saveDynamicSearchConfigDto({})
}

const setFormData = (res) => {
    formData.configType = res.configType || ''
    formData.operatorIdList = res.operatorIdList || []
    formData.vehicleDisplayList = res.vehicleDisplayList || []
    formData.vehicleOperateTypeCodeList = res.vehicleOperateTypeCodeList || []
    formData.vehicleStatus = res?.vehicleStatus
    formData.vehicleType = res.vehicleType
}

// 获取默认搜索信息
getDynamicSearchConfigDto({}).then(res=>{
    if(res){
        mainData.setFormData = res
        setFormData(res)
    }
})

// 保存筛选设置
const setSave = () => {
    mainData.setFormData.configType = setActiveName == 'first'?1:2
    saveDynamicSearchConfigDto(mainData.setFormData).then(res=>{
        ElMessage.success('保存筛选设置成功!')
        setFormData(mainData.setFormData)
        onSeek()
    })
}

/**
 * 获取车辆状态图标
 * @param：state {openLocation:1,openAcc:2,runningSpeed：3}
 * **/
const getVehicleOnlieIcon = (state)=> {
    if (state.online) {
        if (!state.openLocation) {
            return { icon: 'weidingwei', color: '#26C9FF'}
        } else if (!state.openAcc) {
            return { icon: 'dingwei', color: '#26C9FF'}
        } else if (state.runningSpeed == null || state.runningSpeed <= 0) {
            return { icon: 'tingche', color: '#26C9FF'}
        } else if ((state.runningSpeed != null || state.runningSpeed > 0)  && !state.direction) {
            return { icon: 'yizhuxiao', color: '#FF4D4F'}
        }else if ((state.runningSpeed != null || state.runningSpeed > 0) && state.direction && state.direction>0) {
            return { icon: 'hangshizhong', color: '#26C9FF'}
        }
    } else {
        return { icon: 'yizhuxiao', color: '#AAAAAA'}
    }
}

const getTreeHieght = computed(()=>{
    return window.innerHeight - 270
})



let emits = defineEmits(['setCollapseActiveName', 'zoomAndCenterIns', 'isCollapse', 'checkNode', 'closeCarDetails', 'nodeClick', 'tapClick', 'carListVehicleCodeListUpate'])

const checkNode = (data, obj)=>{
    mainData.checkObj = obj
    emits('checkNode', data, obj)
    emits('carListVehicleCodeListUpate', obj.checkedKeys)
    
}

// 节点点击
const nodeClick = (data, node)=>{
    emits('nodeClick', data, node)
}

// 结构树右键行为
const nodeContextmenu = (event, node) => {
    if(formData.currentCheckedPermissionCodeList.length>0){
        let total = 0
        formData.currentCheckedPermissionCodeList.forEach(item=> total+=totalObj[item]?.total)
        if(total > 1000) return ElMessage.warning('勾选车辆数不能大于1000辆')
        if(total == 0) return ElMessage.warning('没有可操作的车辆')
    }else {
        if(totalObj[node.permissionCode]?.total > 1000) return ElMessage.warning('勾选车辆数不能大于1000辆')
        if(totalObj[node.permissionCode]?.total == 0) return ElMessage.warning('没有可操作的车辆')
    }
    
    contextmenuContentRef.viewData(event, node)
    // if(formData.is808){
    //     console.log(node);
    //     mainData.contextmenuLists = [
    //         {name: '车辆监控', icon: 'fasongzhaopian', isshow: true, click: () => emits('tapClick', 'vehicleMonitoring', node)},
    //         {name: '文本信息', icon: 'fasongzhaopian', isshow: true, click: () => emits('tapClick', 'txtMsg', node)},
    //         {name: '电子围栏下发', icon: 'fasongzhaopian', isshow: true, click: () =>  emits('tapClick', 'electronicFence', node)},
    //         {name: '拍照', icon: 'fasongyuyin', isshow: true, click: () => {}},
    //         {name: '终端设置', icon: 'fasongzhaopian', isshow: true, click: () => { }},
    //         {name: '报警设置', icon: 'fasongzhaopian', isshow: true, click: () => { }},
    //         {name: '监听', icon: 'fasongzhaopian', isshow: true, click: () => { }},
    //         {name: '对讲', icon: 'fasongzhaopian', isshow: true, click: () => { }},
    //         {name: '回拨', icon: 'fasongzhaopian', isshow: true, click: () => { }},
    //         {name: '轨迹回放', icon: 'fasongzhaopian', isshow: true, click: () => { }},
    //     ]
    // }else {
        mainData.contextmenuLists = [
            {name: '文本信息', icon: 'xiangqing', isshow: true, click: () => emits('tapClick', 'txtMsg', node)},
            {name: '发送拍照', icon: 'fasongzhaopian', isshow: true, click: () => emits('tapClick', 'sendPhoto', node)},
            {name: '查看视频', icon: 'chakanshipin', isshow: true, click: () => emits('tapClick', 'sendVideo', node)},
        ]
    // }
}

const remoteMethod = proxy.$_.debounce((query: string) => {
    if (query) {
        associateCompanyAndVehicle({keyword: query}).then(res=>{
            cities = res
        })
    }/* else {
        console.log('清空搜索',cities);
        cities = []
    }*/
},500)

// tab 切换
const handleClick = (val)=>{

}

const concernManagement = ()=>{
    title = '关注车辆管理'
    carManagementRef.viewData()
}

const concernSet = ()=>{
    title = '关注车辆设置'
    carSetRef.viewData()
}

const collapseChange = (val)=>{
    emits('setCollapseActiveName', val)
}

const isCollapse = ()=>{
    emits('isCollapse')
}

interface Tree {
    name: string
    leaf?: boolean
}
const props = {
    label: 'orgName',
    children: 'children',
    isLeaf: 'isLeaf',
    // isLeaf: 'vehicle',
}
// tree 懒加载
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
    if (node.level !== 0) {
        formData.parentCode = node.data.permissionCode
    }
    
    if (node.data.vehicle) return resolve([])
    getTreesList(formData).then(res => {
        resolve(res || [])
        // 第一次默认展开第一层后加载所有的车辆总数和在线数量
        // if (node.level > 0){
            getTotalObj(res)
            // proxy.$_.debounce(fc => getTotalObj(), 1000, { leading: true })();
            // console.log(mapTreeRef.getNode('HBK453532'));
            // 设置勾选（定位到搜索位置）
            if(defaultExpandedKeys.length> 1){
                setCheckMapCententCar()
            }
        // }
        if(node.level == 0 && defaultExpandedKeys.length == 1){
            defaultExpandedKeys = [res[0].permissionCode]
        }
    }).catch(()=>{
        resolve([])
        // 只有重置了这3个属性,树才能正常继续重新请求和展开
        node.isLeaf = false
        node.expanded = false
        node.loaded = false
    });
}

// 过滤车辆
const filterNode = (value, data)=>{
    if(formData.filter){
        return totalObj[data.permissionCode]?.total != 0
    }else {
        return true
    }
}

// 刷新
const updateCarLists = () => {
    treeStatus = false
    emits('closeCarDetails')
    defaultExpandedKeys = [defaultExpandedKeys[0]]
    formData.parentCode = ''
    formData.type = ''
    totalObj = {}
    nextTick(()=>{
        treeStatus = true
    })
}

let index = 0, keyword = ''
// 公共搜索
const onSeek = (type)=>{
    if(type=='car' && !proxy.notNull(formData.keyword)) return ElMessage.warning('请输入企业名/车牌号/sim卡号')
    emits('closeCarDetails')
    defaultExpandedKeys = [defaultExpandedKeys[0]]
    formData.parentCode = ''
    formData.type = ''
    // totalObj = {}
    if(formData.keyword){
        let arr = proxy.$_.filter(cities, ['name', formData.keyword])
        if(arr.length>0) {
            index = 0
            keyword = ''
            formData.index = 0
            formData.type = arr[0].type
        }else {
            keyword = formData.keyword
            formData.index = index
        }
            getNodesForSearch(formData).then(res=>{
                if(res[0]){
                    if(formData.keyword == keyword){
                        index++
                    } else {
                        index = 0
                    }
                    defaultExpandedKeys = res[0].permissionCodeList
                    permissionCode = res[0].permissionCode
                    proxy.$_.map(cities,'')
                    // console.log(res[0]);
                }else{
                    ElMessage.warning('没有搜索到数据,请您更换查询条件试试')
                }
                // nextTick(()=>{
                //     treeStatus = true
                // })
            })
        // getTotalObj()
    
        // }else {
        //     getTotalObj()
            // nextTick(()=>{
            //     treeStatus = true
            // })
        // }
    }else {
        // getTotalObj()
        treeStatus = false
        nextTick(()=>{
            treeStatus = true
        })
    }
    
}

// 获取车辆总数，在线数量
// const getTotalObj = proxy.$_.debounce((res) => {
const getTotalObj = (res) => {
    
    if(!mapTreeRef?.store) return
    emits('closeCarDetails')    // 关闭地图车辆弹框详情
    // 获取车辆数量
    let data = proxy.$_.cloneDeep(formData)
    let keys = []
    if(res){
        keys = proxy.$_.cloneDeep(res)
    }else {
        return;
        keys = mapTreeRef.store.nodesMap
    }
    data['permissionCodeList'] = proxy.$_.map(keys, 'permissionCode')
    data.permissionCodeList = data.permissionCodeList.filter((code)=> code.indexOf('P0000')>=0)
    treeTotalLoading = true
    getVehicleStateStatistic(data).then(numObj=>{
        treeTotalLoading = false
        let obj = proxy.$_.keyBy(numObj, 'dataPermissionCode')
        totalObj = {...totalObj, ...obj};
        mapTreeRef!.filter() // 过滤节点
    }).catch(()=>{
        treeTotalLoading = false
    })
// },400)
}

const setCheckMapCententCar = proxy.$_.debounce(()=>{
    // if(!scrollbarRef.setScrollTop) return
    let dom = document.getElementById(permissionCode)
    if(dom){
        
        scrollbarRef.setScrollTop(dom.offsetTop - 60)
        // mapTreeRef.setChecked(permissionCode, true)
        // let data = mapTreeRef.getNode(permissionCode).data
        // data.maker = {};
        // data.lastLongitude = data.longitude;
        // data.lastLatitude = data.latitude;
        // emits('zoomAndCenterIns', data)
        // checkNode(data, {checkedKeys:[permissionCode], checkedNodes: mapTreeRef.getCheckedNodes()})
        defaultExpandedKeys = [defaultExpandedKeys[0]] // 重置默认打开项
    }
},800)

// 车辆详情
const carDetails = () => {
    if(mainData.checkObj.checkedKeys.length == 0){
        // let keys = proxy.$_.map(treeData, 'vehicleCode');
        mainData.checkObj.checkedKeys = mainData.checkObj.checkedKeys
        ElMessage.warning('请选择想查看信息再操作！')
    }else {
        emits('carDetails', mainData.checkObj.checkedKeys)
    }
}

// 车辆树是动态所以每30秒刷新车辆数
let treeTimer= setInterval( getTotalObj,30000)



onDeactivated(() => {
    clearInterval(treeTimer)
})

defineExpose({ mainData})

</script>

<style scoped lang="scss">
    .nav_content {
        background: var(--tw-dtjc-select);
    }
    .nav_custom-form, .nav_content_keyword {
        :deep(.el-form-item) { margin-bottom: 8px}
        :deep(.el-input__wrapper) {background: var(--tw-dtjc-select); box-shadow: none}
    }
    :deep(.carList) {
        .el-collapse-item__content{
            padding-bottom: 10px;
            .el-collapse-item__wrap { height: calc(100% - 100px);overflow: inherit}
            //:deep(.el-scrollbar__view) { overflow: scroll;}
            :deep(.el-scrollbar__wrap){
                //overflow-x: hidden !important;
                .el-scrollbar__view{display:inline-block !important; white-space: nowrap}
    
                .el-tree-node,.el-tree-node__content { width: 100%; box-sizing: content-box}
            }
            //:deep(.el-scrollbar__wrap) {
            //    overflow-x: auto;
            //    height: calc(100% + 20px); //多出来的20px是横向滚动条默认的样式
            //}
        }
        .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content { background: #10799d
        }
        .is-text { transform: scale(0.8)}
    }
    :deep(.tw_tree.el-tree--highlight-current){
         .el-tree-node.is-current>.el-tree-node__content { background: #D4F4FF}
    
    }

//}
.demo-tabs {
    :deep(.el-tabs__content) {
        overflow: inherit;
    }
}
</style>
