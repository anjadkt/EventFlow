# EventFlow

EventFlow is a full-stack event-management application where people can discover events, create and manage their own events, and RSVP to attend.

## Tech stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, Zod
- **Backend:** Express, TypeScript, Prisma, Zod
- **Database:** MySQL 8
- **Media uploads:** Cloudinary
- **Local containers:** Docker Compose

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Browse published events. |
| `/auth` | Register for an account or log in. |
| `/my-events` | View events created by the signed-in user. |
| `/events/create` | Create and publish an event through a four-step form. |
| `/events/[slug]` | View an event's details, attendees, and RSVP controls. |
| `/events/[slug]/edit` | Edit an event created by the signed-in user. |

## Features

- Authentication with registration, login, logout, refresh tokens, and protected routes.
- Browse published events and view detailed event information.
- Create and edit events.
- Cloudinary image uploads for event logos, thumbnails, and banners.
- RSVP support and an attendee view for event organisers.
- My Events dashboard for organisers.
- View attendee list for organisers in each event.

## Environment files

Copy the provided samples before starting Docker:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

### Backend: `server/.env`

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
DATABASE_URL=mysql://root:root@db:3306/eventflow
JWT_ACCESS_SECRET=replace-with-a-long-random-access-secret
JWT_REFRESH_SECRET=replace-with-a-long-random-refresh-secret
BCRYPT_SALT=10
ACCESS_EXPIRY=15m
REFRESH_EXPIRY=7d
```

`DATABASE_URL` uses the Compose service name (`db`). If you run the backend outside Docker, use `localhost:3307` instead.

### Frontend: `client/.env`

```env
# Used by browser requests
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Used by server-rendered Next.js requests inside Docker
INTERNAL_API_URL=http://backend:3001/api

# Create an unsigned upload preset in Cloudinary and add its values here.
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-unsigned-upload-preset
```


## Installation with Docker

1. Clone the repository and open the project directory.
2. Create the frontend and backend environment files.
3. Build and start all services:

   ```powershell
   docker compose up --build
   ```

4. Open [http://localhost:3000](http://localhost:3000). The API is available at [http://localhost:3001](http://localhost:3001), and MySQL is exposed on port `3307`.

Docker starts MySQL, waits for it, runs Prisma migrations, generates the Prisma client, and seeds demo users and events. The demo users use the password `Password@123` (users: `john@example.com`, `alex@example.com`, `mike@example.com`).
new registration also available
.
