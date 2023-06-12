<template>
  <div class="m-pagination tw_cr">
<!--    <el-pagination-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--      :current-page="currentPage"-->
<!--      :page-sizes="pageSizesArr"-->
<!--      :page-size="pageSize"-->
<!--      layout="total, slot, prev, pager, next, ->, sizes, jumper"-->
<!--      :total="totalData"-->
<!--    >-->
<!--      <span class="anthor">-->
<!--        第{{ page._currentPage }}/{{-->
<!--        Math.ceil(totalData / page._pageSize)-->
<!--        }}页-->
<!--      </span>-->
<!--    </el-pagination>-->
<!--      :page-count="total"-->
      <el-pagination
          v-model:currentPage="page"
          v-model:page-size="currentPageSize"
          :page-sizes="pageSizesArr"
          :small="small"
          :disabled="disabled"
          layout=" total, prev, pager, next, sizes, jumper"
          :total="total"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
  </div>
</template>

<script lang="ts" setup>
let { currentPage, pageSize, total, disabled, pageSizesArr, small } = defineProps({
    currentPage: {type: Number, default: 1,},   // 当前页
    pageSize: {type: Number, default: 10,},     // 每页显示条数
    total: {type: Number, default: 0,},     // 总页数
    small: {type: Boolean, default: false,},     // 每页显示条数
    disabled: {type: Boolean, default: false,},     // 每页显示条数
    pageSizesArr: {type: Array, default() {return [25, 50, 100]},}
})

let page = $ref(currentPage)
let currentPageSize = $ref(25)
currentPageSize = pageSize
page = currentPage
watch(() => currentPage, (val) => {
    page = val
})
// 事件注册
let emits = defineEmits(["update:currentPage", "update:pageSize", 'handleSizeChange', 'handleCurrentChange'])

//  每页查看条数变化
const handleSizeChange = (val) => {
    emits("update:pageSize", val);
    emits("handleSizeChange", val);
};
// 当前页码变化
const handleCurrentChange = (val) => {
    emits("update:currentPage", val);
    emits("handleCurrentChange", val);
};

const setPage = (val) => {
    page = val
}

defineExpose({setPage})
</script>

<style lang="scss" scoped>
    .m-pagination {
        padding: 10px 20px;
        :deep(.el-pagination .el-select .el-input) { margin-left: 20px}
    }
</style>
