<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="basic-info-wrapper">
          <div class="title-item">基本信息</div>
          <div class="ctent-wrapper">
            <el-col :span="7">
              <div class="label">被罚机构：</div>
              <div class="content">{{ basicInfo.companyName }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">被罚车辆：</div>
              <div class="content">{{ `${basicInfo.plateNum}(${basicInfo.plateColorName})` }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">驾驶员：</div>
              <div class="content">{{ basicInfo.driverName }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">驾驶员状态异常报警条数：</div>
              <div class="content">{{ basicInfo.driverStateAbnormalCount }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">驾驶行为异常报警条数：</div>
              <div class="content">{{ basicInfo.drivingBehaviorAbnormalCount }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">营运类报警条数：</div>
              <div class="content">{{ basicInfo.operatingAlarmCount }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">罚单生成时间：</div>
              <div class="content">{{ basicInfo.createTime }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">预处置结果：</div>
              <div class="content">{{ basicInfo.preDisposalContent }}</div>
            </el-col>
            <el-col :span="7">
              <div class="label">处置人：</div>
              <div class="content">{{ basicInfo.disposalUserName }}</div>
            </el-col>
          </div>
        </div>
        <div class="alarm-process-wrapper">
          <div class="title-item">报警处置</div>
          <div class="ctent-wrapper">
            <div class="time-line-item" v-for="(item,index) in processList" :key="index">
              <div class="top-line"><span></span></div>
              <div class="content">
                <p class="time">{{item.createTime}}</p>
                <p class="action">预处置：{{ item.actionTypeName }}</p>
                <p class="opearetor">操作人：{{ item.createUserName }}</p>
                <div class="imgs" v-if="item.fileUrlList">
                  <div>预罚单：</div>
                  <div>
                    <el-image v-for="url in item.fileUrlList"></el-image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-wrapper">
          <div class="title-item">报警明细</div>
          <div class="ctent-wrapper">
            <el-table :data="list" style="width: 100%">
              <el-table-column v-for="(column, index) in tableColumns" :key="index" :prop="column.prop"
                :label="column.label" :width="column.width">
              </el-table-column>
            </el-table>
          </div>
          <div class="tw_c"><el-button @click="visible = false">关闭</el-button></div>
        </div>
        <!-- <div><el-button @click="visible = false">关闭</el-button></div> -->
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { AlarmProcessItem, eventDisposalDto, EventStaticsItem } from '@/api/operation/closedloopmanagement/alarmprocess';

const { title, dto, list } = defineProps({
  title: { type: String, default: () => '' },
  dto: { type: Object, default: () => { } },
  list: { type: Array<EventStaticsItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<AlarmProcessItem>()

const show = (obj: AlarmProcessItem) => {
  visible = true
  row = obj
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
    // editable: 'select',
    // options: [{ label: '请选择', value: 0 }, ...penaltyType],
    // value: '',
    // slot: true,
  },
  {
    label: '处警状态',
    prop: 'eventHandleStatusName'
  },
  {
    label: '处理形式',
    prop: 'appealTypeName'
  },
  {
    label: '处理状态',
    prop: 'appealStatusName'
  },
  {
    label: '处罚内容',
    prop: 'displayPenaltyContent',
    // editable: 'input',
    // value: '',
    // slot: true
  },
]

watch(() => list, (nVal) => {
  // console.log(nVal, 'list watch')
  // staticsAll()
}, { deep: true })
let basicInfo = $ref<Partial<eventDisposalDto>>({})
let processList = $ref([])
watch(() => dto, (nOdt) => {
  console.log(nOdt, 'nOdt')
  if (nOdt) {
    const { disposal, recordList } = nOdt
    basicInfo = disposal
    processList = recordList
  }
})


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

    .title-item {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: #ccc;
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
    }

    .ctent-wrapper {
      border: 1px solid #e7e7e7;
      margin-bottom: 20px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
    }

    .basic-info-wrapper {
      .ctent-wrapper {
        width: 100%;

        .el-col {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 12px;

          .title {
            width: 120px;
            text-align: right;
          }
        }
      }
    }
    .alarm-process-wrapper{
      .ctent-wrapper {
        display: flex;
        padding-left: 20px;
        .time-line-item {
          // padding-left: 20px;
          width: 250px;
          .top-line{
            background: #ccc;
            width: 100%;
            height: 2px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span{
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #ccc;
            }
          }
          .content {
            margin-top: 20px;
            & > p,& > div{
              margin: 15px 0;
            }
          }
        }
      }
    }

    .table-wrapper {
      height: 70%;
    }
  }
}
</style>
