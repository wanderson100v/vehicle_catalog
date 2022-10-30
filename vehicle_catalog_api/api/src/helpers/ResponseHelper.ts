import { Response } from "express";

export enum Success{
    Ok=200,
    Created=201,
    Accepted=202,
}

export enum ClienteError {
    BadRequest= 400,
    Unauthorized=401,
    NotFound=404,
}

export enum ServerError {
    InternalServerError= 500,
}

export enum ResponseType{
    Succsess = 'success', 
    Error = 'error', 
}

type ResponseCode = Success | ClienteError | ServerError; 

export interface CustomResponse{
    type:ResponseType
    code: ResponseCode;
    message: string;
}

export class ResponseHelper{

    public static makeResponse(res: Response, code: ResponseCode, type:ResponseType,  message:string){
        res.status(code).json({
            type: type,
            message: message
        });
    }

    public static checkExistsAndSend(res: Response, customResponse: any): boolean{
        if ('type' in customResponse && 'code' in customResponse && 'message' in customResponse){
            customResponse = (customResponse as CustomResponse)
            ResponseHelper.makeResponse(res, customResponse.code, customResponse.type, customResponse.message)
            return true;
        }
        return false;
    }

    public static clienteError(res:Response, errorCode: ClienteError, message:string){
        ResponseHelper.makeResponse(res, errorCode,ResponseType.Error, message);
    }

    public static serverError(res:Response, errorCode: ServerError, message:string){
        ResponseHelper.makeResponse(res, errorCode,ResponseType.Error, message);
    }


    public static success(res:Response, successCode: Success, message:string){
        ResponseHelper.makeResponse(res, successCode,ResponseType.Succsess, message);
    }

    public static dataList(res:Response, dataList:any){
        res.status(Success.Ok).json({
            items: dataList
        });
    }

    public static data(res:Response, data:any){
        res.status(Success.Ok).json({
            data: data
        });
    }
}