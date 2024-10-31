import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";
import { db } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
	const session = await getServerSession({ req, ...authOptions });

	// Check if user is authorized
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// Only allow admins to proceed
	const Admins_usernames = ["hkarrach", "admin2", "admin3"];
	if (!Admins_usernames.includes(session.user.login as string)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		// Extract points, winners, and mode from the request body
		const { points, winners, mode } = await req.json();

		// Validate the input data
		if (isNaN(points) || !Array.isArray(winners) || !winners.every(w => typeof w === 'string') || !['increment', 'decrement'].includes(mode)) {
			return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
		}

		// Track the count of successfully updated users
		let updatedCount = 0;

		// Choose the update operation based on the mode
		const updateOperation = mode === 'increment' ? { increment: points } : { decrement: points };

		// Update points for each user in the winners array
		for (const winner of winners) {
			try {
				await db.user.update({
					where: { user_name: winner },
					data: { total_points_IW: updateOperation },
				});
				updatedCount++;
			} catch (error) {
				// Skip if user does not exist or other error occurs
				console.warn(`Skipping ${winner}:`, error);
			}
		}

		return NextResponse.json({ status: 200, message: `${updatedCount} users updated successfully` });
	} catch (error) {
		console.error("Error updating users:", error);
		return NextResponse.json({ error: "Error updating users" }, { status: 500 });
	}
}
