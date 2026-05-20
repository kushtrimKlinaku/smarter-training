import { getPayload } from "payload";
import configPromise from "@payload-config";
import HomePageClient from "./HomePageClient";

export const dynamic = 'force-dynamic'; // Ensures we fetch the latest CMS data

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch programs from Payload
  const { docs: programs } = await payload.find({
    collection: "programs",
    where: { active: { equals: true } },
    limit: 100, // Fetch up to 100 active programs for the home page
  });

  return <HomePageClient initialPrograms={programs} />;
}
