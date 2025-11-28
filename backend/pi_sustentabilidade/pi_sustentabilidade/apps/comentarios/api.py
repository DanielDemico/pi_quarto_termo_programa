from django.shortcuts import get_object_or_404
from .models import Comentario
from .schemas import ComentarioSchema, ComentarioCreateSchema, ComentarioUpdateSchema
from ninja import Router
from ninja.errors import HttpError
from pi_sustentabilidade.apps.users.models import Users

router = Router()

# CREATE
@router.post("/create_comentario", response=ComentarioSchema)
def create_comentario(request, payload: ComentarioCreateSchema):
    try:
        user = Users.objects.get(id=payload.id_usuario)

        comentario = Comentario.objects.create(
            id_usuario=user,
            id_post_id=payload.id_post,
            conteudo=payload.conteudo,
        )

        return ComentarioSchema(
            id=comentario.id,
            id_post=comentario.id_post_id,
            id_usuario=comentario.id_usuario_id,
            usuario_nome=user.name,
            texto=comentario.conteudo,
            data_criacao=comentario.data_criacao,
        )
    except Exception as e:
        raise HttpError(400, f"Erro ao criar comentário: {str(e)}")

# READ - List all
@router.get("/get_comentarios", response=list[ComentarioSchema])
def list_comentarios(request):
    comentarios = Comentario.objects.select_related("id_usuario").all()
    return [
        ComentarioSchema(
            id=c.id,
            id_post=c.id_post_id,
            id_usuario=c.id_usuario_id,
            usuario_nome=c.id_usuario.name,
            texto=c.conteudo,
            data_criacao=c.data_criacao,
        )
        for c in comentarios
    ]

# READ - Get by ID
@router.get("/{comentario_id}", response=ComentarioSchema)
def get_comentario_by_id(request, comentario_id: int):
    c = get_object_or_404(Comentario.objects.select_related("id_usuario"), id=comentario_id)
    return ComentarioSchema(
        id=c.id,
        id_post=c.id_post_id,
        id_usuario=c.id_usuario_id,
        usuario_nome=c.id_usuario.name,
        texto=c.conteudo,
        data_criacao=c.data_criacao,
    )

# READ - Get comentarios by post
@router.get("/post/{post_id}/comentarios", response=list[ComentarioSchema])
def get_comentarios_by_post(request, post_id: int):
    comentarios = Comentario.objects.select_related("id_usuario").filter(id_post_id=post_id)
    return [
        ComentarioSchema(
            id=c.id,
            id_post=c.id_post_id,
            id_usuario=c.id_usuario_id,
            usuario_nome=c.id_usuario.name,
            texto=c.conteudo,
            data_criacao=c.data_criacao,
        )
        for c in comentarios
    ]

# READ - Get comentarios by user
@router.get("/user/{user_id}/comentarios", response=list[ComentarioSchema])
def get_comentarios_by_user(request, user_id: int):
    comentarios = Comentario.objects.select_related("id_usuario").filter(id_usuario_id=user_id)
    return [
        ComentarioSchema(
            id=c.id,
            id_post=c.id_post_id,
            id_usuario=c.id_usuario_id,
            usuario_nome=c.id_usuario.name,
            texto=c.conteudo,
            data_criacao=c.data_criacao,
        )
        for c in comentarios
    ]


# UPDATE
@router.put("/{comentario_id}", response=ComentarioSchema)
def update_comentario(request, comentario_id: int, payload: ComentarioUpdateSchema):
    comentario = get_object_or_404(Comentario.objects.select_related("id_usuario"), id=comentario_id)

    if payload.conteudo is not None:
        comentario.conteudo = payload.conteudo

    comentario.save()

    return ComentarioSchema(
        id=comentario.id,
        id_post=comentario.id_post_id,
        id_usuario=comentario.id_usuario_id,
        usuario_nome=comentario.id_usuario.name,
        texto=comentario.conteudo,
        data_criacao=comentario.data_criacao,
    )

# DELETE
@router.delete("/{comentario_id}")
def delete_comentario(request, comentario_id: int):
    comentario = get_object_or_404(Comentario, id=comentario_id)
    comentario.delete()
    return {"message": "Comentário deletado com sucesso", "id": comentario_id}

