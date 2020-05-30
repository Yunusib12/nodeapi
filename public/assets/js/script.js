let arrMap = [1, 3, 4, 5, 6, 7, 8, 9, 10];

let sendMap = [];
let nArrMap = arrMap.map((mp) => (mp >= 5) && sendMap.push(mp));

console.log(arrMap);
console.log(nArrMap);
console.log(sendMap);