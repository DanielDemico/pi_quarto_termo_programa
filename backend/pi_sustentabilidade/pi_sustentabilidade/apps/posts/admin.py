from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'id_usuario', 'data_criacao')
    list_filter = ('data_criacao', 'id_usuario')
    search_fields = ('titulo', 'conteudo', 'id_usuario__name', 'id_usuario__email')
    readonly_fields = ('data_criacao', 'data_atualizacao')
