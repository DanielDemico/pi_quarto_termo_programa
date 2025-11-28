from django.shortcuts import get_object_or_404
from .models import Post
from .schemas import PostSchema, PostCreateSchema, PostUpdateSchema
from ninja import Router
from ninja.errors import HttpError
from pi_sustentabilidade.apps.users.models import Users


router = Router()

# CREATE
@router.post("/create_post", response=PostSchema)
def create_post(request, payload: PostCreateSchema):
    user = Users.objects.get(id=payload.id_usuario)
    try:
        post = Post.objects.create(
            id_usuario=user,
            titulo=payload.titulo,
            conteudo=payload.conteudo,
        )
        return PostSchema(
            id=post.id,
            id_usuario=post.id_usuario_id,
            usuario_nome=user.name,
            usuario_image_url=user.image_url,
            titulo=post.titulo,
            conteudo=post.conteudo,
            data_criacao=post.data_criacao,
            data_atualizacao=post.data_atualizacao,
        )
    except Exception as e:
        raise HttpError(400, f"Erro ao criar post: {str(e)}")

# READ - List all
@router.get("/get_posts", response=list[PostSchema])
def list_posts(request):
    posts = Post.objects.select_related("id_usuario").all()
    return [
        PostSchema(
            id=p.id,
            id_usuario=p.id_usuario_id,
            usuario_nome=p.id_usuario.name,
            usuario_image_url=p.id_usuario.image_url,
            titulo=p.titulo,
            conteudo=p.conteudo,
            data_criacao=p.data_criacao,
            data_atualizacao=p.data_atualizacao,
        )
        for p in posts
    ]

# READ - Get by ID
@router.get("/{post_id}", response=PostSchema)
def get_post_by_id(request, post_id: int):
    p = get_object_or_404(Post, id=post_id)
    return PostSchema(
        id=p.id,
        id_usuario=p.id_usuario_id,
        usuario_nome=p.id_usuario.name,
        usuario_image_url=p.id_usuario.image_url,
        titulo=p.titulo,
        conteudo=p.conteudo,
        data_criacao=p.data_criacao,
        data_atualizacao=p.data_atualizacao,
    )

# READ - Get posts by user
@router.get("/user/{user_id}/posts", response=list[PostSchema])
def get_posts_by_user(request, user_id: int):
    posts = Post.objects.select_related("id_usuario").filter(id_usuario_id=user_id)
    return [
        PostSchema(
            id=p.id,
            id_usuario=p.id_usuario_id,
            usuario_nome=p.id_usuario.name,
            usuario_image_url=p.id_usuario.image_url,
            titulo=p.titulo,
            conteudo=p.conteudo,
            data_criacao=p.data_criacao,
            data_atualizacao=p.data_atualizacao,
        )
        for p in posts
    ]


# UPDATE
@router.put("/{post_id}", response=PostSchema)
def update_post(request, post_id: int, payload: PostUpdateSchema):
    post = get_object_or_404(Post.objects.select_related("id_usuario"), id=post_id)

    if payload.titulo is not None:
        post.titulo = payload.titulo
    if payload.conteudo is not None:
        post.conteudo = payload.conteudo

    post.save()

    return PostSchema(
        id=post.id,
        id_usuario=post.id_usuario_id,
        usuario_nome=post.id_usuario.name,
        usuario_image_url=post.id_usuario.image_url,
        titulo=post.titulo,
        conteudo=post.conteudo,
        data_criacao=post.data_criacao,
        data_atualizacao=post.data_atualizacao,
    )

# DELETE
@router.delete("/{post_id}")
def delete_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    post.delete()
    return {"message": "Post deletado com sucesso", "id": post_id}

