from django.shortcuts import get_object_or_404
from .models import ImagemPost
from .schemas import ImagemPostSchema, ImagemPostCreateSchema, ImagemPostUpdateSchema
from ninja import Router
from ninja.errors import HttpError

router = Router()

# CREATE
@router.post("/create_imagem_post", response=ImagemPostSchema)
def create_imagem_post(request, payload: ImagemPostCreateSchema):
    try:
        imagem_post = ImagemPost.objects.create(
            id_post_id=payload.id_post,
            url_imagem=payload.url_imagem
        )
        return imagem_post
    except Exception as e:
        raise HttpError(400, f"Erro ao criar imagem do post: {str(e)}")

# READ - List all
@router.get("/get_imagens_posts", response=list[ImagemPostSchema])
def list_imagens_posts(request):
    return ImagemPost.objects.all()

# READ - Get by ID
@router.get("/{imagem_post_id}", response=ImagemPostSchema)
def get_imagem_post_by_id(request, imagem_post_id: int):
    return get_object_or_404(ImagemPost, id=imagem_post_id)

# READ - Get imagens by post
@router.get("/post/{post_id}/imagens", response=list[ImagemPostSchema])
def get_imagens_by_post(request, post_id: int):
    return ImagemPost.objects.filter(id_post_id=post_id)

# UPDATE
@router.put("/{imagem_post_id}", response=ImagemPostSchema)
def update_imagem_post(request, imagem_post_id: int, payload: ImagemPostUpdateSchema):
    imagem_post = get_object_or_404(ImagemPost, id=imagem_post_id)
    
    if payload.url_imagem is not None:
        imagem_post.url_imagem = payload.url_imagem
    
    imagem_post.save()
    return imagem_post

# DELETE
@router.delete("/{imagem_post_id}")
def delete_imagem_post(request, imagem_post_id: int):
    imagem_post = get_object_or_404(ImagemPost, id=imagem_post_id)
    imagem_post.delete()
    return {"message": "Imagem do post deletada com sucesso", "id": imagem_post_id}

