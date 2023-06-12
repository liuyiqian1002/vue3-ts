<template>
    <div>
        <!--            :isBtns="false"-->
        <tw-drawer
            @save="save('company')"
            :loading="loading"
            @handleClose="handleClose"
            :title="title"
            v-model="drawerFlag"
        >
            <template v-if="drawerFlag">
                <tw-custom-form
                    ref="fromDataRef"
                    :lists="mainData.headLlists"
                    :rules="mainData.headRules"
                    :formData="mainData.formData"
                ></tw-custom-form>
                <el-scrollbar class="w" style="height: 633px">
                    <div class="pr20">
                        <tw-custom-form
                            :lists="mainData.lists"
                            :rules="mainData.rules"
                            :formData="mainData.formData"
                            :loading="loading"
                        >
<!--                            @save="save"-->
                            <template #table>
                                <tw-table
                                    style="
                                        margin-left: -120px;
                                        width: calc(100% + 120px);
                                        padding: 0;
                                    "
                                    ref="tableRef"
                                    url="/business/companyContacts/pageByCompanyId"
                                    :tableParams="{
                                        companyId: mainData.formData.companyId,
                                    }"
                                    :botHeight="500"
                                    :columns="mainData.columns"
                                    :tableBtns="mainData.tableBtns"
                                    :showPagination="false"
                                    @tableCallback="tableCallback"
                                ></tw-table>
                            </template>
                            <template #address>
                                <el-input
                                    v-model="mainData.formData.address"
                                    @change="seacrh"
                                    placeholder="请输入详情地址"
                                >
                                    <template #append>
                                        <el-button
                                            icon="Search"
                                            @click="seacrh"
                                        >
                                            搜索
                                        </el-button>
                                    </template>
                                </el-input>
                            </template>
                            <template #addressMap>
                                <div
                                    id="updateMap_address"
                                    style="
                                        margin-left: -120px;
                                        width: calc(100% + 120px);
                                        height: 240px;
                                        border-radius: 10px;
                                    "
                                ></div>
                            </template>
                        </tw-custom-form>
                    </div>
                </el-scrollbar>
                <!-- <el-tabs v-model="activeName">
                    <el-tab-pane label="基础消息" name="company">
                        <el-scrollbar class="w" style="height: 633px">
                            <div class="pr20">
                                <tw-custom-form
                                    :lists="mainData.lists"
                                    :rules="mainData.rules"
                                    :formData="mainData.formData"
                                    :loading="loading"
                                    showBtns
                                    @save="save('company')"
                                >
                                    <template #table>
                                        <tw-table
                                            style="margin-left: -120px;width: calc(100% + 120px); padding: 0"
                                            ref="tableRef"
                                            url="/business/companyContacts/pageByCompanyId"
                                            :tableParams="{companyId: mainData.formData.companyId}"
                                            :botHeight="500"
                                            :columns="mainData.columns"
                                            :tableBtns="mainData.tableBtns"
                                            :showPagination="false"
                                            @tableCallback="tableCallback"
                                        >
                                        </tw-table>
                                    </template>
                                    <template #address>
                                        <el-input v-model="mainData.formData.address" @change="seacrh"
                                                  placeholder="请输入详情地址">
                                            <template #append>
                                                <el-button icon="Search" @click="seacrh">搜索</el-button>
                                            </template>
                                        </el-input>
                                    </template>
                                    <template #addressMap>
                                        <div id="updateMap_address" style="margin-left: -120px;width: calc(100% + 120px); height:  240px; border-radius: 10px;">
                                        </div>
                                    </template>
                                </tw-custom-form>
                
                            </div>
                        </el-scrollbar>
                    </el-tab-pane>
                    <template v-if="editStatus">
                        <el-tab-pane label="证件信息" name="enterpriseCertificate">
                            <tw-table
                                url="/business/enterpriseCertificate/pageByCompanyId"
                                :tableParams="{companyId: mainData.formData.companyId}"
                                :botHeight="500"
                                :columns="mainData.certificateLists"
                                :headBtns="mainData.certificateHeadBtns"
                                :tableBtns="mainData.certificateTableBtns"
                                :showPagination="false"
                                @tableCallback="(lists)=> mainData.formData.enterpriseCertificateListDtos = lists"
                            >
                            </tw-table>
        
                            <div class="tw_c pt30">
                                <el-button type="primary" :loading="loading" @click="save('enterpriseCertificate')">保存</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="变更记录" name="three">
                            <tw-table
                                url="/business/companyRecord/pageByCompanyId"
                                :tableParams="{companyId: mainData.formData.companyId}"
                                :botHeight="200"
                                :columns="mainData.alterationLists"
                                :showPagination="false"
                            >
                            </tw-table>
                        </el-tab-pane>
                    </template>
                </el-tabs> -->
            </template>
        </tw-drawer>
        <!--  证件信息编辑新增  -->
        <!-- <basics ref="basicsRef" :title="editTitle" @save="certificateSave"></basics> -->
    </div>
</template>

<script setup lang="tsx">
// import {addOrUpdate, getListByCompanyId} from '@/api/operation/businessmanagement/basicinformation'
import qi from '@/assets/images/qi.png'

// 营运消息组件引入
import basics from './components/basics/index.vue'
import { addOrUpdate } from '@/api/operation/businessmanagement/basicinformation'
import { getCurrentInstance } from 'vue'
import { nextTick } from '@vue/runtime-core'
import { useStore } from 'vuex'

let { title } = defineProps({
    title: String,
})
// 证件信息
const basicsRef = $ref(null)
let editStatus = $ref(false)
let activeName = $ref('company')
let editTitle = $ref('')
let { proxy } = getCurrentInstance()
let editData = {
    address: '',
    // "businessScope": "",
    companyContactsListDtos: [
        {
            cellphone: '',
            companyId: '',
            contactsName: '',
            contactsRole: '',
            // "firstRoleTag": '',
            mail: '',
            phone: '',
            qq: '',
            wechatId: '',
        },
    ],
    companyId: '',
    // "companyType": '',
    dataPermissionCode: '',
    // "enterpriseCertificateListDtos": [
    //     {
    //         "certificateId": 0,
    //         "companyId": 0,
    //         "credentialCode": "",
    //         "credentialType": 0,
    //         "endDate": "",
    //         "fileIdList": [],
    //         "fileList": [
    //             {
    //                 "businessId": "",
    //                 "fileId": "",
    //                 "fileName": "",
    //                 "fileType": 0,
    //                 "thumbnailViewUrl": "",
    //                 "uploadName": "",
    //                 "viewUrl": ""
    //             }
    //         ],
    //         "issuingAuthority": "",
    //         "remark": "",
    //         "startDate": ""
    //     }
    // ],
    latitude: '',
    longitude: '',
    name: '',
    // "operState": '',
    // "postcode": "",
    // "remark": ""
}
let store = useStore()
let mainData = reactive({
    formData: {},
    headLlists: [
        {
            key: 'regulatorsId',
            label: '部门名称',
            col: 12,
            params: { havePermission: true },
            props: { label: 'name', value: 'regulatorsId' },
            placeholder: '请输入部门名称',
        },
        {
            key: 'dataPermissionCode',
            label: '所属区域',
            col: 12,
            placeholder: '请选择所属区域',
            remote: true,
            type: 'cascader',
            url: '/system/area/getAreaDtoListByParentCode/',
            method: 'get',
            params: { default: 0 },
            paramsType: 'url',
            props: { label: 'name', value: 'code' },
            change: (val) => {
                console.log(val, 'change')
                // mainData.formData.provinceId = val[0]
                // mainData.formData.cityId = val[1]
                // mainData.formData.districtId = val[2]
            }
        },
    ],
    headRules: {
        regulatorsId: [
            { required: true, message: '请输入部门名称', trigger: 'change' },
        ],
        dataPermissionCode: [
            { required: true, message: '请选择所属区域', trigger: 'change' },
        ],
    },
    columns: [
        {
            prop: 'contactsRole',
            label: '角色',
            filter: 'companyContactsRole',
            width: 170,
            formatter: (row, column, cellValue, index) => {
                // if (index == mainData.formData.companyContactsListDtos.length - 1) {
                return (
                    <el-form-item
                        label=" "
                        label-width={1}
                        prop={`companyContactsListDtos.${index}.contactsRole`}
                        rules={{
                            required: true,
                            message: '请选择角色',
                            trigger: 'change',
                        }}
                    >
                        <el-select v-model={row.contactsRole} clearable>
                            {store.getters.arrEnumerate.companyContactsRole.map(
                                (item) => {
                                    return (
                                        <el-option
                                            key={item.value}
                                            label={item.label}
                                            value={item.value}
                                        />
                                    )
                                },
                            )}
                        </el-select>
                    </el-form-item>
                )
                // } else {
                //     return store.getters.oEnumerate.companyContactsRole[row.contactsRole]
                // }
            },
        },
        {
            prop: 'contactsName',
            label: '姓名',
            width: 160,
            formatter: (row, column, cellValue, index) => (
                <el-form-item
                    label=" "
                    label-width={1}
                    prop={`companyContactsListDtos.${index}.contactsName`}
                    rules={{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur',
                    }}
                >
                    <el-input v-model={row.contactsName} clearable />
                </el-form-item>
            ),
        },
        {
            prop: 'cellphone',
            label: '手机',
            width: 160,
            formatter: (row, column, cellValue, index) => (
                <el-form-item
                    label=" "
                    label-width={1}
                    prop={`companyContactsListDtos.${index}.cellphone`}
                    rules={{
                        required: true,
                        message: '请输入手机',
                        trigger: 'blur',
                    }}
                >
                    <el-input v-model={row.cellphone} clearable />
                </el-form-item>
            ),
        },
        {
            prop: 'phone',
            label: '座机',
            width: 160,
            formatter: (row, column, cellValue, index) =>
                customInput(row, index, 'phone'),
        },
        {
            prop: 'mail',
            label: '邮箱',
            width: 160,
            formatter: (row, column, cellValue, index) =>
                customInput(row, index, 'mail'),
        },
        {
            prop: 'wechatId',
            label: '微信',
            width: 160,
            formatter: (row, column, cellValue, index) =>
                customInput(row, index, 'wechatId'),
        },
        {
            prop: 'qq',
            label: 'QQ',
            width: 160,
            formatter: (row, column, cellValue, index) =>
                customInput(row, index, 'qq'),
        },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 60,
        btns: [
            {
                icon: 'add',
                name: '新增',
                formatter: (row, column, index) =>
                    index ==
                    mainData.formData.companyContactsListDtos.length - 1,
                click: (row) => {
                    mainData.formData.companyContactsListDtos.push(
                        proxy.$_.cloneDeep(editData.companyContactsListDtos[0]),
                    )
                },
            },
            {
                icon: 'shanchu',
                name: '删除',
                formatter: (row, column, index) =>
                    index <
                        mainData.formData.companyContactsListDtos.length - 1 &&
                    index !== 0,
                click: (row, column, index) => {
                    mainData.formData.companyContactsListDtos.splice(index, 1)
                },
            },
        ],
    },
    lists: [
        { key: 'table', slot: true, col: 24 },
        { key: 'address', label: '详情地址', slot: true, col: 24 },
        { key: 'addressMap', slot: true, col: 24 },
    ],
    rules: {},
    certificateHeadBtns: [
        {
            icon: 'add',
            name: '新增',
            click: (row, column, index) => {
                if (
                    mainData.formData.enterpriseCertificateListDtos.length < 2
                ) {
                    editTitle = '新增'
                    basicsRef.setFormData()
                } else {
                    ElMessage.warning('证书最多只能加2个！')
                }
            },
        },
    ],
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)
let map, marker

const initMap = (lng?: any, lat?: any) => {
    nextTick(() => {
        if (!proxy.notNull(lng) || !proxy.notNull(lat)) {
            lng = 114.30525
            lat = 30.59276
        }
        console.log(lng)
        console.log(lat)
        map = new AMap.Map('updateMap_address', {
            resizeEnable: true,
            center: [lng, lat], //地图中心点  武汉市政府
            zoom: 12, //地图显示的缩放级别
            keyboardEnable: false,
        })
        marker = new AMap.Marker({
            map: map,
            icon: qi,
            draggable: false, //是否可以拖拽
            animation: 'AMAP_ANIMATION_DROP',
            bubble: true,
            position: [lng, lat],
        })
        AMap.plugin('AMap.Geocoder', function () {
            let geocoder = new AMap.Geocoder({
                city: '010', //城市，默认：“全国”
            })
            //地图点击事件
            map.on('click', function (e) {
                let lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()] //地图上所标点的坐标
                geocoder.getAddress(lnglatXY, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        //获得了有效的地址信息: 并赋值
                        mainData.formData.longitude = lnglatXY[0]
                        mainData.formData.latitude = lnglatXY[1]
                        mainData.formData.address =
                            result.regeocode.formattedAddress
                    } else {
                        console.log('未知原因获取地址失败')
                    }
                })
                //将点击地图获取的经纬度赋值给表单后台添加获取
                if (marker) {
                    marker.setMap(null)
                }
                marker = new AMap.Marker({
                    map: map,
                    icon: qi,
                    draggable: false, //是否可以拖拽
                    animation: 'AMAP_ANIMATION_DROP',
                    bubble: true,
                    position: [e.lnglat.getLng(), e.lnglat.getLat()],
                })
            })
        })
    })
}

const setFormData = (obj) => {
    mainData.formData = proxy.$_.cloneDeep(editData)
    drawerFlag = true
    if (obj) {
        editStatus = true
        let data = { ...mainData.formData, ...obj }
        // if (data.businessScope.indexOf(',') > 0) {
        //     data.businessScope = data.businessScope.split(',').map(Number)
        // } else {
        //     data.businessScope = [data.businessScope]
        // }
        mainData.headLlists[0].disabled = true
        mainData.headLlists[1].disabled = true
        // 后台数据会返回null，前端会报错
        mainData.formData = proxy.$_.cloneDeep(data)
        initMap(mainData.formData.longitude, mainData.formData.latitude)
    } else {
        editStatus = false
        mainData.headLlists[0].disabled = false
        mainData.headLlists[1].disabled = false
        mainData.formData = proxy.$_.cloneDeep(mainData.formData)
        initMap()
    }
}

// const certificateSave = (obj, i)=> {
//     if(editTitle=='新增'){
//         mainData.formData.enterpriseCertificateListDtos.push(obj)
//     }else {
//         mainData.formData.enterpriseCertificateListDtos[i] = obj
//     }
// }

const handleClose = () => {
    // mainData.formData = proxy.$_.cloneDeep(editData)
}

const customInput = (row, index, key) => {
    // if (index == mainData.formData.companyContactsListDtos.length - 1) {
    return <el-input v-model={row[key]} clearable />
    // } else {
    //     return row[key]
    // }
}

const tableCallback = (lists) => {
    mainData.formData.companyContactsListDtos = lists
    if (!editStatus) {
        mainData.formData.companyContactsListDtos.push(
            proxy.$_.cloneDeep(editData.companyContactsListDtos[0]),
        )
        // mainData.formData.companyContactsListDtos = proxy.$_.cloneDeep(editData.companyContactsListDtos)
        // console.log(mainData.formData.companyContactsListDtos);
    }
}

let eimts = defineEmits(['getTable'])
const save = (str) => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        mainData.formData.updateType = str
        mainData.formData.businessScope = mainData.formData.businessScope.join()
        addOrUpdate(mainData.formData)
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

onMounted(() => {})

const seacrh = () => {
    AMap.service(['AMap.PlaceSearch'], function () {
        let placeSearch = new AMap.PlaceSearch({
            //构造地点查询类
            city: '湖北省', // 城市
            map: map,
        })
        //关键字查询
        placeSearch.search(mainData.formData.address)
    })
}

defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
