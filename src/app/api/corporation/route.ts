import { dbConnect } from '@/functions/database/database.server'
import corporationModel from '@/functions/database/models/corporation.model'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

  await dbConnect()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  //return all corporations
  if (!id && !name) {
    const corporations = await corporationModel.find().populate('buildingsOwned').populate('tilesCanBuild')
    for (const corporation of corporations) {
      for (const building of corporation.buildingsOwned) {
        await building.populate('tile')
      }
    }
    return NextResponse.json({ corporations: corporations })
  }

  //if only one corporation asked for return single corporation
  let corporation;

  if (id) {
    corporation = await corporationModel.findById(id)
  } else {
    corporation = await corporationModel.findOne({ name: name })
  }
  if (!corporation) return NextResponse.json({ error: "Corporation not found" }, { status: 500 })


  return NextResponse.json(corporation)
}