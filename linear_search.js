function linearSearch(value, list) {
    let found = false;
    let position = -1;
    let index = 0;
 
    while(!found && index < list.length) {
        if(list[index] == value) {
            found = true;
            position = index;
        } else {
            index += 1;
        }
    }
    console.log(position);
}
linearSearch(35,[1,2,34,5,6,35,4,71])