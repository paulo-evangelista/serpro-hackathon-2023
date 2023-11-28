# Hackathon Web3 - Tokenização do Tesouro Nacional
## Problema
Desafio 1: Desenvolvimento de tecnologias para casos de uso utilizando títulos públicos tokenizados para aplicações em: Tesouro Direto e Mercado Secundário. Com a finalidade de incentivar a massificação, adoção e uso dos títulos, por investidores no Brasil e/ou no Exterior, prestigiando fácil acesso e a usabilidade das ferramentas.

Desafio 4: Desenvolvimento de tecnologias para casos de uso de automação de monitoramento, controle e precificação online de títulos públicos (e.g. oráculos).

## Solução

O cenário financeiro atual demanda soluções inovadoras para massificar e simplificar o acesso a investimentos em títulos públicos, tanto para investidores nacionais quanto estrangeiros. Diante disso, desenvolvemos uma solução robusta e abrangente que utiliza tecnologias avançadas, centradas na eficiência, facilidade e transparência para os investidores. Nesse sentido, a nossa solução tem como objetivo não apenas facilitar o acesso, adoção, uso e a usabilidade dos títulos públicos, mas também aumentar a confiança dos investidores, fornecendo transparência, automação e simplicidade nos processos de investimento e conformidade.

#### Account Abstraction - Cadastro simplificado
O objetivo aqui é simplificar o processo de cadastro para investidores interessados em adquirir títulos públicos. Isso pode ser alcançado por meio de um sistema de "account abstraction" ou abstração de conta. Isso significa que, em vez de exigir uma série extensa de informações pessoais, podemos criar um processo de cadastro simplificado, exigindo apenas informações essenciais para a transação de compra e venda de títulos. Isso pode incluir identificação básica, informações de contato e um procedimento de verificação simplificado, como verificação de e-mail ou telefone, priorizando a agilidade e simplicidade para atrair novos investidores. Nesse sentido, em nossa aplicação utilizamos um cadastro simples, que envolve apenas e-mail, senha, nome e sobrenome, já que o backend consegue criar uma carteira para o usuário automaticamente, caso ele não tenha e  permite também gerenciar todo o fluxo de interação com a blockchain sem afetar a experiência do usuário.

#### Oráculos - Automação na Coleta de Dados 
Os oráculos desempenham um papel fundamental ao fornecer dados em tempo real sobre os títulos públicos. Automatizar a coleta desses dados de diversas fontes, como índices financeiros e plataformas de negociação, é crucial. Isso pode ser feito por meio de APIs (interfaces de programação de aplicativos) conectadas a essas fontes. A tecnologia blockchain pode ser integrada a esses oráculos para garantir transparência e segurança na obtenção desses dados, garantindo que os investidores tenham acesso a informações precisas e atualizadas para tomar decisões informadas. Nesse sentido, utilizamos os Oráculos para automatizar a coleta dos indexadores de títulos públicos, como o IPCA(Índice Nacional de Preços ao Consumidor Amplo), por exemplo, de forma a conseguir ter uma maior precisão e automação no pagamento dos juros.

#### Facilidade em trazer investidores do exterior
Uma das vantagens da tecnologia blockchain é a sua natureza global e sem fronteiras. Aproveitar essa característica para atrair investidores estrangeiros pode ser feito por meio de interfaces e plataformas de investimento amigáveis para diferentes idiomas e moedas. Além disso, a divulgação e promoção eficaz dessas plataformas nos mercados internacionais são essenciais para atrair investidores estrangeiros.(site pt br)?????????

#### Sem restrição de idade - Acesso simplificado
Ao usar tecnologias blockchain para investimentos em títulos públicos, pode-se criar um sistema sem restrição de idade para a criação de carteiras digitais. Diferentemente de instituições financeiras tradicionais, que podem impor restrições de idade, as carteiras digitais baseadas em blockchain podem ser acessadas por qualquer pessoa, independentemente da idade, desde que tenham capacidade para utilizar a tecnologia necessária. Em nosso caso, conseguimos por meio da abstração de conta, conseguimos fazer com que o menor de idade tenha acesso mais fácil, já que não enfrenta os riscos de restrições de idade relacionados a instituições financeiras tradicionais.

#### Automação para gerar relatórios contábeis para registro no SIAFI
Automatizar a geração de relatórios contábeis para o Sistema Integrado de Administração Financeira do Governo Federal (SIAFI) é fundamental para simplificar e agilizar o processo de registro e conformidade. A tecnologia blockchain pode ser integrada aos sistemas contábeis, criando um registro imutável e transparente das transações relacionadas aos títulos públicos. Isso simplifica a geração de relatórios precisos e atualizados para cumprir os requisitos do SIAFI. Dessa forma, aplicamos uma funcionalidade no Smart Contract que permite gerar os relatórios contábeis automaticamente em relação a um determinado token, ou seja, título público, contribuindo para todos os benefícios anteriormente citados.


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
    -   IPFS(Interplanetary File System)
-   Infraestrutura
    -   Docker

## Árvore de arquivos

```
├── client
│    ├── src/app
│       ├── about
│       ├── adm
│       ├── api
│       ├── assets
│       ├── components
│       ├── contact
│       ├── context
│       ├── hooks
│       ├── ...
│
│
├── ethereum
│    ├── contracts
│    ├── contracts_development
│    ├── scripts
│    ├── test
│
│
├── server
│    ├── src
│       ├── ABIs
│       ├── auth
│       ├── company
│       ├── entities
│       ├── government
│       ├── middleware
│       ├── platform
│       ├── user
│       ├── web3
│
```

## Rodando a aplicação

Para rodar a aplicação existem algumas dependências que precisam ser instaladas devido às tecnologias utilizadas, são elas:

-   Node Js
-   Docker

### Executar containers

Para executar os containers docker, é necessário entrar no repositório raiz do projeto chamado `serpro-hackathon-2023` e executar o seguinte comando:
```
  $ docker-compose up -d
```

### Executar cliente

Para executar o cliente frontend é necessário entrar no repositório frontend chamado `client` e executar os seguintes comandos para instalar as dependências do projeto e então executar o cliente:
```
  $ npm i
  $ npm run dev
```

### Executar servidor

Para rodar o servidor backend é necessário entrar no repositório backend chamado `server` e executar os seguintes comandos para instalar as dependências do projeto e então executar o servidor:

```
  $ npm i
  $ npm run start:dev
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