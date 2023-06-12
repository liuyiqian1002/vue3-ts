<template>
    <div id="car_management">
        <tw-dialog :title="title" width="800px" height="800px" :dialogTop="60"  v-model="dialogFlag">
            <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">
import {removeVehicleUserFocus, saveVehicleUserFocus} from "@/api/dynamicMonitoring/messages";

defineProps({
    title: String,
})
let { proxy} = getCurrentInstance()
let contentMainRef = $ref(null)
let dialogFlag = $ref(false)
let mainData = reactive({
    tableUrl: '/business/vehicleUserFocus/page',
    isCheck: true,
    labelWidth: '80px',
    columns: [
        { prop: 'plateNum', label: '车牌号码' },
        { prop: 'plateColorName', label: '车牌颜色' },
    ],
    lists: [
        {label: '车牌号', key: 'vehicleCode', type:'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1,havePermission: true}, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码', col: 12},
        // {label: '关注状态', key: 'type', type:'select', clearable: false, placeholder: '请选择关注状态', children: [{label: '已关注', value: 1},{label: '未关注', value: 0},], col: 12},
    ],
    botHeight: 280,
    headBtns: [
        {
            icon: 'quxiaoguanzhu',
            name: '批量取消关注',
            click: (row) => {
                if(mainData.formData.type == 0) return ElMessage.warning('请把关注状态先切换到已关注')
                let lists = contentMainRef.getAllCheck()
                let ids = proxy.$_.map(lists, 'vehicleCode')
                let txt = ''
                if(ids.length > 0){
                    txt = `请确定取消关注选中的${ids.length}个车辆！`
                }else {
                    return ElMessage.warning('请选择车辆！')
                }
                // debugger
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    removeVehicleUserFocus({vehicleCodeList: ids}).then((res) => {
                        contentMainRef.getTable()
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
            
        },
        // {
        //     icon: 'guanzhu',
        //     name: '批量关注',
        //     click: (row) => {
        //         if(mainData.formData.type == 1) return ElMessage.warning('请把关注状态先切换到未关注')
        //         let lists = contentMainRef.getAllCheck()
        //         let ids = proxy.$_.map(lists, 'vehicleCode')
        //         let txt = ''
        //         if(ids.length > 0){
        //             txt = `请确定取消关注选中的${ids.length}个车辆！`
        //         }else {
        //             return ElMessage.warning('请选择车辆！')
        //         }
        //         // debugger
        //         proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
        //             saveVehicleUserFocus({vehicleCodeList: ids}).then((res) => {
        //                 contentMainRef.getTable()
        //                 close()
        //             }).catch(() => {
        //                 close()
        //             })
        //         })
        //     },
        // },
    ],
    formData: {
        "beginTime": '',
        "endTime": '',
        "nodeDto": {},
        "vehicleCode": "",
        "orderField": "",
        "registerName": "",
        "vehiclePlateNumber": "",
        type: 1,
        "pageNumber": 1,
        "pageSize": 25,
    },
})

const viewData = () => {
    dialogFlag = true
}

const value = ref([])

const filterMethod = (query, item) => {
    console.log(item);
    return item.initial.includes(query)
}


defineExpose({ viewData, })
</script>

<style scoped lang="scss">
#car_management {
    :deep(.el-transfer-panel) {
        height: 100%;
        .el-transfer-panel__body { height: calc(100% - 41px)}
    }
}
</style>
