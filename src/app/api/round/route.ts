import { PAUSE_GAME, PLAY_GAME, elementMissingFromBody } from "@/constants";
import { dbConnect } from "@/functions/database/database.server";
import roundModel from "@/functions/database/models/round.model";
import { pauseGame, playGame } from "@/functions/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    //connect to db and return succesfull message
    await dbConnect();

    //get round object
    const res = await roundModel.findOne();

    //respond
    return NextResponse.json(res);
  } catch (error) {
    //on error return error message
    return NextResponse.json({
      error: `There was an error: ${error}`,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    //check correct params in request body
    const body = await request.json();

    if (!body.ask)
      return NextResponse.json(
        { error: elementMissingFromBody("ask") },
        { status: 400 }
      );

    //interpret ask
    let round;
    switch (Number(body.ask)) {
      case PLAY_GAME: {
        round = await playGame();
        break;
      }
      case PAUSE_GAME: {
        round = await pauseGame();
        break;
      }
      default: {
        return NextResponse.json(
          { error: "Ask not implemented" },
          { status: 400 }
        );
      }
    }

    //return successfully
    return NextResponse.json(round);
  } catch (error) {
    //on error return error message
    return NextResponse.json({
      error: `There was an error: ${error}`,
    });
  }
}
