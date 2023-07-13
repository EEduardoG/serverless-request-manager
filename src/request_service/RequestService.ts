import jwt_decode from "jwt-decode";
import { IEvent } from "../interfaces/IEvent";
import IRequestServicePort from "../ports/IRequestServicePort";
import { ITokenDecoded } from "../interfaces/ITokenDecoded";


export default class RequestService implements IRequestServicePort {

    constructor() { }



    setEvent(event: any): IEvent {

        let requestEvent: IEvent = {
            payload: this.setPayload(event?.body),
            queryParams: this.setQueryParams(event),
            token: this.setToken(event.headers.authorization),
            eventExecutionData: this.setEventExecutionData(event),
            eventRaw: event
        }

        return requestEvent

    }


    setEventExecutionData(event: any) {
        return event?.requestContext ? event?.requestContext : null
    }


    setPayload(payload: any = {}): KeyString | null {
        let response: KeyString | null = null;
        try {
            response = JSON.parse(payload)
        } catch (error) {
            response = payload ? payload : null;
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

    getEvent(event: any): KeyString | null {
        let query: KeyString | null = null;

        if (event.queryStringParameters) {
            try {
                query = JSON.parse(event.queryStringParameters)
            } catch (error) {
                query = event?.queryStringParameters ? event?.queryStringParameters : null;
            }
        }
        return query
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