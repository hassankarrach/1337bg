import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

// Get Users
export async function GET(req: NextRequest) {
  try {
    const users = await db.user.findMany({
      where: {
        is_registered_IW: true,
      },
      orderBy: {
        total_points_IW: "desc",
      },
    });

    // Map users with an added "rank" field
    const rankedUsers = users.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    // Create a response with no-cache headers
    const response = NextResponse.json({ status: 200, users: rankedUsers });

    // Set caching headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An error occurred while fetching players." },
      { status: 500 }
    );
  }
}
