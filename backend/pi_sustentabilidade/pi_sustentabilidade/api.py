# pi_sustentabilidade/pi_sustentabilidade/api.py
from ninja import NinjaAPI
from .apps.users.api import router as users_router  # ← Importar do api.py correto

api = NinjaAPI()

# Registra o router de usuários
api.add_router("users/", users_router)

@api.get("/hello")
def hello(request):
    return {"message": "Hello World"}