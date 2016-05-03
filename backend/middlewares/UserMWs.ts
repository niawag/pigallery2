
import {UserManager} from "../model/memory/UserManager";
import {NextFunction, Request, Response} from "express";
import {Error, ErrorCodes} from "../../common/entities/Error";
import {ObjectManagerRepository} from "../model/ObjectManagerRepository";
import {User} from "../../common/entities/User";

export class UserMWs {

    public static changePassword(req:Request, res:Response, next:NextFunction){
        if ((typeof req.body === 'undefined') || (typeof req.body.userModReq === 'undefined')
            || (typeof req.body.userModReq.id === 'undefined')
            || (typeof req.body.userModReq.oldPassword === 'undefined')
            || (typeof req.body.userModReq.newPassword === 'undefined')) {
            return next();
        }

        ObjectManagerRepository.getInstance().getUserManager().changePassword(req.body.userModReq, (err, result) =>{
            if ((err) || (!result)) {
                return next(new Error(ErrorCodes.GENERAL_ERROR));
            }

            return next();
        });
    }
    

    public static createUser(req:Request, res:Response, next:NextFunction){
        if ((typeof req.body === 'undefined') || (typeof req.body.newUser === 'undefined')) {
            return next();
        }

        ObjectManagerRepository.getInstance().getUserManager().createUser(req.body.newUser, (err, result) =>{
            if ((err) || (!result)) {
                return next(new Error(ErrorCodes.USER_CREATION_ERROR));
            }

            return next();
        });

    }

    public static deleteUser(req:Request, res:Response, next:NextFunction){
        if ((typeof req.params === 'undefined') || (typeof req.params.id === 'undefined')) {
            return next();
        }

        ObjectManagerRepository.getInstance().getUserManager().deleteUser(req.params.id, (err, result) =>{
            if ((err) || (!result)) {
                return next(new Error(ErrorCodes.GENERAL_ERROR));
            }


            return next();
        });

    }

    public static changeRole(req:Request, res:Response, next:NextFunction){
        if ((typeof req.params === 'undefined') || (typeof req.params.id === 'undefined')
            || (typeof req.body === 'undefined') || (typeof req.body.newRole === 'undefined')) {
            return next();
        }

        ObjectManagerRepository.getInstance().getUserManager().changeRole(req.params.id,req.body.newRole, (err) =>{
            if (err) {
                return next(new Error(ErrorCodes.GENERAL_ERROR));
            }

            return next();
        });
    }


    public static listUsers(req:Request, res:Response, next:NextFunction){
        ObjectManagerRepository.getInstance().getUserManager().find({}, (err, result:Array<User>) =>{
            if ((err) || (!result)) {
                return next(new Error(ErrorCodes.GENERAL_ERROR));
            }
            for(let i = 0; i < result.length; i++){
                result[i].password = "";
            }
            
            req.resultPipe = result;
            return next();
        });
    }
    



}