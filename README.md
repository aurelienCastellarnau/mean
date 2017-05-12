# mean
Etna 2019 TIC/TWEB mean

Common prerequisites:

                - download and install nodejs: https://nodejs.org/en/download/
                - install npm: http://blog.npmjs.org/post/85484771375/how-to-install-npm
                - download and install mongodb https://www.mongodb.com/download-center#community
                
Windows prerequisites:
                - set mongo as service : 
                        
                        -- Administrator cmd --
                'mongod --dbpath=D:\mongodb --logpath=D:\mongodb\log.txt --install'

Build Mean project:

- npm run start-server => start a builded instance of the api
- npm run build-client => install client's dependencies and build ts files
- npm run mongo_win => start MongoDB service
- npm run mongo_unix => start mongo as fork
- npm run deploy => start the all app without mongo
- npm run deploy_win => mongo_win + deploy
- npm run deploy_unix => mongo_unix + deploy

Use:

http://localhost:3000/
