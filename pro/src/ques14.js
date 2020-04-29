class Node
{
    constructor(data,next=null)
    {
        this.data=data;
        this.next=next;
    }
}
class Stack
{
    constructor()
    {
         this.head = null;
    }
}
let count = 0;
Stack.prototype.push = function(data)
{
    let newNode = new Node(data);
    newNode.next=this.head;
    this.head = newNode;
    count=count+1;
    return this.head;
}

Stack.prototype.pop = function()
{
   let temp = this.head;
   temp=temp.next;
   this.head=temp;
   count=count-1;
   return this.head;   
}
Stack.prototype.peek=function()
{
    console.log('peeked ',this.head.data);
}

Stack.prototype.lengthOfStack = function()
{
   console.log('length of stack is ' , count);
}

Stack.prototype.printStack = function()
{
    let temp = this.head;
    while(temp.next!=null)
    {
        console.log(temp.data);
        temp=temp.next;
    }
    console.log(temp.data);
}

export {Stack};
