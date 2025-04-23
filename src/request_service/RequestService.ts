import jwt_decode from "jwt-decode";
import { IEvent } from "../interfaces/IEvent";
import IRequestServicePort from "../ports/IRequestServicePort";
import { ITokenDecoded } from "../interfaces/ITokenDecoded";


export default class RequestService implements IRequestServicePort {

    constructor() { }

    setEvent(event: any,type?:string): IEvent {
        let requestEvent: IEvent = {
            payload: this.setPayload(event),
            queryParams: this.setQueryParams(event),
            token: this.setToken(event?.headers?.authorization ? event?.headers?.authorization : event?.headers?.Authorization),
            requestContext: this.setRequestContext(event),
            eventRaw: event,
            type:type
        }
        return requestEvent
    }

    setRequestContext(event: any) {
        return event?.requestContext ? event?.requestContext : null
    }

    setPayload(event: any = {}): KeyString | null {
        let response: KeyString | null = null;

        if(event?.body){
            try {
                response = JSON.parse(event)
            } catch (error) {
                response = event ? event : null;
            }
        }else{
            try {
                response = JSON.parse(event)
            } catch (error) {
                response = event ? event : null;
            }
        }

        return response;
    }


    setQueryParams(event: any): KeyString | null {
        //Declare queryParams variable as key value object
        let queryParams: KeyString = {}

        try {
            queryParams = JSON.parse(event.queryStringParameters)
        } catch (error) {
            queryParams = event?.queryStringParameters ? event?.queryStringParameters : null;
        }
        return queryParams;
    }


    setToken(token: string | undefined = undefined): ITokenDecoded | null {
        if (token) {
            try {
                let deserialize: any = token.replace("Bearer ", "")
                deserialize = jwt_decode(token)
                let userName = deserialize?.username ? deserialize?.username : deserialize["cognito:username"]
                return { deserialize, token, userName }
            } catch (error) {
                return null
            }
        } else {
            return null
        }

    }

}