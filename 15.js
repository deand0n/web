let obj = {
  country: "Japan",
  name: "Tokyo",
  population: 13515271,
  o: {
    g: 23
  }
};

function itsNotDeepObjectClone(objForClone) {
  return Object.assign({}, objForClone);
}

let newObject = itsNotDeepObjectClone(obj);

console.log(newObject);
console.log(newObject.o === obj.o);

