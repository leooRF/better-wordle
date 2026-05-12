# better-wordle

Atividade de Engenharia de Software: Reengenharia completa de um software de jogo estilo Wordle.

## Execução

Abra o arquivo `index.html` no navegador para iniciar o jogo.

## Estrutura Model-Viel-Controller

- `index.html`: estrutura da interface
- `style.css`: estilos da aplicação
- `js/model.js`: estado do jogo, configurações, dicionários e regras
- `js/view.js`: renderização do tabuleiro, mensagens e atualizações visuais
- `js/controller.js`: tratamento de eventos e coordenação entre Model e View
- `js/main.js`: inicialização da aplicação

## Resumo das melhorias

O projeto saiu de um único arquivo com um code noodle e passou a usar uma organização em MVC. Além disso, o estado do jogo foi centralizado no `Model`, os nomes das variáveis ficaram mais claros, os números mágicos foram agrupados em configurações e os dicionários passaram a ser validados para evitar palavras com tamanho incorreto.

## Code Smells e soluções

### CS.1: God file (ausência de separação de responsabilidades)

**Problema:** tudo estava concentrado em um único arquivo.

**Descrição:** o `index.html` misturava estrutura da página, estilo e lógica do jogo. Isso deixava o código difícil de entender, manter e evoluir.

*Solução*:

Separamos o projeto em arquivos mais organizados. O `index.html` ficou com a estrutura, o `style.css` com a parte visual, o `model.js` com o estado e as regras do jogo, o `view.js` com a interface, o `controller.js` com os eventos e o `main.js` apenas com a inicialização.

### CS.2: Alto acoplamento entre lógica e interface

**Problema:** a lógica do jogo estava grudada na interface.

**Descrição:** funções como `comecar` e o evento de teclado faziam de tudo ao mesmo tempo: mudavam a tela, escolhiam palavra, atualizavam score e mexiam direto no DOM. Isso criava muito acoplamento e dificultava qualquer alteração.

*Solução*:

Reduzimos esse acoplamento com a separação em MVC. O `GameModel` passou a cuidar do estado e das regras, o `GameView` ficou responsável por desenhar e atualizar a tela, e o `GameController` passou a receber os eventos e ligar uma camada na outra.

### CS.3: Excesso de variáveis globais e nomes enigmáticos

**Problema:** havia muitas variáveis globais e nomes pouco claros.

**Descrição:** nomes como `dic`, `p_s`, `r_a`, `c_a`, `sc` e `m` não deixam claro o que representam. Além disso, como estavam soltos no escopo global, qualquer parte do código podia alterar esses valores.

*Solução*:

O estado do jogo foi centralizado no `GameModel`, em vez de ficar espalhado em variáveis globais. Também trocamos os nomes mais confusos por nomes mais claros, como `selectedLanguage`, `secretWord`, `currentRow`, `currentColumn`, `score`, `round`, `isGameOver` e `board`.
