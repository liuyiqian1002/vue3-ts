<template>
    <!--  数据交互的过程中因为js存储和修改限制，所以跳过vue官方推荐的一对一的数据传递形式，选用了obj传递  -->
    <el-form ref="formDataRef" :model="formData" :rules="rules" :label-width="labelWidth"
        :label-position="labelPosition" class="form_reset_css relative" :size="formSize" status-icon>

        <!--    公共form集成区域    -->
        <el-row ref="formContent" :gutter="gutter">
            <template v-for="(item, i) in lists" :key="i">
                <el-col v-if="!item.hide" :span="item.col || 24" :offset="item.offset || 0" :push="item.push || 0"
                    :pull="item.pull || 0">
                    <el-form-item v-if="item.slot" :label="item.label" :prop="item.key">
                        <slot :name="item.key"></slot>
                    </el-form-item>
                    <component v-else ref="allFormItem" :is="objComponent[item.type] || objComponent['twInput']"
                        :formData="formData" :item="item" :lists="lists" @tapClick="tapClick"></component>
                </el-col>
            </template>
        </el-row>
        <div class="form_btns tw_c mt30" v-if="showBtns">
            <el-button @click="resetForm(formDataRef)">{{ cancelBtn }}</el-button>
            <el-button type="primary" :loading="loading" @click="submitForm(formDataRef)">{{ confirmBtn }}</el-button>
        </div>
    </el-form>

</template>

<script setup lang="ts">

import twInput from "./components/twCustomInput/index.vue"
import TwSelect from "./components/twCustomSelect/index.vue"
import twDate from "./components/twCustomDate/index.vue"
import twTime from "./components/twCustomTime/index.vue"
import twSwitch from "./components/twCustomSwitch/index.vue"
import twCheckbox from "./components/twCustomCheckbox/index.vue"
import twRadio from "./components/twCustomRadio/index.vue"
import twCascader from "./components/twCustomCascader/index.vue"
import twEsDate from "./components/twCustomEsDate/index.vue"
import twOrg from "./components/twCustomOrg/index.vue"
import twAllSelect from "./components/twCustomAllSelect/index.vue"

// @ts-ignore
let { proxy } = getCurrentInstance()
// @ts-ignore
let { lists, rules, formData, loading, gutter, showBtns, cancelBtn, confirmBtn, labelWidth, labelPosition, beforeChange } = defineProps({
    lists: { type: Array, default: () => [] },
    rules: Object,
    formData: Object,
    loading: { type: Boolean, default: () => false },
    gutter: { type: Number, default: () => 0 },
    showBtns: Boolean,
    labelWidth: { type: String, default: '120px' },
    labelPosition: { type: String, default: 'right' },
    cancelBtn: { type: String, default: '重置' },                      // 取消按钮自定义文字配置
    confirmBtn: { type: String, default: '保存' },                     // 保存按钮自定义文字配置
    beforeChange: { type: Function}
})

// @ts-ignore
let objComponent = shallowRef({
    'twInput': twInput,
    'select': TwSelect,
    'date': twDate,
    'time': twTime,
    'switch': twSwitch,
    'checkbox': twCheckbox,
    'radio': twRadio,
    'cascader': twCascader,
    'esDate': twEsDate,
    'org': twOrg,
    'allSelect': twAllSelect,
})

// @ts-ignore
const allFormItem = $ref(null)
// @ts-ignore
const formSize = ref('default')
// @ts-ignore
const formDataRef = $ref(null)


// @ts-ignore
const emits = defineEmits(['save', 'colse', 'onFormflag', 'changeOrg', 'reset', 'orgChange', 'selectChange', 'checkChange', 'timeChange', 'dateChange'])
// 提交-搜索
const submitForm = () => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        formDataRef.validate((valid) => {
            if (valid) {
                // @ts-ignore
                resolve(formData)
                if(beforeChange){
                    beforeChange(formData)
                }else {
                    emits('save', formData)
                }
                // emits('save', formData)
            } else {
                // @ts-ignore
                // ElMessage.error('这是错误输入')
                reject('err')
            }
        })
    })

}

// 分发组件内部事件
const tapClick = (key, data) => {
    switch (key) {
        case 'reset': {
            allFormItem[data.resetIndex].reset()
        }
    }
    emits(key, data)
}

// 重置form
const resetForm = (formEl) => {
    if (!formEl) return
    formDataRef.resetFields()   // 如果不填写checkbox的情况重置会有隐性的缺陷
    // @ts-ignore
    // formDataRef.value.clearValidate()
    emits('colse')
}

const clearValidate = () => {
    formDataRef.clearValidate()
}
defineExpose({ submitForm, resetForm, clearValidate })
</script>

<style scoped lang="scss">
.ruleForm {
    //background: #fff;
    min-height: 110px;

    .form_btns {
        z-index: 99;
        width: calc(100% - 40px);
        padding-bottom: 16px
    }
}
</style>
