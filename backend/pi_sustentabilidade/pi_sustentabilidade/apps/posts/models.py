from django.db import models
from pi_sustentabilidade.apps.users.models import Users

class Post(models.Model):
    id_usuario = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='posts',
        verbose_name='Usuário'
    )
    titulo = models.CharField(max_length=200, verbose_name='Título')
    conteudo = models.TextField(verbose_name='Conteúdo')
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name='Data de Criação')
    data_atualizacao = models.DateTimeField(auto_now=True, verbose_name='Data de Atualização')
    
    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        ordering = ['-data_criacao']
    
    def __str__(self):
        return f"{self.titulo} - {self.id_usuario.name}"
