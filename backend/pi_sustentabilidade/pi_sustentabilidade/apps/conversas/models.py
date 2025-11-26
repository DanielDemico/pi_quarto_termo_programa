from django.db import models
from pi_sustentabilidade.apps.users.models import Users

class Conversa(models.Model):
    id_usuario1 = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='conversas_como_usuario1',
        verbose_name='Usuário 1'
    )
    id_usuario2 = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='conversas_como_usuario2',
        verbose_name='Usuário 2'
    )
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name='Data de Criação')
    data_atualizacao = models.DateTimeField(auto_now=True, verbose_name='Data de Atualização')
    
    class Meta:
        verbose_name = "Conversa"
        verbose_name_plural = "Conversas"
        ordering = ['-data_atualizacao']
        unique_together = [['id_usuario1', 'id_usuario2']]
    
    def __str__(self):
        return f"Conversa entre {self.id_usuario1.name} e {self.id_usuario2.name}"
