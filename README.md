# Hackathon Web3 - Tokenização do Tesouro Nacional
## Sumário
1. **Desafio**
2. **Cenário Atual e Dores**
3. **Fluxo Atual**
4. **Solução**
5. **Problem-Solution Fit**
6. **Business Model Canvas**
7. **Arquitetura**
8. **Regras de Negócio dos Smart Contracts(Contratos Inteligentes)**
9. **Diagrama de Blocos**
10. **Tecnologias**
11. **Estrutura de pastas**
12. **Rodando a aplicação**
13. **Nosso time**

## Desafio
**Desafio 1**:
Desenvolvimento de tecnologias para casos de uso utilizando títulos públicos tokenizados para aplicações em: Tesouro Direto e Mercado Secundário. Com a finalidade de incentivar a massificação, adoção e uso dos títulos, por investidores no Brasil e/ou no Exterior, prestigiando fácil acesso e a usabilidade das ferramentas.

## Cenário Atual e Dores
O Tesouro Direto, como um programa de investimento em títulos públicos, enfrenta diversos desafios que podem ser abordados e solucionados por meio do Desafio 1 proposto no Hackathon. Estas são algumas das principais questões identificadas:

1. **Complexidade de Acesso aos Títulos Públicos**
Atualmente, o acesso aos títulos públicos pode ser complexo para muitos investidores. O processo tradicional pode demandar etapas burocráticas e exigir conhecimentos específicos do mercado financeiro, dificultando a participação de novos investidores.

2. **Pouca Massificação e Adoção**
A falta de massificação e adoção dos títulos públicos é um obstáculo. A complexidade de acesso, somada à falta de familiaridade do público em geral com esses investimentos, limita a participação e atração de investidores, tanto no Brasil quanto no exterior.

3. **Barreiras de Usabilidade e Facilidade de Acesso**
A usabilidade das ferramentas para investir em títulos públicos pode representar um desafio. A falta de interfaces amigáveis, ferramentas intuitivas e processos simplificados para compra e venda de títulos pode desencorajar potenciais investidores.

4. **Limitações no Mercado Secundário**
O mercado secundário de títulos públicos pode carecer de liquidez e agilidade nas transações. A falta de dinamismo nesse mercado pode desestimular investimentos e dificultar a negociação dos títulos.

## Fluxo Atual
<img src="https://github.com/paulo-evangelista/serpro-hackathon-2023/blob/main/assets/images/FluxoSTN.jpg" width="100%">

## Solução

O cenário financeiro atual demanda soluções inovadoras para massificar e simplificar o acesso a investimentos em títulos públicos, tanto para investidores nacionais quanto estrangeiros. Diante disso, desenvolvemos uma solução robusta e abrangente que utiliza tecnologias avançadas, centradas na eficiência, facilidade e transparência para os investidores. Nesse sentido, a nossa solução tem como objetivo não apenas facilitar o acesso, adoção, uso e a usabilidade dos títulos públicos, mas também aumentar a confiança dos investidores, fornecendo transparência, automação e simplicidade nos processos de investimento e conformidade. 

#### Account Abstraction - Cadastro simplificado
O objetivo aqui é simplificar o processo de cadastro para investidores interessados em adquirir títulos públicos. Isso foi alcançado por meio de um sistema de "account abstraction" ou abstração de conta. Isso significa que, em vez de exigir uma série extensa de informações pessoais, podemos criar um processo de cadastro simplificado, exigindo apenas informações essenciais para a transação de compra e venda de títulos. Isso pode incluir identificação básica, informações de contato e um procedimento de verificação simplificado, como verificação de e-mail ou telefone, priorizando a agilidade e simplicidade para atrair novos investidores. Nesse sentido, em nossa aplicação utilizamos um cadastro simples, que envolve apenas e-mail, senha, nome e sobrenome, já que o backend consegue criar uma carteira para o usuário automaticamente, caso ele não tenha, e gerencia também todo o fluxo de interação com a blockchain sem afetar a experiência do usuário em nenhum sentido.

#### Oráculos - Automação na Coleta de Dados 
Os oráculos desempenham um papel fundamental ao fornecer dados em tempo real sobre os títulos públicos. Automatizar a coleta desses dados de diversas fontes, como índices financeiros e plataformas de negociação, é crucial, já que atualmente o IPCA, por exemplo, precisa ser registrado manualmente conforme dito em uma das transmissões. Dessa forma, utilizamos um node do LinkWell Nodes(https://linkwellnodes.io/), que é uma empresa que oferece maior personalização e flexibilidade dos "Chainlink Data Feeds"(https://docs.chain.link/data-feeds), e o  conectamos a uma API (interfaces de programação de aplicativos) externa que simula os valores para o IPCA. A tecnologia blockchain foi integrada a esses oráculos para garantir transparência e segurança na obtenção desses dados, garantindo que os investidores tenham acesso a informações precisas e atualizadas para tomar decisões informadas. Nesse sentido, utilizamos os Oráculos para automatizar a coleta de um dos indexadores mais importantes nos títulos públicos, o IPCA(Índice Nacional de Preços ao Consumidor Amplo), de forma a conseguir ter uma maior precisão e automação na coleta dos dados, solucionando uma das dores relatadas, e consequentemente, no cálculo dos juros a serem pagos.

#### Facilidade em trazer investidores do exterior
Uma das vantagens da tecnologia blockchain é a sua natureza global e sem fronteiras, ou seja, independente do país e sua moeda, é possível investir em nossos títulos públicos. Nesse sentido, aproveitamos essa característica para atrair investidores estrangeiros por meio de interfaces e plataformas de investimento amigáveis para diferentes idiomas e moedas, em nosso caso, a nível de demonstragem, criamos a funcionalidade de traduzir todas as páginas do site para inglês americano. Além disso, a divulgação e promoção eficaz dessas plataformas nos mercados internacionais são essenciais para atrair investidores estrangeiros, isso pode ser feito por meio de parcerias com instituições financeiras que podem alcançar essas plataformas dos mercados internacionais.

#### Sem restrição de idade - Acesso simplificado
Ao usar tecnologias blockchain para investimentos em títulos públicos, pode-se criar um sistema sem restrição de idade para a criação de carteiras digitais. Diferentemente de instituições financeiras tradicionais, que podem impor restrições de idade, as carteiras digitais baseadas em blockchain podem ser acessadas por qualquer pessoa, independentemente da idade, desde que tenham capacidade para utilizar a tecnologia necessária. Em nosso caso, por meio da abstração de conta, conseguimos fazer com que o menor de idade tenha acesso mais fácil, já que não enfrenta os riscos de restrições de idade relacionados a instituições financeiras tradicionais por meio da tecnologia de blockchain e account abstraction, de forma que o menor de idade consegue comprar títulos públicos com apenas uma criação de conta simples e uma aprovação da instituição financeira que ocorre por trás dos panos, sem o cliente saber.

#### Automação para gerar relatórios contábeis para registro no SIAFI
Automatizar a geração de relatórios contábeis para o Sistema Integrado de Administração Financeira do Governo Federal (SIAFI) é fundamental para simplificar e agilizar o processo de registro e conformidade. A tecnologia blockchain pode ser integrada aos sistemas contábeis, criando um registro imutável, transparente e muito mais rastreável das transações relacionadas aos títulos públicos. Isso simplifica a geração de relatórios precisos e atualizados para cumprir os requisitos do SIAFI. Dessa forma, criamos variáveis no Smart Contract, que são preenchidas com as informações iniciais na emissão de um novo título e atualizadas conforme as transações são efetuadas, de maneira que um simples read na blockchain integrado ao backend, que é uma operação sem custo, permite gerar os relatórios contábeis do SIAFI com um único clique, automatizando o processo e ganhando tempo para ser dedicado em outras atividades.

#### Barreira de Entrada Financeira Menor - Fracionamento do título e uso da DREX
Uma das barreiras significativas para muitos investidores é a quantia mínima exigida para investir em títulos públicos, já que boa parte da população mantém o dinheiro na poupança por pura insegurança e crença em entender um investimento em título público como algo muito sofisticado, como dito por aí, coisa "de rico". Com a utilização da tecnologia blockchain e do token DREX, nossa solução resolve esse problema ao permitir o fracionamento de títulos públicos em partes menores que 30 reais, tornando possível investir em frações mínimas de um título.

Através do processo de tokenização, um título público pode ser dividido em unidades menores, permitindo que investidores comprem frações minúsculas de um título de acordo com suas possibilidades financeiras. Esse fracionamento oferece acesso inclusivo ao mercado de títulos públicos, possibilitando que investidores, mesmo com quantidades menores de capital, participem do mercado de investimentos.

Além disso, a utilização do token DREX facilita essa entrada, permitindo que os investidores utilizem frações mínimas do token para investir nos títulos públicos fracionados. Isso cria uma flexibilidade considerável, onde os investidores podem começar com pequenas quantias, até mesmo a partir de 1 centavo, aumentando a acessibilidade e a democratização dos investimentos em títulos públicos.

Combinar o fracionamento dos títulos públicos e o uso do token DREX abre as portas para uma nova geração de investidores, reduzindo a barreira financeira de entrada e proporcionando uma maneira acessível e flexível de participar no mercado de investimentos em títulos públicos. Esta abordagem inovadora promove a inclusão financeira e a democratização do acesso aos investimentos, alinhando-se com os princípios de nossa solução.

## Problem-Solution Fit

<img src="https://github.com/paulo-evangelista/serpro-hackathon-2023/blob/main/assets/images/PSF.jpg" width="100%">

1. **Público-Alvo (Quem é o seu cliente?)**
    - Investidores novatos interessados em iniciar investimentos em títulos públicos.
    - Investidores experientes que buscam maior facilidade e transparência no processo de investimento.
    - Investidores internacionais que desejam investir no mercado de títulos públicos brasileiros.
    - CoDiv/SID/SIAFI por meio de automações e otimização de processos.


2. **Problemas/Dores (Descreva os problemas que pretende resolver)**

   **Investidores**
    - Complexidade no acesso aos títulos públicos, dificultando a entrada de novos investidores.
    - Falta de massificação e adoção dos títulos públicos por investidores nacionais e estrangeiros.
    - Barreiras de usabilidade e acessibilidade nas ferramentas de investimento em títulos públicos.
    - Limitações no mercado secundário de títulos públicos, como falta de liquidez e agilidade nas transações.

    **Órgãos Governamentais**
    - Falta de automatização no processo de coleta dos dados do IPCA.
    - Falta de automatização na geração de relatórios.
    - Falta de automatização do Pagamento Antecipado e do Pagamento de Gabarito.
    - Falta de otimização no processo de Liquidação e Contabilização.
    - Falta de otimização na geração de Relatórios e Indicadores da Dívida.

4. **Motivação para Agir (Gatilhos que fazem o público querer mudar a ação)**

   **Investidores**
    - Facilidade de acesso e uso de ferramentas simplificadas para investir em títulos públicos por meio do account abstraction.
    - A oportunidade de investir de forma transparente e automatizada em um mercado estável por meio da blockchain.
    - A possibilidade de fracionar títulos públicos, reduzindo a barreira financeira de entrada por meio do uso de título tokenizado e DREX.

    **Órgãos Governamentais**
    - Acesso a informações precisas e em tempo real sobre os títulos públicos por meio de oráculos.
    - Acesso e geração de relatórios para cumprir com as rotinas de forma mais automatizada o otimizada.
    - Melhora na automação e velocidade do Pagamento de Gabarito e Antecipado.

6. **Emoções Antes e Depois da Solução (Quais emoções o cliente sente antes e depois da solução?)**
    - Antes(Investidores): Frustração, confusão e desconfiança devido à complexidade e falta de acessibilidade.
    - Depois(Investidores): Confiança, segurança e satisfação ao investir de forma simplificada e transparente.

    - Antes(Órgãos governamentais): Frustração e cansaço devido ao trabalho manual e maçante.
    - Depois(Órgãos governamentais): Satisfação e felicidade ao poder investir o tempo de trabalho em atividades mais produtivas.

7. **Limitações dos Clientes (O que limita seus clientes a agir quando ocorre um problema?)**

   **Investidores**
    - Falta de acesso a informações claras e precisas sobre títulos públicos.
    - Dificuldade em encontrar ferramentas simples e intuitivas para investir.
    - Restrições financeiras devido à exigência de quantias mínimas para investimentos.
    - Restrições e dificuldade em investir sendo de outro país.
    - Burocracias e restrições ao investir sendo menor de idade.

    **Órgãos Governamentais**
    - Processos lentos devido ao trabalho manual.
    - Falta de tempo para investir em tarefas mais produtivas.

8. **Raiz/Causa dos Problemas (São relações completas com os problemas propostos)**

   **Investidores**
    - Complexidade burocrática e falta de usabilidade das plataformas de investimento.
    - Restrições financeiras impostas pela quantia mínima para investir em títulos públicos.
    - Falta de acesso a informações atualizadas e transparentes sobre os títulos disponíveis.
    - Legislação, idioma e moeda diferente entre países.
    - Menores de idade geralmente não possuem fonte de renda própria e são dependentes financeiramente.

    **Órgãos Governamentais**
    - Dependência da integração entre diferentes instituições, órgãos e custodiantes.
    - Falta de automação nos processos.

9. **Sua solução (Descreva em poucas palavras sua proposta)**
    - Tokenização do Tesouro Nacional para simplificar o acesso e uso de títulos públicos, oferecendo transparência, automação e fracionamento de investimentos.

10. **Soluções disponíveis (Quais soluções estão disponíveis para o cliente?)**

    **Investidores**
    - Plataformas tradicionais de investimento em títulos públicos com interfaces complexas.
    - Mercado secundário de títulos com limitações de liquidez e agilidade nas transações.
    - Restrições financeiras impostas por quantias mínimas para investir em títulos públicos.

    **Órgãos Governamentais**
    - Fluxo atual do STN, citado anteriormente na documentação.

11. **Comportamento (O que seu cliente faz relacionado ao problema?)**

    **Investidores**
    - Mantém o dinheiro na poupança, por considerar mais seguro, rentável e fácil.
    - Busca por alternativas mais acessíveis e simples para investir em títulos públicos.
    - Procura por informações precisas e transparentes sobre os títulos disponíveis.
    - Deseja investir de forma segura e confiável, sem enfrentar barreiras financeiras significativas.

    **Órgãos Governamentais**
    - Busca melhoria e otimização nos processos(ex: integrações por web services e criação do cadastro simplificado)

12. **Canais de comportamento (Canal onde o problema se manifesta. Onde estão?)**
    - Plataformas de investimento tradicionais com interfaces complexas.
    - Mercado secundário de títulos com restrições de liquidez e agilidade nas transações.
    - Restrições financeiras em relação às quantias mínimas para investir em títulos públicos.
    - Órgãos governamentais enfrentando falta de automatização nos processos de coleta de dados, geração de relatórios, pagamentos e otimização de rotinas contábeis e de dívida.


## Business Model Canvas
A solução oferece uma forma acessível, transparente e automatizada de investir em títulos públicos, utilizando tecnologias avançadas para tornar o mercado mais inclusivo, simplificado e seguro.

<img src="https://github.com/paulo-evangelista/serpro-hackathon-2023/blob/main/assets/images/BMC.jpg" width="100%">

#### Segmentos de Clientes
- Investidores novatos interessados em iniciar investimentos em títulos públicos.

- Investidores experientes que buscam maior facilidade e transparência no processo de investimento.

- Investidores internacionais que desejam investir no mercado de títulos públicos brasileiros.

- CoDiv/SID/SIAFI que buscam mais automações e otimização de processos.

#### Proposta de Valor
- Tokenização do Tesouro Nacional para simplificar o acesso e uso de títulos públicos, oferecendo transparência, automação e fracionamento de investimentos.

#### Segmento de Mercado
- Investidores em Títulos Públicos: Pessoas físicas e jurídicas interessadas em investir em títulos públicos do Tesouro Nacional.

- Mercado Financeiro Nacional: Instituições e empresas do mercado financeiro brasileiro interessadas em novas soluções tecnológicas para investimentos em títulos públicos.

- Mercado Internacional: Investidores globais que buscam oportunidades em títulos públicos de um mercado financeiro estável e transparente.

#### Canais de Distribuição
- Plataformas Online: Site oficial, aplicativos móveis para investimento.

- Parcerias Estratégicas: Colaborações com instituições financeiras, divulgação em eventos, parcerias com órgãos reguladores.

#### Relacionamento com o Cliente
- Suporte Personalizado: Chat online, suporte por e-mail, guias e tutoriais detalhados.

- Comunidade de Investidores: Fóruns de discussão, webinars educativos, eventos presenciais.

#### Atividades-Chave
- Desenvolvimento e manutenção da plataforma de investimento.

- Integração e uso de oráculos para automatizar coleta de dados.

- Suporte ao cliente e educação sobre o uso da plataforma.

- Manutenção e aprimoramento contínuo da segurança da plataforma.

- Automatização dos processos envolvidos atualmente no STN.

- Publicidade em pontos físicos, como em totens da cidade, estações de metro, trem, ônibus, etc.

#### Recursos-Chave
- Equipe de Desenvolvimento: Engenheiros de software, especialistas em blockchain, designers.

- Parcerias Estratégicas: Colaborações com órgãos reguladores, instituições financeiras e educacionais.

- Tecnologia Blockchain para tokenização e transparência.

- Oráculos para automação de coleta de dados.

- Interface amigável e simplificada para investidores nacionais e internacionais.

- Sistema de "account abstraction" para simplificar o processo de cadastro e incluir menores de idade.

- Contrato inteligente para gerenciamento de títulos e transações.

#### Parcerias-Chave
- Instituições Financeiras: Bancos, corretoras, parceiros para liquidez e infraestrutura.

- Órgãos Reguladores: Parcerias para cumprimento das regulamentações.

#### Fluxo de Receita
- Taxas de Transação: Cobrança de pequenas taxas sobre as transações realizadas.

- Serviços adicionais oferecidos aos investidores para facilitar a experiência de investimento.

- Possíveis parcerias com órgãos governamentais para soluções específicas.

#### Estrutura de Custos
- Desenvolvimento e manutenção da plataforma e tecnologia.

- Custos de segurança e conformidade com regulamentações.

- Custos de marketing e promoção para atrair investidores e órgãos governamentais.

## Arquitetura
<img src="https://github.com/paulo-evangelista/serpro-hackathon-2023/blob/main/assets/images/Fluxograma.jpg" width="100%">

## Regras de negócio dos Smart Contracts(Contratos Inteligentes)

### IpcaOracle.sol

Este contrato utiliza um Node LinkWell para puxar dados do IPCA de uma API externa

**Regras de Negócio:**

1. **Atualização dos parâmetros do Oracle:**
   - Métodos:
     - `setOracleAddress`: Atualiza o endereço do Oracle.
     - `setJobId`: Atualiza o ID do trabalho.
     - `setFeeInJuels`: Define a taxa de consulta.
   - Modificadores:
     - `onlyOwner`: Restringe o acesso aos proprietários.

2. **Solicitação e recebimento de dados do Oracle:**
   - Métodos:
     - `request`: Envia uma solicitação ao Oracle.
     - `fulfill`: Recebe e processa a resposta do Oracle.

3. **Acesso a informações do Oracle:**
   - Métodos:
     - `getOracleAddress`: Retorna o endereço do Oracle.
     - `getJobId`: Retorna o ID do trabalho.
     - `getFeeInHundredthsOfLink`: Retorna a taxa em LINK.
     - `withdrawLink`: Permite a retirada de LINK do contrato.

---

### DataFeed.sol

Este contrato utiliza ChainLink Data Feeds para servir como oráculo, de forma a abstrair para o usuário seu meio de pagamento na plataforma para "Real", ao invés de alguma criptomoeda

**Regras de Negócio:**

1. **Conversão de preços de USD para BRL:**
   - Método:
     - `convertUsdToBrl`: Converte o preço de USD para BRL.

2. **Obtenção de dados do Chainlink:**
   - Método:
     - `getChainlinkDataFeedLatestAnswer`: Retorna a resposta mais recente do Chainlink.

---

### DREX.sol

Este contrato é um token ERC20 denominado "Real Digital" (DREX) e gerencia a criação e transferência desses tokens.


**Regras de Negócio:**

1. **Criação e gerenciamento de tokens:**
   - Métodos:
     - `mint`: Cria novos tokens.
     - `decimals`: Retorna o número de casas decimais.

---

### InstitutionContract.sol

Este contrato define a permissão para "minters" e as ações permitidas por eles. Os "minters" têm o poder de executar ações específicas no sistema.

**Regras de Negócio:**

1. **Gestão de permissões de minting:**
   - Métodos:
     - `addMinter`: Adiciona permissões de minting.
     - `removeMinter`: Remove permissões de minting.
     - `checkIfUserHavePermission`: Verifica se um usuário tem permissão de minting.

---

### PublicTitle.sol

Esse contrato gerencia a emissão e venda de tokens não fungíveis (NFTs) associados a títulos públicos. Ele define informações sobre os títulos, como nome, símbolo, rentabilidade anual, datas de vencimento e lançamento, entre outros. Além disso, permite a emissão de NFTs para investidores.

**Regras de Negócio:**

1. **Criação de títulos e gestão de vendas:**
   - Métodos:
     - `safeMint`: Cria novos títulos e gerencia a venda.
     - `liquidate`: Liquida os títulos após o vencimento.
   - Modificadores:
     - `notExpired`: Restringe ações para títulos não expirados.
     - `expired`: Restringe ações para títulos expirados.

2. **Gestão de informações e parâmetros do título:**
   - Métodos:
     - `setBaseURI`: Define a URI base para os tokens.
     - `changeDrexAddress`: Altera o endereço do token DREX.
   - Modificadores:
     - `onlyOwner`: Restringe o acesso aos proprietários.

#### Observações Gerais:
- Os contratos `InstitutionContract` e `PublicTitle` têm propriedades de acesso que controlam quem pode realizar certas ações.
- O `DREX` define uma moeda digital e seu proprietário tem controle sobre a emissão de novos tokens.


## Diagrama de Blocos
<img src="https://github.com/paulo-evangelista/serpro-hackathon-2023/blob/main/assets/images/DiagramaBlocos.jpg" width="100%">

1. *Docker*: Uma plataforma de contêinerização que permite empacotar uma aplicação e suas dependências em um contêiner virtual, o qual pode ser executado em qualquer sistema operacional que suporte Docker.

2. *PostgreSQL*: Um sistema de gerenciamento de banco de dados relacional (SGBDR), utilizado para armazenar e gerenciar dados estruturados.

3. *NestJS*: Um framework para construir aplicações de servidor eficientes e escaláveis com Node.js. Ele utiliza TypeScript por padrão e é fortemente inspirado pelo Angular.

4. *TypeORM*: Uma biblioteca de mapeamento objeto-relacional (ORM) que permite trabalhar com bancos de dados usando objetos TypeScript.

5. *NEXT.js*: Um framework de React que permite funcionalidades como renderização do lado do servidor e geração de sites estáticos para aplicações web baseadas em React.

6. *TypeScript (TS)*: Uma linguagem de programação desenvolvida pela Microsoft que é um superconjunto de JavaScript, adicionando tipos estáticos e outros recursos.

7. *Solidity*: Uma linguagem de programação para escrever contratos inteligentes que são executados na Ethereum Virtual Machine (EVM), usada em blockchains como Ethereum.

8. *Chainlink*: Um projeto descentralizado de oráculos que permite a blockchains interagir com dados externos.

9. *Ethereum (ETH)*: Uma plataforma de blockchain descentralizada que permite a execução de contratos inteligentes e aplicações descentralizadas (dApps).

As setas indicam a interação ou dependência entre os componentes. Por exemplo:

- *NestJS ↔ TypeORM ↔ PostgreSQL*: Indica que o NestJS utiliza o TypeORM para interagir com o PostgreSQL.
- *NestJS ↔ Next.js ↔ TypeScript*: Mostra que o Next.js e o NestJS compartilham o TypeScript como uma linguagem comum.
- *NestJS ↔ Solidity ↔ Chainlink ↔ Ethereum*: Sugere que o NestJS pode interagir com contratos inteligentes escritos em Solidity, os quais podem se comunicar com dados externos via Chainlink e operar na Ethereum blockchain.

Este diagrama é útil para entender como diferentes partes de uma aplicação interagem e são construídas para trabalhar juntas, provavelmente em um ambiente de desenvolvimento de aplicações web e blockchain.


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

## Estrutura de pastas

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

## Nosso time

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
