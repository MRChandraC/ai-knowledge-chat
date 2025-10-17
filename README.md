# Document Chat AI - Interview Project

**🎯 Interview Challenge**: Build a simplified ChatPDF-like application where users can upload documents and chat with the content using AI. **Timeline: 1-2 days**

This is a coding challenge for candidates to demonstrate full-stack development skills, API design, and AI integration capabilities.

## 📋 What You Need to Build

### Core Requirements (Must-Have)
- ✅ Document Upload - PDF and TXT files (drag & drop)
- ✅ Document List - View, delete uploaded documents
- ✅ AI Chat - Ask questions about document content
- ✅ Real-time Chat - WebSocket for live responses

### Nice to Have (Optional)
- 🔸 Basic Auth - Simple JWT authentication (optional but recommended)

### Technical Stack Requirements
- **Backend**: Node.js/Express or Python/FastAPI or any suitable one
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL or MongoDB
- **AI**: OpenAI API or similar
- **Real-time**: Socket.io or WebSockets

## 🏗️ System Architecture

```
Frontend → API → Database
    ↓      ↓       ↓
   Chat → AI → File Storage
```

**Key Components to Implement:**
- File upload handler with validation
- PDF text extraction service
- AI chat service integration
- WebSocket manager for real-time chat
- Document CRUD operations
- JWT authentication system (optional)


## 🎯 Implementation Requirements

### API Endpoints to Build
```
POST /api/documents/upload     # Upload document with file validation
GET  /api/documents           # List user's documents
DELETE /api/documents/:id     # Delete specific document
POST /api/chat/:docId         # Send chat message to AI
GET  /api/chat/:docId         # Get chat history for document

WebSocket: /chat              # Real-time chat responses
```

### Database Schema to Create
**Documents Table:**
- id, user_id (optional), filename, content, summary, upload_date

**Chat Messages Table:**
- id, document_id, user_message, ai_response, timestamp

**Users Table (Optional):**
- id, email, password_hash, created_date

### UI Components to Implement
- **Upload Area**: Drag & drop with progress indicator
- **Document Grid**: Cards with metadata (name, size, upload date)
- **Chat Interface**: Messages + input field with real-time updates
- **Navigation**: Header with auth status
- **Responsive Design**: Mobile-friendly, clean UI

## 🔧 Implementation Details

### Document Processing
- Extract text from PDFs using libraries like `pdf-parse`
- Generate AI summaries using OpenAI API
- Store processed content in database
- Validate file types (PDF/TXT) and size limits

### Chat Logic
- Send document content + user question to OpenAI
- Implement WebSocket streaming for real-time responses
- Maintain conversation context per document
- Handle token limits for long documents

### Security Requirements
- JWT authentication system (if implementing auth)
- File validation (PDF/TXT only, size limits)
- Input sanitization
- Password hashing (if implementing auth)

## 📊 Evaluation Criteria

### Architecture (40%)
- Clean API design and code organization
- Proper separation of concerns
- Database schema design
- Component structure and reusability

### Functionality (35%)
- Complete upload → process → chat flow
- Real-time chat experience working
- Responsive UI on mobile/desktop
- Error handling for edge cases

### Code Quality (25%)
- Clean, readable code structure
- Proper Git commits with meaningful messages
- Basic tests for core functionality
- Following best practices

## 📝 Deliverables & Submission

### What to Submit
- **Working Application**: Fully functional app that can be run locally
- **Source Code**: Complete codebase on GitHub with proper Git history
- **README**: Clear setup and run instructions
- **Demo**: Sample documents and working demo video/screen recording

### Submission Process
1. **Create a feature branch** from the main branch
2. **Complete your implementation** with all required features
3. **Create a pull request** to submit your completed project for review

### Timeline & Focus
- **1-2 days** to complete the implementation
- **Priority**: Core features working well > many features working poorly
- **AI Tools**: You can use AI tools like GitHub Copilot, Claude, ChatGPT, or any other AI assistants to generate code

### Tools You Can Use
- **AI Assistants**: GitHub Copilot, Claude, ChatGPT, Cursor, or any AI coding tools
- **Frameworks**: React, Express, FastAPI, or any suitable alternatives
- **Databases**: PostgreSQL, MongoDB, or any preferred database
- **Libraries**: Any open-source libraries that help with implementation
- **Hosting**: Vercel, Netlify, Railway, or any cloud platform for deployment

### Testing Requirements
Implement basic tests for:
- Document upload and processing
- Chat functionality
- API endpoints
- Authentication flow (if implemented)

## 💡 Tips for Success

- Start with document upload and basic functionality
- Implement AI chat next
- Add real-time features and authentication (optional) last
- Test thoroughly on different devices
- Keep code clean and well-organized
- Use meaningful Git commit messages

## 🧪 Expected Quality Standards

### Code Standards
- Clean, readable code structure
- Error handling for edge cases
- Proper separation of concerns
- Following language/framework best practices

### Features Working
- Complete upload → process → chat workflow
- Real-time chat experience
- Responsive design (mobile + desktop)
- File validation and security measures

---

**Note**: This is a coding challenge specification. Candidates should build this application from scratch, demonstrating their full-stack development skills, API design, and AI integration capabilities. AI tools are allowed and encouraged for code generation, but the final codebase should reflect the candidate's understanding and architectural decisions.
