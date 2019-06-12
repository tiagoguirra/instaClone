# instaClone
Aplicação de backend

## Configurações Iniciais

``` bash
# install dependencies
npm install

# Rodando servidor http em desenvolvimento (com hot heload)
npm run dev

# Rodando o servidor http em produção (sem hot heload)
npm run prod
```
## Variaveis de ambiente
Use o arquivo .env.exemple para criar o arquivo .env
```
#Host da aplicação por padrão localhost
APP_HOST=localhost

#Porta da aplicação por padrão 3333
APP_PORT=3333

#Host do banco de dados mongo
MONGO_HOST=mongodb://localhost/27017

#Banco de dados mongodb
MONGO_DB=instaClone
```