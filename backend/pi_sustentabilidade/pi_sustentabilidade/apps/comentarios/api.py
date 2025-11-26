from django.shortcuts import get_object_or_404
from .models import Comentario
from .schemas import ComentarioSchema, ComentarioCreateSchema, ComentarioUpdateSchema
from ninja import Router
from ninja.errors import HttpError

router = Router()

# CREATE
@router.post("/create_comentario", response=ComentarioSchema)
def create_comentario(request, payload: ComentarioCreateSchema):
    try:
        comentario = Comentario.objects.create(
            id_usuario_id=payload.id_usuario,
            id_post_id=payload.id_post,
            conteudo=payload.conteudo
        )
        return comentario
    except Exception as e:
        raise HttpError(400, f"Erro ao criar comentário: {str(e)}")

# READ - List all
@router.get("/get_comentarios", response=list[ComentarioSchema])
def list_comentarios(request):
    return Comentario.objects.all()

# READ - Get by ID
@router.get("/{comentario_id}", response=ComentarioSchema)
def get_comentario_by_id(request, comentario_id: int):
    return get_object_or_404(Comentario, id=comentario_id)

# READ - Get comentarios by post
@router.get("/post/{post_id}/comentarios", response=list[ComentarioSchema])
def get_comentarios_by_post(request, post_id: int):
    return Comentario.objects.filter(id_post_id=post_id)

# READ - Get comentarios by user
@router.get("/user/{user_id}/comentarios", response=list[ComentarioSchema])
def get_comentarios_by_user(request, user_id: int):
    return Comentario.objects.filter(id_usuario_id=user_id)

# UPDATE
@router.put("/{comentario_id}", response=ComentarioSchema)
def update_comentario(request, comentario_id: int, payload: ComentarioUpdateSchema):
    comentario = get_object_or_404(Comentario, id=comentario_id)
    
    if payload.conteudo is not None:
        comentario.conteudo = payload.conteudo
    
    comentario.save()
    return comentario

# DELETE
@router.delete("/{comentario_id}")
def delete_comentario(request, comentario_id: int):
    comentario = get_object_or_404(Comentario, id=comentario_id)
    comentario.delete()
    return {"message": "Comentário deletado com sucesso", "id": comentario_id}

