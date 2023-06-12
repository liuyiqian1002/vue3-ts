<template>
    <div id="car_management">
        <tw-dialog :title="title" width="700px" height="500px" v-model="dialogFlag">
            <div class="tw_c">
                <el-form
                    ref="ruleFormRef"
                    status-icon
                    label-width="130px"
                >
                    <el-form-item label="自动设置重点关注">
                        <el-radio-group v-model="ruleForm.pass">
                            <el-radio :label="3">启用</el-radio>
                            <el-radio :label="6">停用</el-radio>
                        </el-radio-group>
                        <span class="ml30 tw_cl el-link el-link--info" style="cursor: default">
                            <el-icon><Warning /></el-icon>
                            以昨日：00:00:00-23:59:59 共24小时内
                        </span>
                    </el-form-item>
                    <el-form-item label="">
                        <el-row class="w mb20">
                            <el-col :span="12" class="tw_cl">
                                <el-checkbox v-model="ruleForm.status" ></el-checkbox>
                                <span class="ml10">所有报警量><el-input class="w60 mr10 ml10" v-model="ruleForm.age" :disabled="!ruleForm.status"></el-input>次</span>
                            </el-col>
                            <el-col :span="12" class="tw_cl">
                                <el-checkbox v-model="ruleForm.status" ></el-checkbox>
                                <span class="ml10">主动安全报警量><el-input class="w60 mr10 ml10" v-model="ruleForm.age" :disabled="!ruleForm.status"></el-input>次</span>

                            </el-col>
                        </el-row>
                        <el-row class="w mb20">
                            <el-col :span="12" class="tw_cl">
                                <el-checkbox v-model="ruleForm.status" ></el-checkbox>
                                <span class="ml10">超速报警量><el-input class="w60 mr10 ml10" v-model="ruleForm.age" :disabled="!ruleForm.status"></el-input>次</span>
                            </el-col>
                            <el-col :span="12" class="tw_cl">
                                <el-checkbox v-model="ruleForm.status" ></el-checkbox>
                                <span class="ml10">生理疲劳报警量><el-input class="w60 mr10 ml10" v-model="ruleForm.age" :disabled="!ruleForm.status"></el-input>次</span>
                            </el-col>
                        </el-row>
                        <el-row class="w mb20">
                            <el-col :span="12" class="tw_cl">
                                <el-checkbox v-model="ruleForm.status" > </el-checkbox>
                                <span class="ml10">疲劳报警量><el-input class="w60 mr10 ml10" v-model="ruleForm.age" :disabled="!ruleForm.status"></el-input>次</span>
                            </el-col>
                            <el-col :span="12" class="tw_cl">
                                <el-checkbox v-model="ruleForm.status" ></el-checkbox>
                                <span class="ml10">驾驶辅助报警量><el-input class="w60 mr10 ml10" v-model="ruleForm.age" :disabled="!ruleForm.status"></el-input>次</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">
defineProps({
    title: String,
})
let dialogFlag = $ref(false)
let ruleFormRef = $ref(null)
let formEl = $ref(null)

const viewData = () => {
    dialogFlag = true
}

const ruleForm = reactive({
    pass: '',
    status: true,
    age: '',
})

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

defineExpose({ viewData, })
</script>

<style scoped lang="scss">
#car_management {
    :deep(.el-transfer-panel) {
        height: 100%;
        .el-transfer-panel__body { height: calc(100% - 41px)}
    }
}
</style>
