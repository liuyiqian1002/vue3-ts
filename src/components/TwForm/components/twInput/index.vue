<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-input class="w" v-model="formData[item.key]"
                  :maxlength="item.maxlength"
                  :minlength="item.minlength"
                  :showWordLimit="item.showWordLimit"
                  :placeholder="item.placeholder"
                  :showPassword="item.showPassword"
                  :disabled="item.disabled"
                  :size="item.size"
                  :prefixIcon="item.prefixIcon"
                  :suffixIcon="item.suffixIcon" :rows="item.rows"
                  :readonly="item.readonly"
                  :resize="item.resize"
                  :validateEvent="item.validateEvent"
                  :inputStyle="item.inputStyle"
                  :clearable="item.clearable !== false"
                  :show-password="item.showPassword"
                  @keyup.enter.native="txtChange"
        />
    </el-form-item>
</template>

<script setup lang="ts">
const { formData, item } = defineProps({
    formData: Object,
    item: Object
})
const emit = defineEmits(['update:name', 'txtChange'])

const txtChange = (val)=>{
    emit('txtChange', val)
}

</script>

<style scoped lang="scss">

</style>


<!--<template>-->
<!--    <el-input v-model="name" />-->
<!--    {{name}}-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--const { name } =  defineProps({-->
<!--    name:String-->
<!--})-->
<!--console.log(name);-->

<!--const emit = defineEmits(['update:name'])-->
<!--</script>-->

<!--<style scoped lang="scss">-->

<!--</style>-->
