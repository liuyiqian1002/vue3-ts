export interface EventItem {
    alarmEventId: number
    alarmLevel: number
    alarmLevelString: string
    alarmSubsetLevel: number
    alarmTypeCode: string
    alarmTypeName: string
    cityId: number
    cityName: string
    companyId: number
    companyName: string
    districtId: number
    districtName: string
    driverWarningType: string | number | null
    eventDesc: string
    eventEndTime: string
    eventId: string
    eventOriginalTime: string
    eventPersistSeconds: number
    eventStartDate: string
    eventStartTime: string
    eventStatus: number
    eventStatusString: string
    hasManual: number
    hasManualString: string
    operatorId: number
    operatorName: string
    persistTimeZH: string
    plateColorCode: string
    plateColorStr: string
    plateNum: string
    vehicleId: number
    vehicleCode: string
    vehicleOperateTypeName: string
    gpsTime: string
}
export interface SummaryInfo {
    operateTypeName: string //营运类型
    plateNum: string //车牌号
    alarmLevelString: string //报警级别
    alarmTypeName: string //报警类型
    eventStatusString: string //状态
    hasManualString: string //是否处理
    originalTime: string //行驶开始时间
    startTime: string //开始时间
    endTime: string //结束时间
    durationStr: string //持续时间
    companyName: string //企业信息
}
export interface Res<T> {
    rows?: Array<T>
    lists?: Array<T>
}
