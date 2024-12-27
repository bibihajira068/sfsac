# # Use the official Python image
# FROM python:3.10-slim

# # Set the working directory
# WORKDIR /app

# # Install dependencies
# COPY backend/requirements.txt requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the application code
# COPY backend/ .

# # Expose the backend port
# EXPOSE 8000

# # Command to run the server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
RUN python manage.py migrate
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]