<template>
    <!--  数据交互的过程中因为js存储和修改限制，所以跳过vue官方推荐的一对一的数据传递形式，选用了obj传递  -->
    <el-form
        ref="formDataRef"
        :model="formData"
        :rules="rules"
        :label-width="labelWidth"
        class="ruleForm form_reset_css relative"
        :size="formSize"
        status-icon
        :style="`height:${showFlag?48: formHeight}px;border-bottom: 1px solid var(--tw-color-border)`"
    >
        <!--    公共form集成区域    -->
        <div class="tw" ref="formContent">
            <div class="tw_form_content" :style="!isFormBnts?'width: 100%':''" :span="20">
                <el-row>
                    <template v-if="lists.length<=foldNumber">
                        <el-col v-for="(item, i) in lists" :key="i" :span="item.col || 6" :offset="item.offset || 0">
                            <!--                            <el-form-item :label="item.label" :prop="item.type=='esDate'?'':item.key" :tabindex="i">-->
                            <component ref="allFormItem" :is="objComponent[item.type] || objComponent['twInput']" :formData="formData" :tabindex="i"
                                       :item="item" @txtChange="submitForm(formDataRef)" @tapClick="tapClick"></component>
                            <!--                            </el-form-item>-->
                        </el-col>
                    </template>
                    <template v-else>
                        <el-col v-for="(item,i) in foldNumber" :key="i" :span="lists[i].col || 6" :offset="lists[i].offset || 0">
                            <!--                            <el-form-item :label="lists[i].label" :prop="lists[i].type=='esDate'?'':lists[i].key" :tabindex="i">-->
                            <component ref="allFormItem" :is="objComponent[lists[i].type] || objComponent['twInput']" :formData="formData"  :tabindex="i"
                                       :item="lists[i]" @txtChange="submitForm(formDataRef)" @tapClick="tapClick"></component>
                            <!--                            </el-form-item>-->
                        </el-col>
                        <transition name="el-zoom-in-top">
                            <el-col :span="24" v-show="!showFlag">
                                <el-row>
                                    <el-col v-for="(item, i) in lists.length-foldNumber" :key="i" :span="lists[i+foldNumber].col || 6" :offset="lists[i+foldNumber].offset || 0">
                                        <!--                                        <el-form-item :label="lists[i+foldNumber].label" :prop="lists[i+foldNumber].type=='esDate'?'':lists[i+foldNumber].key" :tabindex="i">-->
                                        <component ref="allFormItem" :is="objComponent[lists[i+foldNumber].type] || objComponent['twInput']" :formData="formData" :item="lists[i+foldNumber]" @txtChange="submitForm(formDataRef)" @tapClick="tapClick" :tabindex="i"></component>
                                        <!--                                        </el-form-item>-->
                                    </el-col>
                                </el-row>
                            </el-col>
                        </transition>
                    </template>
                </el-row>
            </div>
            <div class="tw_form_btns" v-if="isFormBnts">
                <div class="form_btns tw_cr">
                    <div class="pr20">
                        <el-button icon="Search" type="primary" @click="submitForm(formDataRef)">搜索</el-button>
                        <el-button icon="Refresh" @click="resetForm(formDataRef)"></el-button>
                        <el-button v-if="lists.length>foldNumber" icon="Filter" @click="onShowAllForm"></el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import twInput from "./components/twInput/index.vue"
import TwSelect from "./components/twSelect/index.vue"
import twDate from "./components/twDate/index.vue"
import twDate1 from "./components/twDate1/index.vue"
import twTime from "./components/twTime/index.vue"
import twSwitch from "./components/twSwitch/index.vue"
import twCheckbox from "./components/twCheckbox/index.vue"
import twRadio from "./components/twRadio/index.vue"
import twCascader from "./components/twCascader/index.vue"
import twEsDate from "./components/twEsDate/index.vue"
import twEsNumber from "./components/twEsNumber/index.vue"
import twOrg from "./components/twOrg/index.vue";
import twAllSelect from "./components/twAllSelect/index.vue";

interface ExtraFieldItem {
    key: string,
    value?: any
}

// @ts-ignore
let { proxy } =  getCurrentInstance()
// @ts-ignore
let {lists, rules, formData, extraField, labelWidth, isFormBnts, beforeChange} = defineProps({
    lists: {type: Array, default: () => []},
    foldNumber: { type: Number, default: 4},
    rules: Object,
    formData: Object,
    extraField: Array<ExtraFieldItem>,
    labelWidth: { type: String, default: '120px'},
    isFormBnts: { type: Boolean, default: true},
    beforeChange: { type: Function}
})

// @ts-ignore
let objComponent = shallowRef({
    'twInput': twInput,
    'select': TwSelect,
    'date': twDate,
    'date1': twDate1,
    'time': twTime,
    'switch': twSwitch,
    'checkbox': twCheckbox,
    'radio': twRadio,
    'cascader': twCascader,
    'esDate': twEsDate,
    'org': twOrg,
    'allSelect': twAllSelect,
    'esNumber': twEsNumber,
    
})

// @ts-ignore
const formSize = $ref('default')
// @ts-ignore
const formDataRef = $ref(null)
// @ts-ignore
let showFlag = $ref(true)
// @ts-ignore
let formContent = $ref(null)
// @ts-ignore
let formHeight = $ref(null)
// @ts-ignore
const allFormItem = $ref(null)
// @ts-ignore
const emits = defineEmits(['submitForm', 'onFormflag', 'changeOrg', 'reset', 'orgChange', 'selectChange', 'dateChange', 'checkChange', 'timeChange', 'resetForm'])
// 提交-搜索
const submitForm = async (formEl) => {
    if (!formEl) return
    // @ts-ignore
    formEl.validate((valid) => {
        if (valid) {
            if(beforeChange){
                beforeChange(formData)
            }else {
                emits('submitForm', formData)
            }
        } else {
            // @ts-ignore
            ElMessage.error('这是错误输入')
        }
    })
}

// 分发组件内部事件
const tapClick = (key, data: {resetIndex:any})=>{
    switch (key) {
        case 'reset': {
            allFormItem[data.resetIndex].reset()
        }
    }
    emits(key, data)
}

// 展开折叠
const onShowAllForm = async ()=>{
    showFlag = !showFlag
    // @ts-ignore
    nextTick(()=>{
        setHeight().then(()=>{
            emits('onFormflag', showFlag)
        })
    })
}

const setHeight = ()=>{
    return new Promise((resolve, reject)=>{
        // if(proxy.$_.isNull(formHeight)) formHeight = formContent.$el.clientHeight
        if(proxy.$_.isNull(formHeight)) formHeight = formContent.clientHeight
        resolve(formHeight)
    })
}

// 重置form
const resetForm = (formEl) => {
    if (!formEl) return
    formDataRef.resetFields()
    emits('resetForm', formData)
    // 额外字段重置需清空
    if (extraField) {
        extraField.map(field => {
            formData[field.key] = field.value
        })
    }
}

</script>

<style scoped lang="scss">
.ruleForm {
    //.form_btns { width: calc(100% - 40px);}
    .tw_form_content { width: calc(100% - 240px); }
    .tw_form_btns { width: 240px; }
}
</style>
