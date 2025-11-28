from ninja import Schema
from typing import Optional
from datetime import datetime

class ConversaSchema(Schema):
    id: int
    id_usuario1: int
    usuario1_nome: str
    usuario1_image_url: str
    id_usuario2: int
    usuario2_nome: str
    usuario2_image_url: str
    data_criacao: datetime
    data_atualizacao: datetime

class ConversaCreateSchema(Schema):
    id_usuario1: int
    id_usuario2: int

class ConversaUpdateSchema(Schema):
    id_usuario1: Optional[int] = None
    id_usuario2: Optional[int] = None

