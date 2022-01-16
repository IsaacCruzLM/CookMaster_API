
<h1 align="center">
     <a href="#" alt="site do ecoleta"> Cook Master API </a>
</h1>

<p align="center"> 
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#%EF%B8%8F-funcionalidades)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Configurando Variáveis de Ambiente](#configurando-variáveis-de-ambiente)
     * [Rodando o Servidor](#-rodando-o-servidor)
     * [Rodando os Testes](#-rodando-os-testes)
   * [Tecnologias](#-tecnologias)
     * [Server](#server)
   * [Como contribuir no projeto](#-como-contribuir-no-projeto)
   * [Autor](#-autor)
   * [Licença](#-licença)
<!--te-->

## 💻 Sobre o projeto

Cook Master API - É uma aplicação backend, com funcionalidade de criação e login para usuários e CRUD para receitas culinárias, com a finalidade de ser um servidor para uma aplicação Front-End ou Mobile.

---

## ⚙️ Funcionalidades

- [x] Usuários:
  - [x] Cadastro de novos usuários pela rota "/users" (Método POST);
  - [x] Cadastro de novos administradores pela rota "/users/admin" (Método POST);
- [x] Login de usuários pela rota "/login" (Método POST);
- [x] Receitas:
  - [x] Cadastro de novas receitas pela rota "/recipes" (Método POST);
  - [x] Listagem de receitas pela rota "/recipes" (Método GET);
  - [x] Listagem de receita por seu ID pela rota "/recipes/:id" (Método GET);
  - [x] Editar receita pela rota "/recipes/:id" (Método PUT);
  - [x] Deletar receita pela rota "/recipes/:id" (Método DELETE);

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [MongoDB](https://www.mongodb.com/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Servidor

```bash

# Clone este repositório
$ git clone git@github.com:IsaacCruzLM/CookMaster_API.git

# Acesse a pasta do projeto no terminal/cmd
$ cd CookMaster_API

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

### 🎲 Rodando os Testes

```bash

# Rodar testes localmente
$ npm run dev:test

# Rodar cobertura dos testes
$ npm run dev:test:coverage

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

### [](https://github.com/IsaacCruzLM/Blog_API/blob/main/README.md#server)**Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/)**
-   **[Mongodb](https://www.mongodb.com/)**
-   **[Multer](https://www.npmjs.com/package/multer)**
-   **[Nodemon](https://www.npmjs.com/package/nodemon)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Jsonwebtoken](https://jwt.io/)**
-   **[Jest](https://jestjs.io/)**

---

## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 🦸 Autor

<a href="https://www.linkedin.com/in/isaaccruzz/">
 <img style="border-radius: 50%;" src="./public/profile.jpeg" width="100px;" alt=""/>
 <br />
 <sub><b>Isaac Cruz</b></sub></a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Isaac-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/isaaccruzz/)](https://www.linkedin.com/in/isaaccruzz/) 
[![Gmail Badge](https://img.shields.io/badge/-isaac.clm1@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:isaac.clm1@gmail.com)](mailto:isaac.clm1@gmail.com)

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Isaac Cruz👋🏽 [Entre em contato!](https://www.linkedin.com/in/isaaccruzz/)

---
