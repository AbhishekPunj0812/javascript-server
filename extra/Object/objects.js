let obj = {
    name : "Abhi",
    age : 22
};
let obj1 = {
    name : "Riddhi"
};
console.log(obj1);

//Object.assign() method copies all properties from source objects to a target object. It returns the target object.
Object.assign(obj1,obj)
console.log(obj1);

//The Object.create() method creates a new object, using an existing object as the prototype of the newly created object.
let obj2 = Object.create(obj,{})
console.log(obj.age);

//The Object.defineProperties() method defines new or modifies existing properties directly on an object, returning the object.
Object.defineProperties(obj, {
    name: {
      value: "Sanya",
      writable: true
    }
  });
  console.log(obj);

  //The Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs, 
  //in the same order as that provided by a for...in loop

  console.log(Object.entries(obj));

  //The Object.freeze() method freezes an object. A frozen object can no longer be changed; 
  //freezing an object prevents new properties from being added to it, existing properties from being removed
Object.freeze(obj);
obj.name="Kartik";
console.log(obj.name);

//Object.fromEntries() method allows us to easily convert a list of key-value pairs into an object.
const arr = [
    ['firstName', 'Virat'],
    ['lastName', 'Kohli'],
    ['age', 30]
];
const person = Object.fromEntries(arr);
console.log(person);

//The Object.getOwnPropertyDescriptor method allows to query the 
//full information about a property and returns a property descriptor for an own property
  const descriptor1 = Object.getOwnPropertyDescriptor(obj1, 'name');  
  console.log(descriptor1.writable);  
  console.log(descriptor1.value);

  //The Object.getOwnPropertyNames() method returns an array of all properties 
  //found directly in a given object.
  console.log(Object.getOwnPropertyNames(obj));

  //The Object.getOwnPropertySymbols() method returns an array of all symbol properties found directly upon a given object.

  const objectSymbols = Object.getOwnPropertySymbols(obj);  

  console.log(objectSymbols.length);  

//The Object.getPrototypeOf() method of JavaScript returns the prototype (i.e. the value of the internal [[Prototype]] property) 
//of the specified object.
console.log(Object.getPrototypeOf(obj2) === obj);

//The Object.is() method determines whether two values are the same value.
let height = 188,
    weight = 70;
console.log(Object.is(height, weight));

//The Object.isExtensible() method determines if an object is extensible (whether it can have new properties added to it).
console.log(Object.isExtensible( obj1 ));

//The Object.isFrozen() determines if an object is frozen.
//Object.freeze(obj); is used to freeze an object
console.log(Object.isFrozen(obj1));
Object.freeze(obj1);
console.log(Object.isFrozen(obj1));

//The Object.isSealed() method determines if an object is sealed.
//Object.seal(object1); is used to seal an object
Object.seal(obj);
console.log(Object.isSealed(obj1));

//The Object.keys() method returns an array of a given object's own enumerable property names, 
//iterated in the same order that a normal loop would.
console.log(Object.keys(obj));

//The Object.preventExtensions() method prevents new properties from ever being added to an object 
//(i.e. prevents future extensions to the object).
Object.preventExtensions(obj1);
console.log(Object.isExtensible(obj1));   