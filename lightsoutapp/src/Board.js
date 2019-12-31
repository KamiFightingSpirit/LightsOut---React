/* 
IDEAS: 
1. Add on hover effects showing the change in the game state if you make that move
2. On hover - Brighten edges

Notes:
1. Change the size of the cells AND grid based on the number being created
2. Write a function that makes sure the game is winnable, else auto reroll

*/

import React, {Component} from "react";
import Cell from "./Components/Cell";
import './Board.css';
import { checkWin } from './Helper Functions/checkWin.js';
import { flipCell } from './Helper Functions/flipCell.js';
import { validBoard } from './Helper Functions/validBoard.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      hasWon : false,
      chanceLightStartsOn : 0.4,
      board : [],
      ncols : 4,
      nrows : 4,
    } 

    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.gameClickHandler = this.gameClickHandler.bind(this);
    this.rowChange = this.rowChange.bind(this);
    this.colChange = this.colChange.bind(this);
  }

  // create a board nrows high/ncols wide
  createBoard() {
    let board = [];
    let newArr = [];
    let {ncols, nrows} = this.state;

    for(let i = 0; i < nrows; i++, newArr = []) {
      for(let k = 0; k < ncols; k++) {
        newArr.push(Math.random() < this.state.chanceLightStartsOn ? true : false);
      }    
    //checks to make sure that each row has an even number of isLit cells
    let count = newArr.reduce((acc, elem) => elem ? acc + 1 : acc +  0 );
      count % 2 === 0 ? board.push(newArr) : i--;
    }
    // validBoard(ncols, nrows, board) ? this.setState({ board : board }) : this.createBoard();
    board = validBoard(ncols, nrows, board);
    this.setState({ board : board })
  }

  //Calls for the creation of a new board when user presses new game button
  gameClickHandler(event) {
    event.preventDefault()
    this.createBoard();
  }
  //Changes state based off user entry into row and column inputs
  rowChange(event) {
    this.setState({
      nrows : event.target.value,
    });
  }
  colChange(event) {
    this.setState({
      ncols : event.target.value,
    });
  }  

  //Handles each move update board & determine if winner */
  flipCellsAround(coord) {
    //Setup copies of state
    let {ncols, nrows} = this.state;
    let board = this.state.board.map(k => k.map(i => i));    
    let [y, x] = coord.split("-").map(Number);
    //Flips the adjacent cells  
    flipCell(y, x, ncols, nrows, board);
    //Sets new board state and checks to see if game has been won
    this.setState({board : board, hasWon : checkWin(board)})
  }



  /** Render game board or winning message. */
  // if the game is won, just show a winning msg & render nothing else
  render() {
    const numCols = <input onChange={this.colChange} placeholder="Enter Number of Columns" type="number" name="number of columns" value={this.state.ncols} required/>;    
    const numRows = <input onChange={this.rowChange} placeholder="Enter Number of Rows" type="number" name="number of rows" value={this.state.nrows} required/>;
    const button = <button onClick={this.gameClickHandler}>New Game</button>;
    const form = <form>{numCols}{numRows}<br />{button}</form>;

    const cells = <div className="boardGrid" 
                  style={{
                    gridTemplateColumns : `repeat(`+this.state.ncols+`, 70px)`, 
                    gridTemplateRows : `repeat(`+this.state.nrows+`, 70px)`
                  }} 
                  >{
                    this.state.board.map((arr, arrInd) => 
                        arr.map((elem, elemInd) => 
                          <Cell 
                            value={arrInd+`-`+elemInd} 
                            key={arrInd+`-`+elemInd}
                            isLit={elem} 
                            flipCellsAroundMe={this.flipCellsAround}/>
                          ))}
                  </div>;
    
    return(
      <div>
        <h1 className="header">Lights Out</h1>      
        {form}
        {cells}
      </div>
    )
  }
}


export default Board;




/* My Notes:
1. After each turn will need to run an algo to check the state of each cell, if any lit, not gameOver
2. Each square has a on/off set to true/false
3. Each square has a clickHandler (this should be the child component)
4. When a square if clicked the on/off switch is toggled
5. Toggling the switch toggles a className.

Board Size Creator:
1. Have a double loop algo, first loop is number of rows, second loop is numbers of columns. etc.

Calcing Neighboring Squares: 
0 0 0 0 
0 0 0 0
0 0 0 0

1  2  3  4
5  6  7  8
9 10 11 12

Rules (Not Edge):
n-1, n+1, n-(number columns), n+(number columns)

Rules Edge:
n-1 || n+1, n-4, n+4

Rules Corner:
Depends on corner, each corner has it's own set of rules. There are always 4 corners.
Finding Corners:
The first is 1
The second is number columns
The third is (rows * columns) - rows +1 
The last is number rows * number columns

Checking edge: 
1 is always an edge. 
N-columns therefore N is always edge
N+1 is always edge or 
General Rule:
X%N === 0 or x%n === 1 is an edge.

Example:
Click x= 7
Possible values
6,8,3,11 
Check if edge:
7%4 = 3 not edge, there fore toggle all.

Example 2:
Click x = 12
12%4 = is edge


*/