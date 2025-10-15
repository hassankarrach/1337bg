import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

interface PoolerData {
  fullname: string;
  email: string;
  login: string;
  kind: string;
  image: string;
  staff: boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  campus_id: string;
  campus_name: string;
  level: number;
  accepted: string;
  reason: string | null;
  isvalidated: string;
  cheating: boolean;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const login = searchParams.get("login");

  if (!login) {
    return NextResponse.json({ message: "Login required" }, { status: 400 });
  }

  try {
    // Define the campus file mappings
    const campusFiles = ['bg7.json', 'bg8.json', 'rb7.json', 'rb8.json', 't7.json', 't8.json', 'kh7.json', 'kh8.json'];
    const dataPath = process.cwd(); // Files are in root directory
    
    // Search through all files for the user
    for (const file of campusFiles) {
      const filePath = path.join(dataPath, file);
      
      try {
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const poolData: PoolerData[] = JSON.parse(fileContent);
          
          const userData = poolData.find((user: PoolerData) => user.login === login);
          
          if (userData) {
            return NextResponse.json({
              admission: {
                accepted: userData.accepted,
                reason: userData.reason,
                isvalidated: userData.isvalidated,
                cheating: userData.cheating,
                level: userData.level
              }
            }, { status: 200 });
          }
        }
      } catch (fileError) {
        console.error(`Error reading ${file}:`, fileError);
        continue;
      }
    }

    return NextResponse.json({ admission: null }, { status: 200 });

  } catch (error) {
    console.error('Error checking admission status:', error);
    return NextResponse.json({ admission: null }, { status: 200 });
  }
}
