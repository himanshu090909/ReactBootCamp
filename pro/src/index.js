//Ques1 Given this array: `[3,62,234,7,23,74,23,76,92]`, Using arrow function, create an array of the numbers greater than `70`.

let array_one = [3,62,234,7,23,74,23,76,92];
let array_new = array_one.filter((e)=>e>70);
console.log('ques1')
console.log(array_new);

//Ques2 go on this link http://localhost:3000/ques2.html

//Ques3 Create a markup template using string literal

const song = {
    name: 'Dying to live',
    artist: 'Tupac',
    featuring: 'Biggie Smalls'
   };

   let string_literal = `"<div class ="song">\n<p>\n${song.name} --${song.artist} \n(${song.featuring})\n</p>\n</div>"`;
   console.log('ques3')
   console.log(string_literal);

//Ques4 Extract all keys inside address object from user object using destructuring ?

const user = 
{
    firstName: 'Sahil',
    lastName: 'Dua',
    Address: {
    Line1: 'address line 1',
    Line2: 'address line 2',
    State: 'Delhi',
    Pin: 110085,
    Country: 'India',
    City: 'New Delhi',
    },
    phoneNo: 9999999999
}

let {Line1,Line2,State,Pin,Country,City}=user.Address;
console.log('ques 4');
console.log(Line1,Line2,State,Pin,Country,City);


//Ques 5 Filter unique array members using Set.

let arrayWithDuplicateElements = [1,2,4,6,8,4,5,7,8,3];
let sets = new Set(arrayWithDuplicateElements);
console.log('ques 5');
for(let elements of sets)
{
    console.log(elements);
}

//Ques 6 Find the possible combinations of a string and store them in a MAP? 


function getAll(string)
{
    var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) {
    var char1 = string[i];
    var char2 = string.substring(0, i) + string.substring(i + 1);
    var inner = getAll(char2);
    for (var j = 0; j < inner.length; j++) {
      results.push(char1 + inner[j]);
    }
  }
  return results;
}

let map = new Map();
console.log('ques 6');
let a = getAll("abc");
for(let i =0;i<a.length;i++)
{
  map.set(i,a[i]);
}
console.log(map);


//Ques 7 Write a program to implement inheritance upto 3 classes.The Class must  public variables and static functions.

class Grandfather
{
    constructor(name)
    {
        this.name = name;
    }
    static firstStaticFunction() 
    {
        return "in grandfather";
    }
}
class Father extends Grandfather
{
    constructor(name,age)
    {
        super(name);
        this.age = age;
    }

    static firstStaticFunction() 
    {
        return "in father";
    }
}
class Son extends Father
{
    constructor(name,age)
    {
        super(name,age);
    }

    static firstStaticFunction() 
    {
        return "in son";
    }
}
console.log('ques 7');
let son = new Son("himanshu",23);
console.log(son);
console.log(Grandfather.firstStaticFunction());
console.log(Father.firstStaticFunction());


// Ques 8 Write a program to implement a class having static functions

class MyClass
{
    static static_function(name)
    {
        return `name is ${name}`;
    }
    static static_function1(age)
    {
        return `age is ${age}`;
    }
}
console.log('ques 8');
console.log(MyClass.static_function("himanshu"));
console.log(MyClass.static_function1(23));

//Ques 9 Import a module containing the constants and method for calculating area of circle, rectangle, cylinder.

import {areaOfCircle,areaOfCylinder,areaOfRectangle} from './area';
console.log('ques 9')
console.log('area of rectangle is ',areaOfRectangle(5,4));
console.log('area of circle is ',areaOfCircle(5));
console.log('area of cylinder is ',areaOfCylinder(5,4));

//Ques 10 Import a module for filtering unique elements in an array.

import {getUniqueElements} from './unique'
let sets1 = getUniqueElements([4,4,5,6,7,9,8]);
console.log('ques 10');
for(let elements of sets1)
{
    console.log(elements);
}


//Ques 11 Write a program to flatten a nested array to single level using arrow functions.

console.log('ques 11');
const arr = [1,[2,3],[4,[5,6]]];
const flattenedArray = arr=>arr.flat(Infinity);
console.log(flattenedArray(arr));


//Ques 12 Implement a singly linked list in es6 and implement addFirst() addLast(), length(), getFirst(), getLast(). (without using array)

 import {LinkedList} from './SingleLinkedList'

console.log('ques 12');
let linkedList = new LinkedList();
linkedList.insertAtStart(4);
linkedList.insertAtStart(5);
linkedList.insertAtLast(6);
linkedList.insertAtLast(7);
linkedList.firstElement();
linkedList.lastElement();
linkedList.lengthOfList();
linkedList.printList();

//Ques 13 Implement Map and Set using Es6

import {mapImplementation,setImplementation} from './ques13'

console.log('ques 13')
mapImplementation();
setImplementation();

//Ques 14 Implementation of stack (using linked list)

import {Stack} from './ques14'

console.log('ques 14');
let stack = new Stack();
console.log('pushed 5');
stack.push(5);
console.log('pushed 7');
stack.push(7);
console.log('pushed 9');
stack.push(9);
stack.peek();
console.log('elements in stack');
stack.printStack();
console.log('pop operation performed');
stack.pop();
console.log('elements in stack');
stack.printStack();





