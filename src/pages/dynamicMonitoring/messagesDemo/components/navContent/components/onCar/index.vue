<template>
    <div class="on_car">
        <div role="tab" aria-expanded="true" aria-controls="el-collapse-content-8535"
             aria-describedby="el-collapse-content-8535">
            <div class="el-collapse-item__header pl20 tw_clr" role="button" tabindex="0" @click="collapseChange('2')">
                <div>
                    <el-icon :style="collapseActiveName == '2'?'transform: rotate(180deg)':''">
                        <ArrowDown/>
                    </el-icon>
                    选中车辆
                </div>
                <p class="pr20 tw_c">
                    <el-button type="primary" size="small" @click.stop="carDetails">车辆详情</el-button>
                </p>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="collapseActiveName == '2'" class="el-collapse-item__wrap" role="tabpanel" aria-hidden="false"
                 aria-labelledby="el-collapse-head-8535">
                <div class="el-collapse-item__seek tw_cl">
                    <tw-custom-select style="width: 120px" :formData="formData" :item="{ key: 'secondOperatorIdList', type:'select', multiple: true, remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1 }, props:{ label: 'name', value:'id'}, placeholder: '运营商', children: []}"></tw-custom-select>
                    <tw-custom-select style="width: 210px" class="mb0" :formData="formData" :item="{ key: 'secondVehicleCodeList', type:'select', multiple: true, remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1 }, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码', children: []}"></tw-custom-select>
                </div>
                <div class="el-collapse-item__content pl30">
                    <el-scrollbar ref="scrollbar" :style="`height: ${getTreeHieght}px;width: 300px`" @scroll="addLists">
                        <el-tree style="min-height: 500px;padding-bottom: 80px" :data="treeData" :props="{children: 'channelDtos'}" :indent="24"    node-key="vehicleCode" ref="treeRef" show-checkbox @check="checkNode"  @node-contextmenu="nodeContextmenu" @node-click="nodeClick" empty-text="无车辆数据，请先选择上面的组织或者车辆在进行操作">
                            <template #default="{ node, data }">
                                <div class="w pr20">
                                    <div class="custom-tree-node w tw_clr">
                                        <div class="tw_cl">
                                            <el-image v-if="node.level == 1" class="mr5 tw_c" style="width: 6px" :src="getCarImg(data)"></el-image>
                                            {{ data.plateNum }}
                                        </div>
                                        <el-icon class="hide custom-tree-node_close" @click="closeCar({node, data})">
                                            <CircleClose/>
                                        </el-icon>
                                    </div>
                                </div>
                            </template>
                        </el-tree>
                        <div v-show="bottomStatus" class="title pt20" style="color: var(--el-color-info)">到底了~~~</div>
                        <div class="h40 w mb30" v-loading="loading"></div>
                    </el-scrollbar>
                </div>
            </div>
        </el-collapse-transition>
        <!--    选中车辆右键    -->
        <contextmenuContent ref="contextmenuContentRef" :lists="mainData.contextmenuLists"></contextmenuContent>
    </div>
</template>

<script setup lang="tsx">
import contextmenuContent from './components/contextmenuContent/index.vue'
import {getVehicleListForCheckedPermission, getVehicleState} from "../../../../../../../api/dynamicMonitoring/messages";

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

let {proxy} = getCurrentInstance()
let { formData, carListVehicleCodeList } = defineProps({
    formData: { type: Object, default:()=>{}},
    carListVehicleCodeList: Array
})

let collapseActiveName = inject('collapseActiveName')
let patternActive = inject('patternActive')

let activeName = $ref('first')
let treeData = $ref([])
let treeRef = $ref(null)
let scrollbar = $ref(null)
let contextmenuContentRef = $ref(null)
let loading = $ref(false)
let bottomStatus = $ref(false)
let emits = defineEmits(['setCollapseActiveName', 'carDetails', 'tapClick', 'nodeClick', 'zoomAndCenterIns', 'checkNode','guanzhu' ,'quxiaoguanzhu', 'addPageNumber', 'onCarVehicleCodeList'])
let mainData = reactive({
    nodeData: {},
    formData: {
        keyword: '',
        vehicleOperateTypeCodeList: []
    },
    descriptionsLists: [
        {key: 'title', label: '车牌号码:'},
        {key: 'createTime', label: '车牌颜色:'},
        {key: 'messageId', label: 'SIM卡号:',},
        {key: 'content', label: '所属企业:',},
        {key: 'content2', label: '运营商:',},
    ],
    descriptionsFormData: {
        title: '鄂A13285',
        createTime: '黄色',
        messageId: '1354354635435',
        content: '湖北省开发商发',
        content2: '湖北省禅达',
    },
    contextmenuLists: [
        {
            name: '发送拍照', icon: 'fasongzhaopian', isshow: true, click: () => {
                emits('tapClick', 'sendPhoto')
            }
        },
        {
            name: '发送语音', icon: 'fasongyuyin', isshow: true, click: () => {
                emits('tapClick', 'sendVoice')
            }
        },
        {
            name: '查看视频', icon: 'chakanshipin', isshow: true, click: () => {
                emits('tapClick', 'sendVideo')
            }
        },
        {
            name: '照片查询', icon: 'zhaopianchaxun', isshow: true, click: () => {
                emits('tapClick', 'photoQuery')
            }
        },
        {
            name: '添加关注', icon: 'guanzhu', isshow: true, click: () => {
                // proxy.MessageBox({msg: `是否将${mainData.nodeData.plateNum}（黄色）设置为重点关注车辆?`, type: 'warning'}).then((close) => {
                    emits('tapClick','guanzhu',[mainData.nodeData])
                    // close()
                // })
            }
        },
        {
            name: '取消关注', icon: 'quxiaoguanzhu', isshow: false, click: () => {
                // proxy.MessageBox({msg: `取消关注${mainData.nodeData.plateNum}?`, type: 'warning'}).then((close) => {
                    emits('tapClick','quxiaoguanzhu',[mainData.nodeData])
                    // close()
                // })
            }
        },
    ],
    checkObj: {
        checkedKeys: []
    }
})

const getTreeHieght = computed(() => {
    return window.innerHeight - 218
})

let eventObj = {}
const addLists = proxy.$_.throttle((obj)=>{
    if(event){
        eventObj = event
    }
    if(obj.scrollTop> scrollbar.wrapRef.firstChild.clientHeight-800 && !bottomStatus){
        getTree()
    }
}, 500)

const checkNode = (data, obj)=>{
    mainData.checkObj = obj
    emits('checkNode', data, obj)
    emits('onCarVehicleCodeList', obj.checkedKeys)
}

const collapseChange = (val) => {
    if(collapseActiveName == val) return
    bottomStatus = false
    formData.pageNumber = 1
    treeData = []
    getTree()
    emits('setCollapseActiveName', val)
}


const getTree = () => {
    if(carListVehicleCodeList.length == 0 && formData.vehicleCodeList.length == 0) return
    if(!loading){
        let data = proxy.$_.cloneDeep(formData)
        data.currentCheckedPermissionCodeList = carListVehicleCodeList
        loading = true
        getVehicleListForCheckedPermission(data).then(res=>{
            loading = false
            emits('addPageNumber')
          
            treeData = [ ...treeData, ...res.rows]
            if(res.rows.length === 0 || res.rows == null){
            // if(formData.pageNumber*formData.pageSize > res.total){
                bottomStatus = true
            }
        }).catch(()=>{
            loading = false
        })
    }
    
}

const nodeClick = (data, obj) => {
    obj.data.maker = {};
    obj.data.lnglat = {
        lng: obj.data.longitude,
        lat: obj.data.latitude
    }
    console.log(data);
    emits('nodeClick', data, obj)
    if(patternActive == 0){ // 地图模式打开车辆详情
        emits('zoomAndCenterIns', obj.data, 20)
    }
}

const nodeContextmenu = (event, data, node, newNode) => {
    getVehicleState({vehicleId: data.vehicleId}).then(res=>{
        let nodeData = res[0]
        if(nodeData.focusId){
            mainData.contextmenuLists[4].isshow = false
            mainData.contextmenuLists[5].isshow = true
        }else {
            mainData.contextmenuLists[4].isshow = true
            mainData.contextmenuLists[5].isshow = false
        }
        mainData.nodeData = data
        contextmenuContentRef.viewData(event)
        // zoomAndCenterIns.start(data, 10)
        loading = false
    }).catch(()=>{
        loading = false
    })
    
    
}

// 删除车辆
const closeCar = ({node, data}) => {
    proxy.MessageBox({msg: `是否确定删除${data.plateNum}吗？`, type: 'warning'}).then((close) => {
        treeRef.remove(node)
        close()
    })
}

// 车辆详情
const carDetails = () => {
    if(mainData.checkObj.checkedKeys.length == 0){
        let keys = proxy.$_.map(treeData, 'vehicleCode');
        mainData.checkObj.checkedKeys = keys
    }else {
        emits('carDetails', mainData.checkObj.checkedKeys)
    }
}

const loadTreeData = () => {
    bottomStatus = false
    formData.pageNumber = 1
    treeData = []
    getTree()
}

defineExpose({ treeData, mainData, loadTreeData })

</script>

<style scoped lang="scss">
#meaages_nav_content {
    //font-size: 12px;
    :deep(.el-tabs__item) {padding: 0 10px}
    .on_car {
        :deep(.el-form-item) {margin-bottom: 0}
        :deep(.el-input__wrapper) {background: rgba(247, 247, 247, 1);box-shadow: none}
        :deep(.all-select-input) {background: rgba(247, 247, 247, 1);border: none;}
        :deep(.el-tree__empty-block) { min-height: 500px}
    }
    .el-collapse-item__wrap {height: calc(100% - 100px)}
    .custom-tree-node {
        &:hover {
            .custom-tree-node_close {display: block}
        }
    }
}
</style>
