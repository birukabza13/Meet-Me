
**Server README.md**

# Server Side - README

## Tech Stack

- **Backend:** Django, Django REST Framework (DRF)
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Image Hosting:** Cloudinary
- **API Deployed on:** [Render.com](https://render.com)
- **Database Hosting:** [Neon.tech](https://neon.tech)

## Cloning Instructions

1. Navigate to the server directory:
```bash
cd Meet-Me/Server
```
2. Create and activate a virtual environment:

For macos/linux:
```bash
python -m venv .venv
source env/bin/activate
```
For macos/linux:
```bash
python -m venv .venv
.venv\scripts\activate
```
3. Install dependencies:


```bash
pip install -r requirements.txt
```

4. Run migrations:

```bash
python manage.py migrate
```
5. Start the development server:
```bash
python manage.py runserver
```

# Overview
The server side manages the APIs, database interactions, and business logic. It provides endpoints for user authentication, post management, and more.

# Currently Working On
**Algorithm Development**: Enhancing the feed algorithm for better content discovery.

**Feature Addition**: Implementing a comment system for posts.

**Improvement**: Enhancing search functionality for easier content discovery.

**Documentation**: Documentation using swagger UI.
