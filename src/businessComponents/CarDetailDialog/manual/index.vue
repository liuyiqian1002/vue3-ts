<template>
  <div class="manual-process-wrapper">
    <el-col :span="widthSpan || 16">
      <el-form :model="form" label-width="120px">
        <el-form-item label="处理结果">
          <el-select v-model="form.handleResult" :disabled="row?.eventStatus === 0" placeholder="请选择处理结果">
            <el-option label="有效警情" value="1" />
            <el-option label="无效警情" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理方式" v-if="form.handleResult === '1'">
          <el-radio-group v-model="form.processMethod">
            <el-radio v-for="(item, index) in vaildAlarmTypes" :label="item.value" :key="index">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系人" v-if="form.handleResult === '1' && [2, 3].includes(form.processMethod)" :rules="{ required: true, message: '请填写联系人', trigger: 'blur' }">
          <el-col :span="7">
            <el-input v-model="form.receiverName" />
          </el-col>
          <el-col :span="3" class="text-center ml20">
            <span class="text-gray-500 ml5" style="display: inline-block; width: 60px">
              <span style="color: red">*</span>
              手机号
            </span>
          </el-col>
          <el-col :span="7">
            <el-input v-model="form.receiverPhone" required />
          </el-col>
        </el-form-item>
        <el-form-item label="消息内容" :rules="[{ required: true, message: '请输入消息内容', trigger: 'blur' }]">
          <el-input v-model="form.eventDesc" type="textarea" />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="form.usefulExpressions" placeholder="常用语" fit-input-width @change="onUsefulExpressionsChange">
            <el-option v-for="(item, index) in commonPhrase" :label="item.label" :value="item.value" :key="index" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.handleResult === '2'">
          <!-- <upload v-model="form.fileUrl" v-model:id="form.fileId" uploadTxt="照片附件"></upload> -->
          <upload-multipul :fileIdList="form.fileIdList" uploadTxt="上传照片" :limit="5"></upload-multipul>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="row?.eventStatus === 0" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script setup lang="ts">
import {
  batchManualHandle,
  BatchManualHandleQueryItem,
  manualHandleInvalidBatch,
  manualHandle,
  manualHandleInvalid,
  ManualHandleInvalidQuery,
  ManualHandleQuery,
} from '@/api/dynamicMonitoring/eventTracking'
import { EventItem } from '../types'
const { row, list, widthSpan, close } = defineProps<{
  widthSpan?: number
  row?: EventItem // 单个处理
  list?: Array<EventItem> // 批量处理
  close?: Function
}>()

console.log(row, list, 'props')
const proxy: any = getCurrentInstance()?.proxy
let form = $ref({
  alarmHandleType: 1,
  processMethod: 1,
  handleResult: row?.eventStatus === 0 ? '2' : '1',
  eventDesc: '',
  receiverName: '',
  receiverPhone: '',
  fileIdList: [],
  fileUrl: '',
  usefulExpressions: '',
})
// let rules = {
//     eventDesc: [{ required: true, message: '请输入消息内容', trigger: 'blur' }],
// }
// 处理方式枚举
let vaildAlarmTypes = $ref(proxy.$store.getters.arrEnumerate.vaildAlarmTypes)
// console.log(row, vaildAlarmTypes, 'row')
// TODO 批量处理不要展示人工核查
if (list && list.length > 0) {
  console.log(vaildAlarmTypes, 'vaildAlarmTypes')
  vaildAlarmTypes = vaildAlarmTypes.filter((it) => it.label !== '人工核查')
}
watch(
  () => form.processMethod,
  (val) => {
    // console.log(val, 'form.processMethod')
    if (val === 12) {
      form.eventDesc = '已核查'
    } else {
      form.eventDesc = ''
    }
  },
)
watch(() => row, (row,oRow) => {
  resetForm()
})

const onSubmit = () => {
  if (form.handleResult === '1') {
    onHandle()
  } else {
    ElMessageBox.confirm(`是否确定将该事件设置为${form.handleResult === '1' ? '有效警情' : '无效警情'}吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        onHandle()
      })
      .catch(() => {})
  }
}

const validParams = () => {
  if (!form.eventDesc) {
    ElMessage.warning('消息内容必须填写')
    return false
  }
  if (form.processMethod === 2 || form.processMethod === 3) {
    if (!form.receiverName) {
      ElMessage.warning('联系人必须填写')
      return false
    }
    if (!form.receiverPhone) {
      ElMessage.warning('手机号必须填写')
      return false
    }
    return true
  }
  return true
}

const emits = defineEmits(['getTable'])

const onHandle = () => {
  if (list && list.length > 0) {
    // 批量处理
    const query: (BatchManualHandleQueryItem | ManualHandleInvalidQuery)[] = []
    console.log(list, 'list')
    list.forEach((it) => {
      if(form.handleResult === '1') {
        query.push({
          alarmEventId: it.alarmEventId,
          eventId: it.eventId,
          vehicleCode: it.vehicleCode,
          handleType: form.alarmHandleType,
          processContent: form.eventDesc,
          processMethod: form.processMethod,
          receiverName: form.receiverName,
          receiverPhone: form.receiverPhone,
        })
      } else {
        query.push({
          alarmEventId: it.alarmEventId,
          eventId: it.eventId,
          alarmTypeCode: it.alarmTypeCode,
          eventEndTime: it.eventEndTime,
          eventStartTime: it.eventStartTime,
          eventOriginalTime: it.eventOriginalTime,
          alarmLevel: it.alarmLevel,
          vehicleCode: it.vehicleCode,
          eventDesc: form.eventDesc,
          fileIdList: form.fileIdList,
          valid: false,
        })
      }
      
    })
    console.log(query, 'query batch')

    if (form.handleResult === '1' && !validParams()) {
      return
    }
    const batchManualHandleApi = form.handleResult === '1' ? batchManualHandle : manualHandleInvalidBatch

    batchManualHandleApi(query).then((res) => {
      // console.log(res, 'manualHandle res')
      if (res === null) {
        ElMessage.success('处理成功')
        console.log(close, 'close')
        emits('getTable')
        if (close) {
          close()
        }
      } else {
        ElMessage.error('操作失败')
      }
    })
    return
  }
  if (form.handleResult === '1') {
    const query: ManualHandleQuery = {
      alarmEventId: row.alarmEventId,
      alarmLevel: row.alarmLevel,
      vehicleCode: row.vehicleCode,
      eventId: row.eventId,
      handleType: form.alarmHandleType,
      processContent: form.eventDesc,
      processMethod: form.processMethod,
      receiverName: form.receiverName,
      receiverPhone: form.receiverPhone,
    }
    // console.log(query, row, 'submit!')
    if (!validParams()) {
      return
    }

    manualHandle(query).then((res) => {
      // console.log(res, 'manualHandle res')
      if (res === null) {
        ElMessage.success('处理成功')
      } else {
        ElMessage.error('操作失败')
      }
    })
  } else {
    const query: ManualHandleInvalidQuery = {
      alarmEventId: row.alarmEventId,
      eventId: row.eventId,
      alarmTypeCode: row.alarmTypeCode,
      eventEndTime: row.eventEndTime,
      eventStartTime: row.eventStartTime,
      eventOriginalTime: row.eventOriginalTime,
      alarmLevel: row.alarmLevel,
      vehicleCode: row.vehicleCode,
      eventDesc: form.eventDesc,
      fileIdList: form.fileIdList,
      valid: false,
    }
    // console.log(query, row, 'submit!')
    if (!form.eventDesc) {
      ElMessage.warning('消息内容必须填写')
      return
    }
    manualHandleInvalid(query).then((res) => {
      // console.log(res, 'manualHandleInvalue res')
      if (res === null) {
        ElMessage.success('处理成功')
      } else {
        ElMessage.error('操作失败')
      }
    })
  }
}

const onUsefulExpressionsChange = (value: number) => {
  // console.log(value, 'value')
  queueMicrotask(() => {
    form.eventDesc = form.handleResult === '1' ? validCommonPhrase[value - 1].label : invalidCommonPhrase[value - 1].label
  })
}

const validCommonPhrase = [
  { label: '您已疲劳驾驶，请停车休息20分钟，注意行车安全。', value: 1 },
  { label: '您已超速，请减速慢行，注意行车安全。', value: 2 },
  { label: '您已偏离预定路线，请及时调整行驶线路。', value: 3 },
  { label: '您已违反禁驾规则，请进入休息区停靠。', value: 4 },
  { label: '高速路上禁止停车，请遵守交通规则。', value: 5 },
  { label: '请勿在开车过程中打电话，注意行车安全。', value: 6 },
  { label: '请勿在开车过程中抽烟，注意行车安全。', value: 7 },
  { label: '请勿在开车过程中喝水，注意行车安全。', value: 8 },
]

const invalidCommonPhrase = [
  { label: '该车停在服务区。', value: 1 },
  { label: '该车停在收费站。', value: 2 },
  { label: '该车驶入隧道。', value: 3 },
  { label: '查视频确认司机无疲劳。', value: 4 },
  { label: '高速路上禁止停车，请遵守交通规则。', value: 5 },
  { label: '打电话确认司机无疲劳。', value: 6 },
]

let commonPhrase = $ref(validCommonPhrase)
watch(
  () => form.handleResult,
  (val: string) => {
    // console.log(val, 'handleResult')
    if (val === '1') {
      commonPhrase = validCommonPhrase
    } else {
      commonPhrase = invalidCommonPhrase
    }
    form.eventDesc = ''
    form.usefulExpressions = ''
  },
)

const resetForm = () => {
  form = {
    alarmHandleType: 1,
    processMethod: 1,
    handleResult: row?.eventStatus === 0 ? '2' : '1',
    eventDesc: '',
    receiverName: '',
    receiverPhone: '',
    fileIdList: [],
    fileUrl: '',
    usefulExpressions: '',
  }
}
defineExpose({resetForm})
</script>

<style scoped lang="scss">
.manual-process-wrapper {
  padding-left: 30px;
  margin-top: 30px;
  max-height: 500px;
  overflow: scroll;
  :deep(.el-button) {
    width: 100px;
    // height: 28px;
    border: 1px solid #28bbd0;
    // border-radius: 16px;
    text-align: center;
    // line-height: 28px;
    font-size: 12px;
    margin: 10px auto 0;
    padding: 0;
    color: #28bbd0;
    background: #fff;
  }

  :deep(.el-select) {
    .el-input {
      width: 500px;
    }
  }

  .el-textarea {
    width: 500px;
  }
}
</style>
