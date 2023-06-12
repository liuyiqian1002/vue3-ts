<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"/>
        <!-- 上传文件 -->
        <upload v-model="exprotData" @getTable="getTable"></upload>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import upload from './components/upload.vue'
import {
    updateValid,
    downloadTemplate,
    basicinformationExport
} from "@/api/operation/businessmanagement/basicinformation";

let drawer = $ref(false)
let drawerRef = $ref(null)
let particularsRef = $ref(null)
let title = $ref('')
let exprotData = $ref(false)
let contentMainRef = $ref(null)
let {proxy} = getCurrentInstance()
let store = useStore()
let mainData = reactive({
    tableUrl: '/business/company/page',
    isCheck: true,
    columns: [
        {
            prop: "dictionaryTypeId",
            label: "所属区域",
            width: 200,
            formatter: (row) => `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''}`
        },
        {prop: "name", label: "企业名称", width: 200},
        {
            prop: "businessScope", label: "经营范围", filter: 'companyBusinessScope', formatter: (row) => {
                if (row.businessScope) {
                    let data = store.getters.oEnumerate.companyBusinessScope
                    if (row.businessScope.indexOf(',') > 0) {
                        let list = row.businessScope.split(',')
                        let str = ''
                        list.forEach((item, i) => {
                            str += data[item]
                            if (i < list.length - 1) {
                                str += '、'
                            }
                        })
                        return str
                    } else {
                        return data[row.businessScope]
                    }
                } else {
                    return '-'
                }
                
            }
        },
        {prop: "companyType", label: "企业类别", filter: 'companyType', width: 90},
        {prop: "operState", label: "经营状态", filter: 'companyOperatorState', width: 90},
        {prop: "credentialType", label: "证件类型", filter: 'credentialType', width: 120},
        {prop: "credentialCode", label: "证件编码", width: 140},
        {prop: "startDate", label: "开始时间"},
        {prop: "endDate", label: "结束时间"},
        {prop: "contactsName", label: "负责人"},
        {prop: "createUserId", label: "创建人",},
        {prop: "createTime", label: "创建时间", width: 180},
        {prop: "remark", label: "备注"},
        {
            prop: "valid", label: "状态", width: 70, formatter: (row) => {
                return row.valid ? (<span style="color:#5AF2A1">启用</span>) : (<span style="color:#C9CDD4">禁用</span>)
            }
        },
    ],
    headBtns: [
        {
            icon: 'add',
            name: '新增',
            formatter: (row) => proxy.$store.getters.permissions['operation-qygl-qyjcxx-add'],
            click: (row) => {
                title = '新增企业'
                drawerRef.setFormData()
            }
        },
        {
            icon: 'daochu',
            name: '导出',
            formatter: (row) => proxy.$store.getters.permissions['operation-qygl-qyjcxx-export'],
            click: (row) => {
                let lists = contentMainRef.getAllCheck();
                let ids = proxy.$_.map(lists, 'companyId');
                let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
                proxy.MessageBox({msg: txt, type: 'warning'}).then((close) => {
                    basicinformationExport({...mainData.formData, ...{ids: ids}}).then((res) => {
                        window.open(res.fileUrl)
                        close()
                    }).catch(() => {
                        close()
                    })
                })
                
            },
        },
        {
            icon: 'daorumoban', name: '下载模板', formatter: (row) => proxy.$store.getters.permissions['operation-clgj-clbx-export'], click: (row) => {
                proxy.MessageBox({msg: '请确定下载当前此模板！', type: 'warning'}).then((close) => {
                    downloadTemplate({templateName: '企业导入模板'}).then((res) => {
                        proxy.download(res, '企业导入模板')
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
        {
            icon: 'shangchuan', name: '导入数据', formatter: (row) => proxy.$store.getters.permissions['operation-clgj-clbx-export'], click: (row) => {
                exprotData = true
            },
        }
    ],
    tableBtns: {
        prop: "btns", label: "操作", fixed: "right", width: 100, btns: [
            // {icon: 'chakanxiangqing2', name: '详情', click: (row)=> {
            //         title = `字典类型详情`
            //         particularsRef.setFormData(row,1)
            //         drawer = true
            //     }},
            {
                icon: 'bianji', name: '编辑', formatter: (row) => proxy.$store.getters.permissions['operation-qygl-qyjcxx-modify'], click: (row) => {
                    title = `编辑企业`
                    drawerRef.setFormData(row)
                    drawer = true
                }
            },
            {
                icon: 'qiyong', name: '启用', formatter: (row) => !row.valid && proxy.$store.getters.permissions['operation-clgj-clbx-export'], click: (row) => {
                    proxy.MessageBox({msg: '确定启用当前企业吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.companyId, valid: true}).then(() => {
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(() => {
                            close()
                        })
                    })
                }
            },
            {
                icon: 'jinyong', name: '禁用', formatter: (row) => row.valid && proxy.$store.getters.permissions['operation-clgj-clbx-export'], click: (row) => {
                    proxy.MessageBox({msg: '确定禁用当前企业吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.companyId, valid: false}).then(() => {
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(() => {
                            close()
                        })
                    })
                }
            }
        ]
    },
    formData: {
        "businessScopeList": [],
        "companyId": '',
        "companyType": '',
        "credentialType": '',
        "dataPermissionCodeList": [],
        "nodeDtoList": [],
        "endDay": "",
        "ids": [],
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "startDay": ""
    },
    lists: [
        // {label: '组织结构：', key: 'nodeDtoList', type: 'org', url: '/business/company/associateCompany', method: 'post', params: {hasDataPermission: true, needVehicle: true, searchType: 1, keyword: '', }, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: { label: 'orgName', value: 'permissionCode', disabled: 'nocheck', }, permissionIds: [], showCheckbox: true, },
        {
            label: '组织结构',
            key: 'nodeDtoList',
            placeholder: '请输入组织结构',
            type: 'org',
            url: '/system/userDataAuthSearchTree/getTreesList',
            showCheckbox: true,
            method: 'post',
            params: {"hasDataPermission": true, needVehicle: false, searchType: 1, keyword: ''},
            parKeys: [{key: 'parentCode', val: 'permissionCode'}],
            props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck'},
            permissionIds: [],
        },
        {
            label: '企业名称',
            key: 'companyId',
            type: 'select',
            remote: true,
            url: '/business/company/associateCompany',
            method: 'post',
            params: {havePermission: true},
            props: {label: 'companyName', value: 'companyId'},
            placeholder: '请选择企业名称'
        },
        {
            label: '经营范围',
            key: 'businessScopeList',
            multiple: true,
            type: 'select',
            placeholder: '请选择经营范围',
            filter: 'companyBusinessScope'
        },
        // {label: '经营范围', key:'businessScope',type:'select', placeholder: '请选择',filter: 'companyBusinessScope'},
        {label: '企业类别', key: 'companyType', type: 'select', placeholder: '请选择企业类别', filter: 'companyType'},
        {
            label: '证件类型',
            key: 'credentialTypeList',
            type: 'select',
            multiple: true,
            placeholder: '请选择证件类型',
            filter: 'credentialType'
        },
        { key: ['startDay', 'endDay'], col: 12, label: '时间范围', type: 'esDate', placeholder: '请选择有效期限', data: {valueFormat: 'YYYY-MM-DD'}},
        // {
        //     label: '时间范围',
        //     key: 'endDay',
        //     type: 'esDate',
        //     placeholder: '请选择时间范围',
        //     data: {valueFormat: 'YYYY-MM-DD'}
        // },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a {
    color: rgb(134, 144, 156);
}
</style>
