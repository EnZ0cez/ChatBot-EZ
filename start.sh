#!/bin/bash

echo "🤖 Starting Ollama Chatbot Application"
echo "======================================"

# Check if Ollama is running
echo "🔍 Checking Ollama status..."
if ! curl -s http://localhost:11434/api/version > /dev/null 2>&1; then
    echo "❌ Ollama is not running. Please start Ollama first:"
    echo "   ollama serve"
    echo "   ollama pull llama2"
    exit 1
fi

echo "✅ Ollama is running"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend
echo "🚀 Starting Spring Boot backend..."
mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 15

# Check if backend is running
if ! curl -s http://localhost:8080/api/chat/health > /dev/null 2>&1; then
    echo "❌ Backend failed to start. Check backend.log for details."
    cleanup
fi

echo "✅ Backend is running on http://localhost:8080"

# Start frontend
echo "🚀 Starting React frontend..."
cd frontend
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "⏳ Waiting for frontend to start..."
sleep 10

echo "✅ Frontend is running on http://localhost:3000"
echo ""
echo "🎉 Application is ready!"
echo "📱 Open your browser and go to: http://localhost:3000"
echo "🔗 Backend API available at: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait