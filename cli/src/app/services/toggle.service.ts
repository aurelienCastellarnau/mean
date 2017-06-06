import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

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
    private editPanel = new Subject<boolean>()

    editPanelToggled$ = this.editPanel.asObservable()

    toggleEditPanel(action: boolean) {
        console.log("toggle edit panel from toggle service")
        this.editPanel.next(action)
    }
}