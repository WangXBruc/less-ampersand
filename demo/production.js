let obj;
let map;
let list;

// basic use
const person = obj && obj.person;

// chain call
const name = obj && obj.person && obj.person.name;


// array use
const item = list && list[0];


// Gradually getting more complicated
const value = list && list[0] && list[0].apple && list[0].apple.name;


// In json Object
const orange = {
    name: list && list[0] && list[0].getName(),
    price: list && list[0] && list[0].apple && list[0].apple.price
}

// Call method
const color = map && map.get(1) && map.get(1).color;

// Brackets and parentheses
const age = map && map.get(obj && obj['person'].id);


// Ultimate usage

const sex = map && map.get(list && list[obj && obj.id].put('sex'));


const work = list && list[0] && list[0].get(obj && obj[map && map.get(obj && obj.name).color]);