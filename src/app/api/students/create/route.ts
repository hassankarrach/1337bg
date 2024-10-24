import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
  // Get the NextAuth session
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract and parse the body
  const { nickname, bannerUrl } = await req.json();
  // checkers
  if (nickname.length > 15 || (nickname.length < 3 && nickname != "")) {
    return NextResponse.json(
      { error: "Nickname must be between 3 and 15 characters." },
      { status: 400 }
    );
  }
  if (!bannerUrl.startsWith("https://") && bannerUrl !== "") {
    return NextResponse.json(
      { error: "Banner URL must start with 'https://'." },
      { status: 400 }
    );
  }
  if (
    !bannerUrl.endsWith(".gif") &&
    !bannerUrl.endsWith(".jpeg") &&
    !bannerUrl.endsWith(".png") &&
    !bannerUrl.endsWith(".jpg") &&
    bannerUrl !== ""
  ) {
    return NextResponse.json(
      { error: "Banner URL must end with '.gif', '.jpeg', or '.png'." },
      { status: 400 }
    );
  }

  try {
    // Create and save the user in the database
    const user = await db.user.create({
      data: {
        curr_level: Number(session.user.user_level), // Use user_level instead of level
        last_level: Number(session.user.user_level), // Use user_level instead of level
        user_name: session.user.login as string,
        nickname: nickname as string,
        banner_url: bannerUrl as string,
        is_verified: true,
      },
    });

    return NextResponse.json({ status: 200, user }); // Respond with the created user
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
}
