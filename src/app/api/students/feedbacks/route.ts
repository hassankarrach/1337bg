import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { login } = await req.json();
  if (!login) {
    return NextResponse.json({ error: "Missing login" }, { status: 400 });
  }

  try {
    // Find user ID by login (user_name)
    const user = await db.user.findUnique({
      where: { user_name: login },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    else{
      console.log("User found:", user);
    }

    // Fetch feedbacks by receiver_id (which is user.id)
    const feedbacks = await db.feedback.findMany({
      where: { receiver_id: user.id },
      include: {
        giver: {
          select: {
            id: true,
            user_name: true,
            nickname: true,
            image_url: true,
            is_verified: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ feedbacks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch feedbacks." },
      { status: 500 }
    );
  }
}
