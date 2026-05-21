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

  // Read homepage CMS content from JSON file
  let homepageContent: Record<string, unknown> = {};
  try {
    const homepageFile = path.join(process.cwd(), 'data', 'homepage.json');
    if (fs.existsSync(homepageFile)) {
      homepageContent = JSON.parse(fs.readFileSync(homepageFile, 'utf-8'));
    }
  } catch (err) {
    console.error('Failed to read homepage.json:', err);
  }

  return <HomePageClient initialPrograms={programs} homepageContent={homepageContent} />;
}
