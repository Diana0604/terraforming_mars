import tileModel from '@/functions/database/models/tile.model'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const row = searchParams.get('row')
  const column = searchParams.get('column')

  if (!row || !column) {
    const allTiles = await tileModel.find();
    return NextResponse.json({ tiles: allTiles })
  }

  const tile = await tileModel.findOne({ row: Number(row), column: column })
  if (!tile) return NextResponse.json({ error: "Tile not found" }, { status: 500 })

  return NextResponse.json({ tile })
}