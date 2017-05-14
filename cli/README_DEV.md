Arborescence du client:

    cli/:   [dist] => out directory, généré au build
            [node_modules]
            [src] => notre code, l'app en elle même et le base url de la conf ts.
                        [app] => [components] => logique du front, finalement, se sont les controllers...
                              => [model] => copycat du model nodejs, ca se parse comme papa dans maman... rien à faire
                              => [services] => fonctions métiers à 'injecter' dans les controllers
                              => [style] => ...
                              => [templates] => définis les ... templates...
                        
                        [assets] => framework css etc...
                        
                        [environnement] => définis l'environnement dev ou prod

                        'index.html' => point d'entrée du navigateur

                        'main.ts' => point d'entrée du transpileur typescript

                        'polyfill.ts' => configurations particulières liées à des dépendances externes 
                                         (adaptation à certains navigateur pour certaines fonctionnalités
                                          exemple: polyfill pour utiliser web-animate avec mozilla)

                        'tsconfig.mean.json' =>  (pas encore très clair pour moi), config propre au projet
                                                 semble étendre tsconfig.json mais le outdir de tsconfig.mean
                                                 ne correspond pas, c'est celui de tsconfig.json qui prime... à creuser...
                        
                        'typing.d.ts' => ?? à creuser ...

            '.angular-cli.json' => config propre au command tool angular, 
                                   fait le lien entre les commandes et les fichiers de conf

            '.editorconfig' => ??? à creuser

            ['.gitignore', 'package.json', 'README.md'] => no comments

            'tsconfig.json' => config du transpilo, définis notamment la target, actuellement, on vise l'EcmaScript 5, mais nous on code en es6 de part le typescript.

            