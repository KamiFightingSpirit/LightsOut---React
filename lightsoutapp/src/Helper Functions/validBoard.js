
      //want to go in and grab board[0][0] + board[1][0] + board[2][0] + .... board[n][0] then % 2 === 0
      //next steps would be board[0][1] + ..... board[n][n] 
      //There is another way... if the counter is > 0, then you toggle that cell.
// function validBoard(ncols, nrows, board) {
//     console.log(ncols, nrows)
//     let counter = 0;
//     let counterCheck = 0;
//     for(let i = 0; i < nrows ; i++) {
//         for(let k = 0; k < ncols; k++) {
//             if(board[k][i]){
//                 // console.log(board[k][i]);
//                 counter += 1;
//             }        
//         }
//         if(counter % 2 !== 0) {
//             counterCheck += 1;
//         }
//         // console.log(counter);
//         counter = 0;
//     }
//     return counterCheck === 0 ? true : false;    
// }

// export { validBoard };

function validBoard(ncols, nrows, board) {
    let counter = 0;    
    for(let i = 0; i < ncols ; i++) {
        for(let k = 0; k < nrows; k++) {
            if(board[k][i]){
                counter += 1;     
            }        
        }      
        if(counter % 2 !== 0) {
            board[nrows-1][i] = !board[nrows-1][i];
        }
        counter = 0;
    }
    return board;    
}

export { validBoard };