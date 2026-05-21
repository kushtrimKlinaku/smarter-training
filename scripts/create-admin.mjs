/**
 * Try first-register endpoint for Payload CMS
 */

const BASE_URL = 'https://smarter-training.vercel.app';

async function createAdmin() {
  console.log('Trying first-register endpoint...');

  // Try the Payload first-register route
  const res = await fetch(`${BASE_URL}/api/users/first-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@smarter.com',
      password: 'admin1234',
    }),
  });

  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
}

createAdmin();
