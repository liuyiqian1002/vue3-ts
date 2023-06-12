<template>
    <div class="list-detail">
        <el-dialog
            v-model="drawerFlag"
            :title="title || '主动安全风险看板设置'"
            center
            width="40%"
            v-loading="loading"
            @close="onClose"
            element-loading-text="加载中..."
        >
            <div class="homeTitle-bot relative w">
                <el-image class="bottom-img" :src="light"></el-image>
            </div>
            <div class="tab-wrapper tw_clr">
                <div
                    class="tab-item pl20 pr20 pointer"
                    v-for="(item, index) in tabList"
                    :key="index"
                    :class="{ white: item.value === currentItem.value }"
                    @click="() => onItemClick(item)"
                >
                    {{ item.label }}
                </div>
            </div>
            <div class="provinceScreen">
                <el-table
                    ref="multipleTableRef"
                    v-loading="loading"
                    element-loading-background="rgba(255, 255, 255, .1)"
                    element-loading-text="加载中，请稍后..."
                    element-loading-spinner="el-icon-loading"
                    row-key="alarmTypeCode"
                    @row-click="rowCheck"
                    @select="checkSelect"
                    @select-all="checkSelect"
                    :data="tableData"
                    size="mini"
                    height="535"
                    stripe
                    :header-cell-style="{
                        background: 'rgba(6,85,105,0.3)',
                        color: 'rgba(42, 212, 255, 1)',
                        textAlign: 'center',
                        fontSize: '12px',
                        padding: '4px',
                    }"
                    style="width: 100%"
                >
                    <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="100"
                    />
                    <el-table-column type="index" label="序号" width="100" />
                    <el-table-column
                        prop="alarmTypeName"
                        :label="`${currentItem.label}${currentItem.eLabel}项目名称`"
                    />
                </el-table>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button class="btn-cancel" @click="onClose">
                        取消
                    </el-button>
                    <el-button
                        class="btn-confirm"
                        type="primary"
                        @click="onComfirm"
                    >
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
// import { reactive } from 'vue'
import { getPanelSettings, updatePanelSettings } from '@/api/largeScreen'
import light from '@/assets/images/dataPanel/light.png'
import { AxiosResponse } from 'axios'
import { number } from 'echarts'
const { title } = defineProps({
    title: { type: String, default: '' },
})
const emits = defineEmits(['updatePanelData'])
interface TabItem {
    label: string
    eLabel: string
    value: Number
    key: string
}
// tab-list 数据
const tabList: TabItem[] = [
    { label: '驾驶员状态监测', eLabel: '(DSM)', value: 1, key: 'dsmDtos' },
    { label: '智能驾驶辅助报警', eLabel: '(ADAS)', value: 2, key: 'adasDtos' },
    { label: '营运类报警', eLabel: '', value: 3, key: 'alarmDtos' },
]
let currentItem = $ref(tabList[0])

// 表格实例
const multipleTableRef = $ref(null)
let multipleSelection = $ref([])
// tab item click event
const onItemClick = (item: TabItem) => {
    console.log(item, 'item')
    multipleTableRef.clearSelection()
    currentItem = item
    tableData = configData[currentItem.key]
}

const checkSelect = (items) => {
    const selectionCode = getCodes(items, true)
    console.log(items, selectionCode, tableData, 'checkSelect')
    console.log(multipleTableRef.getSelectionRows(), 'getSelectionRows')
    configData[currentItem.key] = configData[currentItem.key].map((it) => {
        if (!selectionCode.includes(it.alarmTypeCode)) {
            // console.log(it.alarmTypeName, it.alarmTypeCode, 'unchecked')
            it.checked = false
        } else {
            it.checked = true
        }
        return it
    })
    // console.log(configData[currentItem.key], 'configData[currentItem.key]')
}
const rowCheck = (item) => {
    // console.log(item, 'rowCheck')
}

// 表格选择事件
const handleSelectionChange = (val) => {
    // console.log(val, 'handleSelectionChange')
    // val = val.map(it => {
    //     it.checked = true
    //     return it
    // })
}

let loading = $ref(false)
let configData: Res = $ref({ list: [{}]})
let drawerFlag = $ref(false)

const updateChecked = () => {
    console.log(tableData, 'tableData updateChecked')
    multipleTableRef.clearSelection()
    tableData.forEach((it) => {
        // console.log(it.alarmTypeCode, it.checked, 'checked')
        it.checked && multipleTableRef.toggleRowSelection(it, true)
    })
}

interface TableDataItem {
    alarmTypeCode: number
    alarmTypeName: string
    checked: boolean
}

let tableData: Array<TableDataItem> = $ref([])

watch(
    () => tableData,
    () => {
        updateChecked()
        console.log('table watch')
    },
)

// 定义返回值类型
type Res = {
    list: Array<object>
    configId?: number
}
const panelSettingData = () => {
    drawerFlag = true
    loading = true
    const param = {}
    getPanelSettings(param)
        .then((res: Res & AxiosResponse) => {
            configData = res
            tableData = configData[currentItem.key]
            // updateChecked()
            loading = false
        })
        .catch(() => {
            loading = false
        })
}

interface Param {
    configId: number
    adasAlarmContent: Array<number>
    alarmContent: Array<number>
    dsmAlarmContent: Array<number>
}

const updatePanelSettingData = () => {
    loading = true
    let param: Param = {
        configId: configData.configId,
        adasAlarmContent: getCodes(configData['adasDtos']),
        alarmContent: getCodes(configData['alarmDtos']),
        dsmAlarmContent: getCodes(configData['dsmDtos']),
    }
    updatePanelSettings(param)
        .then((res) => {
            loading = false
            drawerFlag = false
            ElMessage.success('操作成功')
            // TODO 重新请求看板数据
            emits('updatePanelData')
        })
        .catch(() => {
            loading = false
            drawerFlag = false
            ElMessage.success('操作失败')
        })
}

// TODO loadsh 函数代替
/**
 *
 * @param list
 * @param all 是否获取全部code
 */
const getCodes = (list: TableDataItem[], all: boolean = false) => {
    let result: number[] = []
    list.forEach((it: TableDataItem) => {
        if (all) {
            return result.push(it.alarmTypeCode)
        } else {
            return it.checked && result.push(it.alarmTypeCode)
        }
    })
    return result
}

const onComfirm = () => {
    console.log('onComfirm')
    updatePanelSettingData()
}

const onClose = () => {
    drawerFlag = false
    currentItem = tabList[0]
}

defineExpose({ panelSettingData })
</script>
<style scoped lang="scss">
.list-detail {
    .tab-wrapper {
        height: 30px;
        background: rgba(31, 158, 204, 0.2);
        margin-bottom: 10px;
        .tab-item {
            margin: 0 5px;
        }
    }
    :deep(.el-overlay-dialog) {
        overflow: hidden;
    }
    :deep(.el-dialog) {
        border: 1px solid rgba(108, 128, 151, 0.5);
        background: rgba(10, 16, 28, 0.4);
        backdrop-filter: blur(3px);
        .el-dialog__title {
            color: rgba(226, 235, 241, 1);
            font-size: 16px;
            font-family: 'douyuZt';
            font-style: oblique;
        }
        .el-dialog__header {
            padding-bottom: 0;
        }
        .el-dialog__body {
            padding-top: 0;
        }
        .homeTitle-bot {
            text-align: center;
            height: 10px;
            margin-top: 10px;
            margin-bottom: 20px;
            background: url('@/assets/images/dataPanel/split4.png') no-repeat;
            background-size: 100% 3px; //background: rgba(31,158,204,0.2);
            .homeTitle_block {
                height: 2px;
            }
            .bottom-img {
                margin-top: -12px;
            }
        }
        .provinceScreen {
            // 滚动条样式
            .el-scrollbar__bar.is-vertical > div {
                width: 4px;
                border-radius: 4px;
                background: rgba(39, 202, 255, 0.8);
            }
            .el-table {
                background: rgba(71, 138, 138, 0);
            }
            .el-table tr {
                background: rgba(10, 16, 28, 0.4);
                background-color: transparent !important;
                border: none;
            }
            /**改变表格内行线颜色*/
            .el-table td,
            .el-table th.is-leaf {
                border-bottom: 1px solid #3c4c67 !important;
            }
            .el-table--border .el-table__inner-wrapper::after,
            .el-table--border::after,
            .el-table--border::before,
            .el-table__inner-wrapper::before {
                background: rgba(108, 128, 151, 0.5);
            }
            .el-table td.el-table__cell div {
                color: rgba(208, 222, 238, 1);
            }
            .el-table--enable-row-transition .el-table__body td,
            .el-table .cell {
                font-size: 12px;
                text-align: center;
                background-color: transparent !important;
            }
        }
        .dialog-footer {
            text-align: right;
            .btn-cancel {
                background: rgba(208, 222, 238, 0.2);
                border: 1px solid rgba(208, 222, 238, 1);
                color: #d0deee;
            }
            .btn-confirm {
                border: 1px solid rgba(39, 202, 255, 1);
                background: rgba(39, 202, 255, 0.1);
                color: #27caff;
            }
        }
    }
}
</style>
