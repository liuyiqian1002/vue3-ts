interface TypeProp {
}

export interface ColumnProps {
	type: TypeProp; // index | selection | expand（特殊类型）
	prop: string; // 单元格数据（非特殊类型必填）
	label: string; // 单元格标题（非特殊类型必填）
	width: number | string; // 列宽
	minWidth: number | string; // 最小列宽
	isShow: boolean; // 是否显示在表格当中
	sortable: boolean; // 是否可排序（静态排序）
	fixed: string; // 固定列
	tag: boolean; // 是否是标签展示
	image: boolean; // 是否是图片展示
	search: boolean; // 是否为搜索项
	searchType: string | number | boolean | any[]; // 搜索项类型
	searchProps: { [key: string]: any }; // 搜索项参数，根据 element 文档来，标签自带属性 > props 属性
	searchInitParam: string | number | boolean | any[]; // 搜索项初始值
	renderHeader: (params: any) => any; // 自定义表头
}


export interface HeadBtnsItem {
	click?: Function // 按钮点击事件
	name?: string // 按钮文字
	icon?: string // 按钮图标
	type?: string // btn 类型, 目前只拓展了switch
	value?: any // switch模式是绑定的值
	width?: number // switch的宽度
	formatter?: Function // jsx渲染函数
	activeText?: string  // switch激活状态文字
	inactiveText?: string // switch非激活状态文字
	change?: Function // switch变化函数
}