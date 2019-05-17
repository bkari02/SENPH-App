# Welcome to the Senph Ontology Web Application (SOWA)

<img src="senph-frontend/src/assets/img/owl_logo.png" width="20%">


Installation Instructions

1. You need to have Node v9.11.2 and NPM v6.4.1 installed. You can check what version and whether you have already installed each by using these commands:

'node -v
npm -v'

If you didn't have them installed please do so, e.g. by using nvm form here: https://github.com/creationix/nvm

2. Clone the repository to your device with this command:

'git clone https://github.com/bkari02/SENPH-App.git'

3. Navigate into the folder by entering the following command into your terminal:

'cd SENPH-App/node-proxy'

4. Install npm dependencies with:

'npm install'

5. Run the app with:

'npm start'

6. Next you need to run the Apache Jena Fuseki Server. Open another terminal and navigate to th SENPH-App folder again. Inside the folder type:

'cd /fuseki
./fuseki-server'

The server will start and the built-in UI is locally available at port 3030:
'http://localhost:3030'


7. Open another terminal and navigate again into the SENPH-App folder. The type:

'cd /senph-frontende
npm install -g @angular/cli
ng-serve'

The Angular Front-end will be hosted on port 4200:
'http://localhost:4200'
