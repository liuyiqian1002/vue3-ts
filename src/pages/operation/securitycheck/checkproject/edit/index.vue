<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="800" height="80%" v-model="visible" class="process-dialog-wrapper">
      <div class="content-wrapper">
        <!-- form表格 -->
        <div class="form-wrapper">
          <el-form class="demo-form-inline" :disabled="dsb" :rules="rules">
            <el-form-item label="项目分类:" prop="categoryId">
              <!-- <component ref="allFormItem" :is="TwSelect" :formData="formData" :item="config"
                @txtChange="submitForm(formDataRef)" @tapClick="tapClick"></component> -->
              <TwSelect :item="config" :formData="formData"></TwSelect>
            </el-form-item>
            <el-form-item label="检查内容:" prop="checkContent">
              <el-input v-model="formData.checkContent" type="textarea" placeholder="请输入检查内容" />
            </el-form-item>
            <el-form-item label="检查要点:" prop="name">
              <el-input v-model="formData.name" placeholder="请输入检查要点" />
            </el-form-item>
            <el-form-item label="检查依据:" prop="checkBasis">
              <el-input v-model="formData.checkBasis" placeholder="请输入检查依据" />
            </el-form-item>
            <el-form-item label="检查要求:" prop="checkRequire">
              <el-input v-model="formData.checkRequire" placeholder="请输入检查要求" />
            </el-form-item>
            <el-form-item label="法律责任:" prop="legalLiability">
              <el-input v-model="formData.legalLiability" placeholder="请输入法律责任" />
            </el-form-item>
          </el-form>
          <div class="btn-wrapper">
            <div :span="3" v-show="!dsb"><el-button type="primary" @click="onSubmit">提交</el-button></div>
            <div :span="3"><el-button @click="visible = false">关闭</el-button></div>
          </div>
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { CheckItemResItem } from '@/api/operation/securitycheck/checkproject'
import { addOrUpdate } from '@/api/operation/securitycheck/fileclassification'
import TwSelect from '@/components/TwForm/components/twSelect/index.vue'

const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<CheckItemResItem>, default: () => [] },
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<CheckItemResItem>()
let dsb = $ref(false)

/**
 *
 * @param obj
 * @param type 0 新增；1 编辑；2 查看
 */
const show = (obj: CheckItemResItem, type: number) => {
  console.log(obj, type, 'type')
  visible = true
  if (type === 0) {
    row = {} as CheckItemResItem
  } else {
    row = obj
  }
  if (type === 2) {
    dsb = true
  } else {
    dsb = false
  }
  initFormData(obj)
}

const config = $ref({
  key: 'categoryId',
  type: 'select',
  remote: true,
  url: '/business/tsSecurityCheckCategory/page',
  method: 'post',
  loadMore: true,
  params: {
    pageNumber: 1,
    pageSize: 25,
    valid: 1,
    havePermission: true,
  },
  props: { label: 'name', value: 'id' },
  placeholder: '请选择项目分类',
})
let formData = $ref({
  id: 0,
  categoryId: null,
  name: '',
  checkBasis: '',
  categoryName: '',
  checkContent: '',
  checkRequire: '',
  legalLiability: '',
})

const rules = {
  categoryId: [{ required: true, message: '请选择项目分类:', trigger: 'blur' }],
  name: [{ required: true, message: '请输入检查要点', trigger: 'blur' }],
  checkBasis: [{ required: true, message: '请输入检查依据', trigger: 'blur' }],
  checkContent: [{ required: true, message: '请输入检查内容', trigger: 'blur' }],
  checkRequire: [{ required: true, message: '请输入检查要求', trigger: 'blur' }],
}

const initFormData = (row: CheckItemResItem) => {
  // ;(formData.categoryId = row.categoryId), (formData.name = row.categoryName), (formData.categoryName = row.categoryName)
  formData.categoryId = row.categoryId
  formData.name = row.name
  formData.categoryName = row.categoryName
  formData.checkBasis = row.checkBasis
  formData.checkContent = row.checkContent
  formData.checkRequire = row.checkRequire
  formData.legalLiability = row.legalLiability
}

const emits = defineEmits(['getTable'])

const onSubmit = () => {
  const query = {
    ...formData,
    id: row.id,
  }
  console.log('onSubmit', query, list)
  addOrUpdate(query).then((res) => {
    console.log(res, 'save')
    if (res === null) {
      ElMessage.success('保存成功')
      emits('getTable')
      visible = false
    }
  })
}

defineExpose({ show })
</script>

<style scoped lang="scss">
.process-dialog-wrapper {
  :deep(.el-scrollbar__view) {
    height: 100%;

    .dialog_content {
      height: 100%;
      // padding: 0 !important;
    }
  }

  .content-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 96%;

    .form-wrapper {
      // height: calc(30% - 20px);
      margin-top: 20px;

      .form-title {
        // font-size: 16px;
        // font-weight: 600;
        color: red;
        margin: 10px 0 20px 0;
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
