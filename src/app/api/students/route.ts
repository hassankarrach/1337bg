import { NextResponse } from "next/server";
import { InitialUsers } from "@/data/Fake"; // Assuming you need this for some reason
import { getGender } from "@/utils/get_gender";

export async function GET(req: Request) {
  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const started_date = searchParams.get("started_date");
  const page = searchParams.get("page");

  // Extract Authorization header
  const reqHeaders = new Headers(req.headers);
  const AccessToken = reqHeaders.get("Authorization");

  // Validate Authorization header
  if (!AccessToken) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  try {
    // Fetch data from the 42 API
    const response = await fetch(
      `https://api.intra.42.fr/v2/cursus_users?&filter[campus_id]=21&filter[begin_at]=${started_date}&page[size]=100&page[number]=${page}&sort=-level`,
      {
        headers: {
          Authorization: `${AccessToken}`,
        },
      }
    );

    // Handle response errors
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // Parse and return the data
    const Students = await response.json();

    const StudentsWithRankAndGender = Students.map((user: any, index: number) => ({
      ...user,
      originalRank: (parseInt(page || "1", 10) - 1) * 100 + index + 1,
      Gender: getGender(user.user.first_name.trim()),
    }));

    return NextResponse.json(StudentsWithRankAndGender, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching Students!" },
      { status: 500 }
    );
  }
}
