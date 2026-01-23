from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True)
    technologies = models.CharField(max_length=300)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=50)  # 0-100
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name