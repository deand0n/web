function sequence(start = 0, step = 1) {
    let accumulator = start;
    return function() {
        const value = accumulator;
        accumulator += step;
        return value;
    }
}

const generator = sequence(3);

console.log(generator());
console.log(generator());
console.log(generator());