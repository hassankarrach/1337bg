import { db } from "../../../../lib/db";

export async function get_last_joined(){
	const res = await db.user.findMany({
		where: {
			is_registered_IW: true
		}
	});

	return res;
}