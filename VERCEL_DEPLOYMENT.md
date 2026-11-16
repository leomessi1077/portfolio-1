# Deploying the portfolio to Vercel

The frontend and Express API are separate Vercel projects from this repository.

## API project

1. Import the repository as a Vercel project and set **Root Directory** to `server`.
2. Add these environment variables for Production (and Preview if needed):
   - `MONGO_URI`: the rotated MongoDB Atlas connection string
   - `EMAIL_USER`: the Gmail account used by Nodemailer
   - `EMAIL_PASS`: that account's Google app password
   - `EMAIL_TO`: the inbox that receives contact messages (optional; defaults to `EMAIL_USER`)
   - `CLIENT_URL`: the frontend's Vercel origin; separate multiple allowed origins with commas
3. Deploy. Check `https://<api-domain>/api/health`; it should return `status: "ok"` and `database: "connected"`.

## Frontend project

1. Import the same repository as a second Vercel project and set **Root Directory** to `client`.
2. Add `VITE_API_URL` with the API project's origin, for example `https://<api-domain>` (no trailing slash).
3. Deploy. The Vite build command is `npm run build`, and its output directory is `dist`.

After deploying the frontend, add its production origin to the API project's `CLIENT_URL`, then redeploy the API. Add preview origins there too if preview deployments need to call the API.

## Local development

Copy `server/.env.example` to `server/.env` and fill in the values. The root `.gitignore` excludes `.env` files. Start the API with `npm run dev --prefix server` and the frontend with `npm run dev --prefix client`; the Vite proxy sends `/api` requests to `http://localhost:5000`.

In MongoDB Atlas, allow network access from the deployed API. Vercel function egress IPs are not fixed on every plan; review Atlas's access-list options for your plan before choosing an allow-list rule.
