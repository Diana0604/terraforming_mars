import { MAP_COLUMNS, MAP_ROWS } from "@/constants";

export const checkValidPosition = ({
  column,
  row,
}: {
  column: string;
  row: number;
}) => {
  //check valid independently
  if (!(column in MAP_COLUMNS)) return false;
  if (!(row in MAP_ROWS)) return false;

  //check within map range
  switch (column) {
    case "A" || "K": {
      if (row != 1) return false;
      return true;
    }

    case "B" || "J": {
      if (row > 2) return false;
      return true;
    }

    case "C" || "I": {
      if (row > 3) return false;
      return true;
    }

    case "D" || "F" || "H": {
      if (row > 4) return false;
      return true;
    }

    case "E" || "G": {
      if (row > 5) return false;
      return true;
    }
  }
};
