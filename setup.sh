#!/bin/bash

echo "🚀 Setting up AlgoForge..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL v14 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Setup environment file
echo "⚙️ Setting up environment files..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env file. Please update it with your database credentials."
else
    echo "ℹ️  backend/.env already exists."
fi

# Database setup
echo ""
echo "📊 Database Setup"
echo "=================="
echo "Please run the following commands to set up your database:"
echo ""
echo "1. Create the database:"
echo "   createdb algoforge"
echo ""
echo "2. Update backend/.env with your database credentials"
echo ""
echo "3. Run the schema:"
echo "   psql -d algoforge -f backend/src/database/schema.sql"
echo ""
echo "4. Seed the database:"
echo "   psql -d algoforge -f backend/src/database/seed.sql"
echo ""
echo "✨ Setup complete! Run 'npm run dev' to start the application."
