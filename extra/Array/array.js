
//Implementation of Array functions


//Create an array and access the locations in it
let places=["Rajasthan","Delhi","Mumbai","Assam","Orissa"];
console.log("Item at 0 position ",places[0]);
console.log("item at 1 position",places[1]);

//add an item to the end of an array
places.push("Goa");
console.log(places);

//remove an item from the end of an array
let deleted=places.pop();
console.log("deleted element from the last = ",deleted);
console.log(places);

//remove an item from the beginning of an array

let removed = places.shift();
console.log("removed element from starting = ", removed);
console.log(places);

//add an item to the beginning of an array
places.unshift("banglore");
console.log(places)

//find the index of an item in the array
let pos= places.indexOf("Delhi");
console.log("index of delhi is",pos);

//remove an item by index position
let removeditem = places.splice(1, 1);
console.log("removed item", removeditem);
console.log(places);

//remove items from an index position

let removeditems=places.splice(1,2);
console.log("removed items ", removeditems);
console.log(places);

//to sort an array
places.sort();
console.log("after sorting = ",places);

//to concatinate two array
let a=[1,2,3,4];
let b=["a","b","h","i"];
let c= a.concat(b);
console.log("concatinated",a +" and",b + " resulted in", c);


//Array.from() to copy or create a new array from the given parameter


console.log(Array.from(places, x=> x+2));

// foreach(): it will perform the action on each element

a.forEach(element => {
console.log(element+2);
})