
<template>
    <el-form-item :label="item.label" :prop="item.key">
        
        <div class="all-select w">
            <el-popover popper-class="all-select-popover" :teleported="false" trigger="click" :width="item.width?item.width:item.children?.length*120" ref="popoverRef" tabindex="1">
                <template #reference>
                    <div class="org_form_input">
                        <div class="all-select-input border pointer b_radius pl10 h32 relative" @click="show=true">
                            <template style="display:block;">
                                <div v-show="formData[item.key]?.length>0">
                                    <span>已选择{{formData[item.key]?.length || 0}}个</span>
                                    <el-icon class="all-select-input-icon positionCr" style="right: 4px" @click.stop="clear">
                                        <CircleClose/>
                                    </el-icon>
                                </div>
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
                        <div class="a_s_navs tw" :style="{background: item.children.length === 1 ? 'none': undefined }">
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
                            <el-checkbox class="a_s_c_nav" v-for="city in item.children?.[activeIndex]?.children" :disabled="item.children?.[activeIndex]?.[disabled] || city?.disabled" :key="city" :label="city?.[value]"> {{ city?.[label] }}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                
                </div>
            </el-popover>
        </div>
    </el-form-item>
</template>

<script setup lang="ts">
import {commonApi} from "@/api/common";
import {useStore} from "vuex";
import {nextTick} from "@vue/runtime-core";
let {proxy} = getCurrentInstance()


interface Item {
    key: string,
    label: string,
    filter: string,
    placeholder: string,
    returnObjectInArray: boolean, // 返回数组（key值存储）里面的每一项是否是对象
    returnObjectKeys: string[], // [0]是存放大类值字段，[1]是存放子类值字段
    children: string[], // 大类字段
    mutex: boolean, // 大类互斥字段，即同时只能选一个大类
    width: number,
    data: object[],
    params: object,
    props: object,
    method: string,
    url: string,
}

// @ts-ignore
const {formData, item} = defineProps<{
    formData: Object,
    item: Item
}>()
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
    if(item.filter){
        const store = useStore()
        item.children = store.getters.oEnumerate[item.filter].list
        nextTick(()=>{
            initChildren()
        })
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
    // console.log(item.children, 'item.children')
    item.children.forEach((tag, i)=> {
        let arr = [], status = true, isIndeterminate = false;
        if(!tag.children) return
        tag.checkedCities = []
        tag.children.forEach((t)=>{
            let val = t[value]
            if(formData[item.key].includes(val)){
                tag.checkedCities.push(val)
                isIndeterminate = true
            } else {
                status = false
            }
            arr.push(val)
        })
        // console.log(i, activeIndex, 'activeIndex')
        // if(i === activeIndex) {
        //     tag.disabled = true
        // }
        tag.cities = arr
        tag.isIndeterminate = status?false:isIndeterminate
        tag.checkAll = status
    })
}

const handleCheckAllChange = (val: boolean, i) => {
    if(item.children[i].disabled) {
        return
    }
    index = i
    val = item.children[i].checkAll
    // cities = proxy.$_.map(item.children[i], value);
    // item.children[i].checkedCities = val ? item.children[i].cities : []
    // console.log(cities, 'cities')
    cities = proxy.$_.map(item.children[i].children, value);
    item.children[i].checkedCities = val ? cities : []
    item.children[i].isIndeterminate = false
    changeAll()
    disabledOthers(item.children[i])
}
/**
 * @description 禁止与child并列的其他项
 * @param child 当前选中的大类
 *
 */
const disabledOthers = (child) => {
    console.log(child, 'disabledOthers')
    if(!item.mutex){
        return
    }
    item.children = item.children.map(it => {
        if(child.value !== it.value) {
            if(child.checkedCities.length === 0) {
                it.disabled = false
            } else {
                it.disabled = true
            }
        }
        return it
    })
}

const handleCheckedCitiesChange = (value) => {
    // console.log(item.children[activeIndex], value, 'handleCheckedCitiesChange')
    const checkedCount = value.length
    // console.log(item.children[0]);
    // console.log(value, item.children[activeIndex].value);
    item.children[activeIndex].checkAll = checkedCount === item.children[activeIndex].cities.length
    item.children[activeIndex].isIndeterminate = checkedCount > 0 && checkedCount < item.children[activeIndex].cities.length
    changeAll()
    disabledOthers(item.children[activeIndex])
}



const changeAll = ()=>{
    let arr = []
    // let lists = proxy.$_.mapValues(item.children, 'cities')
    let lists = proxy.$_.mapValues(item.children, 'checkedCities')
    // console.log(lists,item.children, index, 111);
    proxy.$_.forEach(lists, (it,k)=>{
        if (item.returnObjectInArray) {
            it.forEach(itc => {
                let temp:object = {}
                temp[item.returnObjectKeys[0]] = item.children[k].value
                temp[item.returnObjectKeys[1]] = itc
                arr.push(temp)
            })
        } else {
            arr = [...arr, ...it]
        }
    })
    formData[item.key] = arr
}

const showActive = (i)=>{
    activeIndex = i
}

const clear = ()=>{
    formData[item.key] = []
    if(item.mutex) {
        // 有互斥选项的需要清除item.children的disabled属性
        item.children = item.children.map(it => {
            it.disabled = false
            return it
        })
    }
}
watch(()=>formData[item.key], (val:any)=>{
    if(val.length == 0){
        initChildren()
    }
})
</script>

<style scoped lang="scss">
.all-select-centent {
    .a_s_navs {
        background: var(--el-fill-color-light);
        .a_s_nav { padding: 10px;margin-right: 10px}
        .active { background: var(--el-bg-color); }
    }
    .a_s_c_navs {
        :deep(.el-checkbox) {
            width: 200px;
        }
    }
    template {
        display: inline-block;
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
