#!/bin/bash
set -e
code .
guake -n guake -e 'cd $HOME/SENPH-App/senph-frontend && ng serve' guake -r 'frontend'
guake -n guake -e 'cd $HOME/SENPH-App/fuseki && ./fuseki-server' guake -r 'fuseki'
guake -n guake -e 'cd $HOME/SENPH-App/node-proxy && npm start' guake -r 'proxy'
firefox -new-tab -url http://localhost:4200/ -new-tab -url http://localhost:3030/
echo "Done"
