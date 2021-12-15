let arr = [1, 2, 3, 4, 5, 6, 7, 8];

function arrayMap(callback, array) {
  return array.map(item => callback(item));
}

console.log(arrayMap((x) => x * x, arr));
console.log(arr);