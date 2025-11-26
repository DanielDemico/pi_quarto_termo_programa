from django.contrib import admin
from .models import ImagemPost

@admin.register(ImagemPost)
class ImagemPostAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_post', 'url_imagem', 'data_criacao')
    list_filter = ('data_criacao', 'id_post')
    search_fields = ('url_imagem', 'id_post__titulo')
    readonly_fields = ('data_criacao',)
