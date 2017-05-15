import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {
    public handlePromise(error: any): Promise<any> {
        /*
        ** gestion basique des erreurs, on affichera
        ** une erreur propre dans le client en temps voulu.
        */
        console.error('An error occurred: ', error.message);
        return Promise.reject(error.message || error)
    }
}
