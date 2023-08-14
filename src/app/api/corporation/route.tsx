import corporationModel from '@/functions/database/models/corporation.model'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  if (!id && !name) return NextResponse.json({ error: "At least property id or name is needed in params" }, { status: 400 })

  let corporation;

  if (id) {
    corporation = await corporationModel.findById(id)
  } else {
    corporation = await corporationModel.findOne({ name: name })
  }
  if (!corporation) return NextResponse.json({ error: "Corporation not found" }, { status: 500 })


  return NextResponse.json( corporation )
}