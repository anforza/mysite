# Educational Portal (ODTI-style)

Full-stack educational institute portal built with Next.js, Tailwind CSS, MongoDB, and API routes.

## Features

- Multi-language routes (`uz`, `ru`, `en`)
- Public pages: Home, About, Courses, Admission, News, Contact
- Searchable courses
- Admission form with file upload
- Admin login with JWT cookie auth
- Admin dashboard to add/delete courses and news, view application counts
- REST API routes for courses, news, applications
- MongoDB models for users, courses, applications, posts
- SEO-ready metadata and sitemap

## Project Structure

```text
.
├── scripts/
│   └── seed.mjs
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── about/page.tsx
│   │   │   ├── admission/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── courses/page.tsx
│   │   │   ├── news/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── dashboard/page.tsx
│   │   │   └── login/page.tsx
│   │   ├── api/
│   │   │   ├── applications/[id]/route.ts
│   │   │   ├── applications/route.ts
│   │   │   ├── auth/login/route.ts
│   │   │   ├── courses/[id]/route.ts
│   │   │   ├── courses/route.ts
│   │   │   ├── news/[id]/route.ts
│   │   │   └── news/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdmissionForm.tsx
│   │   ├── ContactForm.tsx
│   │   ├── CourseSearch.tsx
│   │   ├── SiteFooter.tsx
│   │   └── SiteHeader.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── i18n.ts
│   │   ├── server-data.ts
│   │   └── validators.ts
│   └── models/
│       ├── Application.ts
│       ├── Course.ts
│       ├── News.ts
│       └── User.ts
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Setup Instructions

1. Install Node.js LTS (20+ recommended).
2. Install dependencies:
   - `npm install`
3. Create env file:
   - Copy `.env.example` to `.env`
4. Start MongoDB locally (or use MongoDB Atlas), then set `MONGODB_URI`.
5. Seed demo data:
   - `npm run seed`
6. Start development server:
   - `npm run dev`
7. Open:
   - `http://localhost:3000`
8. Admin login:
   - URL: `http://localhost:3000/admin/login`
   - Email: `admin@portal.uz`
   - Password: `Admin123!`

## REST API (examples)

- `GET/POST /api/courses`
- `PUT/DELETE /api/courses/:id`
- `GET/POST /api/news`
- `PUT/DELETE /api/news/:id`
- `GET/POST /api/applications`
- `PATCH /api/applications/:id`
- `POST /api/auth/login`

## Deployment

### Vercel (recommended)

1. Push project to GitHub.
2. Import repository to Vercel.
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy.

## Security and Best Practices

- Use strong `JWT_SECRET`
- Use HTTPS in production
- Set secure, httpOnly auth cookies
- Add rate limiting for auth and form endpoints
- Add file type and size restrictions for uploads
- Add request logging and monitoring (Sentry, Logtail, etc.)

## Scalability Suggestions

- Add RBAC roles (`superadmin`, `editor`, `admission-manager`)
- Move file uploads to cloud storage (S3/Cloudinary)
- Introduce Redis caching for frequently read content
- Add pagination and server-side search indexes in MongoDB
- Add testing stack (Vitest + Playwright)
- Add CMS-like editor for rich content pages
