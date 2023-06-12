<template>
  <div class="left-wrapper">
    <div class="top tw_cy pl20 pr20">
      <div class="lt-tag">
        <p>{{ row.vehicleOperateTypeName?.substring(0, 1) }}</p>
      </div>
      <div class="fs24">{{ row.plateNum }}</div>
      <div class="fs16">{{ row.alarmLevelString }}</div>
      <div class="type fs16">{{ row.alarmTypeName }}</div>
      <div class="handle-status w tw_lr">
        <p>{{ row.eventStatusString }}</p>
        <p>{{ row.hasManualString }}</p>
      </div>
    </div>
    <div class="center">
      <div class="gray title">行驶开始时间</div>
      <div class="time">{{ row.eventOriginalTime }}</div>
      <div class="gray title">事件开始时间</div>
      <div class="time">{{ row.eventStartTime }}</div>
      <div class="gray title">行驶结束时间</div>
      <div class="time">{{ row.eventEndTime }}</div>
      <div class="gray title">持续时间</div>
      <div class="time">{{ row.persistTimeZH }}</div>
    </div>
    <div class="bottom">
      <div class="gray title">企业信息</div>
      <div class="time">{{ row.companyName }}</div>
      <div class="gray title">企业联系人</div>
      <div class="time" v-if="enterprises && enterprises.length > 0">
        <div v-for="it in enterprises">{{ `${it.contactsName || ''} ${it.cellphone || ''}` }}</div>
      </div>
      <div class="time" v-else>-</div>
      <div class="gray title">从业人员</div>
      <div class="time" v-if="employments && employments.length > 0">
        <div v-for="it in employments">{{ `- ${it.roleName|| ''} ${it.mobilePhone || ''}` }}</div>
      </div>
      <div class="time" v-else>-</div>
    </div>
    <div class="driver-violation" v-if="row.alarmTypeCode === '36' && row.imgUrl">
      <el-image :src="row.imgUrl"></el-image>
      <el-button v-if="row.eventStatus !== 2" type="primary" size="small" style="margin: 5px" @click="onCorrect">违规纠正</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { commonApi } from '@/api/common'
import { relieve } from '@/api/dynamicMonitoring/eventTracking'

// import { EventItem } from "../types";
const { row } = defineProps<{
  row: any
}>()
const proxy: any = getCurrentInstance()?.proxy
let summaryInfo = $ref(row)
// 处理不统一字段
if (!summaryInfo.vehicleOperateTypeName) {
  summaryInfo.vehicleOperateTypeName = summaryInfo.operateTypeName
}
if (!summaryInfo.alarmLevelString) {
  if (summaryInfo.alarmLevel) {
    summaryInfo.alarmLevelString = proxy.$store.getters.oEnumerate['eventAlarmTypes']?.list[summaryInfo.alarmLevel - 1]?.label
  }
}
if (!summaryInfo.alarmTypeName) {
  summaryInfo.alarmTypeName = summaryInfo.alarmTypeName
}
if (!summaryInfo.eventOriginalTime) {
  summaryInfo.eventOriginalTime = summaryInfo.originalTime
}
if (!summaryInfo.eventStartTime) {
  summaryInfo.eventStartTime = summaryInfo.startTimeStr || summaryInfo.startTime
}
if (!summaryInfo.eventEndTime) {
  summaryInfo.eventEndTime = summaryInfo.endTimeStr || summaryInfo.endTime
}
if (!summaryInfo.persistTimeZH) {
  summaryInfo.persistTimeZH = summaryInfo.durationStr
}
if (!summaryInfo.eventStatusString) {
  summaryInfo.eventStatusString = summaryInfo.eventStatus
}
if (!summaryInfo.hasManualString) {
  summaryInfo.hasManualString = summaryInfo.appealStatusName
}
// console.log(row, 'summary')
let enterprises = $ref([])
let employments = $ref([])
watch(
  () => row,
  (val) => {
    console.log(val, 'summary watch')
    getData(val)
  },
)

const getData = (row) => {
  if(!row.vehicleCode) {
    console.error(row, 'vehicleCode 不存在')
    return
  }
  commonApi('/business/driver/page', { vehicleCode: row.vehicleCode, pageNumber: 1, pageSize: 25 }).then((res) => {
    // console.log(res, '从业人员信息')
    if (res) {
      employments = res.rows
    } else {
      employments = []
    }
  })
  if(!row.companyId) {
    console.error(row, '企业id不存在')
    return
  }
  commonApi('/business/companyContacts/getListByCompanyId', { companyId: row.companyId }, 'get').then((res) => {
    // console.log(res, '企业联系人')
    if (res) {
      enterprises = res
    } else {
      enterprises = []
    }
  })
}

const onCorrect = () => {
  ElMessageBox.confirm('此操作将纠正该违规, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      violationRelieve()
    })
    .catch(() => {
    })
  
}

const emits = defineEmits(['close'])

// 违规纠正
const violationRelieve = () => {
  const qeury = {
    alarmEventId: row.alarmEventId,
    // businessId: '',
    // driverWarningType: '',
    flag: true,
    // gpsTime: '',
    // markingDesc: '',
    // note: '',
    // plateNum: '',
    // primaryId: '',
    // remark: '',
    // sendMsg: 0,
    // userId: 0,
    // userName: '',
    // vehicleCode: '',
  }
  relieve(qeury).then((res) => {
    // console.log(111)
    if (res === null) {
      ElMessage.success('已纠正')
      emits('close')
    } else {
      ElMessage.warning('纠正未成功')
    }
  })
}
</script>

<style scoped lang="scss">
.left-wrapper {
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  background: #545d64;

  .top {
    text-align: center;
    color: #fff;
    padding: 20px 0;
    position: relative;
    border-bottom: 1px solid #777;

    .lt-tag {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      top: 0;
      left: 0;
      background: #e9c33c;
      transform: translate(-48%, -48%);
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;

      p {
        color: #000;
        font-size: 18px;
        font-weight: 600;
        transform: translate(-45%, -60%);
      }
    }

    & > div {
      margin: 8px 0;
    }

    .type {
      color: #000;
      background: #e9c33c;
      width: 100%;
      padding: 8px;
      border-radius: 4px;
    }

    .handle-status {
      color: antiquewhite;
      color: #d5be6a;
    }
  }

  .center,
  .bottom {
    color: #fff;
    padding: 20px 15px;

    .title {
      color: #959595;
      text-align: left;
      margin-bottom: 10px;
    }

    .time {
      margin-bottom: 21px;
      font-size: 18px;
      white-space: nowrap;
    }
  }

  .bottom {
    .time {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      &>div{
        // width: 160px;
        line-height: 18px;
        word-break: break-word;
        white-space: break-spaces;
      }
    }
  }
}
</style>
