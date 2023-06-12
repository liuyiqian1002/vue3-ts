<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData" @tableCallback="tableCallback"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"></edit>
        <!--  查看权限  -->
        <dataPermission ref="dataDrawerRef" :title="title"></dataPermission>
        <!--  查看数据权限  -->
        <viewData ref="viewDataRef" :title="title"></viewData>
        <!--  导入数据  -->
        <upload v-model="exprotData" @getTable="getTable"></upload>
    </div>
</template>

<script setup lang="tsx">
import edit from './components/edit/index.vue'
import dataPermission from './components/dataPermission/index.vue'
import viewData from './components/viewData/index.vue'
import upload from './components/upload.vue'
import {resetPwd, updateValid, vehicleCount} from "@/api/system/management/account/index";
import nan from "@/assets/images/nan.png"
import nv from "@/assets/images/nv.png"
import {downloadFile, downloadTemplate, userExport} from "../../../../api/system/management/account";
import {getToken} from "../../../../utils/auth";
import {createVNode} from "vue";

let { proxy } = getCurrentInstance()


let drawer = $ref(false)
let drawerRef = $ref(null)
let dataDrawerRef = $ref(null)
let viewDataRef = $ref(false)
let title = $ref('')
let contentMainRef = $ref(null)
let exprotData = $ref(false)


const tableCallback = (data)=>{
    let arr = proxy.$_.map(data, 'userId')
    // 查看详情
    vehicleCount({userIdList:arr}).then(nums=>{
        data.forEach((item, i)=> item.vehicleTotal = nums[item.userId]?nums[item.userId]:0)
    })
    console.log(data);
    
}

let mainData = reactive({
    tableUrl: '/system/user/page',
    isCheck: true,
    columns: [
        { prop: 'userAccount', label: '账号' },
        { prop: 'cellphone', label: '手机号' },
        { prop: 'realName', label: '真实姓名', width: 200, formatter:(row)=>{
            let src = nan
                if(row.portrait){
                    src = row.portrait.thumbnailViewUrl
                }else {
                    src = row.gender == 1?nan:nv
                }
                return (<div class="tw_cl"><el-image class="tableUserImg radius" src={src}></el-image><span class="ml5" style="    color: var(--el-color-primary);">{row.realName}</span></div>)
            }},
        { prop: 'gender', label: '性别', filter: 'sex', sortable: true },
        { prop: 'orgName', label: '所属机构' },
        { prop: 'roleTypeName', label: '角色类型' },
        { prop: 'createUserId', label: '创建人', sortable: true },
        { prop: 'createTime', label: '创建时间', width: 180, sortable: true   },
        { prop: 'lastModifyUserId', label: '修改人', sortable: true  },
        { prop: 'lastModifyTime', label: '修改时间', width: 180, sortable: true  },
        { prop: 'vehicleTotal', label: '车辆权限', sortable: true , formatter:(row)=> {
            if(row.vehicleTotal || row.vehicleTotal==0){
                return (<span onClick={(e) =>{
                    title = '查看用户权限车辆明细'
                    viewDataRef.viewData(row)
                }} class="el-link el-link--primary">{row.vehicleTotal}</span>)
            }else {
                return '加载中...'
            }
            } },
        { prop: 'valid', label: '状态', filter: 'valid', color: '#79bbff', width: 80,},
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row) => {
                title = '新增账户'
                drawerRef.setFormData({})
                drawer = true
            },
        },
        {icon: 'daochu', name: '导出', click: (row) => {
                let lists = contentMainRef.getAllCheck();
                let ids = proxy.$_.map(lists, 'userId');
                let txt = ids.length>0?`请确定导出选中的${ids.length}条数据吗？`:`请确定导出全部数据`
                proxy.MessageBox({msg: txt, type: 'warning'}).then((close) => {
                    userExport({...mainData.formData, ...{ids:ids}}).then((res)=>{
                        window.open(res.fileUrl)
                        close()
                    }).catch(()=>{
                        close()
                    })
                })
                
            },
        },
        {icon: 'daorumoban', name: '下载模板', click: (row) => {
            proxy.MessageBox({msg: '请确定下载当前此模板！', type: 'warning'}).then((close) => {
                downloadTemplate({templateName: '用户导入模板'}).then((res)=>{
                    proxy.download(res, '用户导入模板')
                    close()
                }).catch(()=>{
                    close()
                })
            })
        },},
        {icon: 'shangchuan', name: '导入数据', click: (row) => {
                exprotData = true
        },},
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 160,
        btns: [
            { icon: 'bianji', name: '编辑', click: (row) => {
                    title = '编辑账户'
                    drawerRef.setFormData(row)
                    drawer = true
                }
            },
            { icon: 'xiugaimima', name: '重设密码', click: (row) => {
                    proxy.MessageBox({msg: '确定重设密码吗？', type: 'info'}).then((close) => {
                        resetPwd({userId: row.userId}).then(()=>{
                            ElMessage.success('密码已重设为 000000！')
                            getTable()
                            close()
                        })
                    })
                }
            },
            { icon: 'chakanquanxian', name: '查看权限', click: (row) => {
                    title = '查看权限'
                    dataDrawerRef.getDatalists(row, 1)
            }},
            { icon: 'jinyong', name: '禁用', formatter: (row) => row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定禁用当前账号吗？', type: 'info'}).then((close) => {
                        updateValid({id: row.userId, valid: false}).then(()=>{
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                } },
            { icon: 'qiyong', name: '启用', formatter: (row) => !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用当前账号吗？', type: 'info'}).then((close) => {
                        updateValid({id: row.userId, valid: true}).then(()=>{
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                } },
        ],
    },
    formData: {
        dataPermissionCode: '',
        keyword: '',
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        userTypeType: '',
        valid: '',
    },
    lists: [
        { key: 'dataPermissionCode', label: '所属机构', type: 'org', url: '/system/orgTree/getAll', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode'}, permissionCode: '', arrChangeKey: ['organizationType', 'roleId', 'nodeDtoList'], resetIndex: 7},
        {label: '角色类型', key: 'userTypeType', type: 'select', filter: 'roleCode'},
        { label: '关键字', key: 'keyword', placeholder: '手机号丶登录名丶真实姓名' },
        {label: '状态', key: 'valid', type: 'select', filter: 'valid'},
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
