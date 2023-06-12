<template>
    <div class="table-box">
        <!--    查询组件    -->
        <!--     @onFormflag="onFormflag" 搜索折叠事件，可触发表格高度重绘    -->
        <tw-form :lists="mainData.lists" :formData="mainData.formData" :labelWidth="mainData.labelWidth" :isFormBnts="mainData.isFormBnts" :extraField="mainData.extraField" @submitForm="seekTable" :foldNumber="mainData.foldNumber || 4" @onFormflag="onFormflag"></tw-form>
        <!--    表格组件    -->
        <AlarmTable ref="mainTable" :id="mainData.id" :url="mainData.tableUrl" :isLoadStatus="mainData.isLoadStatus" :method="mainData.method" :tableParams="mainData.formData" :isCheck="mainData.isCheck" :showIndex="mainData.showIndex" :showPagination="mainData.showPagination" :border="mainData.border" :botHeight="mainData.botHeight || 50" :tableIndex="mainData.tableIndex" :size="mainData.size" :columns="mainData.columns" :tableData="mainData.tableData" :tableBtns="mainData.tableBtns" :headBtns="mainData.headBtns" :tabindex="mainData.tabIndex || 0" @tableCallback="tableCallback" @checkSelect="checkSelect">
            
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
        </AlarmTable>
    </div>
</template>

<script setup lang="tsx">
import AlarmTable from '@/businessComponents/AlarmTable/index.vue'
    const {mainData} = defineProps({
        mainData: Object,
    })
    
    let mainTable = $ref(null)
    

    const onFormflag = ()=>{
        setTimeout(()=>{
            mainTable.setTableDataHeight()
        },100)
    }
    let emits = defineEmits([ 'tableCallback'])

    const tableCallback = (data)=>{
        emits('tableCallback', data)
    }
    
    const checkSelect = (data)=>{
        emits('checkSelect', data)
    }

    const getTable = ()=>{
        mainTable.getTable()
    }

    const seekTable = ()=>{
        mainData.formData.pageNumber = 1
        mainTable.getTable()
        if(mainData.onSearch && mainData.onSearch instanceof Function) {
            mainData.onSearch(mainData.formData)
        }
    }
    
    const getAllCheck = ()=>{
        return mainTable.getAllCheck()
    }

    const getTableLists = ()=>{
        return mainTable.dataList
    }

    const setTableLists = (lists)=>{
         mainTable.setTableLists(lists)
    }
    
    defineExpose({getTable, getAllCheck, getTableLists, setTableLists})

    
</script>

<style scoped lang="scss">

</style>
