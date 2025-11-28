from ninja import Schema
from typing import Optional
from datetime import datetime

class ComentarioSchema(Schema):
    id: int
    id_post: int
    id_usuario: int
    usuario_nome: str
    texto: str
    data_criacao: datetime

class ComentarioCreateSchema(Schema):
    id_usuario: int
    id_post: int
    conteudo: str

class ComentarioUpdateSchema(Schema):
    conteudo: Optional[str] = None

