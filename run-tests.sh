#!/bin/bash

echo "AuthProxy Test Suite"
echo "==================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed."
    echo "Please install npm with Node.js from https://nodejs.org/"
    exit 1
fi

echo "Checking if dependencies are installed..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting AuthProxy service..."
docker-compose down 2>/dev/null
docker-compose up -d

echo "Waiting for service to be ready..."
sleep 10

echo "Running tests..."
npm test

echo "Test execution complete!"
