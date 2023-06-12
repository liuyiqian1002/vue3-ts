
<template>
    <el-form-item :label="item.label" :prop="item.key">
        
        <div class="all-select w">
            <el-popover popper-class="all-select-popover" :teleported="false" trigger="click" :width="item.children*120" ref="popoverRef" tabindex="1">
                <template #reference>
                    <div class="org_form_input">
                        <div class="all-select-input border pointer b_radius pl10 h32 relative" @click="show=true">
                            <template v-show="formData[item.key]?.length>0">
                                <span>已选择{{formData[item.key]?.length || 0}}个</span>
                                <el-icon class="all-select-input-icon positionCr" style="right: 4px" @click.stop="clear">
                                    <CircleClose/>
                                </el-icon>
                            </template>
                            <span class="all-select-input-text" v-show="formData[item.key]?.length==0">
                                {{item.placeholder || '请选择'}}
                            </span>
                        </div>
                        <!--                                            <el-input v-model="txt" placeholder="数据权限" disabled   />-->
                    </div>
                </template>
                <div class="all-select-centent">
                    <template v-if="showChildren && item.children[0]">
                        <div class="a_s_navs tw">
                            <div class="a_s_nav pointer" :class="i==activeIndex?'active':''" @click.native="showActive(i)" v-for="(tag, i) in item.children" :key="i">
                                <el-checkbox v-model="tag.checkAll" :disabled="tag?.[disabled]" :value="tag?.[value]" :indeterminate="tag?.isIndeterminate" @click.stop.native="handleCheckAllChange(event, i)"></el-checkbox>
                                {{tag?.[label]}}
                            </div>
                        </div>
                        <el-checkbox-group
                            v-model="item.children[activeIndex].checkedCities"
                            class="a_s_c_navs p20"
                            @change="handleCheckedCitiesChange"
                        >
                            <el-checkbox class="a_s_c_nav" v-for="city in item.children?.[activeIndex]?.children" :key="city" :label="city?.[value]"> {{ city?.[label] }}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                
                </div>
            </el-popover>
        </div>
    </el-form-item>
</template>

<script setup lang="ts">
import {commonApi} from "@/api/common";
let {proxy} = getCurrentInstance()
// @ts-ignore
const {formData, item} = defineProps({
    formData: Object,
    item: Object
})
item.data = item.data || {}

let loading = $ref(false)
let pageParams = {}
if(item.url){
    item.children = []
    loading = true
    let params = {}
    if(item.params){
        params = item.params
    }
    
    params = {...pageParams, ...params}
    commonApi(item.url, params, item.method).then(res=>{
        loading = false
        item.children = res
        // if(item.params.pageNumber){
        //     item.params.pageNumber++
        // }
        initChildren()
    }).catch(()=>{
        loading = false
    })
} else {
    if(!item.children){
        item.children = []
    }
}
// formData[item.key] = []

let show = $ref(false)
let showChildren = $ref(false)
let txt = $ref('')
let index = $ref(0)
let activeIndex = $ref(0)

let cities = []
let value = $ref(null)
let label = $ref(null)
let disabled = $ref(null)

value = item?.props?.value || 'value'
label = item?.props?.label || 'label'
disabled = item?.props?.disabled || 'disabled'


showChildren = true

const initChildren = ()=>{
    item.children.forEach((tag)=> {
        let arr = [], status = true, isIndeterminate = false;
        if(!tag.children) return
        tag.checkedCities = []
        tag.children.forEach((t)=>{
            let val = t[value]
            if(formData[item.key].includes(val)){
                tag.checkedCities.push(val)
                isIndeterminate = true
            }else {
                status = false
            }
            arr.push(val)
        })
        tag.cities = arr
        tag.isIndeterminate = status?false:isIndeterminate
        tag.checkAll = status
    })
}

const handleCheckAllChange = (val: boolean, i) => {
    index = i
    val = item.children[i].checkAll
    cities = proxy.$_.map(item.children[i], value);
    item.children[i].checkedCities = val ? item.children[i].cities : []
    item.children[i].isIndeterminate = false
    changeAll()
}
const handleCheckedCitiesChange = (value) => {
    const checkedCount = value.length
    console.log(item.children[0]);
    console.log(value);
    item.children[index].checkAll = checkedCount === item.children[index].cities.length
    item.children[index].isIndeterminate = checkedCount > 0 && checkedCount < item.children[index].cities.length
    changeAll()
}

const changeAll = ()=>{
    let arr = []
    // let lists = proxy.$_.mapValues(item.children, 'cities')
    let lists = proxy.$_.mapValues(item.children, 'checkedCities')
    console.log(lists);
    proxy.$_.forEach(lists, item=>{
        arr = [...arr, ...item]
    })
    formData[item.key] = arr
}

const showActive = (i)=>{
    activeIndex = i
}

const clear = ()=>{
    formData[item.key] = []
}

</script>

<style scoped lang="scss">
.all-select-centent {
    .a_s_navs {
        background: var(--el-fill-color-light);
        .a_s_nav { padding: 10px;margin-right: 10px}
        .active { background: var(--el-bg-color); }
    }
}
:deep(.all-select-popover) { padding: 0 }

.all-select-input {
    .all-select-input-icon { display: none;}
    .all-select-input-icon, .all-select-input-text { color: var(--el-text-color-placeholder) }
    &:hover {
        .all-select-input-icon { display: block; }
    }
}


</style>
