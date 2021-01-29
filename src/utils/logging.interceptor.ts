import { ExecutionContext, CallHandler, Injectable, NestInterceptor, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import Web3 from 'web3';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    constructor(
    ) {}

    async intercept( context: ExecutionContext, next: CallHandler ): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();
        const data:any = JSON.parse(req.query.body.toString());
        const web3 = new Web3();
        const account = await web3.eth.accounts.recover(data.signature);
        if(account != data.messageData.from){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return next.handle();
    }
}

@Injectable()
export class PhotoLoggingInterceptor implements NestInterceptor {

    constructor(
    ) {}

    async intercept( context: ExecutionContext, next: CallHandler ): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();
        const data:any = req.body;
        const web3 = new Web3();
        const account = await web3.eth.accounts.recover(JSON.parse(data.signature));
        if(account != data.from){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        
        return next.handle();
    }
}

@Injectable()
export class PutLoggingInterceptor implements NestInterceptor {

    constructor(
    ) {}

    async intercept( context: ExecutionContext, next: CallHandler ): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();
        const data:any = req.body;
        const web3 = new Web3();
        const account = await web3.eth.accounts.recover(data.signature);
        if(account != data.messageData.from){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return next.handle();
    }
}

