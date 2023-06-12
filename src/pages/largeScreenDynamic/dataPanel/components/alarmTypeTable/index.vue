<template>
    <div class="alarm-type-table white">
        <slot></slot>
        <el-table
            :data="lists"
            size="mini"
            height="560"
            stripe
            :header-cell-style="{
                background: 'rgba(6,85,105,0.4)',
                color: 'rgba(42, 212, 255, 1)',
                textAlign: 'center',
                fontSize: '12px',
                padding: '4px',
            }"
            style="width: 100%"
            :default-sort="{ prop: 'count', order: 'descending' }"
            row-style="test"
        >
            <el-table-column prop="subTypeCodeName" label="报警类型名称" />
            <el-table-column prop="count" label="类型报警次数" />
            <el-table-column prop="count" label="报警总次数">
                <template #default="{ row }">{{ totalCount }}</template>
            </el-table-column>
            <el-table-column
                prop="rate"
                label="报警占比"
                width="180"
                sortable
                sort-by="count"
            >
                <template #default="{ row }">{{ row.rate }}</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
// 图片
import progress from '@/assets/images/dataPanel/progress.png'
interface List {
    (): Array<object>
}

let { lists, totalCount } = defineProps({
    lists: { type: Array, default: () => [] },
    totalCount: { type: Number, default: 100 },
})
console.log(lists, totalCount, 'alarm-type-table lists')
// watch(() => totalCount, (val) => {
//     console.log(val, 'totalCount watch in table')
// })
let listClone = JSON.parse(JSON.stringify(lists))
listClone.sort((a, b) => (a.count > b.count ? 1 : 0))
</script>
<style scoped lang="scss">
.alarm-type-table {
    // width: 320px;
    height: 600px;
    :deep(.el-table) {
        margin-top: 30px;
        background: rgba(71, 138, 138, 0);
        tr {
            background: rgba(10, 16, 28, 0.4);
            background-color: transparent !important;
            border-bottom-color: #3c4c67 !important;
            // border: none;
        }
        /**改变表格内行线颜色*/
        td,
        th.is-leaf {
            border-bottom: 1px solid #3c4c67 !important;
            background: rgba(6, 85, 105, 1);
        }
        .el-table--border .el-table__inner-wrapper::after,
        .el-table--border::after,
        .el-table--border::before,
        .el-table__inner-wrapper::before {
            background: rgba(108, 128, 151, 0.5);
        }
        td.el-table__cell {
            color: rgba(208, 222, 238, 1);
            background: none !important;
            text-align: center;
        }
        .el-table--enable-row-transition .el-table__body td,
        .el-table .cell {
            font-size: 12px;
            text-align: center;
            background-color: transparent !important;
        }
    }
}
</style>
