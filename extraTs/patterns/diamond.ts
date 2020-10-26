export function createDiamondShape(rows) {
   console.log('For no. of rows : ' + rows);
   if (rows > 2 && rows < 10) {
// uper half of the diamond
       for (let i = 0; i < rows; i++) {
   let star = '';
   for (let j = rows; j > i; j--) {
       star += ' ';
   }
   for (let k = 0; k <= i; k++) {
       star += '* ';
   }

   console.log(star);
}
// lower half of the pattern
for ( let i = rows; i >= 0; i--) {
   let star = '';
   for ( let j = rows; j > i ; j--) {
       star += ' ';
   }
   for (let k = 0; k <= i; k++) {
       star += '* ';
   }

   console.log(star);
}}
else {
   console.log('enter valid rows');
}}
// pattern(rows);