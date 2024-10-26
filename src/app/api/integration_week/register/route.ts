import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";

export async function POST(req: NextRequest){
	const session = await getServerSession({ req, ...authOptions });

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	if (session.user.pool_year !== 2023)
		return NextResponse.json({ error: "Only New students can Join." }, { status: 401 });

	//check if the user is already registered
	const user = await db.user.findFirst({
		where: {
			user_name: session.user.login as string
		}
	});
		
	if (user && user?.is_registered_IW)
		return NextResponse.json({ error: "You have already registered." }, { status: 401 });
	else if (user && !user?.is_registered_IW)
	{
		//update the user's registration status
		const res = await db.user.update({
			where: {
				user_name: session.user.login as string
			},
			data: {
				is_registered_IW: true,
				image_url: session.user.image as string,
			}
		});
		return NextResponse.json({ status: 200, user: res });
	}
		
	try {
		const res = await db.user.create({
			data: {
				curr_level: Number(session.user.user_level),
				last_level: Number(session.user.user_level),
				user_name: session.user.login as string,
				banner_url: "",
				image_url: session.user.image as string,
				is_verified: false,
				is_registered_IW: true,
			}
		})

		return NextResponse.json({ status: 200, user: res });
	}
	catch (error : any) {
		console.log(error);
		return NextResponse.json({ error: "an error occurred while registering, please try again later." }, { status: 500 });
	}
}