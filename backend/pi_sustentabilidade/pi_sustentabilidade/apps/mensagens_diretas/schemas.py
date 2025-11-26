from ninja import Schema
from typing import Optional
from datetime import datetime

class MensagemDiretaSchema(Schema):
    id: int
    id_conversa: int
    id_usuario: int
    conteudo: str
    data_envio: datetime
    lida: bool

class MensagemDiretaCreateSchema(Schema):
    id_conversa: int
    id_usuario: int
    conteudo: str

class MensagemDiretaUpdateSchema(Schema):
    conteudo: Optional[str] = None
    lida: Optional[bool] = None

