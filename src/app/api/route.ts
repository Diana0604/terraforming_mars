import { dbConnect } from "@/functions/database/database.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //connect to db and return succesfull message
    await dbConnect();
    return NextResponse.json({
      message: `Database connected, server up and running`,
    });
  } catch (error) {
    //on error return error message
    return NextResponse.json({
      message: `There was an error when connecting to mongodb due to: ${error}`,
    });
  }
}
