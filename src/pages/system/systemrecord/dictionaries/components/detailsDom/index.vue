<template>
    <div>
        <tw-drawer
            @save="save"
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
        >
            <tw-descriptions  :lists="mainData.lists" :column="3"
                              :data="data"></tw-descriptions>
            <tw-table
                ref="contentMainRef"
                class="p0"
                v-if="drawerFlag"
                :url="mainData.tableUrl"
                :tableParams="mainData.formData"
                :botHeight="mainData.botHeight"
                :columns="mainData.columns"
                :tableBtns="mainData.tableBtns"
                :headBtns="mainData.headBtns"
                >
                
            </tw-table>
        </tw-drawer>
    
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"/>
    </div>
</template>

<script setup lang="tsx">
import {addOrUpdate, dictionaryUpdateValid, updateValid} from '@/api/system/systemrecord/dictionaries'
import { getCurrentInstance } from 'vue'
import edit from "./components/edit/index.vue"

let {title} = defineProps({
    title: String,
})
let drawerRef = $ref(null)
let contentMainRef = $ref(null)
let data = $ref({})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
        "dictionaryTypeCode": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25
    },
    botHeight: 200,
    tableUrl: '/system/dictionary/page',
    columns: [
        { prop: "dictionaryTypeId", label: "字典名称" },
        { prop: "dictionaryKey", label: "字典键值",},
        { prop: "dictionaryValue", label: "值" },
        { prop: "remark", label: "描述" },
        { prop: "sort", label: "排序" },
        { prop: "valid", label: "状态", width: 80, formatter: (row)=>{
                return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 60, btns:[
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用当前角色吗？', type: 'warning'}).then((close) => {
                        dictionaryUpdateValid({id: row.dictionaryId, valid: true}).then(()=>{
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                }},
            {icon: 'jinyong', name: '禁用', formatter:(row)=> row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定禁用当前角色吗？', type: 'warning'}).then((close) => {
                        dictionaryUpdateValid({id: row.dictionaryId, valid: false}).then(()=>{
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                }}
        ] },
    headBtns: [
        {icon: 'add', name: '新增', click: (row, column, index)=> {
                title = '添加字典'
                drawerRef.setFormData(mainData.formData)
            }},
    ],
    lists: [
        { key: 'name', label: '类型名称', col: 12 },
        { key: 'code', label: '类型编码', col: 12 },
    ],
    
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj) => {
    data = obj
    mainData.formData = {
        "dictionaryTypeCode": obj.code,
        "dictionaryTypeId": obj.dictionaryTypeId,
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25
    }
    // mainData.formData.dictionaryTypeCode = obj
    drawerFlag = true
}

let eimts = defineEmits(['getTable'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        addOrUpdate(form)
            .then(() => {
                loading = false
                let str = title=='添加字典类型'?'新增成功！':'修改成功！'
                ElMessage.success(str)
                drawerFlag = false
                eimts('getTable')
            })
            .catch(() => {
                loading = false
            })
    })
}

const getTable = ()=>{
    contentMainRef.getTable()
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
