from django.db import models
from pi_sustentabilidade.apps.conversas.models import Conversa
from pi_sustentabilidade.apps.users.models import Users

class MensagemDireta(models.Model):
    id_conversa = models.ForeignKey(
        Conversa,
        on_delete=models.CASCADE,
        related_name='mensagens',
        verbose_name='Conversa'
    )
    id_usuario = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='mensagens_enviadas',
        verbose_name='Usuário Remetente'
    )
    conteudo = models.TextField(verbose_name='Conteúdo')
    data_envio = models.DateTimeField(auto_now_add=True, verbose_name='Data de Envio')
    lida = models.BooleanField(default=False, verbose_name='Lida')
    
    class Meta:
        verbose_name = "Mensagem Direta"
        verbose_name_plural = "Mensagens Diretas"
        ordering = ['data_envio']
    
    def __str__(self):
        return f"Mensagem de {self.id_usuario.name} em {self.id_conversa}"
