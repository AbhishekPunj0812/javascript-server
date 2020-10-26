 export function createEquilateral(rows) {

   console.log('For no. of rows : ' + rows);

    if (rows > 2 && rows < 10) {
    for ( let i = 1 ; i <= rows; i++) {
       for (let r = rows - 1; r >= i; r--) {
         process.stdout.write(' ');
       }
       for (let j = 1; j <= i; j++) {
          process.stdout.write('* ');
       }
       console.log();
    }}
    else {
        console.log('enter valid rows');
    }
}