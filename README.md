# Movies Catalog

# Como rodar o projeto

## Atenção aos pontos abaixo

```bash
1 - Antes de iniciar o setup, é necessário que o Docker Desktop esteja em execução.
2 - Variáveis de ambiente já estão sendo disponibilizadas pois é um projeto de teste.
3 - O banco será automaticamente populado com algumas informações incluindo um usuário 'admin' e 3 usuários 'user'
    - username: master-admin
    - password: 17061900@bp
4 - Utilizei o TMDB uma vez que o IMDB é pago e, para ter o acesso gratuito, é necessário enviar uma solicitação que pode demorar até 5 dias.
```

## 1. Faça o clone do repositório

```bash
git clone <URL_DO_REPOSITORIO>
```


## 2. Entre na pasta ```movies-catalog``` e rode o setup

```bash
cd movies-catalog
npm run setup
```

Obs: Esse comando irá instalar todas as dependencias, subir o banco no docker e popular o banco.

## 3. Rode o projeto:

```bash
npm run start
```


## 4. Acessando o projeto

Abra o navegador e acesse o endereço ```http://localhost:3000/login```

Digite o usuário e senha master-admin.

Obs: O primeiro acesso geralmente demora uns segundos.


## 5. Documentação

Entre no endereço `http://localhost:3000/api/documentation`


## 6. Testes

Entre na pasta ```backend``` e rode o comando de testes:

```bash
cd backend
npm run test
```


## 7. Modulo Interno e Externo

Configurei um módulo interno que serve para todo os fluxos de gerenciamento de usuários, filmes e avaliações. O móxulo externo foi onde configurei a lógica para ler e exibir os filmes da API TMDB (https://developer.themoviedb.org/docs/getting-started)
