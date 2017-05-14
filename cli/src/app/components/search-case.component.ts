import { Component, Input, OnInit } from '@angular/core';
import { Case } from '../model/case';
import { Router } from '@angular/router';
import { CaseService } from '../services/case.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
    selector: 'search-case',
    templateUrl: '../templates/search-case.component.html',
    /*
    ** injection de dépendance du mode d'emploi
    ** du service au component.
    */
    providers: [
        CaseService,
        ErrorHandlerService,
    ]
})

/*
** L'idée ici c'est d'utiliser un des 
** hook fournis par angular (cf: discord/mean_sources)
** on import et on inclus OnInit qui permet d'interfacer
** ngOnInit() et d'inclure de la logique à l'initialisation
** du component. En gros; on fait un GET /cases quand ça s'allume...
** l'interfaçage est optionnel (oh lol) mais renforce le typing du ts
** bonne pratique...
*/
export class SearchCaseComponent implements OnInit {
    search: string;
    searchedCases: Case[];
    searchedCase: Case;
    /*
    ** syntaxe type de la déclaration d'un service
    */
    constructor(
        private caseService: CaseService,
        private router: Router,
        private errorHandler: ErrorHandlerService,
    ){}

    ngOnInit(): void {
        this.search = 'keyword?'
        this.caseService.getCases()
            .then(cases => this.searchedCases = cases)
            .catch(this.errorHandler.handlePromise)
    }

    /*
    ** Lorsque l'utilisateur clique sur search,
    ** le contenu de l'input bindé avec cette classe (this.search)
    ** est envoyé sur /cases côté Angular2
    ** (attention, ce n'est pas un GET sur /cases!, c'est le routing
    ** interne d'angular!). Dans le mean-routing.module.ts, on voit que 
    ** sur /cases/:param, angular appel le case-detail.components.ts
    ** ce derniers implémente une méthode ngOnInit qui écoute le paramètre
    ** /:param et fait la requête à l'api au travers du service
    ** case.service.ts.  (Voir case-detail.component.ts)
    */
    searchCase(): void {
        this.router.navigate(['/cases', this.search])
    }

    /*
    ** appel au service case.service.ts pour récupérer tout les cases
    */
    getCases(): void {
        this.caseService.getCases()
            .then(cases => this.searchedCases = cases)
            .catch(this.errorHandler.handlePromise)
    }
}
