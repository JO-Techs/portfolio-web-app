from django.contrib import admin
from .models import Project, Skill

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'technologies', 'created_at']
    list_filter = ['created_at']
    search_fields = ['title', 'description']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'level']
    list_filter = ['category']
    search_fields = ['name']