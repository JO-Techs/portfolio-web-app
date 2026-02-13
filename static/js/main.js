document.addEventListener('DOMContentLoaded', function() {
    // Particle Canvas Animation
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        // Set canvas size - ensure it covers full viewport
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();

        // Only initialize particles if canvas has valid dimensions
        if (canvas.width > 0 && canvas.height > 0) {
            const particles = [];
            const particleCount = 100;

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 5 + 2;
                    this.speedX = Math.random() * 1 - 0.5;
                    this.speedY = Math.random() * 1 - 0.5;
                    this.opacity = Math.random() * 0.5 + 0.2;
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }

                draw() {
                    ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            function connectParticles() {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 150) {
                            ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * (1 - distance / 150)})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                connectParticles();
                requestAnimationFrame(animate);
            }

            animate();

            // Handle window resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    resizeCanvas();
                }, 250);
            });
        }
    }

    // Auto-hide/show navbar on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('hidden');
            navbar.classList.remove('visible');
        } else {
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
        }
        
        lastScrollTop = scrollTop;
        animateSkills();
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up', 'visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .section');
    animateElements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
        animateSkills();
    });

    // Initial skill animation check
    animateSkills();

    // Email form submission
    const emailForm = document.querySelector('.email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = emailForm.querySelector('.email-input');
            const email = emailInput.value;
            
            // Simple validation
            if (email && email.includes('@')) {
                alert(`Thank you! We'll contact you at ${email}`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Validation rules
        const validators = {
            name: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return '';
            },
            email: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            },
            subject: (value) => {
                if (!value.trim()) return 'Subject is required';
                if (value.trim().length < 3) return 'Subject must be at least 3 characters';
                return '';
            },
            message: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return '';
            }
        };

        // Show error message
        const showError = (input, message) => {
            let errorEl = input.nextElementSibling;
            if (!errorEl || !errorEl.classList.contains('error-message')) {
                errorEl = document.createElement('div');
                errorEl.className = 'error-message';
                input.parentNode.appendChild(errorEl);
            }
            errorEl.textContent = message;
            input.style.borderColor = '#ff6b6b';
        };

        // Clear error message
        const clearError = (input) => {
            const errorEl = input.nextElementSibling;
            if (errorEl && errorEl.classList.contains('error-message')) {
                errorEl.textContent = '';
            }
            input.style.borderColor = '';
        };

        // Real-time validation
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.addEventListener('blur', () => {
                const fieldName = input.id;
                const error = validators[fieldName](input.value);
                if (error) {
                    showError(input, error);
                } else {
                    clearError(input);
                }
            });

            input.addEventListener('input', () => {
                const fieldName = input.id;
                const error = validators[fieldName](input.value);
                if (error) {
                    showError(input, error);
                } else {
                    clearError(input);
                }
            });
        });

        // Form submission validation
        contactForm.addEventListener('submit', (e) => {
            let hasErrors = false;

            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                const fieldName = input.id;
                const error = validators[fieldName](input.value);
                if (error) {
                    showError(input, error);
                    hasErrors = true;
                } else {
                    clearError(input);
                }
            });

            if (hasErrors) {
                e.preventDefault();
            }
        });

        // Add CSS for error messages
        if (!document.querySelector('style[data-form-validation]')) {
            const style = document.createElement('style');
            style.setAttribute('data-form-validation', 'true');
            style.textContent = `
                .error-message {
                    color: #ff6b6b;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    display: block;
                }
            `;
            document.head.appendChild(style);
        }
    }
});