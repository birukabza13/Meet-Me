
# Meet-me Social Media App

Meet-me is a platform for artists to share and explore artwork.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/meet-me.git
cd meet-me
```

### 2. Create and activate a virtual environment

- For macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

- For Windows:

```bash
python -m venv venv
.\venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply migrations

```bash
python manage.py migrate
```

### 5. Run the server

```bash
python manage.py runserver
```

Visit the app at `http://127.0.0.1:8000`.


