import { dbConnect } from "@/functions/database/database.server";
import { NextResponse } from "next/server";

export async function POST() {
  dbConnect();
  try {
    //respond with success
    return NextResponse.json({
      message: "Database has been reset to show init",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: error });
  }
}
