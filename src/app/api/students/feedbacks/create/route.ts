import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../../lib/authOptions";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { _userName, feedbackText } = await req.json();

  if (!_userName || !feedbackText?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // 1. Find or create receiver
    const receiver = await db.user.upsert({
      where: { user_name: _userName },
      update: {}, // Nothing to update
      create: {
        user_name: _userName,
        full_name: null,         // Optional fields, adjust as needed
        nickname: null,
        image_url: null,
        banner_url: null,
        curr_level: 0,
        last_level: 0,
      },
    });

    // 2. Create feedback
    const feedback = await db.feedback.create({
      data: {
        feedback_text: feedbackText.trim(),
        giver: { connect: { user_name: session.user.login } },
        receiver: { connect: { user_name: _userName } }, // or receiver.user_name
      },
    });

    return NextResponse.json({ feedback }, { status: 201 });
  } catch (error) {
    console.error("Failed to create feedback:", error);
    return NextResponse.json(
      { error: "Failed to create feedback" },
      { status: 500 }
    );
  }
}
