from ninja import Schema
from typing import Optional
from datetime import datetime
from typing import Optional

class PostSchema(Schema):
    id: int
    id_usuario: int
    usuario_nome: str
    usuario_image_url: Optional[str] = None
    titulo: str
    conteudo: str
    data_criacao: datetime
    data_atualizacao: datetime


class PostCreateSchema(Schema):
    id_usuario: int
    titulo: str
    conteudo: str

class PostUpdateSchema(Schema):
    titulo: Optional[str] = None
    conteudo: Optional[str] = None

