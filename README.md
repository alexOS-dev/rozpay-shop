# Caggy | Shop

## Getting Started

1. Install node modules

```bash
npm install
```

with pnpm

```bash
pnpm i
```

2. Create an .env file and set the next variables:

- DB_USER="USERNAME" (default: postgres)
- DB_NAME="YOUR_DB_NAME"
- DB_PASSWORD="YOUR_DB_PASSWORD"

> NOTE: You can copy and rename the template `.env.template` -> `.env`

3. Setup prisma DATABASE_URL in your .env file: `DATABASE_URL="postgresql://user:password@localhost:5432/db-name?schema=public"`

4. Run the Docker compose command to create the postgres database

```bash
docker compose up -d
```

5. Run prisma dev migration

```bash
npx prisma migrate dev
```

6. Run seed script (this will add some products to the DB)

```bash
npm run seed
```

7. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Main tech Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### UI

![Shadcn](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI Badge](https://img.shields.io/badge/Radix%20UI-161618?logo=radixui&logoColor=fff&style=for-the-badge)

### Backend

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### Cloud

![Cloudinary Badge](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=fff&style=for-the-badge)
![Vercel Badge](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge)

### Utilities

![React Hook Form Badge](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff&style=for-the-badge)
![Zod Badge](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=fff&style=for-the-badge)
