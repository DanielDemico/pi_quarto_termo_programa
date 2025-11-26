from ninja import Schema
from typing import Optional
from datetime import datetime

class ImagemPostSchema(Schema):
    id: int
    id_post: int
    url_imagem: str
    data_criacao: datetime

class ImagemPostCreateSchema(Schema):
    id_post: int
    url_imagem: str

class ImagemPostUpdateSchema(Schema):
    url_imagem: Optional[str] = None

