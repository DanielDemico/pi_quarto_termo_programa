# pi_sustentabilidade/pi_sustentabilidade/api.py
from ninja import NinjaAPI, Redoc
from .apps.users.api import router as users_router
from .apps.posts.api import router as posts_router
from .apps.comentarios.api import router as comentarios_router
from .apps.imagens_posts.api import router as imagens_posts_router
from .apps.conversas.api import router as conversas_router
from .apps.mensagens_diretas.api import router as mensagens_diretas_router

api = NinjaAPI(
    title="PI Sustentabilidade API",
    version="1.0.0",
    description="API para o projeto de sustentabilidade"
)

# Registra todos os routers
api.add_router("users/", users_router)
api.add_router("posts/", posts_router)
api.add_router("comentarios/", comentarios_router)
api.add_router("imagens-posts/", imagens_posts_router)
api.add_router("conversas/", conversas_router)
api.add_router("mensagens-diretas/", mensagens_diretas_router)

@api.get("/hello")
def hello(request):
    return {"message": "Hello World"}