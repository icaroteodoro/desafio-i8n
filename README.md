
# Teste — React + Node

Este projeto consiste em uma aplicação web com backend em Node.js e frontend em React.

## 🚀 Como rodar o projeto

### 📌 Requisitos:

- Node.js
- NPM

---

### ✅ Clone o repositório:

```bash
git clone https://github.com/icaroteodoro/desafio-in8.git
cd desafio-in8
```

---

### ✅ Rodando o Backend:

1. Abra um terminal
2. Acesse a pasta do backend:

```bash
cd backend
```

3. Instale as dependências:

```bash
npm install
```

4. Gere o client do Prisma:

```bash
npx prisma generate
```

5. Inicie o backend:

```bash
npm start
```

---

### ✅ Rodando o Frontend:

1. Abra um novo terminal
2. Acesse a pasta do frontend:

```bash
cd frontend
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o frontend:

```bash
npm run dev
```

---

## 💡 Decisões Técnicas Tomadas

### 🧑‍💻 Sistema de Usuários e Autenticação:

- Foi criada uma tabela de usuários para poder associar pedidos a usuários.
- Implementado um sistema de autenticação.

---

### 🔎 Filtros e Busca:

- Os filtros e a busca foram implementados diretamente no frontend, porque os endpoints fornecidos eram simples e não permitiam filtros no backend.
- Fazer a lógica de filtros no backend usando array seria possível, mas exigiria uma requisição por cada filtragem, o que não é escalável.

**Endpoints usados:**

- Brazilian Provider:  
  - [GET Todos os Produtos](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider)  
  - [GET Produto por ID](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/:id)

- European Provider:  
  - [GET Todos os Produtos](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider)  
  - [GET Produto por ID](http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/:id)

---

### 🖼️ Imagens dos Produtos:

- O serviço de imagens estava fora do ar.
- Foi criada uma função para substituir o domínio das imagens, garantindo que o frontend continue exibindo os produtos.

---

### 🛒 Sobre o Carrinho:

**Solução pensada:**  
- Inicialmente, considerei usar o MongoDB para armazenar os itens do carrinho.

**Motivos para usar MongoDB:**  
- Não existe uma tabela de produtos no banco (os produtos vêm de um endpoint externo).
- Criar uma tabela como `order_item` ou `cart_item` traria complexidade (teria que salvar, atualizar e deletar no banco a cada ação do usuário).
- Persistir o carrinho no banco traria vantagens como: o usuário manter o mesmo carrinho em dispositivos diferentes.

**Motivos para não usar:**  
- No PDF do desafio não havia nada falando sobre permissão para usar Docker ou um banco não-relacional, então optei por uma solução local no frontend.

---

## ✅ Conclusão:

Projeto estruturado para ser simples de rodar e fácil de entender. Caso precise de mais informações, entre em contato.
