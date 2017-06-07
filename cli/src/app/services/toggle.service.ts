import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Agent }      from '../model/agent';

/*
** Plus utilisé dans le projet, je laisse l'exemple
** En injectant ce service, on peut accéder à ses
** variables et donc faire bouger editPanel avec la
** fonction toggleEditPanel par exemple.
** Dans un autre component, on peut écouter 
** editPanelToggled$ et récupérer 'action'
** Cela permet de déclencher des évênement d'un composant vers l'autre.
*/
@Injectable()
export class ToggleService {
    private alert = new Subject<string>()
    private user = new Subject<Agent>()
    private awaiting = new Subject<boolean>() 

    alertToggled$ = this.alert.asObservable()
    userToggled$ = this.user.asObservable()
    awaitingToggled$ = this.awaiting.asObservable()

    toggleAlert(alert: string) {
        console.log("toggle edit panel from toggle service")
        this.alert.next(alert)
    }

    toggleUser(user: Agent) {
        console.log("toggle on user")
        this.user.next(user)
    }

    toggleAwaiting(awaiting: boolean){
        console.log("toggle awaiting")
        this.awaiting.next(awaiting)
    }
}