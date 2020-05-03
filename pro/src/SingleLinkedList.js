class Node
{
    constructor(data,next=null)
    {
        this.data=data;
        this.next=next;
    }
}
class LinkedList
{
    constructor()
    {
         this.head = null;
    }
}

LinkedList.prototype.insertAtStart = function(data)
{
    let newNode = new Node(data);
    newNode.next=this.head;
    this.head = newNode;
    return this.head;
}

LinkedList.prototype.insertAtLast = function(data)
{
    let newNode = new Node(data);
    if(this.head==null)
    {
        this.head=newNode;
        return this.head;
    }
    else
    {
        let temp = this.head;
        while(temp.next!=null)
        {
            temp=temp.next;

        }
        temp.next=newNode;
        return this.head;
    }
}

LinkedList.prototype.printList = function()
{
    let temp = this.head;
    while(temp.next!=null)
    {
        console.log(temp.data);
        temp=temp.next;
    }
    console.log(temp.data);
}

LinkedList.prototype.firstElement = function()
{
    let temp = this.head;
    console.log('first element of the list is ',temp.data);
}

LinkedList.prototype.lastElement = function()
{
    let temp = this.head;
    while(temp.next!=null)
    {
        temp=temp.next;
    }
    console.log('last element of the list is ',temp.data);
}
LinkedList.prototype.lengthOfList = function()
{
    let length =  0;
    let temp = this.head;
    while(temp.next!=null)
    {
        length = length +1;
        temp=temp.next;
    }
    console.log('lenngth is ',length+1);
}

export {LinkedList};
