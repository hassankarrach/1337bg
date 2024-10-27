import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";


// Get Users

export async function GET(req: NextRequest){
	// const session = await getServerSession({ req, ...authOptions });

	// if (!session) {
	// 	return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	// }

	const users = await db.user.findMany({
		where: {
			is_registered_IW: true
		}
	});

	return NextResponse.json({ status: 200, users });
}