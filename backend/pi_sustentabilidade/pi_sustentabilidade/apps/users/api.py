from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import make_password
from .models import Users
from .schemas import UserSchema, UserCreateSchema

# Create your views here.
from ninja import Router
from ninja.errors import HttpError

router = Router()

@router.get("/", response=list[UserSchema])
def list_users(request):
    return Users.objects.all()

@router.post("/", response=UserSchema)
def create_user(request, payload: UserCreateSchema):
    if Users.objects.filter(email=payload.email).exists():
        raise HttpError(409, "Já existe usuario com esse email")

    usuario = Users.objects.create(
        name=payload.name,
        email=payload.email,
        password=payload.password
    )
    return usuario  

@router.get("/{user_id}", response=UserSchema)
def user_by_id(request, user_id:int):
    return Users.get_object_or_404(User, id=user_id)


