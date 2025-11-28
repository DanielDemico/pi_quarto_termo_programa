from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Conversa
from .schemas import ConversaSchema, ConversaCreateSchema, ConversaUpdateSchema
from ninja import Router
from ninja.errors import HttpError
from pi_sustentabilidade.apps.users.models import Users 

router = Router()

# CREATE
@router.post("/create_conversa", response=ConversaSchema)
def create_conversa(request, payload: ConversaCreateSchema):
    try:
        if payload.id_usuario1 == payload.id_usuario2:
            raise HttpError(400, "Os usuários devem ser diferentes")

        conversa_existente = Conversa.objects.filter(
            Q(id_usuario1_id=payload.id_usuario1, id_usuario2_id=payload.id_usuario2) |
            Q(id_usuario1_id=payload.id_usuario2, id_usuario2_id=payload.id_usuario1)
        ).select_related("id_usuario1", "id_usuario2").first()

        if conversa_existente:
            raise HttpError(409, "Já existe uma conversa entre esses usuários")

        u1 = Users.objects.get(id=payload.id_usuario1)
        u2 = Users.objects.get(id=payload.id_usuario2)

        conversa = Conversa.objects.create(
            id_usuario1=u1,
            id_usuario2=u2,
        )

        return ConversaSchema(
            id=conversa.id,
            id_usuario1=conversa.id_usuario1_id,
            usuario1_nome=u1.name,
            usuario1_image_url=u1.image_url,
            id_usuario2=conversa.id_usuario2_id,
            usuario2_nome=u2.name,
            usuario2_image_url=u2.image_url,
            data_criacao=conversa.data_criacao,
            data_atualizacao=conversa.data_atualizacao,
        )
    except HttpError:
        raise
    except Exception as e:
        raise HttpError(400, f"Erro ao criar conversa: {str(e)}")

# READ - List all
@router.get("/get_conversas", response=list[ConversaSchema])
def list_conversas(request):
    conversas = Conversa.objects.select_related("id_usuario1", "id_usuario2").all()
    return [
        ConversaSchema(
            id=c.id,
            id_usuario1=c.id_usuario1_id,
            usuario1_nome=c.id_usuario1.name,
            usuario1_image_url=c.id_usuario1.image_url,
            id_usuario2=c.id_usuario2_id,
            usuario2_nome=c.id_usuario2.name,
            usuario2_image_url=c.id_usuario2.image_url,
            data_criacao=c.data_criacao,
            data_atualizacao=c.data_atualizacao,
        )
        for c in conversas
    ]

# READ - Get by ID
@router.get("/{conversa_id}", response=ConversaSchema)
def get_conversa_by_id(request, conversa_id: int):
    c = get_object_or_404(Conversa.objects.select_related("id_usuario1", "id_usuario2"), id=conversa_id)
    return ConversaSchema(
        id=c.id,
        id_usuario1=c.id_usuario1_id,
        usuario1_nome=c.id_usuario1.name,
        usuario1_image_url=c.id_usuario1.image_url,
        id_usuario2=c.id_usuario2_id,
        usuario2_nome=c.id_usuario2.name,
        usuario2_image_url=c.id_usuario2.image_url,
        data_criacao=c.data_criacao,
        data_atualizacao=c.data_atualizacao,
    )


# READ - Get conversas by user
@router.get("/user/{user_id}/conversas", response=list[ConversaSchema])
def get_conversas_by_user(request, user_id: int):
    conversas = Conversa.objects.select_related("id_usuario1", "id_usuario2").filter(
        Q(id_usuario1_id=user_id) | Q(id_usuario2_id=user_id)
    )
    return [
        ConversaSchema(
            id=c.id,
            id_usuario1=c.id_usuario1_id,
            usuario1_nome=c.id_usuario1.name,
            usuario1_image_url=c.id_usuario1.image_url,
            id_usuario2=c.id_usuario2_id,
            usuario2_nome=c.id_usuario2.name,
            usuario2_image_url=c.id_usuario2.image_url,
            data_criacao=c.data_criacao,
            data_atualizacao=c.data_atualizacao,
        )
        for c in conversas
    ]


# UPDATE
@router.put("/{conversa_id}", response=ConversaSchema)
def update_conversa(request, conversa_id: int, payload: ConversaUpdateSchema):
    conversa = get_object_or_404(Conversa, id=conversa_id)
    
    if payload.id_usuario1 is not None:
        conversa.id_usuario1_id = payload.id_usuario1
    if payload.id_usuario2 is not None:
        conversa.id_usuario2_id = payload.id_usuario2
    
    conversa.save()
    return conversa

# DELETE
@router.delete("/{conversa_id}")
def delete_conversa(request, conversa_id: int):
    conversa = get_object_or_404(Conversa, id=conversa_id)
    conversa.delete()
    return {"message": "Conversa deletada com sucesso", "id": conversa_id}

