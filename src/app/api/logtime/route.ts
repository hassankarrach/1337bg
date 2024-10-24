import { NextResponse } from "next/server";

interface LogElement {
  begin_at: string;      // "2024-10-22T22:11:03.000Z"
  campus_id: number;     // 21
  end_at: string;        // "2024-10-22T23:57:29.000Z"
  host: string;          // "c3r9p6"
  id: number;            // 30943928
  primary: boolean;      // true
  user: {};              // User object
}

const calculateLogTime = (
  Data: LogElement[], 
  StartDate: Date, 
  EndDat: Date, 
) => {
  let TotalLogTime = 0;   // Total hours
  let TotalLogMinutes = 0; // Total minutes

  Data.map((el: LogElement) => {
    const BeginDate = new Date(el.begin_at);
    const EndDate = new Date(el.end_at);

    const TimeDiff_ms = EndDate.getTime() - BeginDate.getTime();
    const hours = Math.floor(TimeDiff_ms / 3600000); // Full hours
    const minutes = Math.floor((TimeDiff_ms % 3600000) / 60000); // Remaining minutes


    // Make sure BeginDate and EndDate fall within the required range
    if (BeginDate >= StartDate && EndDate <= EndDat) {
      TotalLogTime += hours;
      TotalLogMinutes += minutes;
    }
  });

  // Convert minutes to hours and adjust the total hours and minutes
  TotalLogTime += Math.floor(TotalLogMinutes / 60);  // Add extra hours from minutes
  TotalLogMinutes = TotalLogMinutes % 60;            // Keep only the remaining minutes

  return { TotalHours: TotalLogTime, TotalMinutes: TotalLogMinutes };
};


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

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
      `https://api.intra.42.fr/v2/users/${user_id}/locations?&page[size]=100`,
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
    const Data = await response.json();
    // LogTime
    const StartDate = new Date("2024-09-27");
    const EndDate = new Date("2024-10-27");
  
    const {TotalHours, TotalMinutes} = calculateLogTime(Data, StartDate, EndDate  );

    return NextResponse.json({
      TotalLogTime : TotalHours,
      TotalLogMinutes : TotalMinutes,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching Student logtime!" },
      { status: 500 }
    );
  }
}
