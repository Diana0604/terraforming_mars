//next objects
import { elementMissingFromBody } from "@/constants";
import { dbConnect } from "@/functions/database/database.server";
import alertModel from "@/functions/database/models/alert.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        //connect to db
        await dbConnect();

        //check request contains appropriate body
        const body = await request.json();


        if (!body.message)
        return NextResponse.json(
          { error: elementMissingFromBody("message") },
          { status: 400 }
        );

                //create building
        const alertObject = await alertModel.create({
            message: body.message
        });

        await alertObject.save();

            //respond with success
    return NextResponse.json({
        message: "Alert has been updated",
      });

    } catch (error) {
        return NextResponse.json({ message: error });
    }
}

export async function GET(request: Request) {
    await dbConnect();
  
    const message = await alertModel.find()

    return NextResponse.json({ message: message });
}
