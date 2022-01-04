const data = [
    {'name': 'A', 'parent': 'null'},
    {'name': 'B', 'parent': 'null'},
    {'name': 'C', 'parent': 'A'},
    {'name': 'D', 'parent': 'A'},
    {'name': 'E', 'parent': 'D'},
    {'name': 'F', 'parent': 'D'},
    {'name': 'G', 'parent': 'B'},
    {'name': 'H', 'parent': 'B'},
];

let result = {};
let parents = [];
let count = 0;
const firstParent = "null";

for(let i = 0; i < data.length; i++) {
    let parent = data[i].parent;
    if(!parents.includes(parent)) {  
        parents[count++] = parent;
    }
}

console.log(parents);
result.null = [];
createResult();
console.log(result);

function createResult() {
    for(let i = 0; i < parents.length; i++) {
        let childs = getChilds(parents[i]);
        //console.log(childs);
        for(let child in childs) {
            let parent = findNestedObj(result, parents[i]);
            let object = {};
            object[child] = childs[child];
            // object = Object.assign(object, childs);
            //console.log(object);
            parent[parents[i]].push(object);
        }
    }
}

function getChilds(parentName) {
    let childs = {};
    for(let i = 0; i < data.length; i++) {
        if(parentName == data[i].parent) {
            childs[data[i].name] = [];
        }
    }
    return childs;
}

function findNestedObj(entireObj, keyToFind) {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind]) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    return foundObj;
}