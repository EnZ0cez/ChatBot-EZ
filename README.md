# 🤖 Ollama Chatbot with Spring AI

A full-stack chatbot application built with Spring Boot, Spring AI, and React TypeScript. The backend integrates with Ollama for local LLM inference, providing a private and fast chatbot experience.

## 🚀 Features

- **Spring Boot Backend** with Spring AI integration
- **Ollama Integration** for local LLM models
- **React TypeScript Frontend** with modern UI
- **Real-time Chat Interface** with message history
- **CORS Support** for development
- **Responsive Design** works on desktop and mobile
- **Error Handling** with graceful fallbacks

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Java 17+** installed
2. **Node.js 18+** and npm
3. **Maven 3.6+**
4. **Ollama** installed and running

### Installing and Setting up Ollama

1. Install Ollama from [https://ollama.ai](https://ollama.ai)
2. Start Ollama service:
   ```bash
   ollama serve
   ```
3. Pull a model (e.g., Llama 2):
   ```bash
   ollama pull llama2
   ```

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ollama-chatbot
```

### 2. Backend Setup
```bash
# Build and run the Spring Boot application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will start on `http://localhost:3000`

## 🔧 Configuration

### Backend Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  ai:
    ollama:
      base-url: http://localhost:11434  # Ollama server URL
      chat:
        model: llama2                   # Model name
        options:
          temperature: 0.7              # Response creativity
          num-predict: 1000             # Max response length
```

### Frontend Configuration

Edit `src/services/chatService.ts` to change the backend URL:

```typescript
const API_BASE_URL = 'http://localhost:8080/api/chat';
```

## 📡 API Endpoints

- `GET /api/chat/health` - Health check endpoint
- `POST /api/chat/message` - Send chat message (expects JSON: `{"message": "your message"}`)
- `POST /api/chat/simple` - Simple text message endpoint

## 🏗️ Project Structure

```
├── src/main/java/com/example/ollamachatbot/
│   ├── OllamaChatbotApplication.java    # Main application class
│   ├── controller/
│   │   └── ChatController.java          # REST API controller
│   ├── service/
│   │   └── ChatService.java             # Business logic
│   ├── model/
│   │   └── ChatMessage.java             # Data model
│   └── config/
│       └── WebConfig.java               # CORS configuration
├── src/main/resources/
│   └── application.yml                  # Application configuration
└── frontend/
    ├── src/
    │   ├── components/                  # React components
    │   ├── services/                    # API service layer
    │   └── App.tsx                      # Main React component
    └── package.json                     # Frontend dependencies
```

## 🎯 Usage

1. **Start Ollama**: Make sure Ollama is running with a model loaded
2. **Start Backend**: Run `mvn spring-boot:run` in the root directory
3. **Start Frontend**: Run `npm start` in the frontend directory
4. **Open Browser**: Navigate to `http://localhost:3000`
5. **Start Chatting**: Type a message and press Enter!

## 🔍 Troubleshooting

### Common Issues

**Backend fails to start:**
- Check if Java 17+ is installed: `java --version`
- Verify Maven installation: `mvn --version`
- Check if port 8080 is available

**Cannot connect to Ollama:**
- Ensure Ollama is running: `ollama serve`
- Check if the model is available: `ollama list`
- Verify Ollama URL in `application.yml`

**Frontend build fails:**
- Check Node.js version: `node --version` (should be 18+)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**CORS issues:**
- Verify frontend URL in WebConfig.java
- Check browser developer console for CORS errors

## 🚀 Deployment

### Backend Deployment
```bash
# Build JAR file
mvn clean package

# Run the JAR
java -jar target/ollama-chatbot-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Build production version
cd frontend
npm run build

# Serve the build directory with any static file server
```

## 🎨 Customization

### Adding New Models
1. Pull the model in Ollama: `ollama pull <model-name>`
2. Update `application.yml` with the new model name
3. Restart the backend

### UI Customization
- Modify CSS files in `frontend/src/components/`
- Update colors and styling in `App.css`
- Add new components in `frontend/src/components/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Spring AI](https://spring.io/projects/spring-ai) for LLM integration
- [Ollama](https://ollama.ai) for local LLM inference
- [React](https://reactjs.org) for the frontend framework