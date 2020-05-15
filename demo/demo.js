let obj;
let map;
let list;

// basic use
const person = /**@@ */obj.person;

// chain call
const name = /**@@ */obj.person.name;


// array use
const item = /**@@ */list[0];


// Gradually getting more complicated
const value = /**@@ */list[0].apple.name;


// In json Object
const orange = {
    name: /**@@ */list[0].getName(),
    price: /**@@ */list[0].apple.price
}

// Call method
const color = /**@@ */map.get(1).color;

// Brackets and parentheses
const age = /**@@ */map.get(/**@@ */obj['person'].id);


// Ultimate usage

const sex = /**@@ */map.get(/**@@ */list[/**@@ */obj.id].put('sex'));


const work = /**@@ */list[0].get(/**@@ */obj[/**@@ */map.get(/**@@ */obj.name).color]);