<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=00bf63&height=200&section=header&text=Memory%20Game&fontSize=80&animation=fadeIn&fontAlignY=35&desc=Desafie%20sua%20memória!&descAlignY=55&descAlign=50" alt="Header Memory Game" />

  <br />
  <br />

  <div style="display: inline-block;">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </div>

  <br />
  <br />

  <a href="https://memory-game-zeta-hazel.vercel.app/">
    <img src="./assets/image.png" alt="Screenshot do Gameplay" width="700" style="border-radius: 10px; box-shadow: 0px 0px 20px rgba(0,0,0,0.5);">
  </a>

  <br />
  <br />

  <a href="https://memory-game-zeta-hazel.vercel.app/">
    <img src="https://img.shields.io/badge/🎮_CLIQUE_AQUI_PARA_JOGAR_AGORA-2ea44f?style=for-the-badge&logo=vercel&logoColor=white" alt="Jogue Agora">
  </a>

  <br />
  <br />

  ![Status do Projeto](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

</div>

---

## 💻 Sobre o Projeto

O **Memory Game** não é apenas um jogo, é uma demonstração de uma aplicação **Full Stack** completa. O objetivo é encontrar todos os pares de cartas no menor tempo possível, competindo por um lugar no Ranking Global.

A arquitetura foi pensada para separar responsabilidades e garantir escalabilidade:

| Front-End 🎨 | Back-End ⚙️ | Banco de Dados 🗄️ |
| :--- | :--- | :--- |
| **Vanilla JS** puro para manipulação de DOM de alta performance, sem dependência de frameworks pesados. | **Node.js** com **Express** gerenciando rotas RESTful e lógica de pontuação. | **MongoDB** (NoSQL) para persistência rápida e flexível dos dados dos jogadores. |

---

## ✨ Funcionalidades Principais

<table>
  <tr>
    <td align="center">👤</td>
    <td><b>Sistema de Login</b></td>
    <td>Identificação do jogador para salvar o histórico.</td>
  </tr>
  <tr>
    <td align="center">🃏</td>
    <td><b>Mecânica de Jogo</b></td>
    <td>Lógica robusta de embaralhamento, virada de cartas e verificação de pares.</td>
  </tr>
  <tr>
    <td align="center">🏆</td>
    <td><b>Ranking Global</b></td>
    <td>API conectada ao MongoDB para listar os melhores tempos.</td>
  </tr>
  <tr>
    <td align="center">🔊</td>
    <td><b>Efeitos Sonoros</b></td>
    <td>Feedback auditivo imersivo (vitória, erro, acerto).</td>
  </tr>
  <tr>
    <td align="center">📱</td>
    <td><b>Responsividade</b></td>
    <td>Jogue no PC, Tablet ou Celular.</td>
  </tr>
</table>

---

## 📂 Estrutura do Projeto (MVC)

O código foi organizado seguindo boas práticas de arquitetura de software:

```text
/
├── assets/            # 📸 Imagens e Sons (UI Assets)
├── backend/           # 🧠 O "Cérebro" do servidor
│   ├── src/
│   │   ├── controllers/  # Regras de Negócio
│   │   ├── models/       # Schemas do Banco de Dados
│   │   └── routes/       # Definição de Rotas da API
│   └── server.js         # Entrada do Servidor
├── js/                # ⚡ Lógica do Cliente (Modularizada)
│   ├── apiService.js     # Comunicação com o Backend (Fetch)
│   ├── gameLogic.js      # Regras do Jogo
│   └── uiManager.js      # Controle da Tela
├── style/             # 🎨 Estilos CSS3
└── index.html         # Ponto de Entrada