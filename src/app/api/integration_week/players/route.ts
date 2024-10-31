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

    return NextResponse.json({ status: 200, users: rankedUsers });
  } catch (err) {
    return NextResponse.json(
      { error: "An error occurred while fetching players." },
      { status: 500 }
    );
  }
}
