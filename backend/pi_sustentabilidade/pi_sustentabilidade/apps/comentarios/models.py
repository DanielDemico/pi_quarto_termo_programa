from django.db import models
from pi_sustentabilidade.apps.users.models import Users
from pi_sustentabilidade.apps.posts.models import Post

class Comentario(models.Model):
    id_usuario = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='comentarios',
        verbose_name='Usuário'
    )
    id_post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comentarios',
        verbose_name='Post'
    )
    conteudo = models.TextField(verbose_name='Conteúdo')
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name='Data de Criação')
    data_atualizacao = models.DateTimeField(auto_now=True, verbose_name='Data de Atualização')
    
    class Meta:
        verbose_name = "Comentário"
        verbose_name_plural = "Comentários"
        ordering = ['-data_criacao']
    
    def __str__(self):
        return f"Comentário de {self.id_usuario.name} em {self.id_post.titulo}"
