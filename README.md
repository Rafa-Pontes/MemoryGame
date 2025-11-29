# 🧠 Memory Game (Jogo da Memória)

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Badge Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Badge MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Badge HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Badge CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Badge JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 💻 Sobre o Projeto

O **Memory Game** é uma aplicação web interativa desenvolvida para testar e treinar a memória dos usuários. O projeto conta com um sistema de login simples para identificação do jogador e um ranking global persistente para registrar as melhores pontuações.

O diferencial deste projeto é a integração entre um Front-End dinâmico (Vanilla JS) e um Back-End robusto (Node.js/Express) conectado a um banco de dados NoSQL.

### 🎮 Experimente

<br>

<div align="center">
  <h3>
     <a href="https://memory-game-zeta-hazel.vercel.app/"></a> 🎮
  </h3>
</div>

<br>

## ✨ Funcionalidades

-   **Sistema de Login:** Identificação do jogador antes de iniciar a partida.
-   **Mecânica de Jogo:** Lógica completa de virar cartas, verificar pares e contagem de jogadas.
-   **Ranking Global:** Integração com API REST para salvar e listar as melhores pontuações no MongoDB.
-   **Efeitos Sonoros:** Feedback auditivo para ações como virar cartas, acertos e vitória.
-   **Interface Responsiva:** Design adaptável via CSS.

## 🛠 Tecnologias Utilizadas

### Front-End
-   **HTML5 & CSS3:** Estrutura semântica e estilização (arquivos `game.css` e `login.css`).
-   **JavaScript (ES6+):** Manipulação do DOM e lógica do jogo modularizada.
    -   `apiService.js`: Comunicação com o Backend.
    -   `gameLogic.js`: Regras do jogo.
    -   `uiManager.js`: Controle de interface.

### Back-End
-   **Node.js & Express:** Servidor para gerenciamento de rotas e API.
-   **MongoDB & Mongoose:** Banco de dados NoSQL e modelagem de dados para persistência do Ranking.



