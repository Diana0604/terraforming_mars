import { dbConnect } from "@/functions/database/database.server";
import { seedDB } from "@/functions/database/database.seeder";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    //connect to db
    await dbConnect();

    //seed database
    await seedDB();

    //respond with success
    return NextResponse.json({
      message: "Database has been reset to show init",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
