from django.contrib import admin
from .models import Comentario

@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_usuario', 'id_post', 'data_criacao')
    list_filter = ('data_criacao', 'id_usuario', 'id_post')
    search_fields = ('conteudo', 'id_usuario__name', 'id_post__titulo')
    readonly_fields = ('data_criacao', 'data_atualizacao')
