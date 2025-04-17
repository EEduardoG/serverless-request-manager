import { ExceptionCode, IException } from "../interfaces/IException";
import { IResponse } from "../interfaces/IResponse";
import { IResponseMin } from "../interfaces/IResponseMin";



abstract class AResponseService {

    response(statusCode: number = 200, data: any, code: string = "SUCCESS"): IResponse {
        let response: IResponse = {
            statusCode: statusCode,
            body: JSON.stringify(
                {
                    code: code,
                    message: data
                },
                null,
                2
            ),
        }

        return response;
    }

}

export default class ResponseService extends AResponseService {

    constructor() {
        super();
    }

    responseSuccess(params?: IResponseMin) {
        const parameters: IResponseMin = {
            data: params?.data ? params?.data : "Upload successfully.",
            code: params?.code ? params?.code : "SUCCESS"
        }
        return this.response(200, parameters.data, parameters.code);
    }

    responseBadRequest(params?: IResponseMin) {
        const parameters: IResponseMin = {
            data: params?.data ? params?.data : "Bad request.",
            code: params?.code ? params?.code : "BAD_REQUEST"
        }
        return this.response(400, parameters.data, parameters.code);
    }

    responseInternalError(params?: IResponseMin) {
        const parameters: IResponseMin = {
            data: params?.data ? params?.data : "Houston we have a problem!",
            code: params?.code ? params?.code : "INTERNAL_ERROR"
        }
        return this.response(500, parameters.data, parameters.code);
    }

    responseNotFound(params?: IResponseMin) {
        const parameters: IResponseMin = {
            data: params?.data ? params?.data : "Resource not found.",
            code: params?.code ? params?.code : "NOT_FOUND"
        }
        return this.response(404, parameters.data, parameters.code);
    }

    responseUnauthorized(params?: IResponseMin) {
        const parameters: IResponseMin = {
            data: params?.data ? params?.data : "You don't have permission to this resource",
            code: params?.code ? params?.code : "UNAUTHORIZED"
        }
        return this.response(401, parameters.data, parameters.code);
    }

    responseForbidden(params?: IResponseMin) {
        const parameters: IResponseMin = {
            data: params?.data ? params?.data : "You don't have permission to this resource",
            code: params?.code ? params?.code : "FORBIDDEN"
        }
        return this.response(403, parameters.data, parameters.code);
    }

    setException(e: IException | any) {

        if (e?.exceptionCode == undefined) {
            return this.responseInternalError();
        }

        let parameters: IResponseMin = {
            data: e?.data ? e.data : undefined,
            code: e?.code ? e.code : undefined
        }

        switch (e.exceptionCode) {
            case ExceptionCode.BAD_REQUEST:
                return this.responseBadRequest(parameters);
            case ExceptionCode.NOT_FOUND:
                return this.responseNotFound(parameters);
            case ExceptionCode.UNAUTHORIZED:
                return this.responseUnauthorized(parameters);
            case ExceptionCode.FORBIDDEN:
                return this.responseForbidden(parameters);
            default:
                return this.responseInternalError(parameters);

        }
    }

}