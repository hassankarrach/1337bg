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
    bannerUrl !== ""
  ) {
    return NextResponse.json(
      { error: "Banner URL must end with '.gif', '.jpeg', or '.png'." },
      { status: 400 }
    );
  }

  const currentLevel = Number(session.user.user_level);

  try {
    // Get User from the database
    const existingUser = await db.user.findUnique({
      where: {
        user_name: session.user.login as string,
      },
    });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    // Check if the user's level has changed
    const isLevelChanged = existingUser.curr_level !== currentLevel;
    // Check last update time
    if (
      existingUser.updated_at.getTime() >
      new Date().getTime() - 1 * 60 * 60 * 6 * 1000
    ) {
      return NextResponse.json(
        { error: "You can only update your profile once every 6 hours." },
        { status: 400 }
      );
    }
    // Update the user in the database
    const updatedUser = await db.user.update({
      where: {
        user_name: session.user.login as string,
      },
      data: {
        curr_level: currentLevel,
        last_level: isLevelChanged
          ? existingUser.curr_level
          : existingUser.last_level,
        nickname: nickname as string,
        banner_url: bannerUrl as string,
        is_verified: true,
      },
    });

    return NextResponse.json({ status: 200, user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
