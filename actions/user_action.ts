"use server";

import { prisma } from "@/utils/prisma";

export async function create_user() {
  const user = await prisma.user.create({
    data: {
      curr_level: 1,
      last_level: 2,
      user_name: "hkarrach",
      created_at: new Date(),
      is_verified: true,
    },
  });

  console.log(user);
}
