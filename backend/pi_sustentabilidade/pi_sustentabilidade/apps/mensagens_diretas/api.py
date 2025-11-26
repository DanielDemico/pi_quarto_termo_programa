from django.shortcuts import get_object_or_404
from .models import MensagemDireta
from .schemas import MensagemDiretaSchema, MensagemDiretaCreateSchema, MensagemDiretaUpdateSchema
from ninja import Router
from ninja.errors import HttpError

router = Router()

# CREATE
@router.post("/create_mensagem_direta", response=MensagemDiretaSchema)
def create_mensagem_direta(request, payload: MensagemDiretaCreateSchema):
    try:
        mensagem = MensagemDireta.objects.create(
            id_conversa_id=payload.id_conversa,
            id_usuario_id=payload.id_usuario,
            conteudo=payload.conteudo
        )
        return mensagem
    except Exception as e:
        raise HttpError(400, f"Erro ao criar mensagem direta: {str(e)}")

# READ - List all
@router.get("/get_mensagens_diretas", response=list[MensagemDiretaSchema])
def list_mensagens_diretas(request):
    return MensagemDireta.objects.all()

# READ - Get by ID
@router.get("/{mensagem_id}", response=MensagemDiretaSchema)
def get_mensagem_direta_by_id(request, mensagem_id: int):
    return get_object_or_404(MensagemDireta, id=mensagem_id)

# READ - Get mensagens by conversa
@router.get("/conversa/{conversa_id}/mensagens", response=list[MensagemDiretaSchema])
def get_mensagens_by_conversa(request, conversa_id: int):
    return MensagemDireta.objects.filter(id_conversa_id=conversa_id)

# READ - Get mensagens by user
@router.get("/user/{user_id}/mensagens", response=list[MensagemDiretaSchema])
def get_mensagens_by_user(request, user_id: int):
    return MensagemDireta.objects.filter(id_usuario_id=user_id)

# UPDATE
@router.put("/{mensagem_id}", response=MensagemDiretaSchema)
def update_mensagem_direta(request, mensagem_id: int, payload: MensagemDiretaUpdateSchema):
    mensagem = get_object_or_404(MensagemDireta, id=mensagem_id)
    
    if payload.conteudo is not None:
        mensagem.conteudo = payload.conteudo
    if payload.lida is not None:
        mensagem.lida = payload.lida
    
    mensagem.save()
    return mensagem

# DELETE
@router.delete("/{mensagem_id}")
def delete_mensagem_direta(request, mensagem_id: int):
    mensagem = get_object_or_404(MensagemDireta, id=mensagem_id)
    mensagem.delete()
    return {"message": "Mensagem direta deletada com sucesso", "id": mensagem_id}

