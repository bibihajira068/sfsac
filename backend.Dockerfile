# Use the official Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY backend/ .

# Expose the backend port
EXPOSE 8000

# Command to run the server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
