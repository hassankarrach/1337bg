import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../lib/authOptions";

// update player by action (ADD | SUB | BAN)
export async function POST(req: NextRequest) {
    // should protect here 
    const session = await getServerSession({ req, ...authOptions });
    // // Check if user is authorized
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // // Only allow admins to proceed
    const Admins_usernames = process.env.NEXT_PUBLIC_ADMINS?.split(",") || [];
    if (!Admins_usernames.includes(session.user.login as string)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await req.json();
    const { action, user_id, points , winners} = data;

    // console.log(data);
    // return NextResponse.json({ status: 200 , data: data});
  // Update user
  try {
    if (action === "BAN") {
        await db.user.update({
          where: { id: user_id },
          data: { is_banned_IW: true },
        });
      }
    else if (action === "UNBAN") {
        await db.user.update({
            where: { id: user_id },
            data: { is_banned_IW: false },
        });
    }
    else if (action === "ADD") {
        if (!winners) {
            await db.user.update({
              where: { id: user_id },
              data: { total_points_IW: {increment : points} },
            });
        }
        else {
            for (let i = 0; i < winners.length; i++) {
                try
                {
                    await db.user.update({
                        where: { user_name: winners[i] },
                        data: { total_points_IW: { increment : points} },
                    });
                }
                catch (err)
                {
                    console.log("user not found but it's okay");
                }
        }
    }
    } else if (action === "SUB") {
      await db.user.update({
        where: { id: user_id },
        data: { is_registered_IW: false },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid action provided." },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "An error occurred while updating the player." },
      { status: 500 }
    );
  }
}