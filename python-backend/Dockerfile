FROM python:3.11-slim-bullseye

# Install system updates and security patches
RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends gcc && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt
COPY . .

# Create a non-root user and switch to it
RUN useradd -m appuser
USER appuser

EXPOSE 5000
CMD ["python", "app.py"]