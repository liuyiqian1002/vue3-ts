<template>
  <el-form-item :label="item.label" :prop="item.key">
    <div class="form_date1 tw w">
      <div class="form_date1_content">
        <el-popover trigger="click" :width="400" :disabled="item.disabled" ref="popoverRef" tabindex="1" @hide="hidePopover">
          <template #reference>
            <div class="date1_form_input w">
              <div class="aa w">
                <div :class="`${item.disabled ? 'disabled' : ''}`" class="date1_form_input_txt pointer w b_radius border-box pl10 h32 el-input__wrapper border ellipsis">
                  {{ `${currentItem.label ? currentYear + '-' + currentItem.label : ''}` }}
                  <el-icon v-show="txt" class="date1_form_input_txt-icon positionCr" style="right: 4px" @click.stop="clear">
                    <CircleClose />
                  </el-icon>
                </div>
              </div>
            </div>
          </template>
          <template #default>
            <div class="head-wrapper">
              <div class="left" @click="(e) => yearChange(1)">
                <el-icon class="el-input__icon">
                  <DArrowLeft />
                </el-icon>
              </div>
              <div class="center">{{ currentYear }}年</div>
              <div class="right" @click="(e) => yearChange(2)">
                <el-icon class="el-input__icon">
                  <DArrowRight />
                </el-icon>
              </div>
            </div>
            <div class="content-wrapper" v-if="contentList && contentList.length > 0">
              <div class="item" :class="{ active: currentItem.value === item.value }" v-for="(item, index) in contentList" @click="onItemClick(item)" :key="index">
                {{ item.label }}
              </div>
            </div>
          </template>
        </el-popover>
      </div>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
interface FormData {}

interface Item {
  props: object
  key: string
  label: string
  disabled: boolean
  type: string
  data: {
    type?: string
  }
  change: Function
}

let proxy = getCurrentInstance()?.proxy
const { formData, item } = defineProps<{
  formData: FormData
  item: Item
}>()

interface Option {
  label: string
  value: number
}

const halfYears: Option[] = [
  { label: '上半年', value: 1 },
  { label: '下半年', value: 2 },
]
const quarters: Option[] = [
  { label: '第一季度', value: 1 },
  { label: '第二季度', value: 2 },
  { label: '第三季度', value: 3 },
  { label: '第四季度', value: 4 },
]

const listMap = {
  halfyear: halfYears,
  quarter: quarters,
  season: quarters,
}
const init = () => {
  contentList = listMap[item.data.type]
  // if (item.data.type === 'halfyear') {
  //     currentItem = contentList[Math.ceil(currentMonth / 6) - 1]
  // } else {
  //     currentItem = contentList[Math.ceil(currentMonth / 3) - 1]
  // }
}
const now = new Date()
let contentList = $ref([])
let currentYear = $ref(now.getFullYear())
let currentMonth = $ref(now.getMonth() + 1)
let currentItem = $ref<Option | {}>({})
// 初始化计算当前项
init()
let popoverRef = $ref(null)

item.props = { ...{ disabled: 'disabled' }, ...item.props }

watch(
  () => item,
  (val) => {
    console.log(val, 'item watch')
    init()
    setClear()
  },
)

const yearChange = (type: number) => {
  if (type === 1) {
    // sub
    currentYear -= 1
  } else {
    // add
    currentYear += 1
  }
  if (item.change) {
    item.change(getResult())
  }
}

const onItemClick = (obj: Option) => {
  console.log(obj, 'obj')
  currentItem = obj
  const result = getResult()
  //将值复制给formData
  formData[item.key] = result
  if (item.change) {
    item.change(result)
  }
  // emits('tapClick', 'reset', obj)
}

const getResult = () => {
  return `${currentYear}-${(currentItem as Option).value}`
}

let emits = defineEmits(['tapClick'])

// 关闭事件
const hidePopover = () => {
  // emits('tapClick', 'reset', item)
}

const clear = () => {
  currentItem = {}
  formData[item.key] = ''
}

// 设置clear函数给外部使用
const setClear = () => {
  if (!item.clear) {
    item.clear = clear
  }
}
setClear()

//
const reset = () => {
  currentItem = {}
  formData[item.key] = ''
}

defineExpose({ reset })

// const emit = defineEmits(['update:name'])
</script>

<style scoped lang="scss">
.form_date1 {
  height: 32px;

  .form_date1_content {
    width: calc(100% - 80px);
  }

  .date1_form_input_txt {
    display: flex;
    justify-content: flex-start;
  }

  .date1_form_input_txt {
    box-shadow: none;
    justify-content: inherit;
    color: var(--el-menu-text-color);

    .date1_form_input_txt-icon {
      display: none;
      color: var(--el-text-color-placeholder);
    }

    &:hover {
      .date1_form_input_txt-icon {
        display: block;
      }
    }
  }

  :deep(.el-input.is-disabled) {
    .date1_form_input_txt {
      color: var(--el-disabled-text-color);
    }
  }
}

.head-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}

.content-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;

  .item {
    padding: 10px;
    cursor: pointer;
  }

  .item.active {
    color: blue;
  }
}
</style>
