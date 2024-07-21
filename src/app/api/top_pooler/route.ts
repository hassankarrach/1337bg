import { NextResponse } from "next/server";
import { getGender } from "@/utils/get_gender";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const campus_id = searchParams.get("campus_id");

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
      `https://api.intra.42.fr/v2/cursus_users?filter[campus_id]=${campus_id}&filter[begin_at]=2024-07-22T08:37:00.000Z&page[size]=1&sort=-level`,
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
    const top1 = await response.json();

    return NextResponse.json(top1, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching Students!" },
      { status: 500 }
    );
  }
}
