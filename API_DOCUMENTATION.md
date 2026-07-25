# ChaLo AI - API Documentation

## 📚 API Overview

ChaLo AI provides a comprehensive REST API with WebSocket support for real-time features. All endpoints are protected with JWT authentication.

**Base URL**: `http://localhost:5000/api`

---

## 🔐 Authentication

### JWT Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer {token}
```

### Login Endpoint

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK)**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Register Endpoint

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "secure_password",
  "name": "John Doe"
}
```

---

## 🤖 AI Endpoints

### Chat with AI

```http
POST /api/ai/chat
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "What is machine learning?",
  "conversationId": "conv-123" // optional
}
```

**Response (200 OK)**:
```json
{
  "message": "Chat processed",
  "response": "Machine learning is a subset of artificial intelligence...",
  "conversationId": "conv-123",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Generate Image

```http
POST /api/ai/image/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "prompt": "A futuristic city at sunset",
  "model": "dall-e-3",
  "size": "1024x1024"
}
```

**Response (200 OK)**:
```json
{
  "message": "Image generation started",
  "taskId": "task-uuid",
  "status": "processing",
  "estimatedTime": "30 seconds"
}
```

### Get Available AI Models

```http
GET /api/ai/models
Authorization: Bearer {token}
```

**Response (200 OK)**:
```json
{
  "models": [
    {
      "id": "gpt-4",
      "name": "GPT-4",
      "type": "language",
      "status": "active",
      "capabilities": ["chat", "analysis", "code"]
    },
    {
      "id": "dall-e-3",
      "name": "DALL-E 3",
      "type": "image",
      "status": "active",
      "capabilities": ["image-generation"]
    }
  ]
}
```

### Analyze Code

```http
POST /api/ai/code/analyze
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "function add(a, b) { return a + b; }",
  "language": "javascript"
}
```

**Response (200 OK)**:
```json
{
  "message": "Code analysis completed",
  "language": "javascript",
  "analysis": {
    "issues": [],
    "suggestions": ["Add JSDoc comments"],
    "qualityScore": 85,
    "complexity": "low"
  }
}
```

---

## 👤 User Endpoints

### Get Current User Profile

```http
GET /api/users/profile
Authorization: Bearer {token}
```

**Response (200 OK)**:
```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "avatar": "https://...",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### Update User Profile

```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "avatar": "base64-image-data"
}
```

**Response (200 OK)**:
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Get All Users (Admin Only)

```http
GET /api/users?page=1&limit=10
Authorization: Bearer {admin-token}
```

**Response (200 OK)**:
```json
{
  "users": [ ... ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "pages": 15
  }
}
```

---

## 📤 File Upload

### Upload Single File

```http
POST /api/upload/file
Authorization: Bearer {token}
Content-Type: multipart/form-data

[multipart form data with file]
```

**Response (200 OK)**:
```json
{
  "message": "File uploaded successfully",
  "file": {
    "id": "file-uuid",
    "filename": "document.pdf",
    "originalName": "my-document.pdf",
    "size": 1024000,
    "mimetype": "application/pdf",
    "url": "https://storage.example.com/documents/file-uuid"
  }
}
```

### Upload Multiple Files

```http
POST /api/upload/files
Authorization: Bearer {token}
Content-Type: multipart/form-data

[multipart form data with multiple files]
```

**Response (200 OK)**:
```json
{
  "message": "Files uploaded successfully",
  "files": [
    { ... },
    { ... }
  ]
}
```

---

## 🛠️ Admin Endpoints

### Dashboard Statistics

```http
GET /api/admin/dashboard
Authorization: Bearer {admin-token}
```

**Response (200 OK)**:
```json
{
  "stats": {
    "totalUsers": 1250,
    "activeUsers": 450,
    "totalRequests": 98765,
    "systemHealth": 99.8,
    "uptime": "45 days 3 hours"
  }
}
```

### Suspend User

```http
POST /api/admin/users/:userId/suspend
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "reason": "Violation of terms"
}
```

**Response (200 OK)**:
```json
{
  "message": "User suspended successfully",
  "userId": "user-uuid"
}
```

### Restore User

```http
POST /api/admin/users/:userId/restore
Authorization: Bearer {admin-token}
```

**Response (200 OK)**:
```json
{
  "message": "User restored successfully",
  "userId": "user-uuid"
}
```

### Update System Settings

```http
PUT /api/admin/settings
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "maintenanceMode": false,
  "maxFileSize": 52428800,
  "featureFlags": {
    "aiChat": true,
    "imageGeneration": true
  }
}
```

**Response (200 OK)**:
```json
{
  "message": "Settings updated",
  "settings": { ... }
}
```

---

## 🌐 WebSocket Events

### Connect to WebSocket

```javascript
const socket = io('http://localhost:5000', {
  auth: {
    token: 'your-jwt-token'
  }
});

// On successful connection
socket.on('connect', () => {
  console.log('Connected to WebSocket');
});
```

### Chat Events

```javascript
// Send message
socket.emit('chat:message', {
  conversationId: 'conv-123',
  message: 'Hello AI'
});

// Receive response
socket.on('chat:response', (data) => {
  console.log('AI Response:', data.response);
});
```

### Notification Events

```javascript
// Listen for notifications
socket.on('notification', (data) => {
  console.log('Notification:', data.message);
});
```

### Typing Indicator

```javascript
// User is typing
socket.emit('user:typing', { conversationId: 'conv-123' });

// User stopped typing
socket.emit('user:stopped-typing', { conversationId: 'conv-123' });

// Listen for typing indicators
socket.on('user:typing', (data) => {
  console.log(`${data.userName} is typing...`);
});
```

---

## 📊 Error Responses

### 400 - Bad Request

```json
{
  "error": {
    "status": 400,
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 401 - Unauthorized

```json
{
  "error": {
    "status": 401,
    "message": "Invalid or expired token",
    "code": "UNAUTHORIZED"
  }
}
```

### 403 - Forbidden

```json
{
  "error": {
    "status": 403,
    "message": "Admin access required",
    "code": "FORBIDDEN"
  }
}
```

### 404 - Not Found

```json
{
  "error": {
    "status": 404,
    "message": "Resource not found",
    "code": "NOT_FOUND"
  }
}
```

### 500 - Server Error

```json
{
  "error": {
    "status": 500,
    "message": "Internal server error",
    "code": "INTERNAL_ERROR"
  }
}
```

---

## 📝 Request/Response Headers

### Common Request Headers

```
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
X-Request-ID: unique-request-id (optional)
```

### Common Response Headers

```
Content-Type: application/json
X-Response-Time: 145ms
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1634567890
```

---

## 🔄 Pagination

For endpoints that return lists, use these query parameters:

```
GET /api/users?page=1&limit=10&sort=createdAt&order=desc
```

**Response Structure**:
```json
{
  "data": [ ... ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "pages": 15,
    "hasMore": true
  }
}
```

---

## 🔍 Filtering & Searching

```
GET /api/users?search=john&role=user&status=active
```

Supported query parameters vary by endpoint. Check specific endpoint documentation.

---

## 📈 Rate Limiting

API is rate-limited to **1000 requests per hour** per IP address.

When rate limit is exceeded, you'll receive:

```
HTTP 429 Too Many Requests

Retry-After: 3600
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
```

---

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Chat with AI
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

### Using Postman

1. Open Postman
2. Create new request
3. Set method to POST
4. Enter URL: `http://localhost:5000/api/auth/login`
5. Go to Body → raw → JSON
6. Paste: `{"email":"user@example.com","password":"password"}`
7. Send request

### Using Insomnia

1. Create new HTTP request
2. Method: POST
3. URL: `http://localhost:5000/api/auth/login`
4. Body (JSON): 
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

---

## 📖 API Documentation Portal

Access interactive API documentation:

```
http://localhost:5000/api/docs
```

Provides:
- Swagger UI
- Try-it-out functionality
- Request/response examples
- Schema documentation

---

## Support

For API issues or questions:

- **Documentation**: [GitHub Wiki](https://github.com/jlordie/chalo-ai/wiki)
- **Issues**: [GitHub Issues](https://github.com/jlordie/chalo-ai/issues)
- **Email**: jhonlordvisto101@gmail.com

---

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Core AI endpoints
- User management
- File upload
- Admin dashboard
- WebSocket support
