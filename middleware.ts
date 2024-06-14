import { NextResponse } from "next/server";

export const middleware = (req : any) =>{
    console.log("Running.");

    return NextResponse.next()
}