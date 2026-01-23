from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, Skill

def home(request):
    projects = Project.objects.all()[:6]
    skills = Skill.objects.all()
    
    context = {
        'projects': projects,
        'skills': skills,
    }
    return render(request, 'portfolio/home.html', context)

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # Email content
        email_subject = f"Portfolio Contact: {subject}"
        email_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        
        try:
            send_mail(
                email_subject,
                email_message,
                email,
                ['joeltito2005@gmail.com'],  # Replace with your email
                fail_silently=False,
            )
            messages.success(request, 'Thank you! Your message has been sent successfully.')
            return redirect('portfolio:contact')
        except Exception as e:
            messages.error(request, 'Sorry, there was an error sending your message. Please try again.')
    
    return render(request, 'portfolio/contact.html')