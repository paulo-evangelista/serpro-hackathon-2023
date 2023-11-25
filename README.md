# Hackathon Web3 - Tokenização do Tesouro Nacional
## Problema
Desafio 1: Desenvolvimento de tecnologias para casos de uso utilizando títulos públicos tokenizados para aplicações em: Tesouro Direto e Mercado Secundário. Com a finalidade de incentivar a massificação, adoção e uso dos títulos, por investidores no Brasil e/ou no Exterior, prestigiando fácil acesso e a usabilidade das ferramentas.

## Solução

## Problem-Solution Fit

## Business Model Canvas

## Arquitetura


## Tecnologias

-   Front-end
    -   Next.js
    -   TypeScript
    -   Tailwind CSS
-   Back-end
    -   Nest.js
    -   TypeORM
    -   Postgresql
-   Blockchain
    -   Solidity
    -   Hardhat
    -   Ethers.js
    -   Chainlink Services (Data Feed)
-   Infraestrutura
    -   Docker

## Árvore de arquivos

```
├── client
│    ├── animations
│    ├── assets
│    ├── components
│    ├── pages
│    ├── services
│    ├── styles
│    ├── utils
│
├── ethereum
│    ├── build
│    ├── contracts
│    ├── migrations
│
│
├── server
│    ├── controllers
│    ├── database
│    ├── middlewares
│    ├── prisma
│    ├── routes
│    ├── services
│
```

## Rodando a aplicação

Para rodar a aplicação existem algumas dependências que precisam ser instaladas devido às tecnologias utilizadas, são elas:

-   Node Js

### Executar cliente

Para executar o cliente frontend é necessário entrar no repositório frontend chamado `client` e executar os seguintes comandos para instalar as dependências do projeto e então executar o cliente:
```
  $ npm i
  $ npm run dev
```

### Executar servidor

Para rodar o servidor backend é necessário entrar no repositório backend chamado `server` e executar os seguintes comandos para instalar as dependências do projeto e então executar o servidor:

```
  $ npx prisma migrate dev
  $ npm i
  $ npm run dev
```

## Desenvolvido por:

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/marcelofeitoza7/">
        <img src="https://avatars.githubusercontent.com/u/71825192?v=4" width="100px;" alt="Marcelo Feitoza profile image"/><br>
        <sub>
          <b>Marcelo Gomes Feitoza</b>
        </sub>
      </a>
    </td>
  <td align="center"> 
      <a href="https://www.linkedin.com/in/victor-severiano-de-carvalho-b57a05237">
        <img src="https://github.com/paulo-evangelista.png" width="100px;" alt="Paulo Evangelista profile image"/><br>
        <sub>
          <b>Paulo Presa Evangelista</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/victor-severiano-de-carvalho-b57a05237">
        <img src="https://github.com/vict0rcarvalh0.png" width="100px;" alt="Victor Carvalho profile image"/><br>
        <sub>
          <b>Victor Severiano de Carvalho</b>
        </sub>
      </a>
    </td>
  </tr>
</table>