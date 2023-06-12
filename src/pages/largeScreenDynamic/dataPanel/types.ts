import { AxiosResponse } from "axios"

export interface AlarmListItem {
    subTypeCode: number
    subTypeCodeName: string
    processingRate: string
    count: number,
    title?: string
}
export interface SafetySignBoardRes extends AxiosResponse {
    signBoardDtos: []
    alarmCount: number
}