from django.shortcuts import get_object_or_404
from .models import Post
from .schemas import PostSchema, PostCreateSchema, PostUpdateSchema
from ninja import Router
from ninja.errors import HttpError

router = Router()

# CREATE
@router.post("/create_post", response=PostSchema)
def create_post(request, payload: PostCreateSchema):
    try:
        post = Post.objects.create(
            id_usuario_id=payload.id_usuario,
            titulo=payload.titulo,
            conteudo=payload.conteudo
        )
        return post
    except Exception as e:
        raise HttpError(400, f"Erro ao criar post: {str(e)}")

# READ - List all
@router.get("/get_posts", response=list[PostSchema])
def list_posts(request):
    return Post.objects.all()

# READ - Get by ID
@router.get("/{post_id}", response=PostSchema)
def get_post_by_id(request, post_id: int):
    return get_object_or_404(Post, id=post_id)

# READ - Get posts by user
@router.get("/user/{user_id}/posts", response=list[PostSchema])
def get_posts_by_user(request, user_id: int):
    return Post.objects.filter(id_usuario_id=user_id)

# UPDATE
@router.put("/{post_id}", response=PostSchema)
def update_post(request, post_id: int, payload: PostUpdateSchema):
    post = get_object_or_404(Post, id=post_id)
    
    if payload.titulo is not None:
        post.titulo = payload.titulo
    if payload.conteudo is not None:
        post.conteudo = payload.conteudo
    
    post.save()
    return post

# DELETE
@router.delete("/{post_id}")
def delete_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    post.delete()
    return {"message": "Post deletado com sucesso", "id": post_id}

