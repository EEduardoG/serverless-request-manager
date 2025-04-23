export interface IEvent {
    payload: any,
    queryParams: any,
    token: any,
    requestContext: any,
    eventRaw: any
    type?:string
}