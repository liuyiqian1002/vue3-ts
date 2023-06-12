<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="update-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <el-table :data="list" style="width: 100%">
            <el-table-column v-for="(column, index) in tableColumns" :key="index" :prop="column.prop"
              :label="column.label" :width="column.width">
              <template #default="scope" v-if="column.slot">
                <el-input v-model="scope.row.penaltyContent" v-if="column.editable === 'input'" width="80%"></el-input>
                <el-select v-model="scope.row.penaltyType" placeholder="请选择" width="80%" v-else>
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
            <!-- <div :span="3"><el-button @click="visible = false">关闭</el-button></div> -->
          </div>
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { AlarmProcessItem, EventStaticsItem, saveEventDisposal } from '@/api/operation/closedloopmanagement/alarmprocess';

const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<EventStaticsItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<AlarmProcessItem>()

const show = (obj: AlarmProcessItem) => {
  visible = true
  row = obj
}

let penaltyType = $ref([
  ...proxy.$store.getters.arrEnumerate['penaltyType']
])
// 统计字段与类型值的映射,TODO 将类型也指定在这
const keyMap = {
  'criticismCount': '10',
  'financialPenaltiesAmount': '20',
  'suspensionClassHour': '30',
  'dismissal': '40',
  'joinDiscipline': '50',
  'otherPenalties': '60',
}

const tableColumns = [
  {
    label: '报警类别',
    width: 180,
    prop: 'alarmGroupName'
  },
  {
    label: '报警类型',
    prop: 'alarmTypeCodeName'
  },
  {
    label: '报警开始时间',
    prop: 'eventStartTimeStr'
  },
  {
    label: '报警结束时间',
    prop: 'eventEndTimeStr'
  },
  {
    label: '持续时长',
    prop: 'eventPersistSecondsStr'
  },
  {
    label: '是否纠正',
    prop: 'eventStatusName'
  },
  {
    label: '处罚类型',
    prop: 'penaltyTypeName',
    editable: 'select',
    options: [{label: '请选择', value: 0}, ...penaltyType],
    value: '',
    slot: true,
  },
  {
    label: '处罚内容',
    prop: 'penaltyContent',
    editable: 'input',
    value: '',
    slot: true
  },
]

// let tableList = $ref([])

watch(() => list,(nVal) => {
  console.log(nVal, 'update list watch')
  // tableList = nVal
  staticsAll()
}, { deep: true})

const onSubmit = () => {
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
    }
  }
  console.log('onSubmit', query, list)
  saveEventDisposal(query).then(res => {
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
    if(it.penaltyType) {
      if(sum[it.penaltyType]) {
        // 批评教育/次 经济处罚/元 停班学习/课时
        if([10,20,30].includes(it.penaltyType)) {
          sum[it.penaltyType] += Number(it.penaltyContent)
        } else {
          sum[it.penaltyType] += `;${it.penaltyContent}`
        }
      } else {
        if([10,20,30].includes(it.penaltyType)) {
          sum[it.penaltyType] = Number(it.penaltyContent)
        } else {
          sum[it.penaltyType] = `${it.penaltyContent}`
        }
      }
    } else {
      it.penaltyContent = ''
    }
  })
  penaltyType.forEach(it => {
    if(sum[it.value]) {
      it.sum = sum[it.value]
    } else {
      // it.sum = ''
    }
  });
  // console.log(penaltyType, sum, 'penaltyType')
}



defineExpose({ show })
</script>

<style scoped lang="scss">
.update-dialog-wrapper {
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
        &>div{
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
