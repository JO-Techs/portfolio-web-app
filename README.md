# Joel's Professional Portfolio

A modern, responsive Django-based portfolio website with an attractive design and smooth animations.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Django Admin**: Easy content management through Django admin interface
- **Dynamic Content**: Projects and skills can be managed through the admin panel
- **SEO Friendly**: Semantic HTML structure and meta tags
- **Fast Loading**: Optimized CSS and JavaScript

## Tech Stack

- **Backend**: Django 4.2.7
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: SQLite (development) / PostgreSQL (production)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Unicode emojis and custom styling

## Quick Start

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

4. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

5. **Access the Website**
   - Portfolio: http://127.0.0.1:8000/
   - Admin Panel: http://127.0.0.1:8000/admin/

## Customization

### Adding Projects
1. Go to the Django admin panel
2. Navigate to "Projects"
3. Add your projects with title, description, technologies, and links

### Adding Skills
1. Go to the Django admin panel
2. Navigate to "Skills"
3. Add skills with name, category, and proficiency level (0-100)

### Updating Personal Information
Edit the template file `templates/portfolio/home.html` to update:
- Name and title
- About section content
- Contact information
- Social media links

### Styling
- Main styles: `static/css/style.css`
- JavaScript: `static/js/main.js`
- Images: `static/images/`

## Deployment

For production deployment:

1. Set `DEBUG = False` in settings.py
2. Configure your database (PostgreSQL recommended)
3. Set up static file serving
4. Configure your domain in `ALLOWED_HOSTS`
5. Use environment variables for sensitive settings

## License

This project is open source and available under the MIT License.
