import { NextResponse } from "next/server";
import { Campuses } from "@/data/Campuses";
import { getGender } from "@/utils/get_gender";
import { db } from "../../../../lib/db";

// Define a type for the student fetched from MongoDB
interface DbStudent {
  user_name: string;
  nickname: string | null;
  banner_url: string | null;
}

// Define a type for the API response student
interface ApiStudent {
  user: {
    login: string;
    first_name: string;
  };
  // Add other properties from the API response as needed
}

export async function GET(req: Request) {
  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const started_date = searchParams.get("started_date");
  const page = searchParams.get("page");
  const campus_id = searchParams.get("campus_id");
  const allumni = searchParams.get("is_allumni");

  // Extract Authorization header
  const reqHeaders = new Headers(req.headers);
  const AccessToken = reqHeaders.get("Authorization");

  // Validate Authorization header
  if (!AccessToken) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://api.intra.42.fr/v2/cursus_users?&filter[campus_id]=${campus_id}&filter[begin_at]=${started_date}&page[size]=100&page[number]=${page}&sort=-level`,
      {
        headers: {
        Authorization: `${AccessToken}`,
      },
  }
);

    const user = await fetch("https://api.intra.42.fr/v2/users/232764", {
      headers: {
        Authorization: `${AccessToken}`,
      },
    });

    if (user)
    {
      const data = await user.json();
      console.log(data);
    }

    // Handle response errors
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // Parse and return the data
    const ApiStudents: ApiStudent[] = await response.json(); // get students from 42 API
    const DbStudents: DbStudent[] = await db.user.findMany(); // get All Registered students from MongoDB

    // Get All User_names from DbStudents
    const dbStudentsMap = new Map(
      DbStudents.map((dbUser) => [dbUser.user_name, dbUser])
    );

    const UpdatedStudentsData = ApiStudents.map((user, index) => {
      const dbStudent = dbStudentsMap.get(user.user.login); // Look up the MongoDB student by user_name

      return {
        ...user,
        originalRank: (parseInt(page || "1", 10) - 1) * 100 + index + 1,
        Gender: getGender(user.user.first_name.trim()),
        verified: !!dbStudent, // Check if the student is found in MongoDB
        nickname: dbStudent?.nickname || null, // Add nickname from MongoDB or default to null
        banner_url: dbStudent?.banner_url || null, // Add banner_url from MongoDB or default to null
      };
    });

    return NextResponse.json(UpdatedStudentsData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching Students!" },
      { status: 500 }
    );
  }
}
