from django.contrib import admin
from .models import Conversa

@admin.register(Conversa)
class ConversaAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_usuario1', 'id_usuario2', 'data_criacao', 'data_atualizacao')
    list_filter = ('data_criacao', 'data_atualizacao')
    search_fields = ('id_usuario1__name', 'id_usuario1__email', 'id_usuario2__name', 'id_usuario2__email')
    readonly_fields = ('data_criacao', 'data_atualizacao')
