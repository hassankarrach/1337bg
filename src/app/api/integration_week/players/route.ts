import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";

// Get Users
export async function GET(req: NextRequest){
	try
	{
		const users = await db.user.findMany({
			where: {
				is_registered_IW: true
			}
		});
		return NextResponse.json({ status: 200, users });
	}
	catch(err)
	{
		return NextResponse.json({ error: "An error occurred while fetching players." }, { status: 500 });
	}
}
