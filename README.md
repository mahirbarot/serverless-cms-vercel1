# Custom CMS Backend

A serverless backend for a custom CMS system built with Next.js, MongoDB, and designed for Vercel deployment.

## Features

- **Serverless Architecture**: Built for Vercel serverless functions
- **MongoDB Integration**: Uses Mongoose for database operations
- **JWT Authentication**: Secure admin authentication
- **File Upload**: Supports image uploads via Vercel Blob
- **RESTful API**: Complete CRUD operations for all sections
- **CORS Support**: Configured for cross-origin requests

## Sections Supported

1. **Navigation** - Menu items
2. **Hero** - Hero section with title, subtitle, and background image
3. **About** - About section with vision and approach
4. **Services** - Services section with repeatable service items
5. **Projects** - Projects section with repeatable project items
6. **Gallery** - Gallery with multiple images
7. **Careers** - Careers section with job openings
8. **Contact** - Contact form configuration
9. **Footer** - Footer content and links

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
JWT_SECRET=your-super-secret-jwt-key
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token (optional)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login and get JWT token

### Admin Endpoints (Require Authentication)

All admin endpoints require a Bearer token in the Authorization header.

#### Navigation
- `GET /api/navigation` - Get navigation data
- `PUT /api/navigation` - Update navigation data

#### Hero
- `GET /api/hero` - Get hero section data
- `PUT /api/hero` - Update hero section data

#### About
- `GET /api/about` - Get about section data
- `PUT /api/about` - Update about section data

#### Services
- `GET /api/services` - Get services section header
- `PUT /api/services` - Update services section header
- `GET /api/services/items` - Get all service items
- `POST /api/services/items` - Create a new service item
- `GET /api/services/items/[id]` - Get a specific service item
- `PUT /api/services/items/[id]` - Update a service item
- `DELETE /api/services/items/[id]` - Delete a service item

#### Projects
- `GET /api/projects` - Get projects section header
- `PUT /api/projects` - Update projects section header
- `GET /api/projects/items` - Get all project items
- `POST /api/projects/items` - Create a new project item
- `GET /api/projects/items/[id]` - Get a specific project item
- `PUT /api/projects/items/[id]` - Update a project item
- `DELETE /api/projects/items/[id]` - Delete a project item

#### Gallery
- `GET /api/gallery` - Get gallery data
- `PUT /api/gallery` - Update gallery data

#### Careers
- `GET /api/careers` - Get careers section data
- `PUT /api/careers` - Update careers section data

#### Contact
- `GET /api/contact` - Get contact section data
- `PUT /api/contact` - Update contact section data

#### Footer
- `GET /api/footer` - Get footer data
- `PUT /api/footer` - Update footer data

#### File Upload
- `POST /api/upload` - Upload a file (returns URL)

### Public Endpoints (No Authentication Required)

- `GET /api/public/navigation`
- `GET /api/public/hero`
- `GET /api/public/about`
- `GET /api/public/services`
- `GET /api/public/projects`
- `GET /api/public/gallery`
- `GET /api/public/careers`
- `GET /api/public/contact`
- `GET /api/public/footer`

## Usage Examples

### Register Admin

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Update Hero Section (with authentication)

```bash
curl -X PUT http://localhost:3000/api/hero \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "hero_title": "Shaping the Future",
    "hero_subtitle": "Client Satisfaction Is Our Profit"
  }'
```

### Create a Service Item

```bash
curl -X POST http://localhost:3000/api/services/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "service_name": "Architectural Design",
    "service_description": "Professional architectural design services",
    "service_icon": "https://example.com/icon.png"
  }'
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `BLOB_READ_WRITE_TOKEN` (if using Vercel Blob)
4. Deploy

## Database Models

All models are defined in the `models/` directory:
- `Admin.ts` - Admin user model
- `Navigation.ts` - Navigation menu items
- `Hero.ts` - Hero section
- `About.ts` - About section
- `Service.ts` - Individual service items
- `Services.ts` - Services section header
- `Project.ts` - Individual project items
- `Projects.ts` - Projects section header
- `Gallery.ts` - Gallery images
- `Career.ts` - Careers section
- `Contact.ts` - Contact section
- `Footer.ts` - Footer section

## File Upload

Files are uploaded to Vercel Blob storage. To use file uploads:

1. Get a Blob storage token from Vercel
2. Add it to your environment variables as `BLOB_READ_WRITE_TOKEN`
3. Upload files using the `/api/upload` endpoint

## Security Notes

- Always use strong JWT secrets in production
- Use HTTPS in production
- Consider rate limiting for production
- Validate all inputs on the client side
- Use environment variables for sensitive data

## License

ISC

