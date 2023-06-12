<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="序号" :width="60"></el-table-column>
            <el-table-column v-for="(column, index) in tableColumns" :key="index" :prop="column.prop" :label="column.label" :width="column.width">
              <template #default="scope" v-if="column.slot">
                <!-- <el-input-number v-model="scope.row.penaltyContent"  :maxlength="20" @change="(e) => onValueChange(e, scope.row)" v-if="column.editable === 'input' && scope.row.penaltyType && [10,20,30].includes(scope.row.penaltyType)" width="80%"></el-input-number> -->
                <el-input
                  v-model="scope.row.penaltyContent"
                  :maxlength="getMaxLength(scope.row)"
                  @input="(e) => onValueChange(e, scope.row)"
                  v-if="column.editable === 'input'"
                  width="80%"
                ></el-input>
                <el-select v-model="scope.row.penaltyType" @change="(e) => onTypeChange(e, scope.row)" placeholder="请选择" width="80%" v-else>
                  <el-option v-for="item in column.options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- form表格 -->
        <div class="form-wrapper">
          <div class="form-title">合计:</div>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item v-for="it in penaltyType" :label="it.label" :key="it.value">
              <el-input v-model="it.sum" :placeholder="it.label" />
            </el-form-item>
          </el-form>
          <div class="btn-wrapper">
            <div :span="3"><el-button type="primary" @click="onSubmit">生成罚单</el-button></div>
            <div :span="3"><el-button @click="visible = false">关闭</el-button></div>
          </div>
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { AlarmProcessItem, EventStaticsItem, saveEventDisposal } from '@/api/operation/closedloopmanagement/alarmprocess'

const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<EventStaticsItem>, default: () => [] },
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<AlarmProcessItem>()
let penaltyType = $ref([...proxy.$store.getters.arrEnumerate['penaltyType']])

// 清空统计数据
const initPenaltyType = () => {
  penaltyType.forEach((it) => {
    it.sum = ''
  })
}
const show = (obj: AlarmProcessItem) => {
  console.log(obj)
  visible = true
  row = obj
  initPenaltyType()
}

// 统计字段与类型值的映射,TODO 将类型也指定在这
const keyMap = {
  criticismCount: '10',
  financialPenaltiesAmount: '20',
  suspensionClassHour: '30',
  dismissal: '40',
  joinDiscipline: '50',
  otherPenalties: '60',
}

const tableColumns = [
  {
    label: '报警类别',
    width: 180,
    prop: 'alarmGroupName',
  },
  {
    label: '报警类型',
    prop: 'alarmTypeCodeName',
  },
  {
    label: '报警开始时间',
    prop: 'eventStartTimeStr',
  },
  {
    label: '报警结束时间',
    prop: 'eventEndTimeStr',
  },
  {
    label: '持续时长',
    prop: 'eventPersistSecondsStr',
  },
  {
    label: '是否纠正',
    prop: 'eventStatusName',
  },
  {
    label: '处罚类型',
    prop: 'penaltyTypeName',
    editable: 'select',
    options: [{ label: '请选择', value: 0 }, ...penaltyType],
    value: '',
    slot: true,
  },
  {
    label: '处罚内容',
    prop: 'penaltyContent',
    editable: 'input',
    value: '',
    slot: true,
  },
]

watch(
  () => list,
  (nVal, oVal) => {
    recordChange(nVal)
    staticsAll()
  },
  { deep: true },
)

const onSubmit = () => {
  proxy.MessageBox({ msg: '你确定要生成罚单吗？', type: 'info' }).then((close) => {
    generateTicket()
    close()
  })
  // generateTicket()
}

const testNull = () => {}

const generateTicket = () => {
  // let count = 0
  for (let i = 0; i < list.length; i++) {
    if (list[i].penaltyType && !list[i].penaltyContent) {
      ElMessage.warning(`第${i + 1}条报警内容选择了处罚类型，请输入处罚内容`)
      return
    } else {
      // if (!list[i].penaltyType) {
      //   count++
      // }
    }
  }
  //Note 目前处罚内容不是必填
  // if (list.length === count) {
  //   ElMessage.warning(`没有处罚项`)
  //   return
  // }
  const query = {
    detailDtoList: list,
    eventDisposalDto: {
      criticismCount: sum[keyMap['criticismCount']], //批评教育
      dismissal: sum[keyMap['dismissal']], //辞退开除
      // disposalStatus: , //处置状态
      suspensionClassHour: sum[keyMap['suspensionClassHour']], //停班学习（数字）
      financialPenaltiesAmount: sum[keyMap['financialPenaltiesAmount']], //经济处罚
      joinDiscipline: sum[keyMap['joinDiscipline']], //联合惩戒
      otherPenalties: sum[keyMap['otherPenalties']], //其他
      companyId: row.companyId,
      plateNum: row.plateNum,
      platecolorName: row.plateColorName,
      companyName: row.companyName,
      vehicleCode: row.vehicleCode,
    },
  }
  console.log('onSubmit', query, list)
  saveEventDisposal(query).then((res) => {
    console.log(res, 'save')
    if (res === null) {
      ElMessage.success('保存成功')
      visible = false
    }
  })
}

// 合计
let sum = {}
const staticsAll = () => {
  sum = {}
  list.forEach((it: any) => {
    if (it.penaltyType) {
      if (sum[it.penaltyType]) {
        // 批评教育/次 经济处罚/元 停班学习/课时
        if ([10, 20, 30].includes(it.penaltyType)) {
          sum[it.penaltyType] += Number(it.penaltyContent)
        } else {
          sum[it.penaltyType] += `;${it.penaltyContent}`
        }
      } else {
        if ([10, 20, 30].includes(it.penaltyType)) {
          sum[it.penaltyType] = Number(it.penaltyContent)
        } else {
          sum[it.penaltyType] = `${it.penaltyContent}`
        }
      }
    } else {
      it.penaltyContent = ''
    }
  })
  penaltyType.forEach((it) => {
    if (sum[it.value]) {
      it.sum = sum[it.value]
    }
  })
  // console.log(penaltyType, sum, 'penaltyType')
}

// 记录所有有效处罚的变动alarmEventId,penaltyType,penaltyContent
let penaltyRecord = {}
const recordChange = (row) => {
  if (row.penaltyType) {
    penaltyRecord[row.alarmEventId] = [row.penaltyType, row.penaltyContent]
  }
}

// 当值变化是将值记录到对应的alarmEventId,penaltyType上去
const onValueChange = (e, row) => {
  const obj = penaltyRecord[row.alarmEventId]
  if (!e) {
    // 为0的时候先减去数据
    minus(row)
  }
  if (!obj) {
    penaltyRecord[row.alarmEventId] = [0, e]
  } else {
    penaltyRecord[row.alarmEventId][1] = e
  }
}
const testValue = () => {}
// 根据alarmEventId去减统计数据
const minus = (row) => {
  const obj = penaltyRecord[row.alarmEventId]
  console.log(obj, 'minus')
  if (!obj || !obj[1]) {
    console.error(obj)
    return
  }
  penaltyType.forEach((it) => {
    // console.log(obj[0] , it.value)
    if (obj && obj[0] && obj[0] === Number(it.value)) {
      // it.sum = sum[it.value]
      if ([10, 20, 30].includes(obj[0])) {
        if (obj[1] && Number(obj[1])) {
          it.sum -= Number(obj[1])
          if (it.sum <= 0) {
            it.sum = ''
          }
        } else {
          it.sum = ''
        }
      } else {
        let regStr = `${obj[1]}\(\[;\]\)\?`
        it.sum = it.sum.replace(new RegExp(regStr, 'g'), '')
      }
    }
  })
}

const onTypeChange = (e, row) => {
  console.log(e, row, 'onTypeChange')
  if (row.penaltyType === 0) {
    // 则需要减去对应alarmEventId所记录的值
    minus(row)
  } else {
    list.forEach((it) => {
      if (it.alarmEventId === row.alarmEventId) {
        it.penaltyContent = ''
      }
    })
    minus(row)
    recordChange(row)
  }
}

const getMaxLength = (row) => {
  return row.penaltyType === 10 ? 2 : row.penaltyType === 20 ? 5 : 20
}

defineExpose({ show })
</script>

<style scoped lang="scss">
.event-dialog-wrapper {
  :deep(.el-scrollbar__view) {
    height: 100%;

    .dialog_content {
      height: 100%;
      // padding: 0 !important;
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 96%;

    .table-wrapper {
      height: 70%;
      overflow: auto;
    }
    .form-wrapper {
      height: calc(30% - 20px);
      margin-top: 20px;
      .form-title {
        font-size: 16px;
        font-weight: 600;
      }
      .btn-wrapper {
        margin: 10px 0;
        width: 100%;
        display: flex;
        justify-content: center;
        & > div {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
