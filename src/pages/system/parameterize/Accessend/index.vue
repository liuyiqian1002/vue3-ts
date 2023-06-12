<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>

    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/system/parameterize/accessend";
import {insuranceExport} from "@/api/system/parameterize/accessend";
let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/entryPoint/page',
    columns: [
        { prop: "entryPointName", label: "配置名称" },
        { prop: "basicProtocol", label: "协议版本", filter: 'basicProtocolType'},
        { prop: "securityProtocol", label: "主动安全",filter: 'securityProtocolType' },
        { prop: "outerIp", label: "外网IP" },
        { prop: "outerPort", label: "外网端口" },
        { prop: "innerServer", label: "内网IP(含端口)" },
        { prop: "remark", label: "备注" },
        { prop: "valid", label: "状态", width: 80, formatter: (row)=>{
                return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '添加接入端配置'
                drawerRef.setFormData({})
                drawer = true
            }},
            { icon: 'daochu', name: '导出', click: () => {
                let lists = contentMainRef.getAllCheck();
                let ids = proxy.$_.map(lists, 'fileId');
                let txt = ids.length>0?`请确定导出选中的${ids.length}条数据吗？`:`请确定导出全部数据`
                proxy.MessageBox({msg: txt, type: 'warning'}).then((close) => {
                    insuranceExport({...mainData.formData, ...{ids:ids}}).then((res)=>{
                        window.open(res.fileUrl)
                        close()
                    }).catch(()=>{
                        close()
                    })
                })
        
            }, }
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `新增接入端配置`
                    drawerRef.setFormData(row,2)
                    drawer = true
                }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: `确定启用${row.entryPointName}吗？`, type: 'warning'}).then((close) => {
                        updateValid({id: row.entryPointId, valid: true}).then(()=>{
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                }},
            {icon: 'jinyong', name: '禁用', formatter:(row)=> row.valid, click: (row)=> {
                    proxy.MessageBox({msg: `确定禁用${row.entryPointName}吗？`, type: 'warning'}).then((close) => {
                        updateValid({id: row.entryPointId, valid: false}).then(()=>{
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
            }}
        ] },
    formData: {
         "basicProtocol": "",
         "configName": "",
         "order": "",
         "orderField": "",
         "pageNumber": 1,
         "pageSize": 25,
         "outerPort": "",
         "securityProtocol": "",
         "outerIp": "",
         "valid": "",
    },
    lists: [
        {label: '配置名称', key: 'entryPointName', placeholder: '请输入'},
        {label: '协议版本', key: 'basicProtocol', type:'select',filter:'basicProtocolType'},
        {label: '主动安全', key: 'securityProtocol', type:'select',filter:'securityProtocolType'},
        {label: '状态', key: 'valid', type:'select',filter: 'valid'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
