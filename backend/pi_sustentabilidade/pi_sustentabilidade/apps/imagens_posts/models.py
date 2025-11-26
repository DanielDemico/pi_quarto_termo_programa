from django.db import models
from pi_sustentabilidade.apps.posts.models import Post

class ImagemPost(models.Model):
    id_post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='imagens',
        verbose_name='Post'
    )
    url_imagem = models.URLField(verbose_name='URL da Imagem')
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name='Data de Criação')
    
    class Meta:
        verbose_name = "Imagem do Post"
        verbose_name_plural = "Imagens dos Posts"
        ordering = ['-data_criacao']
    
    def __str__(self):
        return f"Imagem do post: {self.id_post.titulo}"
