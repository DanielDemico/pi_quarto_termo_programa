from django.contrib import admin
from .models import Users

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'image_url')
    list_filter = ('email',)
    search_fields = ('name', 'email')
    readonly_fields = ()
