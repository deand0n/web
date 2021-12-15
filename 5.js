function partial(func, ...args) {
    return function (...arguments) {
        return func.call(this, ...args, ...arguments);
    };
}

function add(a, b) { return a + b; }
function mult(a, b, c, d) { return a * b * c * d; }

let add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13

var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6

function partial(func, ...args) {
    var args = Array.from(arguments);// convert arguments to array
    args.splice(0, 1);//delete the first element oa array
    return function () {
        var allArgs = args.concat(Array.from(arguments));//
        console.log(allArgs);
        return func.apply(this, allArgs);//calls a function with a given this value and arguments
    };
};