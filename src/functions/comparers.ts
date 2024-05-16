import { Corporation, Tile } from "@/types";

export function compareTiles(a: Tile, b: Tile) {
  //columns
  if (a.column > b.column) return 1;
  if (b.column > a.column) return -1;

  //row
  if (a.row > b.row) return 1;
  if (b.row > a.row) return -1;

  //they are equal
  return 0;
}

export function compareCorporations(a: Corporation, b: Corporation) {
  if (a.name > b.name) return 1;
  if (b.name > a.name) return -1;
  return 0;
}