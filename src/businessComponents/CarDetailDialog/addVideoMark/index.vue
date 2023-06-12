<template>
  <div class="set-col">
    <tw-dialog title="视频标记" width="700px" v-model="dialogFlag">
      <tw-custom-form ref="fromDataRef" class="w500" :lists="mainData.lists" :rules="mainData.rules" :formData="mainData.formData" showBtns @colse="reset" @save="save">
        <template #frontImageUrl>
          <upload v-model="mainData.formData.frontImageUrl" v-model:id="mainData.formData.fileId" uploadTxt="上传照片"></upload>
        </template>
        <template #content>
          <el-checkbox-group v-model="mainData.formData.driverWarningType">
            <transition name="fade-transform" mode="out-in">
              <el-row>
                <el-col :span="12" v-for="(item, i) in mainData.checkList" :key="i">
                  <el-checkbox :label="item.value" :key="item.label" :disabled="mainData.formData.driverWarningType == 60 && mainData.formData.alarmTypeCode == 36 && item.value != 60" @change="(e) => onChange(e,item)">
                    {{ item.label }}
                  </el-checkbox>
                </el-col>
              </el-row>
            </transition>
          </el-checkbox-group>
        </template>
      </tw-custom-form>
    </tw-dialog>
    <CarDetailDialog ref="handleRef" :title="'查看'" showManual :show-warning-list="false" :show-video-player="true" :show-photograph="true"></CarDetailDialog>
  </div>
</template>

<script setup lang="tsx">
import CarDetailDialog from '@/businessComponents/CarDetailDialog/index.vue'
import { MarkSignQuery, saveMarkSign } from '@/api/dynamicMonitoring/eventTracking'
import { EventItem } from '../types'

const proxy: any = getCurrentInstance()?.proxy

let { row } = defineProps<{
  row: EventItem
}>()

const markTypes = proxy.$store.getters.arrEnumerate['markType'][0].label
// const spLists = proxy.$store.getters.arrEnumerate['markVideoAlarmContentType']
// const sjLists = proxy.$store.getters.arrEnumerate['markDriverAlarmContentType']
const handleRef = $ref(null)
console.log(markTypes, 'markTypes')

const mainData = reactive({
  checkList: markTypes[1].children,
  formData: {
    frontImageUrl: '',
    fileId: '',
    alarmTypeCode: markTypes[1].value,
    driverWarningType: [],
    plateNum: row?.plateNum,
    vehicleId: row?.vehicleId,
    vehicleCode: row?.vehicleCode,
    markingDesc: '',
    content: true,
    violationSpeed: null,
    date: proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  lists: [
    { key: 'frontImageUrl', col: 24, label: '上传照片', slot: true },
    { key: 'plateNum', col: 24, label: '车牌号', disabled: true },
    {
      key: 'date',
      type: 'date',
      data: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      label: '卫星时间',
      placeholder: '卫星时间',
      col: 24,
    },
    {
      key: 'alarmTypeCode',
      type: 'select',
      col: 24,
      label: '标记类型',
      children: markTypes,
      // children: [
      //     { label: '视频抽查', value: 1 },
      //     { label: '司机违规', value: 0 },
      // ],
      change: (val) => {
        console.log(val, 'val')
        mainData.checkList = markTypes.find((it) => it.value === val)?.children
        mainData.formData.driverWarningType = []
      },
    },
    { key: 'content', col: 24, label: '标记内容', slot: true },
    { key: 'violationSpeed', label: '当前速度', col: 24 },
    { key: 'markingDesc', label: '标记说明', col: 24 },
  ],
  rules: {
    date: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    alarmTypeCode: [{ required: true, message: '请选择标记类型', trigger: 'blur' }],
    driverWarningType: [{ required: true, message: '请选择标记内容', trigger: 'blur' }],
    violationSpeed: [{ required: true, message: '请输入当前速度', trigger: 'blur' }],
    frontImageUrl: [{ required: true, message: '请选择上传图片', trigger: 'blur' }],
  },
})
let dialogFlag = $ref(false)

const viewData = () => {
  dialogFlag = true
  resetForm()
}

const resetForm = () => {
  console.log('resetForm')
  mainData.formData.alarmTypeCode = markTypes[1].value
  mainData.formData.driverWarningType = []
  mainData.checkList = markTypes[1].children
  mainData.formData.violationSpeed = null
  mainData.formData.frontImageUrl = ''
  mainData.formData.fileId = ''
  mainData.formData.markingDesc = ''
}

let fromDataRef = $ref(null)
// let emits = defineEmits(['save'])
const save = () => {
  // console.log(mainData.formData, row, 'mainData.formData')
  let markingDesc = ''
  if(mainData.formData.driverWarningType) {
    // 抽烟,打瞌睡,备注：51231231
    mainData.formData.driverWarningType.map(it => {
      console.log(mainData.checkList, it, mainData.checkList.filter(i => i.value === it),  'mainData.checkList')
      markingDesc += `${mainData.checkList.filter(i => i.value === it)[0].label},`
    })
  }
  if(mainData.formData.markingDesc) {
    markingDesc += `备注：${mainData.formData.markingDesc}`
  }
  const params: MarkSignQuery = {
    alarmTypeCode: String(mainData.formData.alarmTypeCode),
    date: mainData.formData.date,
    driverWarningType: mainData.formData.driverWarningType,
    fileId: mainData.formData.fileId,
    markingDesc: markingDesc,
    vehicleCode: mainData.formData.vehicleCode,
    // vehicleId: mainData.formData.vehicleId || 11,
    violationSpeed: mainData.formData.violationSpeed,
  }
  if (!params.fileId) {
    ElMessage.warning('请上传图片！')
    return
  }
  if (params.driverWarningType.length === 0) {
    ElMessage.warning('选择标记内容')
    return
  }
  if(0 >= Number(params.violationSpeed) || Number(params.violationSpeed) > 200) {
    ElMessage.warning('请输入违规速度：大于0小于200范围的整数!')
    return
  }
  saveMarkSign(params).then((res) => {
    // console.log(res, 'res saveMarkSign')
    if (res) {
      // ElMessage.success('标记成功！')
      // dialogFlag = false
      proxy.MessageBox({ msg: '标记成功！是否进入报警处理？', type: 'warning' }).then((close) => {
        // NOTE 标记成功后，后端需要返回新的事件信息
        res.eventId = res.eventid
        res.alarmEventId = res.alarmeventid
        handleRef.show(res)
        dialogFlag = false
        close()
      }).catch(() => {
        dialogFlag = false
      })
    } else {
      if(res === null) {
        dialogFlag = false
        ElMessage.success('标记成功！')
      } else {
        ElMessage.warning('标记失败！')
      }
    }
  })
}
const reset = () => {
  console.log('reset')
  // mainData.formData.driverWarningType = []
  resetForm()
}
watch(
  () => row,
  (val) => {
    console.log(val.plateNum, row.plateNum, 'addVideoMark row')
    if (val) {
      mainData.formData.plateNum = val.plateNum
      mainData.formData.vehicleId = val.vehicleId
      mainData.formData.vehicleCode = val.vehicleCode
      // console.log(JSON.parse(JSON.stringify(mainData.formData)), 'mainData.formData')
    }
  },
)
// 无押运员
// watch(() => mainData.formData.driverWarningType, (val) => {
//   if(val.includes(60)) {
//     mainData.formData.driverWarningType = [60]
//   }
// })
const onChange = (e, item) => {
  console.log(e,item.value, 'onChange')
  if(item.value === 60 && e) {
    mainData.formData.driverWarningType = [60]
  } else {
    if(mainData.formData.driverWarningType.includes(60) && e) {
      console.log(mainData.formData.driverWarningType.includes(60), 'mainData.formData.driverWarningType.includes(60)')
      mainData.formData.driverWarningType = mainData.formData.driverWarningType.filter(it => it !== 60)
    }
  }
}

defineExpose({ viewData })
</script>

<style scoped></style>
