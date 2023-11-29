# Hackathon Web3 - Tokenização do Tesouro Nacional
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

## Solução

O cenário financeiro atual demanda soluções inovadoras para massificar e simplificar o acesso a investimentos em títulos públicos, tanto para investidores nacionais quanto estrangeiros. Diante disso, desenvolvemos uma solução robusta e abrangente que utiliza tecnologias avançadas, centradas na eficiência, facilidade e transparência para os investidores. Nesse sentido, a nossa solução tem como objetivo não apenas facilitar o acesso, adoção, uso e a usabilidade dos títulos públicos, mas também aumentar a confiança dos investidores, fornecendo transparência, automação e simplicidade nos processos de investimento e conformidade.

#### Account Abstraction - Cadastro simplificado
O objetivo aqui é simplificar o processo de cadastro para investidores interessados em adquirir títulos públicos. Isso foi alcançado por meio de um sistema de "account abstraction" ou abstração de conta. Isso significa que, em vez de exigir uma série extensa de informações pessoais, podemos criar um processo de cadastro simplificado, exigindo apenas informações essenciais para a transação de compra e venda de títulos. Isso pode incluir identificação básica, informações de contato e um procedimento de verificação simplificado, como verificação de e-mail ou telefone, priorizando a agilidade e simplicidade para atrair novos investidores. Nesse sentido, em nossa aplicação utilizamos um cadastro simples, que envolve apenas e-mail, senha, nome e sobrenome, já que o backend consegue criar uma carteira para o usuário automaticamente, caso ele não tenha, e  permite também gerenciar todo o fluxo de interação com a blockchain sem afetar a experiência do usuário em nenhum quesito.

#### Oráculos - Automação na Coleta de Dados 
Os oráculos desempenham um papel fundamental ao fornecer dados em tempo real sobre os títulos públicos. Automatizar a coleta desses dados de diversas fontes, como índices financeiros e plataformas de negociação, é crucial. Fizemos por meio de APIs (interfaces de programação de aplicativos) conectadas a essas fontes. A tecnologia blockchain foi integrada a esses oráculos para garantir transparência e segurança na obtenção desses dados, garantindo que os investidores tenham acesso a informações precisas e atualizadas para tomar decisões informadas. Nesse sentido, utilizamos os Oráculos para automatizar a coleta dos indexadores de títulos públicos, como o IPCA(Índice Nacional de Preços ao Consumidor Amplo), por exemplo, de forma a conseguir ter uma maior precisão e automação na coleta dos dados, e consequentemente, no cálculo dos juros a serem pagos.

#### Facilidade em trazer investidores do exterior
Uma das vantagens da tecnologia blockchain é a sua natureza global e sem fronteiras, ou seja, independente do país e sua moeda, é possível investir em nossos títulos públicos. Nesse sentido, aproveitamos essa característica para atrair investidores estrangeiros por meio de interfaces e plataformas de investimento amigáveis para diferentes idiomas e moedas. Além disso, a divulgação e promoção eficaz dessas plataformas nos mercados internacionais são essenciais para atrair investidores estrangeiros.

#### Sem restrição de idade - Acesso simplificado
Ao usar tecnologias blockchain para investimentos em títulos públicos, pode-se criar um sistema sem restrição de idade para a criação de carteiras digitais. Diferentemente de instituições financeiras tradicionais, que podem impor restrições de idade, as carteiras digitais baseadas em blockchain podem ser acessadas por qualquer pessoa, independentemente da idade, desde que tenham capacidade para utilizar a tecnologia necessária. Em nosso caso, conseguimos por meio da abstração de conta, conseguimos fazer com que o menor de idade tenha acesso mais fácil, já que não enfrenta os riscos de restrições de idade relacionados a instituições financeiras tradicionais por meio da texnologia de blockchain e account abstraction.

#### Automação para gerar relatórios contábeis para registro no SIAFI
Automatizar a geração de relatórios contábeis para o Sistema Integrado de Administração Financeira do Governo Federal (SIAFI) é fundamental para simplificar e agilizar o processo de registro e conformidade. A tecnologia blockchain pode ser integrada aos sistemas contábeis, criando um registro imutável, transparente e muito mais rastreável das transações relacionadas aos títulos públicos. Isso simplifica a geração de relatórios precisos e atualizados para cumprir os requisitos do SIAFI. Dessa forma, aplicamos uma funcionalidade no Smart Contract que permite gerar os relatórios contábeis automaticamente em relação a um determinado token, ou seja, título público, contribuindo para todos os benefícios anteriormente citados.

#### Barreira de Entrada Financeira Menor - Fracionamento e Uso da DREX
Uma das barreiras significativas para muitos investidores é a quantia mínima exigida para investir em títulos públicos. Com a utilização da tecnologia blockchain e do token DREX, nossa solução resolve esse problema ao permitir o fracionamento de títulos públicos em partes menores, tornando possível investir em frações mínimas de um título.

Através do processo de tokenização, um título público pode ser dividido em unidades menores, permitindo que investidores comprem frações de um título de acordo com suas possibilidades financeiras. Esse fracionamento oferece acesso inclusivo ao mercado de títulos públicos, possibilitando que investidores, mesmo com quantidades menores de capital, participem do mercado de investimentos.

Além disso, a utilização do token DREX facilita essa entrada, permitindo que os investidores utilizem frações mínimas do token para investir nos títulos públicos fracionados. Isso cria uma flexibilidade considerável, onde os investidores podem começar com pequenas quantias, até mesmo a partir de 1 centavo, aumentando a acessibilidade e a democratização dos investimentos em títulos públicos.

Combinar o fracionamento dos títulos públicos e o uso do token DREX abre as portas para uma nova geração de investidores, reduzindo a barreira financeira de entrada e proporcionando uma maneira acessível e flexível de participar no mercado de investimentos em títulos públicos. Esta abordagem inovadora promove a inclusão financeira e a democratização do acesso aos investimentos, alinhando-se com os princípios de nossa solução.

## Público-alvo(Personas)

## Problem-Solution Fit
1. **Público-Alvo (Quem é o seu cliente?)**
    - Investidores novatos interessados em iniciar investimentos em títulos públicos.
    - Investidores experientes que buscam maior facilidade e transparência no processo de investimento.
    - Investidores internacionais que desejam investir no mercado de títulos públicos brasileiros.

2. **Problemas/Dores (Descreva os problemas que pretende resolver)**
    - Complexidade no acesso aos títulos públicos, dificultando a entrada de novos investidores.
    - Falta de massificação e adoção dos títulos públicos por investidores nacionais e estrangeiros.
    - Barreiras de usabilidade e acessibilidade nas ferramentas de investimento em títulos públicos.
    - Limitações no mercado secundário de títulos públicos, como falta de liquidez e agilidade nas transações.

3. **Motivação para Agir (Gatilhos que fazem o público querer mudar a ação)**
    - Facilidade de acesso e uso de ferramentas simplificadas para investir em títulos públicos.
    - A oportunidade de investir de forma transparente e automatizada em um mercado estável.
    - A possibilidade de fracionar títulos públicos, reduzindo a barreira financeira de entrada.
    - Acesso a informações precisas e em tempo real sobre os títulos públicos por meio de oráculos.

4. **Emoções Antes e Depois da Solução (Quais emoções o cliente sente antes e depois da solução?)**
    - Antes: Frustração, confusão e desconfiança devido à complexidade e falta de acessibilidade.
    - Depois: Confiança, segurança e satisfação ao investir de forma simplificada e transparente.

5. **Limitações dos Clientes (O que limita seus clientes a agir quando ocorre um problema?)**
    - Falta de acesso a informações claras e precisas sobre títulos públicos.
    - Dificuldade em encontrar ferramentas simples e intuitivas para investir.
    - Restrições financeiras devido à exigência de quantias mínimas para investimentos.

6. **Raiz/Causa dos Problemas (São relações completas com os problemas propostos)**
    - Complexidade burocrática e falta de usabilidade das plataformas de investimento.
    - Restrições financeiras impostas pela quantia mínima para investir em títulos públicos.
    - Falta de acesso a informações atualizadas e transparentes sobre os títulos disponíveis.

7. **Sua solução (Descreva em poucas palavras sua proposta)**
    - Tokenização do Tesouro Nacional para simplificar o acesso e uso de títulos públicos, oferecendo transparência, automação e fracionamento de investimentos.

8. **Soluções disponíveis (Quais soluções estão disponíveis para o cliente?)**
    - Plataformas tradicionais de investimento em títulos públicos com interfaces complexas.
    - Mercado secundário de títulos com limitações de liquidez e agilidade nas transações.
    - Restrições financeiras impostas por quantias mínimas para investir em títulos públicos.

9. **Comportamento (O que seu cliente faz relacionado ao problema?)**
    - Busca por alternativas mais acessíveis e simples para investir em títulos públicos.
    - Procura por informações precisas e transparentes sobre os títulos disponíveis.
    - Deseja investir de forma segura e confiável, sem enfrentar barreiras financeiras significativas.

10. **Canais de comportamento (Canal onde o problema se manifesta. Onde estão?)**
    - Plataformas de investimento tradicionais com interfaces complexas.
    - Mercado secundário de títulos com restrições de liquidez e agilidade nas transações.
    - Restrições financeiras em relação às quantias mínimas para investir em títulos públicos.

## Business Model Canvas
A solução oferece uma forma acessível, transparente e automatizada de investir em títulos públicos, utilizando tecnologias avançadas para tornar o mercado mais inclusivo, simplificado e seguro.

#### Segmentos de Clientes
- Investidores Novatos: Pessoas interessadas em começar a investir, sem experiência prévia no mercado financeiro.

- Investidores Experientes: Indivíduos ou instituições com conhecimento no mercado, buscando maior facilidade e transparência.

- Investidores Internacionais: Pessoas físicas ou jurídicas de outros países interessadas em investir no mercado de títulos públicos brasileiros.

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
- Desenvolvimento Tecnológico: Manutenção e melhoria contínua das plataformas.

- Educação Financeira: Criar conteúdo educativo sobre títulos públicos e blockchain.

- Manutenção da Comunidade: Estímulo à interação entre investidores, resolução de dúvidas e problemas.

#### Recursos-Chave
- Equipe de Desenvolvimento: Engenheiros de software, especialistas em blockchain, designers.

- Parcerias Estratégicas: Colaborações com órgãos reguladores, instituições financeiras e educacionais.

#### Parcerias-Chave
- Instituições Financeiras: Bancos, corretoras, parceiros para liquidez e infraestrutura.

- Órgãos Reguladores: Parcerias para cumprimento das regulamentações.

#### Fluxo de Receita
- Taxas de Transação: Cobrança de pequenas taxas sobre as transações realizadas.

- Serviços Premium: Oferta de serviços exclusivos para assinantes.

#### Estrutura de Custos
- Desenvolvimento Tecnológico: Custos de manutenção das plataformas, atualizações, segurança.

- Marketing e Publicidade: Investimento em campanhas de marketing, presença em eventos, publicidade online.

## Arquitetura

## Regras de negócio dos Smart Contracts(Contratos Inteligentes)
### Contrato 1: `InstitutionContract`

Este contrato define a permissão para "minters" e as ações permitidas por eles. Os "minters" têm o poder de executar ações específicas no sistema.

#### Regras de Negócio:
- Adição e remoção de "minters" são exclusivas para o dono do contrato.
- A função `checkIfUserHavePermission` permite verificar se um endereço tem permissão de "minter".

---

### Contrato 2: `PublicTitle`

Esse contrato gerencia a emissão e venda de tokens não fungíveis (NFTs) associados a títulos públicos. Ele define informações sobre os títulos, como nome, símbolo, rentabilidade anual, datas de vencimento e lançamento, entre outros. Além disso, permite a emissão de NFTs para investidores.

#### Regras de Negócio:
- A emissão de NFTs (`safeMint`) é possível apenas se o título ainda não tiver expirado (`notExpired`).
- A liquidação (`liquidate`) pode ser realizada apenas após a expiração do título pelo dono do contrato.
- Proíbe a transferência de tokens, garantindo a posse fixa dos NFTs emitidos.

---

### Contrato 3: `RealDigital`

Este contrato é um token ERC20 denominado "Real Digital" (DREX) e gerencia a criação e transferência desses tokens.

#### Regras de Negócio:
- A criação inicial do token é feita durante a inicialização do contrato, com um suprimento fixo emitido para o proprietário inicial.
- A função `mint` permite que o proprietário crie novos tokens e os envie para endereços específicos.

#### Observações Gerais:
- Os contratos `InstitutionContract` e `PublicTitle` têm propriedades de acesso que controlam quem pode realizar certas ações.
- O `RealDigital` define uma moeda digital e seu proprietário tem controle sobre a emissão de novos tokens.

Esta formatação em Markdown destaca as principais funcionalidades e restrições de cada contrato para facilitar o entendimento das regras e operações permitidas dentro do sistema.


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