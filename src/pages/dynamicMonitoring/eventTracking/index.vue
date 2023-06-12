<template>
  <div id="event-tracking" class="tw w h">
    <el-tabs v-model="editableTabsValue" type="card" addable class="event-tabs w" @edit="handleTabsEdit">
      <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable" lazy>
        <!-- {{ item.content }} -->
        <component :is="item.content" :index="index"></component>
      </el-tab-pane>
    </el-tabs>

    <tw-dialog :loading="false" title="添加内容" width="30%" height="40%" :dialogTop="320" v-model="copyNameVisible" class="manual-dialog-wrapper">
      <div class="manual-wrapper">
        <el-form-item label="添加标题: " :label-width="120">
          <el-input v-model="copyName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="" :label-width="120">
          <el-button type="primary" style="width: 120px" @click="(e) => onConfirm()">确定</el-button>
        </el-form-item>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import componentDefault from './default/index.vue'
import componentGuangxi from './guangxi/index.vue'

let editableTabsValue = $ref('1')
let editableTabs = $ref([
  {
    title: '默认',
    name: '1',
    content: componentDefault,
    closable: false,
  },
  // {
  //     title: '广西聚合页',
  //     name: '2',
  //     content: componentGuangxi,
  //     closable: false
  // },
])

let copyNameVisible = $ref(false)
let copyName = $ref('') // 复制时需要填写的tab标题
const onConfirm = () => {
  if (!copyName) {
    ElMessage.warning('请填写标题！')
    return
  }
  let name = String(editableTabs.length + 1)
  editableTabs.push({
    title: copyName,
    name: name,
    content: componentDefault,
    closable: true,
  })
  copyNameVisible = false
  editableTabsValue = name
  copyName = ''
  console.log(editableTabs, 'onConfirm editableTabs')
}
const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  // console.log(action, 'action')
  if (action === 'add') {
    // 复制当前tab
    // editableTabs.push()
    copyNameVisible = true
  } else if (action === 'remove') {
    const tabs = editableTabs
    let activeName = editableTabsValue
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    editableTabsValue = activeName
    editableTabs = tabs.filter((tab) => tab.name !== targetName)
  }
}
</script>

<style lang="scss" scoped>
#event-tracking {
  // :deep(.el-dialog) {
  //     .dialog_content {
  //         margin-top: 30px;
  //     }
  // }
  :deep(.el-tabs) {
    width: 100%;
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__new-tab {
      position: absolute;
      right: 0px;
      margin-right: 15px;
      z-index: 1000;
      cursor: pointer;
    }
  }
}

.event-tabs {
  width: 100%;
}

// #event-tracking {
//     :deep(.el-tabs) {
//         .el-tabs__header {
//             margin-bottom: 0
//         }
//     }
// }

.manual-dialog-wrapper {
    .manual-wrapper {
        margin-top: 30px;
    }
}

.event-tabs > .el-tabs__content {
  padding: 0 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
