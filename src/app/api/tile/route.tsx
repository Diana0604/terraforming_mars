import buildingModel from '@/functions/database/models/building.model'
import corporationModel from '@/functions/database/models/corporation.model'
import customBuildingModel from '@/functions/database/models/customBuilding.model'
import tileModel from '@/functions/database/models/tile.model'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const row = searchParams.get('row')
  const column = searchParams.get('column')

  if (!row || !column) {
    const allTiles = await tileModel.find().populate("buildings").populate("colonizedBy");
    return NextResponse.json({ tiles: allTiles })
  }

  const tile = await tileModel.findOne({ row: Number(row), column: column }).populate("buildings").populate("colonizedBy")
  if (!tile) return NextResponse.json({ error: "Tile not found" }, { status: 500 })

  return NextResponse.json({ tile })
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    //we either need tile id or tile row and column
    if (!body.id && (!body.row || !body.column)) {
      return NextResponse.json({ error: "Missing necessary params in body" }, { status: 400 })
    }

    //find tile either by id or row / column pair
    let tile;
    if (body.id) tile = await tileModel.findById(body.id)
    else {
      tile = await tileModel.findOne({ row: body.row, column: body.column })
    }
    if (tile.colonizedBy) {
      //get corporation that has it colonized
      const corporation = await corporationModel.findById(tile.colonizedBy).populate('buildingsOwned').populate('newBuildingsNextRound')

      //remove buildings from references in the corporation database
      for (const index in corporation.buildingsOwned) {
        const building = corporation.buildingsOwned[index]
        if (building.tile === tile._id) {
          corporation.buildingsOwned.splice(index, 1)
        }
      }

      for (const index in corporation.newBuildingsNextRound) {
        const building = corporation.newBuildingsNextRound[index]
        if (building.tile === tile._id) {
          corporation.newBuildingsNextRound.splice(index, 1)
        }
      }

      //remove tile from tiles can build for this corporation
      for (const index in corporation.tilesCanBuild) {
        const newTile = corporation.tilesCanBuild[index]
        if (newTile.toString() === tile._id.toString()) {
          corporation.tilesCanBuild.splice(index, 1)
          break
        }
      }
      await corporation.save()

      //delete all buildings at this tile form database
      await buildingModel.deleteMany({ tile: tile._id })
      await customBuildingModel.deleteMany({ tile: tile._id })
    }

    //case tile has not been colonized
    if (!tile.colonizedBy) {
      const allCorporations = await corporationModel.find()
      for (const corporation of allCorporations) {
        //remove tile from tiles can build for this corporation
        for (const index in corporation.tilesCanBuild) {
          const newTile = corporation.tilesCanBuild[index]
          if (newTile.toString() === tile._id.toString()) {

            corporation.tilesCanBuild.splice(index, 1)
            break
          }
        }
        await corporation.save()
      }
    }

    //set tile as destroyed
    tile.destroyed = true;
    tile.colonizedBy = null;
    tile.buildings = [];

    //save tile
    await tile.save();

    return NextResponse.json({ message: 'tile destroyed', tile: tile })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}