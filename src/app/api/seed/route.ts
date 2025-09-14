import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  // Remove all existing advocates to make seeding idempotent
  await db.delete(advocates);

  // Insert new advocate data
  const records = await db.insert(advocates).values(advocateData).returning();

  return Response.json({ advocates: records });
}
