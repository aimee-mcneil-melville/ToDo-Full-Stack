import getNeighbours from "./getNeighbours";

function countAliveNeighbours(cellRow, cellColumn, board) {
  return getNeighbours(cellRow, cellColumn, board).filter((_) => _).length;
}

export default countAliveNeighbours;
