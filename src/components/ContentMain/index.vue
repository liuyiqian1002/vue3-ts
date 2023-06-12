<template>
    <div class="table-box">
        <!--    查询组件    -->
        <!--     @onFormflag="onFormflag" 搜索折叠事件，可触发表格高度重绘    -->
        <tw-form v-if="mainData.lists" :lists="mainData.lists || []" :formData="mainData.formData"
            :labelWidth="mainData.labelWidth" :isFormBnts="mainData.isFormBnts" :extraField="mainData.extraField"
            @submitForm="seekTable" :beforeChange="mainData.beforeChange" :foldNumber="mainData.foldNumber || 4" @onFormflag="onFormflag" @resetForm="resetForm"></tw-form>
        <!--    表格组件    -->
        <TwTable ref="mainTable" :id="mainData.id" :url="mainData.tableUrl" :method="mainData.method" :tableParams="mainData.formData"
            :isCheck="mainData.isCheck" :showIndex="mainData.showIndex" :showPagination="mainData.showPagination"
            :border="mainData.border" :botHeight="mainData.botHeight || 50" :tableIndex="mainData.tableIndex"
            :size="mainData.size" :columns="mainData.columns" :tableData="mainData.tableData"
            :tableBtns="mainData.tableBtns" :headBtns="mainData.headBtns" :tabindex="mainData.tabIndex || 0"
            :highlightCurrentRow="mainData.highlightCurrentRow" :rowClassName="mainData.rowClassName"  :isLoadStatus="mainData.isLoadStatus"
            @tableCallback="tableCallback" @checkSelect="checkSelect" @rowCheck="rowCheck" @tableCurrentChange="tableCurrentChange">

            <template #tableHeader="scope">
                <slot name="tableHeader"></slot>
            </template>
            <template #table-l="scope">
                <slot name="table-l"></slot>
            </template>
            <template #table-c="scope">
                <slot name="table-c"></slot>
            </template>
            <template #table-r="scope">
                <slot name="table-r"></slot>
            </template>
        </TwTable>
    </div>
</template>

<script setup lang="tsx">

interface IMainData<T> {
    befroeSubmit: Function // 提交之前的钩子函数,如果需要阻断提交返回false即可
    formData: object
    showPagination: boolean
}

const { mainData } = defineProps({
    mainData: Object,
})

let mainTable = $ref(null)


const onFormflag = () => {
    setTimeout(() => {
        mainTable.setTableDataHeight()
    }, 100)
}
let emits = defineEmits(['tableCallback', 'checkSelect', 'rowCheck', 'tableCurrentChange', 'resetForm'])

const tableCallback = (data) => {
    emits('tableCallback', data)
}

// 重置form
const resetForm = () => {
    emits('resetForm')
}
const checkSelect = (data) => {
    emits('checkSelect', data)
}

const rowCheck = (data) => {
    emits('rowCheck', data)
}

const tableCurrentChange = (data) => {
    emits('tableCurrentChange', data)
}

const setCurrentRow = (data?: any) => {
    mainTable.setCurrentRow(data)
}

const getTable = () => {
    mainTable.getTable()
}

const seekTable = () => {
    mainData.formData.pageNumber = 1
    mainTable.getTable()
}

const getAllCheck = () => {
    return mainTable.getAllCheck()
}

const getTableLists = () => {
    return mainTable.dataList
}

const setTableLists = (lists) => {
    mainTable.setTableLists(lists)
}

defineExpose({ getTable, seekTable, getAllCheck, getTableLists, setTableLists, setCurrentRow })


</script>

<style scoped lang="scss"></style>
