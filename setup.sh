#!/bin/bash

# NIKAT Setup Script
# This script sets up the NIKAT project for development

set -e

echo "🚀 NIKAT Setup Script"
echo "===================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check Expo CLI
if ! command -v expo &> /dev/null; then
    echo ""
    echo "⚠️  Expo CLI not found globally. Installing..."
    npm install -g expo-cli
fi

echo ""
echo "✓ Expo CLI found: $(expo --version)"

# Create .env if not exists
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your Firebase credentials"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your Firebase credentials"
echo "2. Run 'npm start' to start the development server"
echo "3. Scan QR code with Expo Go app on your phone"
echo ""
