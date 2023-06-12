<template>
  <div id="tw_table">
    <!-- 表格头部 操作按钮 -->
    <slot name="tableHeader"></slot>
    <div class="table-header pb15 tw_clr" v-if="isTableHeader">
      <div class="table-l">
        <span v-show="multipleSelection.length > 0" class="num tw_cl" style="color: var(--el-text-color-primary)">
          <el-icon class="mr5 ml15" :size="14" color="var(--el-color-primary)">
            <WarningFilled />
          </el-icon>
          已选择
          <span class="check-num" style="color: var(--el-color-primary)">{{ multipleSelection.length }}</span>
          条记录
        </span>
        <slot name="table-l"></slot>
      </div>
      <div class="table-c">
        <slot name="table-c"></slot>
      </div>
      <div class="table-r tw_cl">
        <slot name="table-r"></slot>

        <div class="tw_cl" v-if="showHeadBtns">
          <div class="head_btn" v-show="headBtns[i] && (headBtns[i].formatter ? headBtns[i].formatter(headBtns[i], i) : true)" v-for="(item, i) in 2" :key="i">
            <el-button :type="i == 0 ? 'primary' : ''" v-if="headBtns[i]" @click="headBtns[i]?.click(headBtns[i])">
              <svg-icon v-if="headBtns[i].icon" :color="i ? '' : '#fff'" :icon-class="headBtns[i]?.icon"></svg-icon>
              {{ headBtns[i]?.name }}
            </el-button>
          </div>

          <el-dropdown class="ml15" v-if="headBtns.length > 2" placement="bottom">
            <el-button icon="More">更多</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <template v-for="(item, index) in headBtns" :key="index">
                  <el-dropdown-item v-if="index > 1 && (item.formatter ? item.formatter(item, index) : true)" @click="item?.click(item)">
                    <svg-icon :icon-class="item?.icon"></svg-icon>
                    {{ item?.name }}
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!--        :header-cell-style="{background: '#F5F7FA'}"-->
    <el-table
      ref="table"
      :id="id"
      :data="dataList"
      :height="getH"
      :size="size"
      :stripe="stripe"
      :border="border"
      v-loading="loading"
      element-loading-text="加载中..."
      @row-click="rowCheck"
      @select="checkSelect"
      @selection-change="selectionChange"
      center
      class="w"
    >
      <!-- 多选 -->
      <el-table-column current-row-key="selection" align="center" :fixed="checkFixed" header-align="center" type="selection" v-if="isCheck" width="50" />
      <!-- 编号 -->
      <el-table-column :index="indexMethod" align="center" :fixed="indexFixed" header-align="center" label="编号" type="index" v-if="showIndex" width="65" />

      <template v-for="(item, index) in columns" :key="index">
        <template v-if="item.formatter">
          <el-table-column
            resizable
            show-overflow-tooltip
            :type="item.type"
            :label="item.label"
            :sortable="item.sortable"
            :width="item.width"
            :fixed="item.fixed"
            :render-header="item.renderHeader"
            :formatter="item.formatter"
          ></el-table-column>
        </template>
        <el-table-column
          v-else
          resizable
          show-overflow-tooltip
          :prop="item.prop"
          :type="item.type"
          :label="item.label"
          :sortable="item.sortable"
          :width="item.width"
          :fixed="item.fixed"
        >
          <!-- 自定义 header (使用组件渲染 tsx 语法) -->
          <template #header v-if="item.renderHeader">
            <component :is="item.renderHeader" :row="item"></component>
          </template>

          <!-- 自定义配置每一列 slot（使用作用域插槽） -->
          <template #default="scope">
            <slot :name="item.prop" :row="scope.row">
              <template v-if="scope.row?.[item.prop] || scope.row?.[item.prop] == 0">
                <template v-if="!!item.color">
                  <span :style="`color: ${item.color}`">
                    {{ !!item.filter ? $store.getters.oEnumerate?.[item.filter]?.[scope.row[item.prop]] : scope.row?.[item.prop] }}
                  </span>
                </template>
                <template v-else>
                  {{ !!item.filter ? $store.getters.oEnumerate?.[item.filter]?.[scope.row[item.prop]] : scope.row?.[item.prop] }}
                </template>
              </template>
              <template v-else>-</template>
            </slot>
          </template>
        </el-table-column>
      </template>
      <template v-if="tableBtns.prop">
        <el-table-column
          resizable
          show-overflow-tooltip
          :prop="tableBtns.prop"
          :type="tableBtns.type"
          :label="tableBtns.label"
          :width="tableBtns.width"
          :fixed="tableBtns.fixed"
          header-align="center"
        >
          <!-- 自定义 header (使用组件渲染 tsx 语法) -->
          <template #header v-if="tableBtns.renderHeader">
            <component :is="tableBtns.renderHeader" :row="tableBtns"></component>
          </template>

          <!-- 自定义配置每一列 slot（使用作用域插槽） -->
          <template #default="{ row, column, $index }">
            <p class="tw_cl" style="flex-wrap: nowrap">
              <template v-for="(item, i) in tableBtns.btns">
                <template v-if="item.formatter">
                  <el-tooltip v-if="item.formatter(row, column, $index)" :key="i" effect="dark" placement="top-start">
                    <template #content>{{ item.name }}</template>
                    <el-icon v-if="item.type === 'icon'" @click="item.click(row, column, $index)" size="20px" class="pointer mr10">
                      <svg-icon :icon-class="item.icon" :color="item.color"></svg-icon>
                    </el-icon>
                    <el-button v-else @click="item.click(row, column, $index)" :style="{ color: item.color }">{{ item.name }}</el-button>
                  </el-tooltip>
                </template>
                <el-tooltip v-else :key="i" effect="dark" placement="top-start">
                  <template #content>{{ item.name }}</template>
                  <el-icon v-if="item.type === 'icon'" @click="item.click(row, column, $index)" size="20px" class="pointer mr10">
                    <svg-icon :icon-class="item.icon" :color="item.color"></svg-icon>
                  </el-icon>
                  <el-button v-else @click="item.click(row, column, $index)" :style="{ color: item.color }">{{ item.name }}</el-button>
                </el-tooltip>
              </template>
            </p>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!--  分页  -->
    <tw-pagination
      v-if="showPagination"
      v-model:currentPage="tableParams.pageNumber"
      v-model:pageSize="tableParams.pageSize"
      :total="total"
      :small="small"
      :pageSizesArr="pageSizesArr"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></tw-pagination>
  </div>
</template>

<script setup lang="ts">
import { all, commonApi, options } from '../../api/common'
import { onActivated } from 'vue'
import { HeadBtnsItem } from './interface/index'
// @ts-ignore
const { proxy } = getCurrentInstance()
// @ts-ignore
const {
  url,
  id,
  method,
  columns,
  lists,
  tableParams,
  showPagination,
  botHeight,
  indexFixed,
  isCheck,
  checkFixed,
  showIndex,
  tableIndex,
  size,
  stripe,
  border,
  pageSizesArr,
  tableBtns,
  small,
  headBtns,
  isLoadStatus,
  isTableHeader,
} = defineProps({
  url: { type: String, default: '' }, // 表格请求地址
  id: { type: String, default: '' }, // 表格id属性，动态计算id
  method: { type: String, default: 'post' }, // 表格请求类型
  columns: { type: Array, default: () => [] }, // 表格列渲染数据
  lists: { type: Array, default: () => [] }, // 表格渲染数据
  tableParams: {
    type: Object,
    default: () => {
      return { pageNumber: 1, pageSize: 25 }
    },
  }, // 表格请求数据
  showPagination: { type: Boolean, default: true }, // 分页显示开关
  botHeight: { type: Number, default: 50 }, // 是分页栏加上边距加底部空白位置高度
  indexFixed: { type: Boolean, default: false }, // 索引左侧定位开关
  isCheck: { type: Boolean, default: false }, // checkbox显示开关
  checkFixed: { type: String, default: 'left' }, // checkbox左侧定位开关
  showIndex: { type: Boolean, default: false }, // 索引显示开关
  tableIndex: { type: Number, default: 0 }, // 单页面多表格的使用场景，用于动态计算表格高度
  size: { type: String, default: 'large' }, // table 大小配置
  stripe: { type: Boolean, default: true }, // 斑马纹显示开关
  border: { type: Boolean, default: false }, // 边框线显示开关
  pageSizesArr: { type: Array, default: () => [25, 50, 100] }, // 分页页码
  tableBtns: { type: Object, default: (row) => row || {} }, // 单例按钮渲染数据
  small: { type: Boolean, default: false }, // 每页显示条数
  isLoadStatus: { type: Boolean, default: false }, // 默认首次不加载table数据
  headBtns: { type: Array<HeadBtnsItem>, default: () => [] }, // 顶部操作按钮
  isTableHeader: { type: Boolean, default: true }, // 默认显示表格顶部操作栏
})

let store = useStore()
// @ts-ignore
let table = $ref(null)
// @ts-ignore
let getH = $ref(600)
let dataList = $ref([])
let loading = $ref(false)
let oEnumerate = $ref({})
let total = $ref(0)
let multipleSelection = $ref([])
let showHeadBtns = $ref(true)

onActivated(() => {
  showHeadBtns = false
  nextTick(() => {
    showHeadBtns = true
  })
})

let eimts = defineEmits(['currentChange', 'sizeChange', 'checkSelect', 'selectionChange', 'checkSelect', 'rowCheck', 'tableCallback'])

// 请求表格数据
const getTable = () => {
  if (!loading) loading = true
  commonApi(url, tableParams, method)
    .then((res) => {
      console.log(res, 'res getTable')
      loading = false
      total = res.total
      if (res.rows) {
        dataList = res.rows
      } else {
        if (res && res instanceof Array) {
          dataList = res
        } else {
          dataList = [res]
          console.error(res, 'is not Array')
        }
      }
      eimts('tableCallback', dataList)
      setTableDataHeight()
      scrollTop()
    })
    .catch(() => {
      loading = false
    })
}

const scrollTop = () => {
  nextTick(() => {
    document.querySelector('.el-table__body').scrollIntoView()
  })
}

if (proxy.notNull(url)) {
  // if(JSON.stringify(store.getters.oEnumerate) === "{}"){
  //     loading = true
  //     getTable()
  // }else {
  //     loading = true
  //     getTable()
  // }
  if (!isLoadStatus) {
    loading = true
    getTable()
  }
} else {
  // 如果是默认传递tabel数据，必须经过数据监听并更新数据
  watch(
    () => lists,
    (newValue, oldValue) => {
      dataList = newValue
    },
    { immediate: true },
  )
}

// 总条数
const handleSizeChange = (val) => {
  tableParams.pageSize = val
  tableParams.pageNumber = 1
  if (proxy.notNull(url)) {
    getTable()
  }
  eimts('handleSizeChange', val)
}

// 当前跳转页
const handleCurrentChange = (val) => {
  tableParams.pageNumber = val
  if (proxy.notNull(url)) {
    getTable()
  }
  eimts('handleCurrentChange', val)
}

// @ts-ignore
const setTableDataHeight = proxy.$_.debounce(() => {
  let layout = document.getElementById('app')
  if (layout && table) {
    nextTick(() => {
      let dom = document.getElementsByClassName('el-table')[tableIndex || 0]
      if (id) {
        dom = document.getElementById(id)
      }
      if (!dom) {
        setTimeout(() => {
          setTableDataHeight()
        }, 1000)
        return
      }
      let allXy = getOffsetLeft(dom)
      let layoutH = layout.clientHeight || window.innerHeight
      // if (!showPagination || tableParams.pageSize > total) (layoutH = layoutH + 52)  // 52 是分页栏加上边距高度
      if (!showPagination) layoutH = layoutH + 52 // 52 是分页栏加上边距高度
      let height = layoutH - allXy.top - botHeight // 107 是分页栏加上边距加底部空白位置高度
      if (height < 120) {
        getH = 120
      } else {
        getH = height // 测试(UI)所提出分页高度需保持一致
      }
    })
  }
})

// 表格的check选择
const selectionChange = (row) => {
  let status = row.length > multipleSelection.length ? true : false
  if (row.length === dataList.length || (multipleSelection.length != dataList.length && row.length === 0)) {
    eimts('checkSelect', { arr: row, row, status })
  }
  multipleSelection = row
  eimts('selectionChange', row, status)
}
// 当用户手动勾选数据行的 Checkbox 时触发的事件
const checkSelect = (arr, row) => {
  // item为空数组就是反选
  if (isCheck) {
    // if (radio) {
    //     multipleSelection = row
    //     clearSelection()
    //     $refs.table.toggleRowSelection(row)
    //     eimts('checkSelect', row)
    // }
    let status = arr.length > multipleSelection.length ? true : false
    multipleSelection = arr
    eimts('checkSelect', { arr, row, status })
  } else {
    ElMessage.warning('请把选择框开关打开')
  }
}
// 设置表格行数据选择
const toggleRowSelection = (rows, status) => {
  if (isCheck) {
    let lists = lists
    rows.forEach((row) => {
      for (let i = 0; i < dataList.length; i++) {
        if (lists[i][status] == row[status]) {
          table.toggleRowSelection(lists[i])
        }
      }
    })
  } else {
    ElMessage.warning('请打开checkbox相关配置')
  }
}
// 获取table全部list的checkbox
const getAllCheck = () => {
  return table.getSelectionRows()
}
// 设置table全部list的checkbox为true
const setAllCheck = () => {
  table.toggleAllSelection()
}
// 清空用户的选择
const clearSelection = () => {
  table.clearSelection()
}
// 点击当前行
const rowCheck = (item) => {
  // table.toggleRowSelection(item)
  eimts('rowCheck', item)
}

const setTableLists = (lists) => {
  dataList = lists
}

const setTableTotal = (num) => {
  total = num
}

// 递归计算上，左边距值
const getOffsetLeft = (obj) => {
  let tmp = obj.offsetTop
  let lmp = obj.offsetLeft
  let node = obj.offsetParent
  while (node != null) {
    tmp += node.offsetTop
    lmp += node.offsetLeft
    node = node.offsetParent
  }
  return { top: tmp, left: lmp }
}
// 获取当前序列号
const indexMethod = (index) => {
  if (showPagination) {
    return (tableParams.pageNumber - 1) * tableParams.pageSize + index + 1
  } else {
    return index + 1
  }
}

// @ts-ignore
onMounted(() => {
  setTableDataHeight()
  window.addEventListener('resize', setTableDataHeight)
})

// @ts-ignore
onUnmounted(() => {
  window.removeEventListener('resize', setTableDataHeight, true)
})

defineExpose({
  dataList,
  setTableDataHeight,
  selectionChange,
  checkSelect,
  toggleRowSelection,
  getTable,
  getAllCheck,
  setAllCheck,
  clearSelection,
  rowCheck,
  setTableLists,
  setTableTotal,
})
</script>

<style scoped lang="scss">
#tw_table {
  padding: 20px 20px 0;

  &:focus {
    outline: none;
  }

  :deep(.el-table) {
    border-radius: 12px;
  }

  :deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
    border-bottom: none;
  }

  //:deep(.el-table-fixed-column--right):nth-child(3n+1) { background: rgba(0,0,0,0)}
  :deep(.el-table th.el-table__cell) {
    background: var(--tw-table-header);
  }

  :deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
    background: var(--tw-table-cell);
  }

  .head_btn {
    margin-left: 15px;
  }
}
</style>
