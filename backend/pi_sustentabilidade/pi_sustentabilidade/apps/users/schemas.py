# pi_sustentabilidade/pi_sustentabilidade/apps/users/schemas.py
from ninja import Schema
from typing import Optional

class UserSchema(Schema):
    id: int
    name: str
    email: str
    image_url: Optional[str] = None

class UserCreateSchema(Schema):
    name: str
    email: str
    image_url: Optional[str] = None
    password: str

class UserUpdateSchema(Schema):
    name: Optional[str] = None
    email: Optional[str] = None
    image_url: Optional[str] = None
    password: Optional[str] = None

