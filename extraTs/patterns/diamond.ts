export function createDiamondShape(rows: number): void {
   console.log('For no. of rows : ' + rows);
   if (rows > 2 && rows < 10) {
// uper half of the diamond
       for (let i: number = 0; i < rows; i++) {
   let star = '';
   for (let j: number = rows; j > i; j--) {
       star += ' ';
   }
   for (let k: number = 0; k <= i; k++) {
       star += '* ';
   }

   console.log(star);
}
// lower half of the pattern
for ( let i: string | number = rows; i >= 0; i--) {
   let star = '';
   for ( let j: string | number = rows; j > i ; j--) {
       star += ' ';
   }
   for (let k: number = 0; k <= i; k++) {
       star += '* ';
   }

   console.log(star);
}}
else {
   console.log('enter valid rows');
}}
// pattern(rows);