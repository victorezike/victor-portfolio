# Victor Ezike — Portfolio

Personal portfolio built with [Next.js](https://nextjs.org), Tailwind CSS, Framer Motion and React Three Fiber.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database setup (MongoDB Atlas)

Email subscribers (popup + contact form) are stored in MongoDB.

1. Sign in at <https://cloud.mongodb.com> and create a free **M0** cluster.
2. **Database Access** → add a database user (username + strong password).
3. **Network Access** → add your IP, or `0.0.0.0/0` if deploying to Vercel.
4. **Connect → Drivers** → copy the `mongodb+srv://...` connection string.
5. In `.env.local` (and in Vercel → Project → Settings → Environment Variables) set:
   - `MONGODB_URI` — the connection string with your password filled in
   - `MONGODB_DB` — database name (default `victor_portfolio`, created automatically)
   - `ADMIN_API_KEY` — a long random secret

The `subscribers` collection and its unique `email` index are created on first use.

View subscribers:

```bash
curl -H "x-admin-key: $ADMIN_API_KEY" http://localhost:3000/api/subscribers
```

## Email

Contact form and alerts are sent through Gmail SMTP. `EMAIL_PASSWORD` must be a
[Gmail App Password](https://myaccount.google.com/apppasswords), not your Google account password.

## Resume

The **Download Resume** button serves `public/Victor_Ezike_Resume.pdf`.
Replace that file to update the resume.
