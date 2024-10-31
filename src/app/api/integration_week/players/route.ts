import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export const dynamic = 'force-dynamic'; // Disable static path static optimization
export const fetchCache = 'force-no-store'; // Disable fetch caching
export const revalidate = 0; // Disable revalidation period

export async function GET(req: NextRequest) {
  try {
    // Force a new connection/query to ensure fresh data
    await db.$connect();

    const users = await db.user.findMany({
      where: {
        is_registered_IW: true,
      },
      orderBy: {
        total_points_IW: "desc",
      },
      // Add select if you don't need all fields
      // select: {
      //   id: true,
      //   name: true,
      //   total_points_IW: true,
      //   // ... other needed fields
      // }
    });

    // Map users with rank
    const rankedUsers = users.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    // Create response with comprehensive cache-busting headers
    const response = NextResponse.json(
      { 
        status: 200, 
        users: rankedUsers,
        timestamp: new Date().toISOString() // Add timestamp for debugging
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
          'Vary': '*'
        },
      }
    );

    return response;

  } catch (err : any) {
    console.error('Error fetching players:', err);
    
    return NextResponse.json(
      { 
        error: "An error occurred while fetching players.",
        timestamp: new Date().toISOString(),
        errorMessage: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  } finally {
    // Optionally disconnect to ensure fresh connection next time
    // await db.$disconnect();
  }
}