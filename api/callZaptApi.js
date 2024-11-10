import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const apiKey = process.env.ZAPT_API_KEY;
    const response = await fetch('https://api.zapt.live', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API Error: ${errorData}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error calling ZAPT API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}