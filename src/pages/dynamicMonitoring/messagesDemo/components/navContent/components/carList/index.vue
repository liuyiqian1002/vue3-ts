<template>
    <div class="carList">
        <div role="tab" aria-expanded="true" aria-controls="el-collapse-content-8535"
             aria-describedby="el-collapse-content-8535">
            <div class="el-collapse-item__header pl20 tw_clr" :class="collapseActiveName=='1'?'is-active':''" role="button" tabindex="1" @click="collapseChange('1')">
                <div>
                    <el-icon :style="collapseActiveName == '1'?'transform: rotate(180deg)':''"><ArrowDown /></el-icon>
                    车辆列表
                </div>
                <p class="pr20 tw_c">
                    <svg-icon icon-class="liebiaoshousuo" size="26px" @click.stop="isCollapse"></svg-icon>
                </p>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="collapseActiveName == '1'" class="el-collapse-item__wrap" role="tabpanel" aria-hidden="false" aria-labelledby="el-collapse-head-8535">
                <div class="el-collapse-item__content">
                    <div>
                        <div class="header_tab relative">
                            <div class="positionTr" style="z-index: 99">
                                <div class="tw_cr mt10" style="height: 20px">
                                    <el-switch
                                        class="pr20"
                                        v-model="value3"
                                        inline-prompt
                                        active-text="弹出"
                                        inactive-text="不弹出"
                                    />
                                    <p class="border_r h20"></p>
                                    <span class="pl10 pr10">
                                        <el-icon :size="14" class="mr10 pointer" @click="updateCarLists"><RefreshRight /></el-icon>
                                        <el-popover placement="right-end" :visible="visible" :width="580">
                                            <template late #reference>
                                                <el-icon :size="14" class="pointer" @click="visible = true"><Setting /></el-icon>
                                            </template>
                                            <el-icon class="positionTr pointer" style="top: 14px; right: 20px;z-index: 9999" size="24" @click="visible = false"><Close /></el-icon>
                                            <el-tabs style="height: 360px" v-model="setActiveName" class="demo-tabs" @tab-click="handleClick">
                                                <el-tab-pane label="筛选设置" name="first">
                                                   <tw-custom-form
                                                       label-width="80px"
                                                       :showBtns="true"
                                                       :lists="mainData.setLists"
                                                       :formData="mainData.setFormData">
                                                       <template #carType>
                                                            <el-radio-group v-model="mainData.setFormData.carType">
                                                                <el-radio :label="3">全部车辆</el-radio>
                                                                <el-radio :label="6">4G车辆</el-radio>
                                                                <el-radio :label="9">主动安全</el-radio>
                                                                <el-radio :label="2">
                                                                    <div class="tw_cl">
                                                                        <span class="mr5">关注车辆</span>
                                                                    </div>
                                                                </el-radio>
                                                                
                                                            </el-radio-group>
                                                           <span @click="concernManagement" class="mr5 tw_c pointer">
                                                                <svg-icon icon-class="guanzhuguanli" size="16px" color="#27CAFF"></svg-icon>
                                                            </span>
                                                            <span class="tw_c pointer" @click="concernSet">
                                                                <svg-icon icon-class="guanzhushezhi" size="16px" color="#27CAFF"></svg-icon>
                                                            </span>
                                                       </template>
                                                   </tw-custom-form>
                                                </el-tab-pane>
                                                <el-tab-pane label="显示设置" name="second">
                                                      <el-form
                                                          ref="ruleFormRef"
                                                          status-icon
                                                          label-width="100px"
                                                      >
                                                          <el-form-item label="列表展示内容">
                                                              <el-checkbox-group v-model="checkList">
                                                                  <el-checkbox style="width: 148px" label="车牌号码" disabled />
                                                                  <el-checkbox style="width: 92px" label="车牌颜色" />
                                                                  <el-checkbox label="当前所在行政区" />
                                                                  <el-checkbox style="width: 148px" label="速度及当前状态信息" />
                                                                  <el-checkbox style="width: 92px" label="驾驶员姓名" />
                                                                  <el-checkbox label="车辆营运路线" />
                                                                  <el-checkbox label="SIM卡号"  />
                                                            </el-checkbox-group>
                                                          </el-form-item>
                                                      </el-form>
                                                </el-tab-pane>
                                          </el-tabs>
                                        </el-popover>
                                    </span>
                                </div>
                            </div>
                            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                                <el-tab-pane label="已审核" name="first">
                                    <tw-custom-form
                                        class="nav_custom-form pl10 pr10"
                                        label-width="0"
                                        :gutter="10"
                                        :lists="mainData.lists"
                                        :formData="formData"
                                        @checkChange="onSeek"
                                    ></tw-custom-form>
                                    <el-select class="nav_content_keyword w" v-model="formData.keyword"
                                               filterable
                                               remote
                                               reserve-keyword
                                               placeholder="请输入企业名/车牌号/sim卡号"
                                               :remote-method="remoteMethod"
                                               clearable
                                               @change="onSeek('car')"
                                    >
                                        <el-option v-for="(item, i) in cities" :key="i" :label="item.name" :value="item.name"></el-option>
                                    </el-select>
                                    <!--                    <el-input class="nav_content_keyword" v-model="formData.keyword" placeholder="请输入企业名/车牌号/sim卡号" clearable @change="onSeek"></el-input>-->
                                    <el-scrollbar ref="scrollbarRef" :style="`height: ${getTreeHieght}px;`">
                                        <el-tree style="min-width: 330px" class="pl10 pr10" v-if="treeStatus" ref="mapTreeRef" :props="props" :load="loadNode" :indent="24" lazy show-checkbox  node-key="permissionCode" :defaultExpandedKeys="defaultExpandedKeys" @check="checkNode" :filter-node-method="filterNode" @node-click="nodeClick" @node-contextmenu="nodeContextmenu">
                                            <template #default="{ node, data }">
                                                <div class="custom-tree-node w tw_clr">
                                                    <div class="tw_nowrap" :id="data.permissionCode">
                                                        <img v-if="data.vehicle" class="mr5" style="width: 6px" :src="getCarImg(data)" alt="">
                                                        {{ data.orgName }}
                                                        <div class="tw_c" v-if="!data.vehicle">
                                                            <el-icon class="is-loading" v-show="totalObj[data.permissionCode]?.value == undefined"><Loading /></el-icon>
                                                            <span v-show="totalObj[data.permissionCode]?.value != undefined">({{totalObj[data.permissionCode]?.value}}/{{totalObj[data.permissionCode]?.total}})</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-tree>
    
                                    </el-scrollbar>
                                </el-tab-pane>
                                <el-tab-pane class="pl5" label="未审核" name="second"></el-tab-pane>
                            </el-tabs>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </el-collapse-transition>
    
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
import {associateCompanyAndVehicle, getNodesForSearch, getTreesList, getVehicleStateStatistic} from "../../../../../../../api/dynamicMonitoring/messages";
import {getCurrentInstance} from "vue";
import electronicFence from "@/pages/dynamicMonitoring/messages/components/electronicFence/index.vue";


let { proxy } = getCurrentInstance()
let { formData } = defineProps({
    formData: { type: Object, default:()=>{ return {"is808": 0, "operatorIdList": [], "parentCode": "", "vehicleOperateTypeCodeList": [], "vehicleStatus": '', "vehicleType": '', filter: false, keyword: '', type: ''}}}
})
// let { collapseActiveName} = defineProps({
//     collapseActiveName: { type:String, default: '1'}
// })
let collapseActiveName = inject('collapseActiveName')

// let collapseActiveName = $ref('is-active')
let mapTreeRef = $ref(null)
let defaultExpandedKeys = $ref(['P000001'])
let activeName = $ref('first')
let setActiveName = $ref('first')
let carManagementRef = $ref(null)
let carSetRef = $ref(null)
let visible = ref(false)
const value3 = $ref(true)
let title = $ref('title')
let checkList = $ref([])
let totalObj = $ref({})
let cities = $ref({})
let treeTotalLoading = $ref(false)
let treeStatus = $ref(true)
let permissionCode = $ref('')
let scrollbarRef = $ref(null)
let contextmenuContentRef = $ref(null)
let checkObj = reactive({})

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
        { key: 'carType',type:'radio', label: '车辆类别', col:24, slot: true },
        { key: 'reciveType',type: 'radio', col:24, label: '车辆状态', children: [{ label: '全部状态', value: 1 }, { label: '行驶车辆', value: 2 },{ label: '停止车辆', value: 3 },{ label: '在线车辆', value: 4 },{ label: '离线车辆', value: 5 },{ label: '报警车辆', value: 6 }],},
        { key: 'digest', type:'select', label: '营运类型', props: {type: 'textarea'}, col:24},
        { key: 'digestaa', type:'select', label: '运营商', props: {type: 'textarea'}, col:24},
    ],
    setFormData: {
        keyword: '',
        carType: 1
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
    checkObj: {}
})

const getTreeHieght = computed(()=>{
    return window.innerHeight - 370
})



let emits = defineEmits(['setCollapseActiveName', 'zoomAndCenterIns', 'isCollapse', 'checkNode', 'closeCarDetails', 'nodeClick', 'tapClick', 'carListVehicleCodeListUpate'])

const checkNode = (data, obj)=>{
    checkObj = obj
    mainData.checkObj = obj
    console.log(checkObj, 'fgdjh ');
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
            {name: '拍照', icon: 'fasongzhaopian', isshow: true, click: () => emits('tapClick', 'sendPhoto', node)},
            {name: '视频', icon: 'chakanshipin', isshow: true, click: () => emits('tapClick', 'sendVideo', node)},
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
    isLeaf: 'vehicle',
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
        if (node.level > 0){
            getTotalObj()
            // proxy.$_.debounce(fc => getTotalObj(), 1000, { leading: true })();
            // console.log(mapTreeRef.getNode('HBK453532'));
            // 设置勾选
            if(defaultExpandedKeys != ['P000001']){
                setCheckMapCententCar()
            }
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
    // defaultExpandedKeys = ['P000001']
    // formData.parentCode = ''
    // formData.type = ''
    totalObj = {}
    nextTick(()=>{
        treeStatus = true
    })
}

// 公共搜索
const onSeek = (type)=>{
    treeStatus = false
    emits('closeCarDetails')
    defaultExpandedKeys = ['P000001']
    formData.parentCode = ''
    formData.type = ''
    totalObj = {}
    if(formData.keyword){
        let arr = proxy.$_.filter(cities, ['name', formData.keyword])
        if(arr.length>0){
            formData.type = arr[0].type
            getNodesForSearch(formData).then(res=>{
                if(res[0]){
                    defaultExpandedKeys = res[0].permissionCodeList
                    permissionCode = res[0].code
                }
                nextTick(()=>{
                    treeStatus = true
                })
            })
        }else {
            nextTick(()=>{
                treeStatus = true
            })
        }
    }else {
        nextTick(()=>{
            treeStatus = true
        })
    }
    
}

// 获取车辆总数，在线数量
const getTotalObj = proxy.$_.debounce(() => {
    
    if(!mapTreeRef.store) return
    // 获取车辆数量
    let keys = mapTreeRef.store.nodesMap
    let data = proxy.$_.cloneDeep(formData)
    data['permissionCodeList'] = proxy.$_.keys(keys)
    data.permissionCodeList = data.permissionCodeList.filter((code)=> code.indexOf('P0000')>=0)
    treeTotalLoading = true
    getVehicleStateStatistic(data).then(numObj=>{
        treeTotalLoading = false
        totalObj = proxy.$_.keyBy(numObj, 'dataPermissionCode');
        mapTreeRef!.filter() // 过滤节点
    }).catch(()=>{
        treeTotalLoading = false
    })
},400)

const setCheckMapCententCar = proxy.$_.debounce(()=>{
    // if(!scrollbarRef.setScrollTop) return
    let dom = document.getElementById(permissionCode)
    if(dom){
        
        scrollbarRef.setScrollTop(dom.offsetTop - 60)
        mapTreeRef.setChecked(permissionCode, true)
        let data = mapTreeRef.getNode(permissionCode).data
        data.maker = {};
        data.lastLongitude = data.longitude;
        data.lastLatitude = data.latitude;
        emits('zoomAndCenterIns', data)
        checkNode(data, {checkedKeys:[permissionCode], checkedNodes: mapTreeRef.getCheckedNodes()})
    }
},800)

// 车辆树是动态所以每30秒刷新车辆数
let treeTimer= setInterval( getTotalObj,30000)



onDeactivated(() => {
    clearInterval(treeTimer)
})

defineExpose({checkObj, mainData})

</script>

<style scoped lang="scss">
#meaages_nav_content {
    //font-size: 12px;
    :deep(.el-tabs__item) { padding: 0 10px}
    .nav_custom-form, .nav_content_keyword {
        :deep(.el-form-item) { margin-bottom: 8px}
        :deep(.el-input__wrapper) {background: var(--tw-dtjc-select); box-shadow: none}
    }
    .el-collapse-item__wrap { height: calc(100% - 100px);overflow: inherit}
    .carList {
        .el-collapse-item__content{
            padding-bottom: 10px;
            //:deep(.el-scrollbar__view) { overflow: scroll;}
            :deep(.el-scrollbar__wrap){
                //overflow-x: hidden !important;
                .el-scrollbar__view{display:inline-block !important; white-space: nowrap}
    
                .el-tree-node__content { width: 100%}
            }
            //:deep(.el-scrollbar__wrap) {
            //    overflow-x: auto;
            //    height: calc(100% + 20px); //多出来的20px是横向滚动条默认的样式
            //}
        }
    }
}
</style>
