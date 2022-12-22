class Board{
  size = 8;
  constructor(){
    this.tiles = Array(this.size).fill(Array(this.size).fill('x'));
  }

  visualize(){
    this.tiles.forEach(tile=>console.log(tile.join(' ')));
  }
}

const board = new Board();

board.visualize();
