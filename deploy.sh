#!/bin/bash

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker if not installed
if ! [ -x "$(command -v docker)" ]; then
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
fi

# Install Docker Compose if not installed
if ! [ -x "$(command -v docker-compose)" ]; then
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

# Clone/pull repository
if [ -d "dineshwayaman_web" ]; then
  cd dineshwayaman_web
  git pull
else
  git clone https://github.com/dineshwayaman/dineshwayaman_web.git
  cd dineshwayaman_web
fi

# Create .env file if not exists
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Please update .env file with your credentials"
  exit 1
fi

# Build and run with Docker Compose
docker-compose up -d --build
