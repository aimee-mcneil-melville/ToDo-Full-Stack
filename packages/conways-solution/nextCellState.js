import isOverPopulated from "./isOverPopulated";
import isUnderPopulated from "./isUnderPopulated";
import isRessurectable from "./isRessurectable";

function nextCellState(cellState, neighbourCount) {

  if (
    cellState &&
    (isOverPopulated(neighbourCount) || isUnderPopulated(neighbourCount))
  ) {
    return false;
  }

  if (!cellState && isRessurectable(neighbourCount)) {
    return true;
  }

  return cellState;
}

export default nextCellState;
