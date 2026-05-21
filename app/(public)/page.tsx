import { getPayload } from "payload";
import configPromise from "@payload-config";
import HomePageClient from "./HomePageClient";
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'; // Ensures we fetch the latest CMS data

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch programs from Payload
  const { docs: programs } = await payload.find({
    collection: "programs",
    where: { active: { equals: true } },
    limit: 100, // Fetch up to 100 active programs for the home page
  });

  // Read homepage CMS content from DB
  let homepageContent: Record<string, unknown> = {};
  try {
    const { Pool } = await import('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URI,
      ssl: { rejectUnauthorized: false }
    });
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT value FROM custom_cms_settings WHERE key = $1', ['homepage']);
      if (result.rows.length > 0) {
        homepageContent = result.rows[0].value;
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Failed to read homepage from DB:', err);
  }

  return <HomePageClient initialPrograms={programs} homepageContent={homepageContent} />;
}
