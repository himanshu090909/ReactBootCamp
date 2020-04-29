const mapImplementation = function()
{
let map  = new Map();
//adding elements to map
map.set(1,"himanshu");
map.set(2,"ankit");
map.set(3,"pinki");
map.set(4,"azeem");
map.set(5,"suraj");
//removing elements from map
map.delete(5);
//printing map
console.log(map);
//length of map
console.log('length of map is ',map.size)

}

const setImplementation =  function()
{

    let sets = new Set();
    //adding element to set
    sets.add(4);
    sets.add(5);
    sets.add(6);
    sets.add(7);
    //removing elements from set
    sets.delete(6);
    //printing set
    console.log(sets);
    //length of set
    console.log('length of set is ',sets.size)
}
export {mapImplementation,setImplementation};
