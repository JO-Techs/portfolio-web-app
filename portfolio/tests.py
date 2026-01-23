from django.test import TestCase
from django.urls import reverse
from .models import Project, Skill

class PortfolioViewTests(TestCase):
    def test_home_view(self):
        response = self.client.get(reverse('portfolio:home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Joel")

class ProjectModelTests(TestCase):
    def test_project_creation(self):
        project = Project.objects.create(
            title="Test Project",
            description="A test project",
            technologies="Django, Python"
        )
        self.assertEqual(str(project), "Test Project")