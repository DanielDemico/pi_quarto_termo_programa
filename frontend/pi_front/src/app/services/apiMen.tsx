const API_BASE_URL_MENSAGEM = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export type PostApi = {
    id: number;
    id_usuario: number;
    usuario_nome: string;
    usuario_image_url: string;
    titulo: string;
    conteudo: string;
    data_criacao: string;
    data_atualizacao: string;
};

export type ComentarioApi = {
  id: number;
  id_post: number;
  id_usuario: number;
  usuario_nome: string;
  texto: string;
  data_criacao: string;
};
  
type ImagemPostApi = {
    id: number;
    id_post: number;
    url_imagem: string;
};


export type ConversaApi = {
  id: number;
  id_usuario1: number;
  usuario1_nome: string;
  usuario1_image_url: string;
  id_usuario2: number;
  usuario2_nome: string;
  usuario2_image_url: string;
};

export type MensagemDiretaApi = {
  id: number;
  id_conversa: number;
  id_usuario: number;
  conteudo: string;
  data_envio: string;
  lida: boolean;
};


async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL_MENSAGEM}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("ERRO BACKEND:", res.status, text);
    throw new Error(`Erro ${res.status}: ${text}`);
  }

  return res.json();
}

/* ================= USERS ================= */

export const apiUsers = {
  create(data: { name: string; email: string; password: string; image_url?: string }) {
    return request("/users/create_user", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  list() {
    return request("/users/get_users");
  },
  get(id: number) {
    return request(`/users/${id}`);
  },
  update(id: number, data: Partial<{ name: string; email: string; password: string; image_url: string }>) {
    return request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: number) {
    return request(`/users/${id}`, { method: "DELETE" });
  },
};

/* ================= POSTS ================= */

export const apiPosts = {
  create(data: { id_usuario: number; titulo: string; conteudo: string }) {
    return request<PostApi>("/posts/create_post", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  list() {
    return request<PostApi[]>("/posts/get_posts");
  },
  get(id: number) {
    return request<PostApi>(`/posts/${id}`);
  },
  listByUser(userId: number) {
    return request<PostApi>(`/posts/user/${userId}/posts`);
  },
  update(id: number, data: Partial<{ titulo: string; conteudo: string }>) {
    return request<PostApi>(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: number) {
    return request(`/posts/${id}`, { method: "DELETE" });
  },
};

/* ================= COMENTÁRIOS ================= */

export const apiComentarios = {
  create(data: { id_usuario: number; id_post: number; conteudo: string }) {
    return request<ComentarioApi>("/comentarios/create_comentario", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  list() {
    return request("/comentarios/get_comentarios");
  },
  get(id: number) {
    return request(`/comentarios/${id}`);
  },
  listByPost(postId: number) {
    return request<ComentarioApi[]>(`/comentarios/post/${postId}/comentarios`);
  },
  listByUser(userId: number) {
    return request(`/comentarios/user/${userId}/comentarios`);
  },
  update(id: number, data: Partial<{ conteudo: string }>) {
    return request(`/comentarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: number) {
    return request(`/comentarios/${id}`, { method: "DELETE" });
  },
};

/* ================= IMAGENS DE POSTS ================= */

export const apiImagensPosts = {
  create(data: { id_post: number; url_imagem: string }) {
    return request<ImagemPostApi>("/imagens-posts/create_imagem_post", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  list() {
    return request("/imagens-posts/get_imagens_posts");
  },
  get(id: number) {
    return request(`/imagens-posts/${id}`);
  },
  listByPost(postId: number) {
    return request<ImagemPostApi>(`/imagens-posts/post/${postId}/imagens`);
  },
  update(id: number, data: Partial<{ url_imagem: string }>) {
    return request(`/imagens-posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: number) {
    return request(`/imagens-posts/${id}`, { method: "DELETE" });
  },
};

/* ================= CONVERSAS ================= */

export const apiConversas = {
  create(data: { id_usuario1: number; id_usuario2: number }) {
    return request<ConversaApi>("/conversas/create_conversa", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  list() {
    return request<ConversaApi[]>("/conversas/get_conversas");
  },
  get(id: number) {
    return request<ConversaApi>(`/conversas/${id}`);
  },
  listByUser(userId: number) {
    return request<ConversaApi[]>(`/conversas/user/${userId}/conversas`);
  },
  update(
    id: number,
    data: Partial<{ id_usuario1: number; id_usuario2: number }>
  ) {
    return request<ConversaApi>(`/conversas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: number) {
    return request(`/conversas/${id}`, { method: "DELETE" });
  },
};

/* ================= MENSAGENS DIRETAS ================= */

export const apiMensagensDiretas = {
  create(data: { id_conversa: number; id_usuario: number; conteudo: string }) {
    return request("/mensagens-diretas/create_mensagem_direta", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  list() {
    return request("/mensagens-diretas/get_mensagens_diretas");
  },
  get(id: number) {
    return request(`/mensagens-diretas/${id}`);
  },
  listByConversa(conversaId: number) {
    return request<MensagemDiretaApi[]>(`/mensagens-diretas/conversa/${conversaId}/mensagens`);
  },
  listByUser(userId: number) {
    return request(`/mensagens-diretas/user/${userId}/mensagens`);
  },
  update(id: number, data: Partial<{ conteudo: string; lida: boolean }>) {
    return request(`/mensagens-diretas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: number) {
    return request(`/mensagens-diretas/${id}`, { method: "DELETE" });
  },
};
