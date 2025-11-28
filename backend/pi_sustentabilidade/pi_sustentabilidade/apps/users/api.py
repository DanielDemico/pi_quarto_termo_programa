from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from .models import Users
from .schemas import UserSchema, UserCreateSchema, UserUpdateSchema, LoginSchema

# Create your views here.
from ninja import Router
from ninja.errors import HttpError

router = Router()


# LOGIN
@router.post("/login")
def login(request, payload: LoginSchema):

    try:
        user = Users.objects.get(email=payload.email)
    except Users.DoesNotExist:
        raise HttpError(404, "Usuário não encontrado")

    if not check_password(payload.password, user.password):
        raise HttpError(401, "Senha incorreta")

    return {
        "message": "Login realizado com sucesso",
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
    }

# CREATE
@router.post("/create_user", response=UserSchema)
def create_user(request, payload: UserCreateSchema):
    if Users.objects.filter(email=payload.email).exists():
        raise HttpError(409, "Já existe usuario com esse email")

    usuario = Users.objects.create(
        name=payload.name,
        email=payload.email,
        password=make_password(payload.password),
        image_url=payload.image_url if hasattr(payload, 'image_url') and payload.image_url else None
    )
    return usuario  

# READ - List all
@router.get("/get_users", response=list[UserSchema])
def list_users(request):
    return Users.objects.all()

# READ - Get by ID
@router.get("/{user_id}", response=UserSchema)
def user_by_id(request, user_id: int):
    return get_object_or_404(Users, id=user_id)

# UPDATE
@router.put("/{user_id}", response=UserSchema)
def update_user(request, user_id: int, payload: UserUpdateSchema):
    usuario = get_object_or_404(Users, id=user_id)
    
    # Verifica se o email já está sendo usado por outro usuário
    if payload.email is not None and payload.email != usuario.email:
        if Users.objects.filter(email=payload.email).exclude(id=user_id).exists():
            raise HttpError(409, "Já existe usuario com esse email")
        usuario.email = payload.email
    
    if payload.name is not None:
        usuario.name = payload.name
    if payload.image_url is not None:
        usuario.image_url = payload.image_url
    if payload.password is not None:
        usuario.password = make_password(payload.password)
    
    usuario.save()
    return usuario

# DELETE
@router.delete("/{user_id}")
def delete_user(request, user_id: int):
    usuario = get_object_or_404(Users, id=user_id)
    usuario.delete()
    return {"message": "Usuário deletado com sucesso", "id": user_id}

