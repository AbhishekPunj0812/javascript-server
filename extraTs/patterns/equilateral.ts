 export function createEquilateral(rows: number): void {

   console.log('For no. of rows : ' + rows);

    if (rows > 2 && rows < 10) {
    for ( let i: number = 1 ; i <= rows; i++) {
       for (let r: number = rows - 1; r >= i; r--) {
         process.stdout.write(' ');
       }
       for (let j: number = 1; j <= i; j++) {
          process.stdout.write('* ');
       }
       console.log();
    }}
    else {
        console.log('enter valid rows');
    }
}