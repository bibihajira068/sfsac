# Use an official Python image as the base
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django app code into the container
COPY . /app/

# Expose the port Django will run on
EXPOSE 8000

# Run Django's development server (or use Gunicorn for production)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
