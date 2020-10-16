function highestnumber(num1,num2,num3){
    let largest;
    
    // check the condition
    if(num1 >= num2 && num1 >= num3) {
        largest = num1;
    }
    else if (num2 >= num1 && num2 >= num3) {
        largest = num2;
    }
    else {
        largest = num3;
    }
    
    // display the result
    console.log("The largest number is " + largest);
    }
    highestnumber(2,340,924)