function flipCell(y, x, ncols, nrows, board) {    
    // Checks if coord is on the board, flips it if it is
       //Note: y is rows and x is cols
    //FLIP SELF
    
    board[y][x] = !board[y][x];      
    //FLIP TOP
    if (y+1 < nrows) {
        board[y+1][x] = !board[y+1][x];
    }
    //FLIP RIGHT      
    if (x+1 < ncols ) {
        board[y][x+1] = !board[y][x+1];
    }
    //FLIP BOTTOM
    if (y-1 >= 0) {
        board[y-1][x] = !board[y-1][x];
    }
    //Flip LEFT      
    if (x-1 >= 0) {
    board[y][x-1] = !board[y][x-1];
    }    
}  


export { flipCell };