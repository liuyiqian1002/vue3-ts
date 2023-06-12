<template>
    <div>
        <tw-drawer
            @save="save"
            @handleClose="handleClose"
            :loading="loading"
            :title="title"
            :width="1200"
            class="homelayout"
            v-model="drawerFlag"
        >
            <el-row class="h">
                <el-col :span="8">
                    <tw-custom-form
                        ref="fromDataRef"
                        :lists="mainData.lists"
                        :formData="mainData.formData"
                    >
                        <template #selectArea>
                            <el-row>
                                <el-col :span="11">
                                    <el-select v-model="mainData.formData.provinceName" @change="changePro">
                                        <el-option v-for="(item, i) in provinceOptions" :key="i" :value="item.name">{{item.name}}</el-option>
                                    </el-select>
                                </el-col>
                                <el-col :offset="2" :span="11">
                                    <el-select v-model="mainData.formData.cityName">
                                        <el-option v-for="(item, i) in cityOptions" :key="i" :value="item.name">{{item.name}}</el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </template>
                    </tw-custom-form>
                    <tw-table class="p0" :botHeight="240" :showPagination="false"                    :columns="columns"
                                                     :lists="lists">
                    
                    </tw-table>
                </el-col>
                <el-col :offset="1" :span="15">
                    <div id="homeMap_address" class="w h" style="border-radius: 10px;">
                    </div>
                </el-col>
            </el-row>
        </tw-drawer>
    </div>
</template>

<script setup lang="tsx">
import {addOrUpdate, getHomePageConfig} from '@/api/system/parameterize/homelayout'
import qi from "@/assets/images/qi.png";

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let lists = reactive([
    {show: true, positionTxt: '左上', type: 1},
    {show: true, positionTxt: '左中', type: 2},
    {show: true, positionTxt: '左下', type: 3},
    {show: true, positionTxt: '中上', type: 4},
    {show: true, positionTxt: '中下', type: 5},
    {show: true, positionTxt: '右上', type: 6},
    {show: true, positionTxt: '右中', type: 7},
    {show: true, positionTxt: '右下', type: 8},
])
let columns = [
    { prop: 'show', label: '首页显示', width: 90, formatter: (row)=> (<ElCheckbox v-model={row.show}></ElCheckbox>)},
    { prop: 'positionTxt', label: '显示位置', width: 90},
    { prop: 'type', label: '模块名称', formatter: (row)=>row.runningSpeed+'km/h' },
]
let mainData = reactive({
    formData: {
        "address": "",
        "centerLatitude": 0,
        "centerLongitude": 0,
        "cityName": "",
        "configName": "",
        "id": 0,
        "provinceName": "",
        "showModules": "",
        "showOperateType": ""
    },
    lists: [
        { key: 'configName', label: '配置名称：' },
        { key: 'selectArea', label: '地图定位：', slot: true },
        { key: 'showOperateType', label: '营运类型：', type:'select', multiple: true, remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props:{ label: 'typeName', value:'typeCode'}, placeholder: '营运类型', change:()=>{  }},
        // { key: 'showModules', label: '显示模块：',  type:'checkbox',  children:[ { label: '车辆分布', value: 1}, { label: '在线车辆'},{ label: '报警环比'},{ label: '天气情况'},{ label: '系统公告'},{ label: '运营商情况'},],},
    ],
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)
let provinceOptions = $ref([])
let cityOptions = $ref([])
let province = $ref('')
let city = $ref('')

const setFormData = (obj) => {
    mainData.formData = proxy.$_.cloneDeep(obj)
    console.log(mainData.formData)
    drawerFlag = true
    getHomePageConfig({}).then(res=>{
        console.log(res);
    })
    
    initMap()
    
}

let map, marker, district

const initMap = (lng: any, lat: any) => {
    nextTick(() => {
        if (!proxy.notNull(lng) || !proxy.notNull(lat)) {
            lng = 114.305250;
            lat = 30.592760;
        }
        map = new AMap.Map("homeMap_address", {
            resizeEnable: true,
            center: [lng, lat],//地图中心点  武汉市政府
            zoom: 12,//地图显示的缩放级别
            keyboardEnable: false
        });
        marker = new AMap.Marker({
            map: map,
            icon: qi,
            draggable: false, //是否可以拖拽
            animation: "AMAP_ANIMATION_DROP",
            bubble: true,
            position: [lng, lat]
        });
        AMap.plugin('AMap.Geocoder', function () {
            let geocoder = new AMap.Geocoder({
                city: "010",//城市，默认：“全国”
            });
        });
        //行政区划查询
        let opts = {
            subdistrict: 1, //返回下一级行政区
            showbiz: false, //最后一级返回街道信息
        }
        map.plugin(['AMap.DistrictSearch'], function () {
            district = new AMap.DistrictSearch(opts) //注意：需要使用插件同步下发功能才能这样直接使用
            search('中国', 1)
            if(mainData.formData.cityName){
                search(mainData.formData.cityName, 2)
            }
        })
    })
}

const changePro = (val) => {
    search(val, 2)
    // mainData.formData.provinceName = ''
    mainData.formData.cityName = ''
}

const search = (name, type) => {
    district.search(name, function (status, result) {
        if (status == 'complete') {
            getData(result.districtList[0], type)
        }
    })
}

const getData = (data, level?: any) => {
    level = level || 2
    if (level === 1) {
        provinceOptions = data.districtList
        cityOptions = []
        // mainData.formData.provinceName = ''
        // mainData.formData.cityName = ''
    } else if (level === 2) {
        cityOptions = data.districtList
        // mainData.formData.cityName = ''
    }
}



const handleClose = () => {
    mainData.formData = {}
}

let eimts = defineEmits(['getTable'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        let params = proxy.$_.cloneDeep(form)
        params.showModules = params.showModules.join()
        params.showOperateType = params.showOperateType.join()
        addOrUpdate(form)
            .then(() => {
                loading = false
                ElMessage.success('修改成功！')
                drawerFlag = false
                eimts('getTable')
            })
            .catch(() => {
                loading = false
            })
    })
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
.homelayout {
    :deep(.el-scrollbar__view) { height: 100%}
}
</style>
