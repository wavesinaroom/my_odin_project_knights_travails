class Board{
  constructor(){
    this.tiles = Array(8).fill(Array(8).fill('x'));
  }
}

const board = new Board();

console.dir(board.tiles);
