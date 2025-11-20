# API Documentation

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.vercel.app/api`

## Authentication

Most admin endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Authentication

#### Register Admin
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "admin@example.com",
    "username": "admin"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response: Same as register

---

### Navigation (Admin)

#### Get Navigation
```http
GET /api/navigation
Authorization: Bearer TOKEN
```

#### Update Navigation
```http
PUT /api/navigation
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "menu_home": "Home",
  "menu_about": "About",
  "menu_services": "Services",
  "menu_projects": "Projects",
  "menu_gallery": "Gallery",
  "menu_careers": "Careers",
  "menu_contact": "Contact"
}
```

---

### Hero Section (Admin)

#### Get Hero
```http
GET /api/hero
Authorization: Bearer TOKEN
```

#### Update Hero
```http
PUT /api/hero
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "hero_title": "Shaping the Future",
  "hero_subtitle": "Client Satisfaction Is Our Profit",
  "hero_background_image": "https://example.com/image.jpg",
  "hero_tagline": "Optional tagline"
}
```

---

### About Section (Admin)

#### Get About
```http
GET /api/about
Authorization: Bearer TOKEN
```

#### Update About
```http
PUT /api/about
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "about_title": "About Us",
  "about_sub_title": "Bedroom Design",
  "about_description": "Rich text description",
  "about_vision_title": "Our Vision",
  "about_vision_description": "Vision description",
  "about_approach_title": "Our Approach",
  "about_approach_description": "Approach description",
  "about_image": "https://example.com/image.jpg"
}
```

---

### Services Section (Admin)

#### Get Services Header
```http
GET /api/services
Authorization: Bearer TOKEN
```

#### Update Services Header
```http
PUT /api/services
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "services_title": "Our Services"
}
```

#### Get All Service Items
```http
GET /api/services/items
Authorization: Bearer TOKEN
```

#### Create Service Item
```http
POST /api/services/items
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "service_name": "Architectural Design",
  "service_description": "Professional architectural design services",
  "service_icon": "https://example.com/icon.png"
}
```

#### Get Service Item
```http
GET /api/services/items/[id]
Authorization: Bearer TOKEN
```

#### Update Service Item
```http
PUT /api/services/items/[id]
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "service_name": "Updated Name",
  "service_description": "Updated description",
  "service_icon": "https://example.com/new-icon.png"
}
```

#### Delete Service Item
```http
DELETE /api/services/items/[id]
Authorization: Bearer TOKEN
```

---

### Projects Section (Admin)

#### Get Projects Header
```http
GET /api/projects
Authorization: Bearer TOKEN
```

#### Update Projects Header
```http
PUT /api/projects
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "projects_title": "Our Projects",
  "projects_subtitle": "Innovative architectural solutions",
  "view_all_projects_link": "/projects"
}
```

#### Get All Project Items
```http
GET /api/projects/items
Authorization: Bearer TOKEN
```

#### Create Project Item
```http
POST /api/projects/items
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "project_title": "Enscape",
  "project_cover_image": "https://example.com/cover.jpg",
  "project_thumbnail_image": "https://example.com/thumb.jpg",
  "project_description": "Project description",
  "project_year": 2023,
  "project_category": "Residential",
  "project_link": "View Project",
  "project_type": "Residential",
  "project_tags": ["modern", "residential"]
}
```

#### Get Project Item
```http
GET /api/projects/items/[id]
Authorization: Bearer TOKEN
```

#### Update Project Item
```http
PUT /api/projects/items/[id]
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "project_title": "Updated Title",
  "project_year": 2024
}
```

#### Delete Project Item
```http
DELETE /api/projects/items/[id]
Authorization: Bearer TOKEN
```

---

### Gallery (Admin)

#### Get Gallery
```http
GET /api/gallery
Authorization: Bearer TOKEN
```

#### Update Gallery
```http
PUT /api/gallery
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "gallery_title": "Gallery",
  "gallery_images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

---

### Careers (Admin)

#### Get Careers
```http
GET /api/careers
Authorization: Bearer TOKEN
```

#### Update Careers
```http
PUT /api/careers
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "careers_title": "Join Our Team",
  "careers_description": "We are looking for talented individuals",
  "current_openings_title": "Current Openings",
  "openings_list": [
    {
      "job_title": "Senior Architect",
      "apply_now_button_text": "Apply Now"
    }
  ]
}
```

---

### Contact (Admin)

#### Get Contact
```http
GET /api/contact
Authorization: Bearer TOKEN
```

#### Update Contact
```http
PUT /api/contact
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "contact_title": "Get in Touch",
  "contact_form_name_placeholder": "Your Name",
  "contact_form_email_placeholder": "Your Email",
  "contact_form_message_placeholder": "Your Message",
  "contact_submit_button_text": "Send Message",
  "contact_email": "hsplanningltd@yahoo.com"
}
```

---

### Footer (Admin)

#### Get Footer
```http
GET /api/footer
Authorization: Bearer TOKEN
```

#### Update Footer
```http
PUT /api/footer
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "footer_text": "© 2025 H S Planning Ltd. All rights reserved.",
  "footer_logo": "https://example.com/logo.png",
  "footer_links": [
    {
      "text": "Privacy Policy",
      "url": "/privacy"
    }
  ]
}
```

---

### File Upload

#### Upload File
```http
POST /api/upload
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "file": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "filename": "image.png",
  "folder": "uploads"
}
```

Or with buffer (as base64 string in JSON):
```json
{
  "file": "base64_encoded_file_data",
  "filename": "document.pdf",
  "folder": "documents"
}
```

Response:
```json
{
  "url": "https://blob.vercel-storage.com/uploads/image.png",
  "pathname": "uploads/image.png"
}
```

---

### Public Endpoints (No Authentication)

All public endpoints follow the same pattern:
- `GET /api/public/navigation`
- `GET /api/public/hero`
- `GET /api/public/about`
- `GET /api/public/services` (includes items)
- `GET /api/public/projects` (includes items)
- `GET /api/public/gallery`
- `GET /api/public/careers`
- `GET /api/public/contact`
- `GET /api/public/footer`

---

### Health Check

```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "message": "API is running",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 405 Method Not Allowed
```json
{
  "error": "Method not allowed"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

