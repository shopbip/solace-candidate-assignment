import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  // // Basic auth check
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
  //   return Response.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const data = await db.select().from(advocates);

    return Response.json({ 
      message: "Advocates fetched successfully",
      data 
    });
  } catch (error) {
    console.error(error);
    return Response.json({ 
      error: "Failed to fetch advocates",
    }, { status: 500 });
  }
}
