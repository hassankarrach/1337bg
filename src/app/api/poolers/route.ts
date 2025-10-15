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

interface CampusPoolData {
  [key: string]: {
    [poolKey: string]: PoolerData[];
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const campus = searchParams.get("campus");
  const pool = searchParams.get("pool");
  const search = searchParams.get("search")?.toLowerCase();

  try {
    // Define the campus file mappings
    const campusFiles: { [key: string]: string[] } = {
      'benguerir': ['bg7.json', 'bg8.json'],
      'rabat': ['rb7.json', 'rb8.json'],
      'tetouan': ['t7.json', 't8.json'],
      'khouribga': ['kh7.json', 'kh8.json']
    };

    const dataPath = process.cwd(); // Files are in root directory
    const allData: CampusPoolData = {};

    // Load all data or specific campus data
    const campusesToLoad = campus === 'all' ? Object.keys(campusFiles) : [campus || 'benguerir'];

    for (const campusName of campusesToLoad) {
      if (!campusFiles[campusName]) continue;
      
      allData[campusName] = {};
      
      for (const file of campusFiles[campusName]) {
        const poolNumber = file.includes('7') ? '7' : '8';
        const filePath = path.join(dataPath, file);
        
        try {
          if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const poolData: PoolerData[] = JSON.parse(fileContent);
            allData[campusName][poolNumber] = poolData.sort((a, b) => b.level - a.level);
          } else {
            allData[campusName][poolNumber] = [];
          }
        } catch (error) {
          console.error(`Error loading ${file}:`, error);
          allData[campusName][poolNumber] = [];
        }
      }
    }

    // Filter data based on parameters
    let filteredData: (PoolerData & { campus?: string })[] = [];

    if (campus === 'all') {
      // Combine all campuses
      for (const [campusName, campusData] of Object.entries(allData)) {
        if (pool === 'all') {
          const pool7 = campusData['7'] || [];
          const pool8 = campusData['8'] || [];
          filteredData.push(...pool7.map(s => ({ ...s, campus: campusName })));
          filteredData.push(...pool8.map(s => ({ ...s, campus: campusName })));
        } else if (pool && campusData[pool]) {
          filteredData.push(...campusData[pool].map(s => ({ ...s, campus: campusName })));
        }
      }
    } else {
      // Single campus
      const campusName = campus || 'benguerir';
      const campusData = allData[campusName] || {};
      
      if (pool === 'all') {
        const pool7 = campusData['7'] || [];
        const pool8 = campusData['8'] || [];
        filteredData.push(...pool7, ...pool8);
      } else if (pool && campusData[pool]) {
        filteredData.push(...campusData[pool]);
      } else {
        // Default to all pools if no specific pool requested
        const pool7 = campusData['7'] || [];
        const pool8 = campusData['8'] || [];
        filteredData.push(...pool7, ...pool8);
      }
    }

    // Apply search filter
    if (search) {
      filteredData = filteredData.filter(student => 
        student.fullname.toLowerCase().includes(search) ||
        student.login.toLowerCase().includes(search)
      );
    }

    // Sort by level descending
    filteredData.sort((a, b) => b.level - a.level);

    // Calculate statistics
    const stats = {
      total: filteredData.length,
      admitted: 0,
      nonAdmitted: 0,
      cheating: 0,
      validated: 0,
      avgLevel: 0,
      topLevel: 0
    };

    if (filteredData.length > 0) {
      filteredData.forEach(student => {
        // Count validated students
        if (student.isvalidated === 'yes') {
          stats.validated++;
        }
        
        // Count cheating students
        if (student.cheating === true) {
          stats.cheating++;
          stats.nonAdmitted++;
        } else if (student.accepted === 'yes' && student.isvalidated !== 'yes' && student.level <= 7) {
          // Accepted but didn't validate final exam and level <= 7
          stats.nonAdmitted++;
        } else if (student.accepted === 'yes' && 
                   (student.reason === null || student.reason === undefined) && 
                   student.cheating === false && 
                   student.level > 7 && 
                   student.isvalidated === 'no') {
          // Special case: accepted=yes, reason=null, cheating=false, level>7, isvalidated=no -> Admitted
          stats.admitted++;
        } else if (student.accepted === 'yes') {
          stats.admitted++;
        } else {
          stats.nonAdmitted++;
        }
      });

      stats.avgLevel = parseFloat((filteredData.reduce((sum, student) => sum + student.level, 0) / filteredData.length).toFixed(2));
      stats.topLevel = parseFloat(Math.max(...filteredData.map(s => s.level)).toFixed(2));
    }

    return NextResponse.json({
      data: filteredData,
      stats: stats
    }, { status: 200 });

  } catch (error) {
    console.error('Error in poolers API:', error);
    return NextResponse.json(
      { message: "Error fetching poolers data!" },
      { status: 500 }
    );
  }
}
