-- ============================================
-- DDL - Data Definition Language
-- Schema completo do banco de dados
-- PI Sustentabilidade
-- Versão PostgreSQL (para RDS AWS)
-- ============================================

-- Tabela: Users (Usuários)
-- Descrição: Armazena informações dos usuários do sistema
CREATE TABLE IF NOT EXISTS "users" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL UNIQUE,
    "image_url" VARCHAR(200) NULL,
    "password" VARCHAR(128) NOT NULL
);

-- Tabela: Post
-- Descrição: Armazena os posts criados pelos usuários
CREATE TABLE IF NOT EXISTS "posts_post" (
    "id" BIGSERIAL PRIMARY KEY,
    "titulo" VARCHAR(200) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario_id" BIGINT NOT NULL,
    CONSTRAINT "posts_post_id_usuario_id_fk" 
        FOREIGN KEY ("id_usuario_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "posts_post_id_usuario_id_idx" ON "posts_post" ("id_usuario_id");
CREATE INDEX IF NOT EXISTS "posts_post_data_criacao_idx" ON "posts_post" ("data_criacao");

-- Tabela: Comentario
-- Descrição: Armazena os comentários feitos pelos usuários nos posts
CREATE TABLE IF NOT EXISTS "comentarios_comentario" (
    "id" BIGSERIAL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario_id" BIGINT NOT NULL,
    "id_post_id" BIGINT NOT NULL,
    CONSTRAINT "comentarios_comentario_id_usuario_id_fk" 
        FOREIGN KEY ("id_usuario_id") REFERENCES "users" ("id") ON DELETE CASCADE,
    CONSTRAINT "comentarios_comentario_id_post_id_fk" 
        FOREIGN KEY ("id_post_id") REFERENCES "posts_post" ("id") ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "comentarios_comentario_id_usuario_id_idx" ON "comentarios_comentario" ("id_usuario_id");
CREATE INDEX IF NOT EXISTS "comentarios_comentario_id_post_id_idx" ON "comentarios_comentario" ("id_post_id");
CREATE INDEX IF NOT EXISTS "comentarios_comentario_data_criacao_idx" ON "comentarios_comentario" ("data_criacao");

-- Tabela: ImagemPost
-- Descrição: Armazena as imagens associadas aos posts
CREATE TABLE IF NOT EXISTS "imagens_posts_imagempost" (
    "id" BIGSERIAL PRIMARY KEY,
    "url_imagem" VARCHAR(200) NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_post_id" BIGINT NOT NULL,
    CONSTRAINT "imagens_posts_imagempost_id_post_id_fk" 
        FOREIGN KEY ("id_post_id") REFERENCES "posts_post" ("id") ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "imagens_posts_imagempost_id_post_id_idx" ON "imagens_posts_imagempost" ("id_post_id");
CREATE INDEX IF NOT EXISTS "imagens_posts_imagempost_data_criacao_idx" ON "imagens_posts_imagempost" ("data_criacao");

-- Tabela: Conversa
-- Descrição: Armazena as conversas entre usuários
CREATE TABLE IF NOT EXISTS "conversas_conversa" (
    "id" BIGSERIAL PRIMARY KEY,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario1_id" BIGINT NOT NULL,
    "id_usuario2_id" BIGINT NOT NULL,
    CONSTRAINT "conversas_conversa_id_usuario1_id_fk" 
        FOREIGN KEY ("id_usuario1_id") REFERENCES "users" ("id") ON DELETE CASCADE,
    CONSTRAINT "conversas_conversa_id_usuario2_id_fk" 
        FOREIGN KEY ("id_usuario2_id") REFERENCES "users" ("id") ON DELETE CASCADE,
    CONSTRAINT "conversas_conversa_unique_usuarios" 
        UNIQUE ("id_usuario1_id", "id_usuario2_id")
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "conversas_conversa_id_usuario1_id_idx" ON "conversas_conversa" ("id_usuario1_id");
CREATE INDEX IF NOT EXISTS "conversas_conversa_id_usuario2_id_idx" ON "conversas_conversa" ("id_usuario2_id");
CREATE INDEX IF NOT EXISTS "conversas_conversa_data_atualizacao_idx" ON "conversas_conversa" ("data_atualizacao");

-- Tabela: MensagemDireta
-- Descrição: Armazena as mensagens diretas enviadas entre usuários nas conversas
CREATE TABLE IF NOT EXISTS "mensagens_diretas_mensagemdireta" (
    "id" BIGSERIAL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "data_envio" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lida" BOOLEAN NOT NULL DEFAULT FALSE,
    "id_conversa_id" BIGINT NOT NULL,
    "id_usuario_id" BIGINT NOT NULL,
    CONSTRAINT "mensagens_diretas_mensagemdireta_id_conversa_id_fk" 
        FOREIGN KEY ("id_conversa_id") REFERENCES "conversas_conversa" ("id") ON DELETE CASCADE,
    CONSTRAINT "mensagens_diretas_mensagemdireta_id_usuario_id_fk" 
        FOREIGN KEY ("id_usuario_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "mensagens_diretas_mensagemdireta_id_conversa_id_idx" ON "mensagens_diretas_mensagemdireta" ("id_conversa_id");
CREATE INDEX IF NOT EXISTS "mensagens_diretas_mensagemdireta_id_usuario_id_idx" ON "mensagens_diretas_mensagemdireta" ("id_usuario_id");
CREATE INDEX IF NOT EXISTS "mensagens_diretas_mensagemdireta_data_envio_idx" ON "mensagens_diretas_mensagemdireta" ("data_envio");

-- ============================================
-- RELACIONAMENTOS RESUMIDOS:
-- ============================================
-- Users (1) -> (N) Post
-- Users (1) -> (N) Comentario
-- Users (1) -> (N) Conversa (como usuario1)
-- Users (1) -> (N) Conversa (como usuario2)
-- Users (1) -> (N) MensagemDireta
-- Post (1) -> (N) Comentario
-- Post (1) -> (N) ImagemPost
-- Conversa (1) -> (N) MensagemDireta
-- ============================================

