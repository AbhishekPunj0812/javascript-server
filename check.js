function power_of_2(n) {
    if (typeof n !== 'number') 
         return 'Not a number'; 
   
       return n && (n & (n - 1)) === 0;
   }
   
   console.log(power_of_2(116));
   console.log(power_of_2(77));
   console.log(power_of_2(256));
   
   