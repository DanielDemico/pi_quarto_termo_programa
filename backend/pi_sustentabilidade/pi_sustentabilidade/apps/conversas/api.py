from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Conversa
from .schemas import ConversaSchema, ConversaCreateSchema, ConversaUpdateSchema
from ninja import Router
from ninja.errors import HttpError

router = Router()

# CREATE
@router.post("/create_conversa", response=ConversaSchema)
def create_conversa(request, payload: ConversaCreateSchema):
    try:
        # Verifica se os usuários são diferentes
        if payload.id_usuario1 == payload.id_usuario2:
            raise HttpError(400, "Os usuários devem ser diferentes")
        
        # Verifica se já existe conversa entre esses usuários (em qualquer ordem)
        conversa_existente = Conversa.objects.filter(
            Q(id_usuario1_id=payload.id_usuario1, id_usuario2_id=payload.id_usuario2) |
            Q(id_usuario1_id=payload.id_usuario2, id_usuario2_id=payload.id_usuario1)
        ).first()
        
        if conversa_existente:
            raise HttpError(409, "Já existe uma conversa entre esses usuários")
        
        conversa = Conversa.objects.create(
            id_usuario1_id=payload.id_usuario1,
            id_usuario2_id=payload.id_usuario2
        )
        return conversa
    except HttpError:
        raise
    except Exception as e:
        raise HttpError(400, f"Erro ao criar conversa: {str(e)}")

# READ - List all
@router.get("/get_conversas", response=list[ConversaSchema])
def list_conversas(request):
    return Conversa.objects.all()

# READ - Get by ID
@router.get("/{conversa_id}", response=ConversaSchema)
def get_conversa_by_id(request, conversa_id: int):
    return get_object_or_404(Conversa, id=conversa_id)

# READ - Get conversas by user
@router.get("/user/{user_id}/conversas", response=list[ConversaSchema])
def get_conversas_by_user(request, user_id: int):
    return Conversa.objects.filter(
        Q(id_usuario1_id=user_id) | Q(id_usuario2_id=user_id)
    )

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

