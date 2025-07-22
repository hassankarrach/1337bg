import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { nickname, bannerUrl } = await req.json();

  // Validate nickname
  if (nickname.length > 15 || (nickname.length < 3 && nickname !== "")) {
    return NextResponse.json(
      { error: "Nickname must be between 3 and 15 characters." },
      { status: 400 }
    );
  }

  // Validate bannerUrl
  if (!bannerUrl.startsWith("https://") && bannerUrl !== "") {
    return NextResponse.json(
      { error: "Banner URL must start with 'https://'." },
      { status: 400 }
    );
  }

  const validExtensions = [".gif", ".jpeg", ".jpg", ".png"];
  const isValidExtension = validExtensions.some((ext) =>
    bannerUrl.endsWith(ext)
  );

  if (!isValidExtension && bannerUrl !== "") {
    return NextResponse.json(
      {
        error:
          "Banner URL must end with one of: .gif, .jpeg, .jpg, .png.",
      },
      { status: 400 }
    );
  }

  try {
    const user = await db.user.upsert({
      where: {
        user_name: session.user.login,
      },
      update: {
        nickname,
        banner_url: bannerUrl,
        is_verified: true,
      },
      create: {
        user_name: session.user.login,
        full_name: session.user.name || "",
        curr_level: Number(session.user.user_level),
        last_level: Number(session.user.user_level),
        image_url: session.user.image || "",
        nickname,
        banner_url: bannerUrl,
        is_verified: true,
      },
    });

    return NextResponse.json( { status: 200 });
  } catch (error) {
    console.error("Upsert error:", error);
    return NextResponse.json(
      { error: "Failed to save user." },
      { status: 500 }
    );
  }
}
