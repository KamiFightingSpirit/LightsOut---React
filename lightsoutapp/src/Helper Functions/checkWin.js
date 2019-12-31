//probably better to have a reduce here rather than a map
//just do a true ? true : false ; return true/false
function checkWin(board){
    let count = 0;
    board.map(arr => arr.map(elem => {if(!elem){ count += 1}} ))
  return count === 0 ? true : false;
  }


export { checkWin };