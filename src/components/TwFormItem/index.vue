

<script lang="tsx">
export default {
    name: 'FormItem',
    props: {
        lists: {type: Array, default: ()=>[],},
        row: {type: Object, default: ()=>{},},
        labelWidth: {type: String, default: '100px',},
        size: {type: String, default: '',},
        mb: {type: String, default: '4px',},
    },
    render(h) {
        const { lists, row, labelWidth, size } = h
        const vnodes = []
        vnodes.push(
            <el-form class="pr20" label-position="right" size={size} label-width={labelWidth}>
                <el-row class="tw-row">
                    {lists.map((item,i)=>{
                        let str = row[item.key]
                        return <el-col span={item.col || 12} offset={item.offset || 0}>
                            <el-form-item class="w" label={item.label}  v-slots={{label:()=>item.customLabel?item.customLabel(row):item.lable}}>
                                <div className="tw-form-item line-clamp w">{!item.formatter?(str || '-'):(item.formatter(row))}</div>
                            </el-form-item>
                        </el-col>
                    })}
                </el-row>
            </el-form>
        )
        return vnodes
    },
}
</script>

<style lang="scss" scoped>
.tw-row {
    
    :deep(.el-form-item) {
        margin-bottom: v-bind(mb);
        .el-form-item__content {
            width: calc(100% - 100px) ;color: var(--el-menu-text-color);
        }
    }
}
</style>
