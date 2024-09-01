import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

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
      `https://translate.intra.42.fr/users/${username}/locations_stats.json`,
    );

    // Handle response errors
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // Parse and return the data
    const Data = await response.json();

    return NextResponse.json(Data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching Student logtime!" },
      { status: 500 }
    );
  }
}
