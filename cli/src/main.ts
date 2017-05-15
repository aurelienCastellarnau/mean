import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MeanModule } from './app/mean.module';
import { environment } from './environments/environment';

/*
** Très simple pour passer en prod: 
** changer l'import à: 
** '[...] from './environnements/environment-prod';
*/
if (environment.production) {
  enableProdMode();
}

/*
** Ce fichier est le point d'entrée pour le transpileur
** on charge le module d'entrée de l'app.
** Dans ce module (MeanModule) on pourra appeller tout les
** modules du monde. Le module, c'est le bundle dans symfony,
** le namespace (plus ou moins...) dans php ou cpp. Bref
** le module c'est un ensemble de fonctionnalités (components)
** qui définit une app.
*/
platformBrowserDynamic().bootstrapModule(MeanModule);
