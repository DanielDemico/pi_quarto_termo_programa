# Documentação do Sistema CRUD

## Visão Geral

Este documento descreve o sistema completo de CRUD (Create, Read, Update, Delete) implementado para as seguintes entidades:

1. **Usuário** (Users)
2. **Post**
3. **Comentário** (Comentario)
4. **Imagem do Post** (ImagemPost)
5. **Conversa**
6. **Mensagem Direta** (MensagemDireta)

---

## Estrutura dos Models

### 1. Users (Usuário)

**Campos:**
- `id` (BigAutoField, Primary Key)
- `name` (CharField, max_length=100)
- `email` (EmailField, unique=True)
- `image_url` (URLField, nullable)
- `password` (CharField, max_length=128)

**Relacionamentos:**
- 1:N com Post
- 1:N com Comentario
- 1:N com Conversa (como usuario1)
- 1:N com Conversa (como usuario2)
- 1:N com MensagemDireta

---

### 2. Post

**Campos:**
- `id` (BigAutoField, Primary Key)
- `id_usuario` (ForeignKey → Users, CASCADE)
- `titulo` (CharField, max_length=200)
- `conteudo` (TextField)
- `data_criacao` (DateTimeField, auto_now_add)
- `data_atualizacao` (DateTimeField, auto_now)

**Relacionamentos:**
- N:1 com Users
- 1:N com Comentario
- 1:N com ImagemPost

---

### 3. Comentario

**Campos:**
- `id` (BigAutoField, Primary Key)
- `id_usuario` (ForeignKey → Users, CASCADE)
- `id_post` (ForeignKey → Post, CASCADE)
- `conteudo` (TextField)
- `data_criacao` (DateTimeField, auto_now_add)
- `data_atualizacao` (DateTimeField, auto_now)

**Relacionamentos:**
- N:1 com Users
- N:1 com Post

---

### 4. ImagemPost

**Campos:**
- `id` (BigAutoField, Primary Key)
- `id_post` (ForeignKey → Post, CASCADE)
- `url_imagem` (URLField)
- `data_criacao` (DateTimeField, auto_now_add)

**Relacionamentos:**
- N:1 com Post

---

### 5. Conversa

**Campos:**
- `id` (BigAutoField, Primary Key)
- `id_usuario1` (ForeignKey → Users, CASCADE)
- `id_usuario2` (ForeignKey → Users, CASCADE)
- `data_criacao` (DateTimeField, auto_now_add)
- `data_atualizacao` (DateTimeField, auto_now)

**Relacionamentos:**
- N:1 com Users (usuario1)
- N:1 com Users (usuario2)
- 1:N com MensagemDireta

**Restrições:**
- Unique constraint: (id_usuario1, id_usuario2)

---

### 6. MensagemDireta

**Campos:**
- `id` (BigAutoField, Primary Key)
- `id_conversa` (ForeignKey → Conversa, CASCADE)
- `id_usuario` (ForeignKey → Users, CASCADE)
- `conteudo` (TextField)
- `data_envio` (DateTimeField, auto_now_add)
- `lida` (BooleanField, default=False)

**Relacionamentos:**
- N:1 com Conversa
- N:1 com Users

---

## Endpoints da API

### Base URL: `/api/`

---

### 1. Usuários (`/api/users/`)

#### CREATE
- **POST** `/api/users/create_user`
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "image_url": "string (opcional)"
  }
  ```

#### READ - List All
- **GET** `/api/users/get_users`
- **Response:** Lista de todos os usuários

#### READ - Get by ID
- **GET** `/api/users/{user_id}`
- **Response:** Dados do usuário específico

#### UPDATE
- **PUT** `/api/users/{user_id}`
- **Body:**
  ```json
  {
    "name": "string (opcional)",
    "email": "string (opcional)",
    "password": "string (opcional)",
    "image_url": "string (opcional)"
  }
  ```

#### DELETE
- **DELETE** `/api/users/{user_id}`
- **Response:** Mensagem de confirmação

---

### 2. Posts (`/api/posts/`)

#### CREATE
- **POST** `/api/posts/create_post`
- **Body:**
  ```json
  {
    "id_usuario": 1,
    "titulo": "string",
    "conteudo": "string"
  }
  ```

#### READ - List All
- **GET** `/api/posts/get_posts`
- **Response:** Lista de todos os posts

#### READ - Get by ID
- **GET** `/api/posts/{post_id}`
- **Response:** Dados do post específico

#### READ - Get by User
- **GET** `/api/posts/user/{user_id}/posts`
- **Response:** Lista de posts do usuário

#### UPDATE
- **PUT** `/api/posts/{post_id}`
- **Body:**
  ```json
  {
    "titulo": "string (opcional)",
    "conteudo": "string (opcional)"
  }
  ```

#### DELETE
- **DELETE** `/api/posts/{post_id}`
- **Response:** Mensagem de confirmação

---

### 3. Comentários (`/api/comentarios/`)

#### CREATE
- **POST** `/api/comentarios/create_comentario`
- **Body:**
  ```json
  {
    "id_usuario": 1,
    "id_post": 1,
    "conteudo": "string"
  }
  ```

#### READ - List All
- **GET** `/api/comentarios/get_comentarios`
- **Response:** Lista de todos os comentários

#### READ - Get by ID
- **GET** `/api/comentarios/{comentario_id}`
- **Response:** Dados do comentário específico

#### READ - Get by Post
- **GET** `/api/comentarios/post/{post_id}/comentarios`
- **Response:** Lista de comentários do post

#### READ - Get by User
- **GET** `/api/comentarios/user/{user_id}/comentarios`
- **Response:** Lista de comentários do usuário

#### UPDATE
- **PUT** `/api/comentarios/{comentario_id}`
- **Body:**
  ```json
  {
    "conteudo": "string (opcional)"
  }
  ```

#### DELETE
- **DELETE** `/api/comentarios/{comentario_id}`
- **Response:** Mensagem de confirmação

---

### 4. Imagens de Posts (`/api/imagens-posts/`)

#### CREATE
- **POST** `/api/imagens-posts/create_imagem_post`
- **Body:**
  ```json
  {
    "id_post": 1,
    "url_imagem": "string"
  }
  ```

#### READ - List All
- **GET** `/api/imagens-posts/get_imagens_posts`
- **Response:** Lista de todas as imagens

#### READ - Get by ID
- **GET** `/api/imagens-posts/{imagem_post_id}`
- **Response:** Dados da imagem específica

#### READ - Get by Post
- **GET** `/api/imagens-posts/post/{post_id}/imagens`
- **Response:** Lista de imagens do post

#### UPDATE
- **PUT** `/api/imagens-posts/{imagem_post_id}`
- **Body:**
  ```json
  {
    "url_imagem": "string (opcional)"
  }
  ```

#### DELETE
- **DELETE** `/api/imagens-posts/{imagem_post_id}`
- **Response:** Mensagem de confirmação

---

### 5. Conversas (`/api/conversas/`)

#### CREATE
- **POST** `/api/conversas/create_conversa`
- **Body:**
  ```json
  {
    "id_usuario1": 1,
    "id_usuario2": 2
  }
  ```
- **Validações:**
  - Os usuários devem ser diferentes
  - Não pode existir conversa duplicada entre os mesmos usuários

#### READ - List All
- **GET** `/api/conversas/get_conversas`
- **Response:** Lista de todas as conversas

#### READ - Get by ID
- **GET** `/api/conversas/{conversa_id}`
- **Response:** Dados da conversa específica

#### READ - Get by User
- **GET** `/api/conversas/user/{user_id}/conversas`
- **Response:** Lista de conversas do usuário (como usuario1 ou usuario2)

#### UPDATE
- **PUT** `/api/conversas/{conversa_id}`
- **Body:**
  ```json
  {
    "id_usuario1": 1 (opcional),
    "id_usuario2": 2 (opcional)
  }
  ```

#### DELETE
- **DELETE** `/api/conversas/{conversa_id}`
- **Response:** Mensagem de confirmação

---

### 6. Mensagens Diretas (`/api/mensagens-diretas/`)

#### CREATE
- **POST** `/api/mensagens-diretas/create_mensagem_direta`
- **Body:**
  ```json
  {
    "id_conversa": 1,
    "id_usuario": 1,
    "conteudo": "string"
  }
  ```

#### READ - List All
- **GET** `/api/mensagens-diretas/get_mensagens_diretas`
- **Response:** Lista de todas as mensagens

#### READ - Get by ID
- **GET** `/api/mensagens-diretas/{mensagem_id}`
- **Response:** Dados da mensagem específica

#### READ - Get by Conversa
- **GET** `/api/mensagens-diretas/conversa/{conversa_id}/mensagens`
- **Response:** Lista de mensagens da conversa

#### READ - Get by User
- **GET** `/api/mensagens-diretas/user/{user_id}/mensagens`
- **Response:** Lista de mensagens enviadas pelo usuário

#### UPDATE
- **PUT** `/api/mensagens-diretas/{mensagem_id}`
- **Body:**
  ```json
  {
    "conteudo": "string (opcional)",
    "lida": true (opcional)
  }
  ```

#### DELETE
- **DELETE** `/api/mensagens-diretas/{mensagem_id}`
- **Response:** Mensagem de confirmação

---

## Arquivos DDL

Foram criados dois arquivos de DDL (Data Definition Language):

1. **`database_schema.sql`** - Schema para SQLite (banco atual)
2. **`database_schema_postgres.sql`** - Schema para PostgreSQL (RDS AWS)

---

## Migrations

Para criar as migrations e aplicar no banco de dados:

```bash
cd backend/pi_sustentabilidade
python manage.py makemigrations
python manage.py migrate
```

---

## Django Admin

Todos os models estão registrados no Django Admin para facilitar a administração:

- `/admin/users/` - Gerenciar usuários
- `/admin/posts/` - Gerenciar posts
- `/admin/comentarios/` - Gerenciar comentários
- `/admin/imagens_posts/` - Gerenciar imagens
- `/admin/conversas/` - Gerenciar conversas
- `/admin/mensagens_diretas/` - Gerenciar mensagens

---

## Tecnologias Utilizadas

- **Django 5.2.8** - Framework web
- **Django Ninja** - Framework de API REST
- **SQLite** - Banco de dados (desenvolvimento)
- **PostgreSQL** - Banco de dados (produção - RDS AWS)

---

## Notas Importantes

1. **Cascade Delete**: Todas as foreign keys usam `CASCADE` para deletar registros relacionados automaticamente
2. **Validações**: 
   - Email único para usuários
   - Conversas únicas entre pares de usuários
   - Usuários diferentes em conversas
3. **Ordenação**:
   - Posts e Comentários: ordenados por data de criação (mais recentes primeiro)
   - Mensagens: ordenadas por data de envio (mais antigas primeiro)
   - Conversas: ordenadas por data de atualização (mais recentes primeiro)

