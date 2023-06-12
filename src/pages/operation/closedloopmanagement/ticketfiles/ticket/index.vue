<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <div class="ctx" id="downloadContent">
            <br>
            <div style="text-align: center;">
              <h2>{{ `${dto?.disposal?.plateNum}(${dto?.disposal?.plateColorName})预处罚通知单` }}</h2>
            </div>
            <div class="title2" style="width: 50%">{{`罚单编号：${dto?.disposal?.disposalCode || dto?.disposal?.vehicleCode+''+dto?.disposal?.id }`}}</div>
            <table id="ctable" style="margin-top: 10px;" border="1">
              <tr>
                <td class="title" width="90">驾驶员</td>
                <td>{{`${dto?.dispoal?.driverName || ''}`}}</td>
                <td class="title">所属机构</td>
                <td colspan="6">{{`${dto?.disposal?.companyName}`}}</td>
              </tr>

              <tr>
                <td rowspan="7" class="title">被罚事项</td>
                <td class="title">行号</td>
                <td class="title">报警ID</td>
                <td class="title">报警类型</td>
                <td class="title">报警时间</td>
                <td class="title">报警位置</td>
                <td class="title">处理方式</td>
                <td class="title">处理结论</td>
                <td class="title">是否申诉</td>
              </tr>

              <tr v-for="(item,index) in list">
                <td>{{ index+1 }}</td>
                <td>{{ item.alarmEventId || item.id }}</td>
                <td>{{ item.alarmTypeCodeName }}</td>
                <td>{{ item.eventStartTimeStr }}</td>
                <td>{{ item.eventAddress }}</td>
                <td>{{ item.penaltyTypeName }}</td>
                <td>{{ item.displayPenaltyContent }}</td>
                <td>{{ item.appealStatus }}</td>
              </tr>


              <tr>
                <td class="title">合计</td>
                <td colspan="8">{{ dto?.disposal?.staticsInfo}}</td>
              </tr>
              <tr>
                <td class="title">预处理结果</td>
                <td colspan="8">
                  合计：<br>
                  <div style="word-break: break-word;">{{dto?.disposal?.preDisposalContent}}</div>
                </td>
              </tr>
              <tr>
                <td class="title">最终结论</td>
                <td colspan="8"></td>
              </tr>
            </table>
            <div class="bot">
              <div style="width: 50%">
                <div class="title2">驾驶员签字
                  <span style="border-bottom: solid 1px black">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
                <div class="title2" style="margin-top: 30px">签字时间
                  <span style="border-bottom: solid 1px black">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              </div>
              <div style="width: 50%; margin-bottom: 20px;">
                <div class="title2">审核人签字
                  <span style="border-bottom: solid 1px black">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
                <div class="title2" style="margin-top: 30px">审核时间
                  <span style="border-bottom: solid 1px black">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!-- form表格 -->
        <div class="form-wrapper">
          <div class="btn-wrapper">
            <div :span="3"><el-button type="primary" @click="onSubmit">下载罚单</el-button></div>
          </div>
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { AlarmProcessItem, EventStaticsItem, saveEventDisposal } from '@/api/operation/closedloopmanagement/alarmprocess';
import { downLoadPdf } from '@/utils/index';
// import Violation from './violation.vue'
const { title, list, dto } = defineProps({
  title: { type: String, default: () => '' },
  dto: { type: Object, default: () => {} },
  list: { type: Array<EventStaticsItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<AlarmProcessItem>()

const show = (obj: AlarmProcessItem) => {
  visible = true
  row = obj
}

watch(() => list, (nVal) => {
  // console.log(nVal, 'list watch')
  // staticsAll()
}, { deep: true })
const onSubmit = () => {
  const title = `${dto?.disposal?.plateNum}(${dto?.disposal?.plateColorName})预处罚通知单`
  downLoadPdf(document.querySelector('#downloadContent'), title)
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

        &>div {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
<style scoped>
table{
  background-color: transparent;
  border-collapse: collapse;
  border-collapse: collapse;
  border: 1px solid rgb(128, 128, 128);
}

.ctx {
  padding-left: 30px;
  padding-right: 30px
}
.ctx h2 {
  margin: 20px;
  font-size: 24px;
}

.bot {
  display: flex;
  margin-top: 40px;
}

.title {
  font-size: 14px;
  /*font-weight: bold;*/
  text-align: center;
}

.title2 {
  font-size: 14px;
  /*font-weight: bold;*/
}

#ctable {
  width: 100%;
}

#ctable td,
#ctable th {
  border: 1px solid rgb(128, 128, 128);
  border-top: 0;
  border-left: 0;
  padding: 4px;
  font-size: 14px;
  vertical-align: middle;
}
</style>
