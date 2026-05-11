# better-wordle

Atividade de Engenharia de Software: Reengenharia completa de um software de jogo estilo Wordle.

## Code Smells

### CS.1: God file (ausência de separação de responsabilidades)

HTML, CSS e JavaScript estão todos no mesmo arquivo. Além disso, o script mistura regra de negócio, estado da partida e manipulação de interface.

*Solução*:

### CS.2: Alto acomplamento entre lógica e interface

A funçao 'comecar' e o handler de teclado alteram DOM, escolhem palavra, controlam fluxo da rodada e atualizam pontuação ao mesmo tempo. É necessário corrigir para cumprir a DTP 01, porque o comportamento do jogo depende do document.getElementById, alert e style diretamente.

*Solução*:

### CS.3: Excesso de variáveis globais e nomes enigáticos

As variáveis "dic, i_escolhido, p_s, r_a, c_a, sc, rd, end, m" são todas globais no index. Além disso, "p_s, r_a, c_a, sc, rd, m, b, t, u_w, k" são basicamente impossíveis de se decifrar de primeira. Necessário corrigir para a DTP 02.

*Solução*:
