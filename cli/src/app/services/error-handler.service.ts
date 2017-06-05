import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {
    
    public handlePromise(error: any): Promise<any> {
        console.error('An error occurred: ', error.message);
        return Promise.reject(error.message || error)
    }

    public handleError(error: any): any {
        console.log(error)
        return error;
    }
}
