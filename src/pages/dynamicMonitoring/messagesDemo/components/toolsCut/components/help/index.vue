<template>
    <div>
        <tw-dialog
            title="帮助"
            width="800px"
            v-model="drawerFlag"
        >
            <tw-table
                class="p0"
                ref="tableRef"
                showIndex
                :lists="mainData.data"
                :botHeight="120"
                :columns="mainData.columns"
                :showPagination="false"
            >
            </tw-table>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">
import { addOrUpdate } from '@/api/operation/operator/service'
import yizhuxiao from "@/assets/images/map/yizhuxiao.png"
import yizhuxiao_o from "@/assets/images/map/yizhuxiao_o.png"
import xingshizhong from "@/assets/images/map/xingshizhong.png"
import dingwei from "@/assets/images/map/dingwei.png"
import weidingwei from "@/assets/images/map/weidingwei.png"
import tingche from "@/assets/images/map/tingche.png"
import chuzuche from "@/assets/images/cars/chuzuche.png"
import puhuo from "@/assets/images/cars/puhuo.png"
import weiyun from "@/assets/images/cars/weiyun.png"
import gongjiache from "@/assets/images/cars/gongjiaoche.png"
import lvyoukeyun from "@/assets/images/cars/lvyoukeyun.png"
import chuzuche_o from "@/assets/images/cars/chuzuche_o.png"
import puhuo_o from "@/assets/images/cars/puhuo_o.png"
import weiyun_o from "@/assets/images/cars/weiyun_o.png"
import gongjiache_o from "@/assets/images/cars/gongjiaoche_o.png"
import lvyoukeyun_o from "@/assets/images/cars/lvyoukeyun_o.png"


let { proxy } = getCurrentInstance()
let mainData = reactive({
    data: [
        { status: true, img: yizhuxiao_o, msg: '离线'},
        { status: true, img: yizhuxiao, msg: '已注销'},
        { status: true, img: xingshizhong, msg: '在线（ACC开，有定位，有速度）'},
        { status: true, img: dingwei, msg: 'ACC关，定位正常'},
        { status: true, img: weidingwei, msg: 'ACC开，未定位'},
        { status: true, img: tingche, msg: '停车中（ACC开，速度为0）'},
        {img: chuzuche, msg: '在线-出租车'},
        {img: puhuo, msg: '在线-普货'},
        {img: weiyun, msg: '在线-危险品运输车'},
        {img: gongjiache, msg: '在线-公交车'},
        {img: lvyoukeyun, msg: '在线-班线客运、旅游客运'},
        {img: chuzuche_o, msg: '离线-出租车'},
        {img: puhuo_o, msg: '离线-普货'},
        {img: weiyun_o, msg: '离线-危险品运输车'},
        {img: gongjiache_o, msg: '离线-公交车'},
        {img: lvyoukeyun_o, msg: '离线-班线客运、旅游客运'},
    ],
    columns: [
        {prop: "img", label: "图标", renderHeader: (row)=>{
                return (<div className="tw_c">图标</div>)
            }, formatter: (row)=> {
                if(row.status){
                    return (<div className="tw_c"><el-image src={row.img} style="width: 16px; height: 16px"></el-image></div>)
                }else {
                    return (<div class="tw_c"><el-image src={row.img} style="width: 10px"></el-image></div>)
                }
            }
        },
        {prop: "msg", label: "说明" },
    ]
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)

const viewData = ()=>{
    drawerFlag = true
}

defineExpose({viewData})

</script>

<style scoped lang="scss">
</style>
