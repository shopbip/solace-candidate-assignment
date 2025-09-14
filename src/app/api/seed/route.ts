import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return Response.json({ error: 'Seeding only allowed in development' }, { status: 403 });
  }

  try {
    // Remove all existing advocates to make seeding idempotent
    await db.delete(advocates);

    // Insert new advocate data
    const records = await db.insert(advocates).values(advocateData).returning();

    return Response.json({ 
      message: 'Database seeded successfully',
      advocates: records 
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ 
      error: 'Failed to seed database' 
    }, { status: 500 });
  }
}
