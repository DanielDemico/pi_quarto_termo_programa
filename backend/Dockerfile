FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY pyproject.toml ./

# Install Python dependencies
RUN pip install --no-cache-dir uv && \
    uv pip install --system -r pyproject.toml

# Copy project files
COPY . .

# Run migrations and collect static files
RUN python pi_sustentabilidade/manage.py migrate && \
    python pi_sustentabilidade/manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "pi_sustentabilidade/manage.py", "runserver", "0.0.0.0:8000"]