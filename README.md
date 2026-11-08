# Yusuf Iteoluwakiishi — Portfolio

Responsive React + TypeScript portfolio built with Vite.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

Import this repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

## Contact form setup
The contact form posts to `/api/contact`, a Vercel serverless function that sends enquiries using Resend. Configure these Vercel environment variables:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — sender address verified with Resend
- `CONTACT_TO_EMAIL` — recipient inbox (intended: kiishiyusuf@gmail.com)

Until these values are configured, the form reports that delivery is unavailable and provides the direct email address. Never put the API key in frontend code.
