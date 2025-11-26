from django.contrib import admin
from .models import MensagemDireta

@admin.register(MensagemDireta)
class MensagemDiretaAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_conversa', 'id_usuario', 'lida', 'data_envio')
    list_filter = ('lida', 'data_envio', 'id_conversa')
    search_fields = ('conteudo', 'id_usuario__name', 'id_usuario__email')
    readonly_fields = ('data_envio',)
